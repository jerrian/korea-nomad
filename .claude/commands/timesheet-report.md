# Clockwork Pro 그룹 타임시트 리포트 커맨드 (Timesheet Report Command)

당신은 Clockwork Pro API를 활용하여 특정 그룹의 Timesheet 데이터를 수집하고, 그룹 전체 관점에서 프로젝트/이슈 단위로 구조화된 주간/월간 리포트를 생성하는 전문가입니다. 개인 단위가 아닌 그룹 전체가 해당 기간에 어떤 프로젝트와 이슈를 진행했는지를 요약합니다.

## 리포트 요청

$ARGUMENTS

---

## 수행할 작업

위에서 제공된 요청을 아래 단계별 파이프라인에 따라 처리하여 그룹 타임시트 리포트를 생성하세요.

---

### 1단계: 요청 분석

`$ARGUMENTS`를 파싱하여 다음을 파악합니다:

#### 파싱 판단 테이블

| 파라미터 | 감지 규칙 | 기본값 |
|---------|----------|-------|
| **기간 유형** | "주간"/"weekly" 또는 "월간"/"monthly" 키워드 | weekly (주간) |
| **날짜 범위** | `YYYY-MM-DD ~ YYYY-MM-DD` 패턴 감지 | 현재 주(월~일) 또는 현재 월(1일~말일) |
| **그룹** | `.claude/timesheet-groups.json`에 정의된 그룹 키 (예: frontend, backend) | 필수 - 미지정 시 질문 |
| **프로젝트 필터** | 대문자 영문 키워드 (예: PROJ, ENG, DEV) | 전체 프로젝트 |

#### 그룹 설정 파일 로드

먼저 `.claude/timesheet-groups.json` 파일을 읽어 사용 가능한 그룹 목록을 확인합니다:

```bash
cat .claude/timesheet-groups.json
```

#### 그룹 미지정 시

`$ARGUMENTS`에 그룹 키가 없으면, 사용 가능한 그룹 목록을 보여주고 AskUserQuestion으로 선택을 요청합니다.

#### 파싱 결과 확인

```
리포트 설정 확인:
- 그룹: [그룹명] ([멤버 수]명)
- 유형: 주간 / 월간
- 기간: YYYY-MM-DD ~ YYYY-MM-DD
- 프로젝트 필터: 전체 / [프로젝트 키 목록]
- 멤버: [이메일 목록]
```

---

### 2단계: 인증 확인

Clockwork Pro API 호출을 위한 토큰을 확인합니다.

#### 확인 명령

```bash
test -n "$CLOCKWORK_API_TOKEN" && echo "TOKEN_SET" || echo "TOKEN_NOT_SET"
```

#### 토큰 미설정 시 안내

토큰이 설정되어 있지 않으면 다음 안내를 출력하고 **작업을 중단**합니다:

```
CLOCKWORK_API_TOKEN 환경변수가 설정되어 있지 않습니다.

설정 방법:
1. Clockwork Pro 관리자 페이지에서 API 토큰을 발급받습니다
   - Jira 설정 > Apps > Clockwork Pro > API 설정
2. 환경변수를 설정합니다:
   export CLOCKWORK_API_TOKEN="your-token-here"

참고: https://docs.herocoders.com/clockwork/use-the-clockwork-api
```

---

### 3단계: 기간 계산

python3를 사용하여 요청된 기간의 정확한 날짜 범위를 계산합니다.

#### 주간 리포트 (월요일 ~ 일요일)

```bash
python3 -c "
from datetime import datetime, timedelta
today = datetime.now()
monday = today - timedelta(days=today.weekday())
sunday = monday + timedelta(days=6)
print(f'{monday.strftime(\"%Y-%m-%d\")}|{sunday.strftime(\"%Y-%m-%d\")}')
"
```

#### 월간 리포트 (1일 ~ 말일)

