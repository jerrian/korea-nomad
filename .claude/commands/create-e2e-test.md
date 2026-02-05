# E2E 테스트 생성기

$ARGUMENT로 입력받은 테스트 시나리오를 기반으로 KoreaNomad 프로젝트의 Playwright E2E 테스트를 생성합니다.

## 테스트 작성 프로세스

### 1. 요구사항 분석
- $ARGUMENT에서 테스트 대상(페이지/기능/플로우) 파악
- 테스트 종류 결정:
  - **페이지 테스트**: `e2e/tests/pages/` (단일 페이지의 UI 및 기능 검증)
  - **기능 테스트**: `e2e/tests/features/` (특정 기능의 통합 플로우)
  - **E2E 플로우**: `e2e/tests/e2e/` (전체 사용자 여정)
  - **비주얼 테스트**: `e2e/tests/visual/` (UI 스크린샷 비교)

### 2. 기존 인프라 확인
- `CLAUDE.md`의 "테스트" 섹션 참조하여 프로젝트 규칙 확인
- 관련 Page Object가 존재하는지 확인:
  - `e2e/page-objects/pages/` - 페이지 객체
  - `e2e/page-objects/components/` - 재사용 컴포넌트 객체
- 필요한 fixtures 확인:
  - `e2e/fixtures/base.ts` - 기본 페이지 픽스처
  - `e2e/fixtures/auth.fixture.ts` - 인증 관련 픽스처
- 테스트 데이터 확인: `e2e/test-data/`

### 3. Page Object 및 컴포넌트 준비 (필요 시)
**새 Page Object가 필요한 경우:**
```typescript
// e2e/page-objects/pages/[name].page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class [Name]Page extends BasePage {
  readonly path = '/[path]';

  // Locators
  readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.getByTestId('[testid]');
  }

  // Actions
  async performAction(): Promise<void> {
    // ...
  }

  // Assertions
  async expectElementVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }
}
```

**fixtures에 추가:**
```typescript
// e2e/fixtures/base.ts
import { [Name]Page } from '../page-objects/pages/[name].page';

export const test = base.extend<PageObjects>({
  [name]Page: async ({ page }, use) => {
    await use(new [Name]Page(page));
  },
});
```

### 4. data-testid 추가 (필요 시)
컴포넌트에 `data-testid` 속성이 없으면 추가합니다.

**a) TEST_IDS 상수 정의:**
```typescript
// e2e/config/test-ids.ts에 추가
export const TEST_IDS = {
  // 기존 항목들...
  NEW_ELEMENT: 'new-element',
  DYNAMIC_ELEMENT: (id: string) => `element-${id}`,
};
```

**b) 컴포넌트 수정:**
```tsx
// src/components/.../Component.tsx
import { TEST_IDS } from '@/e2e/config/test-ids';

<button data-testid={TEST_IDS.NEW_ELEMENT}>
  클릭
</button>
```

### 5. 테스트 파일 작성
**파일명 규칙**: `{feature-name}.spec.ts`

**필수 포함 사항:**
- Page Object Model 패턴 사용
- fixtures 임포트 (`../../fixtures/base` 또는 `../../fixtures/auth.fixture`)
- `TEST_IDS` 상수 사용 (필요 시)
- describe/test 블록 구조화
- beforeEach 훅으로 페이지 초기화

**테스트 템플릿:**
```typescript
import { test, expect } from '../../fixtures/base';

test.describe('[Feature Name]', () => {
  test.beforeEach(async ({ [pageName] }) => {
    await [pageName].goto([pageName].path);
  });

  test('[should do something]', async ({ [pageName] }) => {
    // Arrange (준비)

    // Act (실행)
    await [pageName].performAction();

    // Assert (검증)
    await [pageName].expectElementVisible();
  });

  test('[should handle edge case]', async ({ [pageName] }) => {
    // ...
  });
});
```

**인증이 필요한 테스트:**
```typescript
import { authTest as test, expect } from '../../fixtures/auth.fixture';

test.describe('[Authenticated Feature]', () => {
  test('should access protected page', async ({ authenticatedPage, testUser }) => {
    await authenticatedPage.goto('/protected');
    await expect(authenticatedPage.locator('text=' + testUser.name)).toBeVisible();
  });
});
```

### 6. Playwright MCP로 실제 동작 검증
테스트 코드 작성 전/후에 Playwright MCP를 사용해 브라우저에서 실제 동작을 확인합니다.

