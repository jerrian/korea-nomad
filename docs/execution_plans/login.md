# 로그인/회원가입 기능 구현 계획 (MVP)

## 개요
- **목표**: 외부 서비스 연동 없이, 클라이언트 사이드 localStorage 기반의 최소한의 로그인/회원가입 기능 구현
- **예상 작업 수**: 12개
- **주요 구성요소**: 타입 정의, AuthContext, 로그인/회원가입 모달, Header 연동, 사용자 상태 UI
- **예상 난이도**: 중간

## 가정 사항
- **가정 1**: MVP이므로 별도 백엔드/DB 없이 `localStorage`로 사용자 데이터를 관리한다
- **가정 2**: 비밀번호는 단순 해싱(SHA-256 등) 또는 평문 저장 (MVP 한정, 프로덕션에서는 반드시 서버사이드 해싱 필요)
- **가정 3**: 세션 관리는 React Context + localStorage 조합으로 처리한다
- **가정 4**: 별도 인증 라이브러리(NextAuth 등)는 사용하지 않는다
- **가정 5**: 이메일/비밀번호 기반 인증만 지원한다 (소셜 로그인 제외)
- **가정 6**: 보호된 라우트(protected routes)는 MVP 범위에서 제외한다
- **가정 7**: 로그인/회원가입은 별도 페이지가 아닌 모달(Dialog) 형태로 구현한다

## 대안/옵션

**옵션 A: localStorage 기반 클라이언트 사이드 인증 (권장)**
- 장점: 외부 의존성 없음, 빠른 구현, MVP에 적합
- 단점: 보안 취약 (프로덕션 부적합), 브라우저 간 공유 불가

**옵션 B: Next.js API Routes + JSON 파일 저장**
- 장점: 서버사이드 처리로 약간 더 안전, API 구조 확보
- 단점: 구현 복잡도 증가, MVP에 과도

**→ 옵션 A 권장**: MVP 취지에 맞게 최소 구현

---

## Phase 1: 기반 작업 (타입 + Context + 유틸리티)

- [ ] **1.1 User 관련 타입 정의**
  - 설명: `src/types/index.ts`에 `User`, `AuthState`, `LoginForm`, `SignupForm` 타입 추가
  - 완료 기준: 타입이 정의되고, import 시 에러 없음
  - 의존성: 없음
  - 실행 유형: ⊗ 블로킹 (이후 모든 작업이 이 타입에 의존)
  - 예상 소요: S

- [ ] **1.2 인증 유틸리티 함수 구현**
  - 설명: `src/lib/auth.ts` 생성 — localStorage CRUD (사용자 저장/조회/삭제), 비밀번호 검증, 이메일 유효성 검사 함수
  - 완료 기준: `saveUser`, `getUser`, `validateEmail`, `validatePassword` 함수가 동작함
  - 의존성: 1.1 (User 타입)
  - 실행 유형: 🔴 순차 필수
  - 예상 소요: S

- [ ] **1.3 AuthContext 구현**
  - 설명: `src/contexts/AuthContext.tsx` 생성 — `AuthProvider`, `useAuth` 훅 구현. 로그인/로그아웃/회원가입 함수, 현재 사용자 상태, 모달 열기/닫기 상태 관리
  - 완료 기준: `useAuth()`로 `user`, `login`, `logout`, `signup`, `isLoginModalOpen`, `isSignupModalOpen` 접근 가능
  - 의존성: 1.1, 1.2
  - 실행 유형: 🔴 순차 필수
  - 예상 소요: M

- [ ] **1.4 Root Layout에 AuthProvider 추가**
  - 설명: `src/app/layout.tsx`의 `<body>` 내부에 `AuthProvider`로 children 감싸기
  - 완료 기준: 전체 앱에서 `useAuth()` 접근 가능
  - 의존성: 1.3
  - 실행 유형: 🔴 순차 필수
  - 예상 소요: S

## Phase 2: UI 컴포넌트 구현

### 🔵 병렬 그룹 A (동시 진행 가능 — 모두 Phase 1 완료 후)

- [ ] **2.1 로그인 모달 컴포넌트 구현**
  - 설명: `src/components/auth/LoginModal.tsx` — 이메일/비밀번호 입력, 유효성 검증, 에러 메시지 표시, "회원가입으로 전환" 링크 포함. shadcn/ui Dialog 기반
  - 완료 기준: 모달이 열리고, 이메일/비밀번호 입력 후 로그인 시도 시 성공/실패 처리됨
  - 의존성: 1.3 (AuthContext)
  - 실행 유형: 🔵 병렬 가능
  - 예상 소요: M