```bash
python3 -c "
from datetime import datetime
import calendar
today = datetime.now()
first_day = today.replace(day=1)
last_day = today.replace(day=calendar.monthrange(today.year, today.month)[1])
print(f'{first_day.strftime(\"%Y-%m-%d\")}|{last_day.strftime(\"%Y-%m-%d\")}')
"
```

#### 커스텀 날짜 범위

`$ARGUMENTS`에서 `YYYY-MM-DD ~ YYYY-MM-DD` 패턴이 감지되면 해당 날짜를 그대로 사용합니다.

계산된 날짜 범위를 `STARTING_AT`과 `ENDING_AT` 변수로 저장합니다.

---

### 4단계: 데이터 수집

그룹 멤버별로 Clockwork Pro API를 호출하여 Worklog 데이터를 수집합니다.

#### 그룹 멤버 필터링 방식

`.claude/timesheet-groups.json`에서 읽은 그룹 멤버 이메일 목록을 `user_query[]` 파라미터로 전달합니다.

**멤버가 있는 그룹:**

```bash
curl -s -H "Authorization: Token ${CLOCKWORK_API_TOKEN}" \
  "https://api.clockwork.report/v1/worklogs?starting_at=${STARTING_AT}&ending_at=${ENDING_AT}&expand=worklogs,issues,authors,emails&tz=Asia/Seoul&user_query[]=member1@company.com&user_query[]=member2@company.com"
```

**전체 그룹 (members가 빈 배열):**

멤버 필터 없이 전체 데이터를 조회합니다:

```bash
curl -s -H "Authorization: Token ${CLOCKWORK_API_TOKEN}" \
  "https://api.clockwork.report/v1/worklogs?starting_at=${STARTING_AT}&ending_at=${ENDING_AT}&expand=worklogs,issues,authors,emails&tz=Asia/Seoul"
```

#### 프로젝트 필터 추가

프로젝트 키가 지정된 경우 `project_keys[]` 파라미터를 추가합니다:

```bash
&project_keys[]=PROJ&project_keys[]=ENG
```

#### 페이지네이션 처리

Clockwork API는 최대 10,000건/요청을 반환합니다. 응답 데이터의 worklog 수가 10,000건 이상일 경우 `offset` 파라미터로 추가 요청합니다:

```bash
# 두 번째 페이지
...&offset=10000
```

모든 페이지의 데이터를 병합하여 처리합니다.

#### 응답 JSON 구조 (참고)

Clockwork API는 다음과 같은 구조로 워크로그 데이터를 반환합니다:

```json
[
  {
    "id": "25879",
    "issue_id": "36186",
    "comment": "팀 주간 회의\n\n* 부산시청 프로젝트 리뷰",
    "author": {
      "emailAddress": "meanwo0603@42maru.ai",
      "displayName": "크리스(정민우)",
      "accountId": "..."
    },
    "started": "2026-01-09T08:30:00.000+0900",
    "timeSpentSeconds": 12600,
    "issue": {
      "key": "GENAI-3",
      "fields": {
        "summary": "[팀] 커뮤니케이션(회의, 회식 등)",
        "project": {
          "key": "GENAI",
          "name": "[INT] GenAI 고도화"
        }
      }
    }
  }
]
```

**주요 필드**:
- `comment`: 워크로그 코멘트 (있는 경우)
- `author.displayName`: 작성자 이름
- `started`: 작업 시작 시간
- `timeSpentSeconds`: 작업 시간 (초)
- `issue.key`: 이슈 키 (예: GENAI-3)
- `issue.fields.summary`: 이슈 요약
- `issue.fields.project.key`: 프로젝트 키 (예: GENAI)
- `issue.fields.project.name`: 프로젝트 전체 이름 (예: [INT] GenAI 고도화)

#### 오류 처리

API 호출 후 HTTP 상태 코드를 확인하고, 오류 시 하단의 "오류 처리" 섹션에 따라 대응합니다. 정상 응답이 아니면 5단계로 진행하지 않습니다.

---

### 5단계: 리포트 생성