**주요 MCP 함수:**
- `mcp__playwright__browser_navigate` - URL 이동
- `mcp__playwright__browser_snapshot` - 페이지 구조 확인 (스크린샷보다 우선)
- `mcp__playwright__browser_click` - 요소 클릭
- `mcp__playwright__browser_type` - 텍스트 입력
- `mcp__playwright__browser_fill_form` - 폼 채우기
- `mcp__playwright__browser_take_screenshot` - 스크린샷 촬영 (필요 시)

**목적:**
- 실제 UI 구조 파악
- Locator 전략 검증
- 인터랙션 가능 여부 확인
- 테스트 코드의 정확성 검증

### 7. 테스트 실행 및 검증
```bash
# Chromium 브라우저만 사용 (권장)
npx playwright test [테스트파일명] --project=chromium --reporter=list

# 모든 Chromium 기반 브라우저 (Desktop Chrome, Mobile Chrome, iPad)
npx playwright test [테스트파일명] --reporter=list
```

**중요: 이 프로젝트는 Chromium 기반 브라우저만 지원합니다.**
- ✅ chromium (Desktop Chrome)
- ✅ Mobile Chrome (Pixel 5)
- ✅ iPad (iPad Pro)
- ❌ Firefox, Webkit, Mobile Safari (미설치/미지원)

**실행 단계:**
1. 첫 번째 실행: Chromium 브라우저로 모든 테스트 케이스 실행
2. 실패한 테스트가 있으면 원인 분석:
   - Locator 문제 → Page Object 수정
   - Timing 문제 → waitFor 추가
   - data-testid 없음 → 컴포넌트에 추가
3. 수정 후 재실행 (최대 2회)
4. 2회 재시도 후에도 실패하면:
   - 실패 원인을 사용자에게 상세히 보고
   - 스크린샷 또는 trace 정보 제공
   - 수동 개입 필요 여부 안내

### 8. 최종 리포트 생성
테스트 작성 완료 후 다음 정보를 사용자에게 제공:

**✅ 생성된 파일:**
- 테스트 파일 경로: `e2e/tests/[category]/[name].spec.ts`
- Page Object (신규): `e2e/page-objects/pages/[name].page.ts`
- 수정된 컴포넌트 (data-testid 추가): `src/components/...`

**📊 테스트 통계:**
- 총 테스트 케이스 수: N개
- 성공: N개
- 실패: N개 (있는 경우 원인 포함)

**🆔 추가된 TEST_IDS:**
- `TEST_IDS.XXX` (e2e/config/test-ids.ts)

**🚀 실행 방법:**
```bash
# Chromium만 테스트 (권장)
npx playwright test [파일명] --project=chromium --reporter=list

# 모든 Chromium 기반 브라우저 (Desktop, Mobile, Tablet)
npx playwright test [파일명] --reporter=list

# UI 모드
npm run test:e2e:ui

# 디버그 모드
npm run test:e2e:debug
```

## 주의사항

1. **CLAUDE.md 준수**: 항상 프로젝트의 테스트 가이드라인을 따릅니다.
2. **POM 패턴 필수**: 테스트 파일에서 직접 `page.locator()` 사용 금지.
3. **TEST_IDS 사용**: 가능한 한 `data-testid`로 요소를 찾습니다.
4. **인증 상태 관리**: localStorage 기반 인증이므로 `auth.fixture` 활용.
5. **디바운스 고려**: 검색 등 디바운싱이 적용된 기능은 `waitForDebounce()` 유틸 사용.
6. **Chromium 기반 브라우저만 지원**: Firefox, Webkit(Safari) 브라우저는 미설치 상태이므로 테스트하지 않습니다.
7. **반응형 테스트**: Chromium 기반 모바일(Mobile Chrome)/태블릿(iPad) 프로젝트로 반응형 테스트 가능.

## 예시 사용법

```bash
# 홈페이지 테스트 생성
/create-e2e-test 홈페이지의 히어로 섹션, 추천 도시 카드, CTA 버튼을 테스트해줘

# 로그인 플로우 테스트
/create-e2e-test 로그인 모달 열기 → 이메일/비밀번호 입력 → 로그인 성공 → 사용자 메뉴 표시 플로우

# 도시 검색 기능 테스트
/create-e2e-test /cities 페이지에서 검색바에 "서울" 입력 → 필터링 결과 확인

# 비주얼 리그레션 테스트
/create-e2e-test 도시 상세 페이지의 스크린샷 비교 테스트 (데스크톱/모바일)
```
