# Test Week 실행 커맨드

당신은 Vitest 테스트를 실행하고 결과를 분석하는 테스트 자동화 전문가입니다.

사용자가 Week 번호 (1, 2, 3, 4, 또는 0/ALL)를 파라미터로 제공하면, 해당하는 테스트 파일들을 실행하고 결과를 간결하게 요약해야 합니다.

## 테스트 요청

$ARGUMENTS

---

## Week별 테스트 파일 매핑

| Week | 설명 | 테스트 파일 |
|------|------|------------|
| Week 1 | 핵심 비즈니스 로직 (가장 중요) | `src/lib/auth.test.ts`<br>`src/contexts/AuthContext.test.tsx`<br>`src/data/cityDetails.test.ts`<br>`src/lib/utils.test.ts`<br>`src/hooks/useDebounce.test.ts` |
| Week 2 | 인증 UI 컴포넌트 | `src/components/auth/LoginModal.test.tsx`<br>`src/components/auth/SignupModal.test.tsx`<br>`src/components/auth/UserMenu.test.tsx`<br>`src/components/auth/AuthButtons.test.tsx` |
| Week 3 | 핵심 기능 UI | `src/components/cities/SearchBar.test.tsx`<br>`src/components/cities/FilterPanel.test.tsx`<br>`src/components/home/CityCard.test.tsx` |
| Week 4 | 기본 UI & 통합 테스트 | `src/components/ui/button.test.tsx`<br>`src/components/ui/input.test.tsx`<br>`src/components/ui/dialog.test.tsx` |
| Week 0 (ALL) | 전체 테스트 | 모든 테스트 파일 |

---

## 수행할 작업

### 1단계: 파라미터 파싱

`$ARGUMENTS`를 분석하여 Week 번호를 추출합니다.

**파싱 규칙**:
- `1`, `week 1`, `w1` → Week 1
- `2`, `week 2`, `w2` → Week 2
- `3`, `week 3`, `w3` → Week 3
- `4`, `week 4`, `w4` → Week 4
- `0`, `all`, `전체` → Week 0 (전체 테스트)

Week 번호가 없거나 유효하지 않으면 사용법을 안내합니다:

```
사용법: /test-week [1|2|3|4|0|all|전체]

Week 1: 핵심 비즈니스 로직
Week 2: 인증 UI 컴포넌트
Week 3: 핵심 기능 UI
Week 4: 기본 UI & 통합 테스트
Week 0/ALL: 전체 테스트
```

### 2단계: 테스트 파일 매핑 및 존재 확인

Week 번호에 해당하는 테스트 파일 목록을 가져옵니다.

**Week 1 파일 목록**:
```
src/lib/auth.test.ts
src/contexts/AuthContext.test.tsx
src/data/cityDetails.test.ts
src/lib/utils.test.ts
src/hooks/useDebounce.test.ts
```

**Week 2 파일 목록**:
```
src/components/auth/LoginModal.test.tsx
src/components/auth/SignupModal.test.tsx
src/components/auth/UserMenu.test.tsx
src/components/auth/AuthButtons.test.tsx
```

**Week 3 파일 목록**:
```
src/components/cities/SearchBar.test.tsx
src/components/cities/FilterPanel.test.tsx
src/components/home/CityCard.test.tsx
```

**Week 4 파일 목록**:
```
src/components/ui/button.test.tsx
src/components/ui/input.test.tsx
src/components/ui/dialog.test.tsx
```

**파일 존재 확인**: Bash 도구를 사용하여 각 파일이 존재하는지 확인합니다.

파일이 하나도 없다면 다음과 같이 안내합니다:

```markdown
⚠️ Week [N] 테스트 파일이 아직 작성되지 않았습니다.

Week [N]: [설명]
- [파일명] (작성 필요)
- [파일명] (작성 필요)
...
```

### 3단계: 테스트 실행

존재하는 파일들에 대해 Vitest를 실행합니다.

**Week 1-4의 경우** (특정 파일들):
```bash
npx vitest run --coverage --reporter=verbose \
  src/lib/auth.test.ts \
  src/contexts/AuthContext.test.tsx \
  src/data/cityDetails.test.ts \
  src/lib/utils.test.ts \
  src/hooks/useDebounce.test.ts \
  2>&1 | tee /tmp/test-result.txt
```

**Week 0 (ALL)의 경우**:
```bash
npm run test:coverage 2>&1 | tee /tmp/test-result.txt
```

**주의사항**:
- 반드시 `2>&1 | tee /tmp/test-result.txt`를 사용하여 결과를 파일에 저장
- `--coverage` 옵션으로 커버리지 포함
- 타임아웃: 기본 10초 사용 (vitest.config.ts 설정)

### 4단계: 결과 분석 및 리포트 생성

저장된 테스트 결과 파일 `/tmp/test-result.txt`를 읽고 분석합니다.

먼저 Bash로 결과 파일을 읽습니다:
```bash
cat /tmp/test-result.txt
```