수집된 데이터를 **그룹 전체 관점**에서 분석하여 프로젝트/이슈 중심의 리포트를 생성합니다. 개인별 근무시간 분석은 하지 않으며, 이슈 담당자 정도만 표시합니다.

#### 5.1 기간 타입 판별 및 프로젝트 우선순위 설정

먼저 기간이 90일 이상인지 판별하고, 프로젝트 우선순위를 설정합니다:

```python
from datetime import datetime
import re

def calculate_period_days(start_date, end_date):
    """기간 일수 계산"""
    start = datetime.strptime(start_date, '%Y-%m-%d')
    end = datetime.strptime(end_date, '%Y-%m-%d')
    return (end - start).days

def is_priority_project(project_name):
    """
    우선순위 프로젝트 판별:
    - [2025 고객명], [2026 고객명] 등 -> 우선순위 O
    - [INT ...] 등 -> 우선순위 X
    """
    if not project_name:
        return False
    # [INT]로 시작하면 내부 프로젝트
    if project_name.upper().startswith('[INT]'):
        return False
    # [YYYY 텍스트] 패턴이면 우선순위 프로젝트
    pattern = r'^\[\d{4}\s+[^\]]+\]'
    return bool(re.match(pattern, project_name))

# 기간 타입 판별
is_long_period = calculate_period_days(STARTING_AT, ENDING_AT) >= 90
```

#### 5.2 리포트 전체 구조

**90일 미만 (단일 기간 리포트)**:
```markdown
# [그룹명] 타임시트 리포트

## 기본 정보
(기간, 유형, 그룹 요약)

---

## 프로젝트별 근무시간 요약
(프로젝트 단위 시간, 비율, 우선순위 표시)

---

## 주요 프로젝트 활동 상세
(우선순위 프로젝트의 워크로그 코멘트 요약, 최대 2~3라인)

---

## 프로젝트별 이슈 상세
(프로젝트 > 이슈 단위, 우선순위별 구분)
```

**90일 이상 (월별 분할 리포트)**:
```markdown
# [그룹명] 타임시트 리포트 (장기 리포트)

## 전체 기간 요약
(전체 기간 통계)

---

## 월별 리포트

### 📅 YYYY년 M월

#### 기본 정보
(해당 월 요약)

#### 프로젝트별 근무시간 요약
(해당 월 프로젝트 요약)

#### 주요 프로젝트 활동 상세
(해당 월 우선순위 프로젝트 코멘트, 최대 2~3라인)

#### 프로젝트별 이슈 상세
(해당 월 이슈 상세)

---

### 📅 YYYY년 M+1월
(동일한 구조 반복)
```

#### 섹션 1: 기본 정보

**단일 기간 리포트 (< 90일)**:
```markdown
# [그룹명] 타임시트 리포트

## 기본 정보
- 그룹: [그룹명] ([멤버 수]명)
- 기간: YYYY-MM-DD (요일) ~ YYYY-MM-DD (요일)
- 리포트 유형: 주간 / 월간 / 커스텀
- 총 근무시간: XXX.Xh
- 참여 프로젝트: N개
- 작업 이슈: N개
```

**장기 리포트 (≥ 90일)**:
```markdown
# [그룹명] 타임시트 리포트 (장기 리포트)

## 전체 기간 요약
- 그룹: [그룹명] ([멤버 수]명)
- 기간: YYYY-MM-DD (요일) ~ YYYY-MM-DD (요일) (XX일)
- 총 근무시간: XXX.Xh
- 참여 프로젝트: N개
- 작업 이슈: N개
```

#### 섹션 2: 프로젝트별 근무시간 요약

그룹 전체가 각 프로젝트에 투입한 시간과 비율을 보여줍니다.

