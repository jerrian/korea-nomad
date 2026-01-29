#!/usr/bin/env bash
#
# wt-claude.sh - Git 워크트리를 생성하고 Claude Code를 실행하는 스크립트
#
# 사용법:
#   ./wt-claude.sh <브랜치명> [옵션]
#   ./wt-claude.sh --list
#   ./wt-claude.sh --remove <브랜치명>
#
# 예시:
#   ./wt-claude.sh feature/add-map
#   ./wt-claude.sh issue/42 -b main -p "/solve-issue 42"
#   ./wt-claude.sh feature/dark-mode --base develop
#   ./wt-claude.sh --list
#   ./wt-claude.sh --remove feature/add-map

set -euo pipefail

# ─────────────────────────────────────────────
# 설정
# ─────────────────────────────────────────────
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKTREE_BASE="$(cd "$(dirname "$0")/.." && pwd)/worktrees"
DEFAULT_BASE="main"

# ─────────────────────────────────────────────
# 색상
# ─────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ─────────────────────────────────────────────
# 유틸리티 함수
# ─────────────────────────────────────────────
info()  { echo -e "${BLUE}[INFO]${NC} $*"; }
ok()    { echo -e "${GREEN}[OK]${NC} $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
die()   { error "$@"; exit 1; }

# ─────────────────────────────────────────────
# 도움말
# ─────────────────────────────────────────────
usage() {
    cat <<'USAGE'
wt-claude - Git 워크트리 생성 + Claude Code 실행

사용법:
  ./wt-claude.sh <브랜치명> [옵션]
  ./wt-claude.sh --list
  ./wt-claude.sh --remove <브랜치명>

옵션:
  -b, --base <브랜치>     기반 브랜치 (기본값: main)
  -p, --prompt <텍스트>   Claude Code에 전달할 초기 프롬프트
  -l, --list              기존 워크트리 목록 표시
  -r, --remove <브랜치>   워크트리 및 브랜치 제거
  -h, --help              도움말 표시

예시:
  # 새 워크트리 생성 후 Claude Code 실행
  ./wt-claude.sh feature/add-map

  # main 기반으로 워크트리 생성, 이슈 해결 프롬프트 전달
  ./wt-claude.sh issue/42 -b main -p "/solve-issue 42"

  # 워크트리 목록 확인
  ./wt-claude.sh --list

  # 워크트리 제거
  ./wt-claude.sh --remove feature/add-map
USAGE
}

# ─────────────────────────────────────────────
# 사전 검사
# ─────────────────────────────────────────────
preflight() {
    if [[ ! -d "$REPO_DIR/.git" ]]; then
        die "Git 저장소를 찾을 수 없습니다: $REPO_DIR"
    fi

    if ! command -v git &>/dev/null; then
        die "git이 설치되어 있지 않습니다"
    fi

    if ! command -v claude &>/dev/null; then
        die "Claude Code CLI가 설치되어 있지 않습니다. npm install -g @anthropic-ai/claude-code"
    fi
}

# ─────────────────────────────────────────────
# 워크트리 목록 표시
# ─────────────────────────────────────────────
list_worktrees() {
    info "워크트리 목록 (저장소: $REPO_DIR)"
    echo ""
    git -C "$REPO_DIR" worktree list
    echo ""

    if [[ -d "$WORKTREE_BASE" ]]; then
        local count
        count=$(find "$WORKTREE_BASE" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)
        info "워크트리 디렉토리: $WORKTREE_BASE ($count개)"
    else
        info "워크트리 디렉토리 없음"
    fi
}

# ─────────────────────────────────────────────
# 워크트리 제거
# ─────────────────────────────────────────────
remove_worktree() {
    local branch="$1"
    local safe_name="${branch//\//-}"
    local worktree_dir="$WORKTREE_BASE/$safe_name"

    if [[ ! -d "$worktree_dir" ]]; then
        die "워크트리를 찾을 수 없습니다: $worktree_dir"
    fi

    warn "제거 대상:"
    echo "  워크트리: $worktree_dir"
    echo "  브랜치:   $branch"
    echo ""
    read -rp "정말 제거하시겠습니까? (y/N): " confirm
    if [[ "$confirm" != [yY] ]]; then
        info "취소되었습니다"
        exit 0
    fi

    info "워크트리 제거 중..."
    git -C "$REPO_DIR" worktree remove "$worktree_dir" --force 2>/dev/null || true
    git -C "$REPO_DIR" worktree prune

    # 브랜치 제거 여부 확인
    if git -C "$REPO_DIR" branch --list "$branch" | grep -q .; then
        read -rp "브랜치 '$branch'도 삭제하시겠습니까? (y/N): " del_branch
        if [[ "$del_branch" == [yY] ]]; then
            git -C "$REPO_DIR" branch -D "$branch"
            ok "브랜치 '$branch' 삭제 완료"
        fi
    fi

    ok "워크트리 제거 완료: $worktree_dir"
}

# ─────────────────────────────────────────────
# 워크트리 생성 + Claude Code 실행
# ─────────────────────────────────────────────
create_and_run() {
    local branch="$1"
    local base="$2"
    local prompt="${3:-}"

    local safe_name="${branch//\//-}"
    local worktree_dir="$WORKTREE_BASE/$safe_name"

    # ── 워크트리가 이미 존재하는 경우 ──
    if [[ -d "$worktree_dir" ]]; then
        warn "워크트리가 이미 존재합니다: $worktree_dir"
        info "기존 워크트리에서 Claude Code를 실행합니다"
        run_claude "$worktree_dir" "$prompt"
        return
    fi

    # ── 워크트리 디렉토리 생성 ──
    mkdir -p "$WORKTREE_BASE"

    # ── 브랜치 존재 여부 확인 ──
    local branch_exists=false
    if git -C "$REPO_DIR" show-ref --verify --quiet "refs/heads/$branch" 2>/dev/null; then
        branch_exists=true
    fi

    # ── 워크트리 생성 ──
    echo ""
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN} 워크트리 생성${NC}"
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  브랜치:     ${GREEN}$branch${NC}"
    echo -e "  기반:       ${YELLOW}$base${NC}"
    echo -e "  디렉토리:   $worktree_dir"
    echo -e "  저장소:     $REPO_DIR"
    echo ""

    if [[ "$branch_exists" == true ]]; then
        info "기존 브랜치 '$branch'로 워크트리를 생성합니다"
        git -C "$REPO_DIR" worktree add "$worktree_dir" "$branch"
    else
        info "새 브랜치 '$branch'를 '$base' 기반으로 생성합니다"
        git -C "$REPO_DIR" worktree add -b "$branch" "$worktree_dir" "$base"
    fi

    ok "워크트리 생성 완료"
    echo ""

    # ── Claude Code 실행 ──
    run_claude "$worktree_dir" "$prompt"
}