- [ ] **2.2 회원가입 모달 컴포넌트 구현**
  - 설명: `src/components/auth/SignupModal.tsx` — 이름/이메일/비밀번호/비밀번호 확인 입력, 유효성 검증, 중복 이메일 체크, "로그인으로 전환" 링크. shadcn/ui Dialog 기반
  - 완료 기준: 모달이 열리고, 회원가입 성공 시 자동 로그인 처리됨
  - 의존성: 1.3 (AuthContext)
  - 실행 유형: 🔵 병렬 가능
  - 예상 소요: M

- [ ] **2.3 사용자 프로필 드롭다운 컴포넌트 구현**
  - 설명: `src/components/auth/UserMenu.tsx` — 로그인 상태에서 표시. 사용자 이름/이메일, 로그아웃 버튼 포함. shadcn/ui DropdownMenu 기반
  - 완료 기준: 로그인 후 Header에 사용자 아이콘 클릭 시 드롭다운 표시
  - 의존성: 1.3 (AuthContext)
  - 실행 유형: 🔵 병렬 가능
  - 예상 소요: S

## Phase 3: 기존 컴포넌트 연동

- [ ] **3.1 Header 컴포넌트 연동**
  - 설명: `src/components/layout/Header.tsx` 수정 — 비로그인 시 로그인/회원가입 버튼 표시 + 클릭 시 모달 열기, 로그인 시 UserMenu 표시. LoginModal, SignupModal 렌더링
  - 완료 기준: Header에서 로그인/회원가입 버튼 클릭 시 각 모달이 열리고, 로그인 후 UserMenu가 표시됨
  - 의존성: 2.1, 2.2, 2.3
  - 실행 유형: 🔴 순차 필수
  - 예상 소요: M

- [ ] **3.2 MobileMenu 컴포넌트 연동**
  - 설명: `src/components/layout/MobileMenu.tsx` 수정 — Header와 동일한 로직 적용 (모바일 뷰)
  - 완료 기준: 모바일 메뉴에서도 로그인/회원가입/로그아웃이 정상 동작함
  - 의존성: 2.1, 2.2, 2.3, 3.1
  - 실행 유형: 🔴 순차 필수
  - 예상 소요: S

## Phase 4: shadcn/ui 컴포넌트 추가 및 검증

- [ ] **4.1 필요한 shadcn/ui 컴포넌트 추가**
  - 설명: Dialog, Label, DropdownMenu 등 모달과 드롭다운에 필요한 shadcn/ui 컴포넌트 설치 (`npx shadcn@latest add dialog label dropdown-menu`)
  - 완료 기준: 필요한 UI 컴포넌트가 `src/components/ui/`에 설치됨
  - 의존성: 없음 (Phase 1과 병렬 가능)
  - 실행 유형: 🔵 병렬 가능
  - 예상 소요: S

- [ ] **4.2 빌드 검증 및 통합 테스트**
  - 설명: `npm run build` 실행으로 타입 에러 확인, `npm run lint`로 린트 검증, 전체 플로우 수동 점검
  - 완료 기준: 빌드/린트 에러 없음, 회원가입→로그인→로그아웃 플로우 정상 동작
  - 의존성: 3.1, 3.2
  - 실행 유형: 🟡 백그라운드 가능
  - 예상 소요: S

---

## 의존성 요약

### 실행 흐름도
```
[Phase 1]                              [Phase 4.1]
    │                                      │
    1.1 ──→ 1.2 ──→ 1.3 ──→ 1.4          (병렬)
                                │           │
                    ┌───────────┴──────┐    │
                    ↓         ↓        ↓    │
                   2.1       2.2      2.3   │
                    │         │        │    │
                    └────┬────┘        │    │
                         ↓             │    │
                        3.1 ←──────────┘    │
                         │                  │
                         ↓                  │
                        3.2                 │
                         │                  │
                         ↓                  ↓
                        4.2 ←──────────────┘
```

### 병렬 처리 기회

| 그룹 | 작업들 | 근거 |
|------|--------|------|
| A | 2.1, 2.2, 2.3 | 서로 다른 파일에서 독립 작업, AuthContext만 공유 사용 |
| B | 1.1~1.4 와 4.1 | shadcn 컴포넌트 설치는 타입/로직과 무관 |

### 크리티컬 패스
`1.1 → 1.2 → 1.3 → 1.4 → 2.1 → 3.1 → 3.2 → 4.2`
(총 예상: S + S + M + S + M + M + S + S)