```markdown
## 프로젝트별 근무시간 요약

| 구분 | 프로젝트명 | 총 시간 | 비율 | 이슈 수 |
|------|------------|---------|------|---------|
| 🎯 주요 | [2025 부산시청] 부산형 생성형AI 서비스 구축(개발) (BUSAN2025) | 38.5h | 25% | 8개 |
| 🎯 주요 | [2025 R&D] GENAI-LLM42 (GL) | 105.8h | 20% | 5개 |
| | [INT] GenAI 고도화 (GENAI) | 338.2h | 50% | 9개 |
| | [INT] 회사일반업무 (INT) | 41.8h | 5% | 4개 |
| **합계** | | **672.2h** | **100%** | **56개** |
```

- **프로젝트 표시 형식**: `프로젝트명 (프로젝트키)`
  - 예: `[2025 부산시청] 부산형 생성형AI 서비스 구축(개발) (BUSAN2025)`
- **우선순위 표시**: `[YYYY 고객명]` 패턴이면 "🎯 주요", `[INT ...]`이면 빈칸
- **정렬 순서**: 우선순위 프로젝트 먼저 (시간 내림차순), 그 다음 일반 프로젝트 (시간 내림차순)
- **비율**: 전체 대비 백분율 (소수점 없이 반올림)
- **이슈 수**: 해당 프로젝트에서 worklog이 기록된 고유 이슈 수

#### 섹션 3: 주요 프로젝트 활동 상세

**우선순위 프로젝트만** 워크로그 코멘트를 요약하여 간결하게 표시합니다. 이 섹션은 조건부로 렌더링됩니다:
- 우선순위 프로젝트가 없으면 **전체 섹션 생략**
- 코멘트가 없는 이슈는 **해당 이슈 생략**
- 활동 내용은 **최대 2~3라인**으로 요약

```markdown
## 주요 프로젝트 활동 상세

### [2025 부산시청] 부산형 생성형AI 서비스 구축(개발) (BUSAN2025) - 38.5h

#### BUSAN2025-12: 이슈 사항 및 대응 방안 정리 (14.5h)
**담당자**: 크리스(정민우)

**활동 내용**: 팀 주간 회의 및 부산시청 프로젝트 리뷰, 고객 요구사항 분석, 기술적 대응 방안 문서화

---

#### BUSAN2025-7: 변경된 요구사항 정리 (4.5h)
**담당자**: 크리스(정민우)

**활동 내용**: 요구사항 변경사항 추적 및 영향도 분석

---

### [2025 R&D] GENAI-LLM42 (GL) - 105.8h

#### GL-2: 데모환경 구축 및 유지보수 (41.5h)
**담당자**: rex, 크리스(정민우)

**활동 내용**: 데모 서버 구축, 모델 배포 및 테스트, 성능 모니터링

---
```

**구현 로직**:
```python
def summarize_comments(comments, max_lines=3):
    """코멘트를 최대 2~3라인으로 요약"""
    all_text = []
    seen = set()

    for comment in comments:
        lines = comment.split('\n')
        for line in lines:
            line = line.strip()
            # 불릿 포인트, 특수 문자 제거
            line = line.lstrip('*-•· ').strip()
            if line and line not in seen and not line.startswith('h2.') and not line.startswith('h3.'):
                all_text.append(line)
                seen.add(line)

    # 최대 max_lines개의 주요 문장만 선택
    if len(all_text) <= max_lines:
        return ', '.join(all_text)
    else:
        # 처음 max_lines개 선택
        return ', '.join(all_text[:max_lines])

def print_comment_analysis(projects):
    """주요 프로젝트의 코멘트 섹션 출력 (2~3라인 요약)"""
    priority_projects = [(k, v) for k, v in projects.items() if v['is_priority']]

    # 우선순위 프로젝트가 없으면 섹션 생략
    if not priority_projects:
        return

    # 코멘트가 있는 프로젝트만 필터링
    projects_with_comments = []
    for proj_key, proj_info in priority_projects:
        has_comments = any(
            len(issue_info['comments']) > 0
            for issue_info in proj_info['issues'].values()
        )
        if has_comments:
            projects_with_comments.append((proj_key, proj_info))

    # 코멘트가 있는 프로젝트가 없으면 섹션 생략
    if not projects_with_comments:
        return

    print("\n## 주요 프로젝트 활동 상세\n")

    for proj_key, proj_info in projects_with_comments:
        print(f"### {proj_info['name']} ({proj_key}) - {seconds_to_hours(proj_info['total_seconds'])}h\n")

        # 이슈를 시간 기준 내림차순 정렬
        sorted_issues = sorted(
            proj_info['issues'].items(),
            key=lambda x: x[1]['total_seconds'],
            reverse=True
        )

        for issue_key, issue_info in sorted_issues:
            if not issue_info['comments']:
                continue  # 코멘트 없는 이슈 생략

            hours = seconds_to_hours(issue_info['total_seconds'])
            authors = ', '.join(sorted(issue_info['authors']))

            print(f"#### {issue_key}: {issue_info['summary']} ({hours}h)")
            print(f"**담당자**: {authors}\n")
            print(f"**활동 내용**: {summarize_comments(issue_info['comments'])}")
            print("\n---\n")
```