그 다음 Python으로 결과를 파싱하고 리포트를 생성합니다:

```bash
python3 << 'EOFPYTHON'
import re
import sys

# 결과 파일 읽기
try:
    with open('/tmp/test-result.txt', 'r') as f:
        output = f.read()
except FileNotFoundError:
    print("❌ 테스트 결과 파일을 찾을 수 없습니다.")
    sys.exit(1)

# 테스트 결과 파싱
passed_match = re.search(r'(\d+) passed', output)
failed_match = re.search(r'(\d+) failed', output)

passed = int(passed_match.group(1)) if passed_match else 0
failed = int(failed_match.group(1)) if failed_match else 0
total = passed + failed

# 성공률 계산
success_rate = (passed / total * 100) if total > 0 else 0

# 커버리지 파싱
coverage_lines = re.search(r'Lines\s+:\s+([\d.]+)%', output)
coverage_funcs = re.search(r'Functions\s+:\s+([\d.]+)%', output)
coverage_branch = re.search(r'Branches\s+:\s+([\d.]+)%', output)
coverage_stmts = re.search(r'Statements\s+:\s+([\d.]+)%', output)

# 헤더 출력
if failed == 0:
    print("# ✅ Week [N] 테스트 결과\n")
else:
    print("# ⚠️ Week [N] 테스트 결과\n")

# 요약 출력
print("## 📊 요약")
print(f"- **통과**: {passed} / {total}")
print(f"- **실패**: {failed}")
print(f"- **성공률**: {success_rate:.1f}%\n")

# 커버리지 출력
print("## 📈 커버리지")
print("| 항목 | 커버리지 | 목표 | 상태 |")
print("|------|----------|------|------|")

def format_coverage(match, target):
    if match:
        value = float(match.group(1))
        status = "✅" if value >= target else "❌"
        return f"{value}%", status
    return "N/A", "⚠️"

lines_val, lines_status = format_coverage(coverage_lines, 80)
funcs_val, funcs_status = format_coverage(coverage_funcs, 80)
branch_val, branch_status = format_coverage(coverage_branch, 75)
stmts_val, stmts_status = format_coverage(coverage_stmts, 80)

print(f"| 라인 | {lines_val} | 80% | {lines_status} |")
print(f"| 함수 | {funcs_val} | 80% | {funcs_status} |")
print(f"| 분기 | {branch_val} | 75% | {branch_status} |")
print(f"| 구문 | {stmts_val} | 80% | {stmts_status} |")
print()

# 파일별 결과 파싱 (간략히)
test_files_pattern = re.findall(r'(src/[^\s]+\.test\.tsx?)\s+\((\d+)\)', output)
if test_files_pattern:
    print("## 📝 파일별 결과")
    print("| 파일 | 테스트 수 |")
    print("|------|----------|")
    for file, count in test_files_pattern[:10]:  # 최대 10개까지만
        print(f"| {file} | {count} |")
    print()

# 실패한 테스트 요약
if failed > 0:
    print("## ⚠️ 실패한 테스트")
    failed_tests = re.findall(r'❯ (.+\.test\.tsx?)\s+\((\d+)\)', output)
    for file, count in failed_tests[:5]:  # 상위 5개만
        print(f"- **{file}** ({count}개 실패)")
    print()

EOFPYTHON
```

### 5단계: 간결한 요약 출력

Python 스크립트의 출력을 그대로 사용자에게 보여줍니다.

**리포트 예시**:

```markdown
# ✅ Week 1 테스트 결과

## 📊 요약
- **통과**: 154 / 176
- **실패**: 22
- **성공률**: 87.5%

## 📈 커버리지
| 항목 | 커버리지 | 목표 | 상태 |
|------|----------|------|------|
| 라인 | 92.3% | 80% | ✅ |
| 함수 | 88.1% | 80% | ✅ |
| 분기 | 76.5% | 75% | ✅ |
| 구문 | 91.8% | 80% | ✅ |

## 📝 파일별 결과
| 파일 | 테스트 수 |
|------|----------|
| src/lib/auth.test.ts | 37 |
| src/contexts/AuthContext.test.tsx | 25 |
| src/data/cityDetails.test.ts | 35 |
| src/lib/utils.test.ts | 45 |
| src/hooks/useDebounce.test.ts | 34 |

## ⚠️ 실패한 테스트
- **src/hooks/useDebounce.test.ts** (22개 실패)
```

---

## 주의사항

1. **파일 존재 확인**: 테스트 파일이 없으면 안내 메시지 출력
2. **커버리지 필수**: 항상 `--coverage` 옵션 사용
3. **간결한 요약**: 실패한 테스트는 파일명과 개수만 표시 (상세 로그는 생략)
4. **Week 번호 명시**: 리포트에 어떤 Week를 테스트했는지 명확히 표시

## 테스트 실행 디렉토리

모든 명령어는 프로젝트 루트 디렉토리 `/data/wtjeong/repo/PilotStudy/korea-nomad`에서 실행되어야 합니다.