> ⚠️ **블로킹 작업 주의**: 작업 1.1(타입 정의)은 완료 전까지 Phase 1 전체 진행 불가

---

## 멀티에이전트 실행 계획

### 실행 순서

| 단계 | 실행 모드 | 작업 | 에이전트 수 |
|------|----------|------|------------|
| 1 | 🔵 병렬 | 4.1 shadcn 컴포넌트 설치 (독립) | 1 |
| 2 | 🔴 순차 | 1.1 타입 정의 | 1 |
| 3 | 🔴 순차 | 1.2 인증 유틸리티 | 1 |
| 4 | 🔴 순차 | 1.3 AuthContext | 1 |
| 5 | 🔴 순차 | 1.4 Root Layout 수정 | 1 |
| 6 | 🔵 병렬 | 2.1 로그인 모달, 2.2 회원가입 모달, 2.3 UserMenu | 3 |
| 7 | 🔴 순차 | 3.1 Header 연동 | 1 |
| 8 | 🔴 순차 | 3.2 MobileMenu 연동 | 1 |
| 9 | 🟡 백그라운드 | 4.2 빌드 검증 | 1 |

### 에이전트 실행 명령

**Step 1: 병렬 실행 (독립 작업)**
```
Task(Agent A): "4.1 shadcn/ui Dialog, Label, DropdownMenu 컴포넌트 설치"
```

**Step 2~5: 순차 실행 (Phase 1)**
```
Task: "1.1 User, AuthState, LoginForm, SignupForm 타입을 src/types/index.ts에 추가"
→ 완료 대기
Task: "1.2 src/lib/auth.ts 인증 유틸리티 함수 구현"
→ 완료 대기
Task: "1.3 src/contexts/AuthContext.tsx AuthProvider 및 useAuth 훅 구현"
→ 완료 대기
Task: "1.4 src/app/layout.tsx에 AuthProvider 추가"
→ 완료 대기
```

**Step 6: 병렬 실행**
```
동시 실행:
- Task(Agent A): "2.1 LoginModal 컴포넌트 구현 (shadcn Dialog 기반)"
- Task(Agent B): "2.2 SignupModal 컴포넌트 구현 (shadcn Dialog 기반)"
- Task(Agent C): "2.3 UserMenu 드롭다운 컴포넌트 구현"
→ 모든 에이전트 완료 대기
```

**Step 7~8: 순차 실행 (Phase 3)**
```
Task: "3.1 Header.tsx에 로그인/회원가입 모달 및 UserMenu 연동"
→ 완료 대기
Task: "3.2 MobileMenu.tsx에 동일한 인증 UI 연동"
→ 완료 대기
```

**Step 9: 백그라운드 실행**
```
Task(Background): "4.2 npm run build && npm run lint 실행하여 빌드/린트 에러 확인"
```

### 주의사항
- 🔴 Phase 1(1.1~1.4)은 반드시 순차 실행 — 타입 → 유틸 → Context → Provider 순서
- 🔵 Phase 2(2.1~2.3)는 모두 독립 파일 생성이므로 병렬 가능
- ⚠️ Phase 3에서 Header와 MobileMenu 모두 `useAuth` 및 모달 컴포넌트에 의존하므로 Phase 2 완료 후 진행
- ⚠️ `Header.tsx`와 `MobileMenu.tsx`는 서로 유사한 로직이지만 MobileMenu가 Header에서 prop을 받을 수 있으므로 순차 실행 권장

---

## 검증 체크리스트
- [ ] 회원가입 → 이메일/비밀번호로 계정 생성 가능한가?
- [ ] 중복 이메일 회원가입 시 에러 메시지가 표시되는가?
- [ ] 로그인 → 올바른 자격 증명으로 로그인 성공하는가?
- [ ] 잘못된 이메일/비밀번호 시 에러 메시지가 표시되는가?
- [ ] 로그인 후 Header에 사용자 메뉴가 표시되는가?
- [ ] 로그아웃 후 로그인/회원가입 버튼으로 돌아가는가?
- [ ] 페이지 새로고침 후에도 로그인 상태가 유지되는가? (localStorage)
- [ ] 모바일 메뉴에서도 동일하게 동작하는가?
- [ ] `npm run build` 에러 없이 빌드 성공하는가?
- [ ] `npm run lint` 린트 에러 없는가?
- [ ] 비밀번호 최소 길이 등 기본 유효성 검증이 동작하는가?