#### 섹션 4: 프로젝트별 이슈 상세

각 프로젝트 내에서 진행된 이슈를 시간순으로 상세히 나열합니다. 개인별 시간이 아닌 이슈 단위 총 시간과 담당자를 표시합니다.

**우선순위별로 그룹화**하여 표시합니다:

```markdown
## 프로젝트별 이슈 상세

### 🎯 주요 프로젝트

#### [2025 부산시청] 부산형 생성형AI 서비스 구축(개발) (BUSAN2025) - 38.5h

| 이슈 | 요약 | 담당자 | 총 시간 |
|------|------|--------|---------|
| BUSAN2025-12 | 이슈 사항 및 대응 방안 정리 | 크리스(정민우) | 14.5h |
| BUSAN2025-7 | 변경된 요구사항 정리 | 크리스(정민우) | 4.5h |
| BUSAN2025-6 | LLM 학습 파이프라인 정리 | 크리스(정민우) | 4.0h |
| | | **소계** | **38.5h** |

#### [2025 R&D] GENAI-LLM42 (GL) - 105.8h

| 이슈 | 요약 | 담당자 | 총 시간 |
|------|------|--------|---------|
| GL-2 | 데모환경 구축 및 유지보수 | rex, 크리스(정민우) | 41.5h |
| GL-4 | 코드 리펙토링 및 현행화 | rex, 제리(정우태), 크리스(정민우) | 27.0h |
| GL-1 | 베이스 모델 성능평가 | 제리(정우태), 제이피(정승범) | 23.8h |
| | | **소계** | **105.8h** |

---

### 일반 프로젝트

#### [INT] GenAI 고도화 (GENAI) - 338.2h

| 이슈 | 요약 | 담당자 | 총 시간 |
|------|------|--------|---------|
| GENAI-1 | [팀] 기술조사 및 선행연구 | rex, 제리(정우태), 제이피(정승범), 크리스(정민우) | 86.8h |
| GENAI-4 | [팀] 협업(리뷰, 세미나, 업무협의 등) | 제이피(정승범), 크리스(정민우) | 67.8h |
| GENAI-3 | [팀] 커뮤니케이션(회의, 회식 등) | rex, 제리(정우태), 제이피(정승범), 크리스(정민우) | 50.0h |
| | | **소계** | **338.2h** |
```