# ─────────────────────────────────────────────
# Claude Code 실행
# ─────────────────────────────────────────────
run_claude() {
    local dir="$1"
    local prompt="${2:-}"

    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN} Claude Code 실행${NC}"
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  디렉토리: $dir"
    if [[ -n "$prompt" ]]; then
        echo -e "  프롬프트: ${GREEN}$prompt${NC}"
    fi
    echo ""

    cd "$dir"

    if [[ -n "$prompt" ]]; then
        exec claude --prompt "$prompt"
    else
        exec claude
    fi
}

# ─────────────────────────────────────────────
# 인자 파싱
# ─────────────────────────────────────────────
main() {
    local branch=""
    local base="$DEFAULT_BASE"
    local prompt=""
    local action="create"  # create | list | remove

    if [[ $# -eq 0 ]]; then
        usage
        exit 0
    fi

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                usage
                exit 0
                ;;
            -l|--list)
                action="list"
                shift
                ;;
            -r|--remove)
                action="remove"
                if [[ -n "${2:-}" && ! "$2" =~ ^- ]]; then
                    branch="$2"
                    shift
                fi
                shift
                ;;
            -b|--base)
                if [[ -z "${2:-}" ]]; then
                    die "--base 옵션에 브랜치명이 필요합니다"
                fi
                base="$2"
                shift 2
                ;;
            -p|--prompt)
                if [[ -z "${2:-}" ]]; then
                    die "--prompt 옵션에 텍스트가 필요합니다"
                fi
                prompt="$2"
                shift 2
                ;;
            -*)
                die "알 수 없는 옵션: $1 (--help로 사용법을 확인하세요)"
                ;;
            *)
                branch="$1"
                shift
                ;;
        esac
    done

    preflight

    case "$action" in
        list)
            list_worktrees
            ;;
        remove)
            if [[ -z "$branch" ]]; then
                die "--remove 옵션에 브랜치명이 필요합니다"
            fi
            remove_worktree "$branch"
            ;;
        create)
            if [[ -z "$branch" ]]; then
                die "브랜치명을 지정해주세요 (--help로 사용법을 확인하세요)"
            fi
            create_and_run "$branch" "$base" "$prompt"
            ;;
    esac
}

main "$@"