**구현 로직**:
```python
def print_project_details(projects):
    """프로젝트별 이슈 상세 출력 (우선순위별 구분)"""
    print("\n## 프로젝트별 이슈 상세\n")

    # 우선순위 프로젝트와 일반 프로젝트 분리
    priority_projects = []
    general_projects = []

    for proj_key, proj_info in sorted(projects.items(), key=lambda x: x[1]['total_seconds'], reverse=True):
        if proj_info['is_priority']:
            priority_projects.append((proj_key, proj_info))
        else:
            general_projects.append((proj_key, proj_info))

    # 주요 프로젝트 출력
    if priority_projects:
        print("### 🎯 주요 프로젝트\n")
        for proj_key, proj_info in priority_projects:
            print_project_issues(proj_key, proj_info)

    # 구분선
    if priority_projects and general_projects:
        print("---\n")

    # 일반 프로젝트 출력
    if general_projects:
        print("### 일반 프로젝트\n")
        for proj_key, proj_info in general_projects:
            print_project_issues(proj_key, proj_info)

def print_project_issues(proj_key, proj_info):
    """단일 프로젝트의 이슈 테이블 출력"""
    hours = seconds_to_hours(proj_info['total_seconds'])
    print(f"#### {proj_info['name']} ({proj_key}) - {hours}h\n")
    print("| 이슈 | 요약 | 담당자 | 총 시간 |")
    print("|------|------|--------|---------|")

    # 이슈를 시간 기준 내림차순 정렬
    sorted_issues = sorted(
        proj_info['issues'].items(),
        key=lambda x: x[1]['total_seconds'],
        reverse=True
    )

    for issue_key, issue_info in sorted_issues:
        issue_hours = seconds_to_hours(issue_info['total_seconds'])
        authors = ', '.join(sorted(issue_info['authors']))
        print(f"| {issue_key} | {issue_info['summary']} | {authors} | {issue_hours}h |")

    print(f"| | | **소계** | **{hours}h** |")
    print()
```

- **프로젝트 헤더**: `프로젝트명 (프로젝트키) - 총시간`
- **프로젝트 그룹**: 우선순위 프로젝트 먼저, 그 다음 일반 프로젝트
- **이슈 정렬**: 각 프로젝트 내에서 총 시간 기준 내림차순
- **담당자**: 해당 이슈에 worklog을 기록한 모든 팀원의 `author_display_name`을 쉼표로 나열
- **총 시간**: 해당 이슈에 기록된 모든 worklog의 `time_spent_seconds` 합산

#### 데이터 변환 규칙

- **시간 변환**: `time_spent_seconds / 3600` -> 소수점 첫째 자리까지 (예: 28800초 -> 8.0h)
- **날짜 파싱**: `started` 필드에서 날짜 추출 (YYYY-MM-DD)
- **요일 매핑**: 한국어 요일 (월, 화, 수, 목, 금, 토, 일)
- **담당자 식별**: `author_display_name` 사용
- **프로젝트 식별**:
  - `project_key` 필드: 프로젝트 고유 키
  - `project_name` 필드: 프로젝트 전체 이름
  - 표시 형식: `{project_name} ({project_key})`
  - 폴백: `project_name`이 없으면 `project_key`만 표시
- **프로젝트 우선순위**: `is_priority_project(project_name)` 함수로 판별
  - `[YYYY 고객명]` 패턴 -> 우선순위 O
  - `[INT ...]` 패턴 -> 우선순위 X
- **이슈 식별**: `issue_key` + `issue_summary` 필드
- **이슈별 담당자 병합**: 동일 이슈에 여러 팀원이 worklog을 남긴 경우, 담당자 이름을 쉼표로 병합하고 시간은 합산
- **코멘트 처리**:
  - `comment` 필드 수집 (빈 문자열 또는 공백만 있으면 무시)
  - 멀티라인 코멘트는 줄 단위로 분리하여 최대 2~3라인으로 요약
  - 중복 코멘트 제거 (같은 내용이 여러 번 기록된 경우)
  - 우선순위 프로젝트만 코멘트 섹션 표시
  - 활동 내용은 쉼표로 구분하여 한 줄로 간결하게 표시

#### 교차 검증

리포트 생성 후 다음을 검증합니다:
- 프로젝트별 소계의 합 = 기본 정보의 총 근무시간
- 이슈별 소계의 합 = 해당 프로젝트의 총 시간

불일치가 있으면 원인을 확인하고 수정합니다.

#### 5.3 월별 분할 리포트 구현 (90일 이상)

기간이 90일 이상일 경우, 월별로 워크로그를 그룹화하여 각 월마다 독립적인 리포트를 생성합니다.

**월별 그룹핑**:
```python
def group_worklogs_by_month(worklogs):
    """워크로그를 년-월 단위로 그룹화"""
    from collections import defaultdict

    monthly_groups = defaultdict(list)

    for wl in worklogs:
        started = wl['started']  # "2026-01-09T08:30:00.000+0900"
        month_key = started[:7]  # "2026-01"
        monthly_groups[month_key].append(wl)

    return dict(sorted(monthly_groups.items()))
```

**전체 기간 요약 생성**:
```python
def print_overall_summary(worklogs, start_date, end_date):
    """전체 기간 요약 출력"""
    total_seconds = sum(wl['timeSpentSeconds'] for wl in worklogs)
    unique_projects = len(set(wl['issue']['fields']['project']['key'] for wl in worklogs))
    unique_issues = len(set(wl['issue']['key'] for wl in worklogs))

    # 요일 계산
    weekdays_ko = ['월', '화', '수', '목', '금', '토', '일']
    start_dt = datetime.strptime(start_date, '%Y-%m-%d')
    end_dt = datetime.strptime(end_date, '%Y-%m-%d')
    start_weekday = weekdays_ko[start_dt.weekday()]
    end_weekday = weekdays_ko[end_dt.weekday()]
    period_days = (end_dt - start_dt).days + 1

    print("# GenAI 타임시트 리포트 (장기 리포트)\n")
    print("## 전체 기간 요약")
    print(f"- 그룹: GenAI (4명)")
    print(f"- 기간: {start_date} ({start_weekday}) ~ {end_date} ({end_weekday}) ({period_days}일)")
    print(f"- 총 근무시간: {seconds_to_hours(total_seconds)}h")
    print(f"- 참여 프로젝트: {unique_projects}개")
    print(f"- 작업 이슈: {unique_issues}개")
```

**월별 리포트 생성**:
```python
def generate_report(worklogs, start_date, end_date):
    """메인 리포트 생성 함수"""
    is_long_period = calculate_period_days(start_date, end_date) >= 90

    if is_long_period:
        # 전체 요약
        print_overall_summary(worklogs, start_date, end_date)
        print("\n---\n## 월별 리포트\n")

        # 월별 그룹핑
        monthly_groups = group_worklogs_by_month(worklogs)

        for month_key, month_worklogs in monthly_groups.items():
            # 월 헤더
            year, month = month_key.split('-')
            print(f"\n### 📅 {year}년 {int(month)}월\n")

            # 해당 월의 리포트 생성
            generate_single_period_report(month_worklogs)
            print("\n---\n")
    else:
        # 기존 단일 기간 리포트
        generate_single_period_report(worklogs)

def generate_single_period_report(worklogs):
    """단일 기간 리포트 생성 (섹션 1~4)"""
    projects = aggregate_data(worklogs)

    print_basic_info(projects)                  # 섹션 1
    print_project_summary(projects)             # 섹션 2
    print_comment_analysis(projects)            # 섹션 3 (우선순위 프로젝트만)
    print_project_details(projects)             # 섹션 4
```

**데이터 집계 함수**:
```python
def aggregate_data(worklogs):
    """워크로그를 프로젝트/이슈 단위로 집계"""
    projects = {}

    for wl in worklogs:
        # 프로젝트 및 이슈 정보 추출
        project_key = wl['issue']['fields']['project']['key']
        project_name = wl['issue']['fields']['project'].get('name', project_key)
        issue_key = wl['issue']['key']
        issue_summary = wl['issue']['fields']['summary']
        author_name = wl['author']['displayName']
        time_seconds = wl['timeSpentSeconds']
        comment = wl.get('comment', '').strip()

        # 프로젝트 데이터 초기화
        if project_key not in projects:
            projects[project_key] = {
                'name': project_name,
                'key': project_key,
                'is_priority': is_priority_project(project_name),
                'total_seconds': 0,
                'issues': {}
            }

        projects[project_key]['total_seconds'] += time_seconds

        # 이슈 데이터 초기화
        if issue_key not in projects[project_key]['issues']:
            projects[project_key]['issues'][issue_key] = {
                'summary': issue_summary,
                'total_seconds': 0,
                'authors': set(),
                'comments': []
            }

        projects[project_key]['issues'][issue_key]['total_seconds'] += time_seconds
        projects[project_key]['issues'][issue_key]['authors'].add(author_name)

        if comment:
            projects[project_key]['issues'][issue_key]['comments'].append(comment)

    return projects
```

---

## 오류 처리

| 상황 | 감지 방법 | 대응 |
|------|----------|------|
| **토큰 미설정** | `$CLOCKWORK_API_TOKEN` 빈값 | 2단계의 토큰 설정 가이드 출력 후 중단 |
| **API 401/403** | HTTP 상태 코드 | "API 토큰이 유효하지 않거나 권한이 부족합니다. 토큰을 재발급하세요." 안내 |
| **API 404** | HTTP 상태 코드 | "API 엔드포인트를 찾을 수 없습니다. Clockwork Pro 설치 상태를 확인하세요." 안내 |
| **빈 응답** | worklogs 배열 길이 0 | "해당 기간에 [그룹명] 그룹의 worklog이 없습니다." 안내 및 기간/그룹 필터 재확인 제안 |
| **그룹 미정의** | timesheet-groups.json에 키 없음 | 사용 가능한 그룹 목록을 출력하고 선택 요청 |
| **설정 파일 없음** | timesheet-groups.json 파일 부재 | 파일 생성 가이드 출력 |
| **네트워크 오류** | curl 종료 코드 비정상 | "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도하세요." 안내 |
| **JSON 파싱 오류** | 응답이 유효한 JSON이 아님 | "API 응답을 처리할 수 없습니다." + 원본 응답 일부 출력 |

---

## 추가 지시사항

1. **한국어 사용**: 리포트, 안내 메시지 모두 한국어로 작성합니다
2. **그룹 관점 유지**: 개인별 근무시간 분석은 하지 않습니다. 이슈 담당자 이름 표시가 개인 정보의 최대 수준입니다
3. **데이터 정확성**: 시간 계산 시 반올림 오차에 주의합니다. 합계가 개별 값의 합과 일치해야 합니다
4. **민감 정보 보호**: API 토큰을 출력하거나 로그에 남기지 않습니다
5. **대용량 데이터 처리**: worklog이 10,000건을 초과할 경우 페이지네이션으로 모든 데이터를 수집합니다
6. **타임존**: 모든 API 요청에 `tz=Asia/Seoul`을 포함합니다
7. **교차 검증 필수**: 프로젝트별 합계와 전체 합계가 일치하는지 반드시 확인합니다

---

## 그룹 설정 파일 형식

`.claude/timesheet-groups.json`:

```json
{
  "groups": {
    "그룹키": {
      "name": "표시할 그룹명",
      "members": [
        "member1@company.com",
        "member2@company.com"
      ]
    },
    "all": {
      "name": "전체",
      "members": []
    }
  }
}
```

- `members`가 빈 배열이면 전체 사용자 대상으로 조회합니다
- 그룹 키는 소문자 영문으로 작성합니다
- 여러 그룹을 자유롭게 추가할 수 있습니다

---

## 사용 예시

```
# 단일 기간 리포트 (90일 미만)
/timesheet-report GenAI 주간 리포트
/timesheet-report GenAI 월간 리포트
/timesheet-report GenAI 2026-01-01 ~ 2026-01-31

# 프로젝트 필터링
/timesheet-report GenAI 주간 GENAI GL

# 장기 리포트 (90일 이상, 월별 분할)
/timesheet-report GenAI 2025-10-01 ~ 2025-12-31
/timesheet-report GenAI 2026-01-01 ~ 2026-03-31

# 전체 그룹
/timesheet-report all 월간 리포트
```

---

지금 바로 위에서 제공된 요청을 분석하여 그룹 타임시트 리포트를 생성하세요.
