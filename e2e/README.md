# E2E 테스트 가이드

Playwright를 사용한 KoreaNomad E2E 테스트 문서입니다.

## 📁 폴더 구조

```
e2e/
├── fixtures/           # 테스트 픽스처
├── page-objects/       # Page Object Model
│   ├── base.page.ts
│   ├── components/     # 재사용 컴포넌트
│   └── pages/          # 페이지별 객체
├── tests/              # 테스트 파일
│   ├── e2e/           # E2E 플로우
│   ├── pages/         # 페이지별 테스트
│   ├── features/      # 기능별 테스트
│   └── visual/        # 비주얼 리그레션
├── test-data/         # 테스트 데이터
├── utils/             # 유틸리티 함수
├── hooks/             # 글로벌 훅
└── config/            # 테스트 설정
```

## 🚀 시작하기

### Playwright 브라우저 설치

```bash
npx playwright install
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm run test:e2e

# UI 모드로 실행 (추천)
npm run test:e2e:ui

# 디버그 모드
npm run test:e2e:debug

# 헤드리스가 아닌 브라우저로 실행
npm run test:e2e:headed

# 특정 브라우저만 실행
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# 모바일 브라우저만 실행
npm run test:e2e:mobile

# 테스트 리포트 보기
npm run test:e2e:report

# 테스트 코드 생성기
npm run test:e2e:codegen
```

## 📝 테스트 작성 가이드

### 1. Page Object 사용

```typescript
import { test, expect } from '../../fixtures/base';

test('홈페이지 테스트', async ({ homePage }) => {
  await homePage.goto('/');
  await homePage.expectHeroVisible();
  await homePage.clickCityCard('seoul');
});
```

### 2. 인증된 사용자 테스트

```typescript
import { authTest, expect } from '../../fixtures/auth.fixture';

authTest('로그인된 사용자 테스트', async ({ authenticatedPage, testUser, homePage }) => {
  await homePage.goto('/');
  await homePage.header.expectLoggedIn();
});
```

### 3. 테스트 데이터 사용

```typescript
import { TEST_CITIES } from '../../test-data/cities.data';
import { TEST_USERS } from '../../test-data/users.data';

test('도시 검색', async ({ citiesListPage }) => {
  await citiesListPage.searchCities(TEST_CITIES.seoul.name);
  await citiesListPage.expectCityVisible(TEST_CITIES.seoul.slug);
});
```

## 🎯 Best Practices

### 1. data-testid 사용

컴포넌트에 `data-testid` 속성을 추가하세요:

```tsx
// ❌ 나쁜 예
<button className="login-btn">로그인</button>

// ✅ 좋은 예
<button data-testid="login-button">로그인</button>
```

중앙화된 TEST_IDS를 사용:

```typescript
import { TEST_IDS } from '../../config/test-ids';

const loginButton = page.getByTestId(TEST_IDS.LOGIN_BUTTON);
```

### 2. 대기 처리

```typescript
// 디바운스 대기
import { waitForDebounce } from '../../utils/wait';
await citiesListPage.searchCities('서울');
await waitForDebounce(page);

// 네트워크 idle 대기
import { waitForNetworkIdle } from '../../utils/wait';
await waitForNetworkIdle(page);
```

### 3. 재사용 가능한 헬퍼 사용

```typescript
import { clearLocalStorage, setLocalStorage } from '../../utils/helpers';
import { expectCityCardCount } from '../../utils/assertions';

// localStorage 조작
await clearLocalStorage(page);
await setLocalStorage(page, 'key', { data: 'value' });

// 커스텀 어설션
await expectCityCardCount(page, 16);
```

## 🔍 디버깅

### UI 모드 사용

```bash
npm run test:e2e:ui
```

UI 모드에서는:
- 각 단계별 실행 가능
- 타임 트래블 디버깅
- 네트워크 요청 확인
- 스크린샷/비디오 확인

### 디버그 모드

```bash
npm run test:e2e:debug
```

또는 특정 테스트만:

```bash
npx playwright test home.spec.ts --debug
```

### 코드 생성기

```bash
npm run test:e2e:codegen
```

브라우저에서 직접 조작하면 테스트 코드를 자동 생성합니다.

## 📊 리포트

테스트 실행 후 자동으로 리포트가 생성됩니다:

```bash
npm run test:e2e:report
```

리포트에는 다음이 포함됩니다:
- 테스트 결과 요약
- 실패한 테스트 스크린샷
- 비디오 녹화 (재시도 시)
- 네트워크 로그
- Trace 뷰어

## 🏗️ 새 테스트 추가하기

### 1. 새 페이지 객체 생성

```typescript
// e2e/page-objects/pages/new-page.page.ts
import { BasePage } from '../base.page';

export class NewPage extends BasePage {
  readonly path = '/new-page';

  // Locators
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('page-title');
  }

  // Actions & Assertions
  async expectTitleVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }
}
```

### 2. 픽스처에 추가

```typescript
// e2e/fixtures/base.ts
export const test = base.extend<PageObjects>({
  // ... 기존 픽스처
  newPage: async ({ page }, use) => {
    await use(new NewPage(page));
  },
});
```

### 3. 테스트 작성

```typescript
// e2e/tests/pages/new-page.spec.ts
import { test, expect } from '../../fixtures/base';

test.describe('New Page', () => {
  test('displays title', async ({ newPage }) => {
    await newPage.goto(newPage.path);
    await newPage.expectTitleVisible();
  });
});
```

## 🔧 설정

### playwright.config.ts

주요 설정:
- `baseURL`: 테스트 대상 URL
- `timeout`: 테스트 타임아웃
- `retries`: 재시도 횟수 (CI에서 2회)
- `workers`: 병렬 실행 워커 수
- `projects`: 브라우저 및 디바이스 설정

### 환경 변수

```bash
# 테스트 대상 URL 변경
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000 npm run test:e2e
```

## 📚 추가 자료

- [Playwright 공식 문서](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## ⚠️ 주의사항

1. **data-testid 추가 필요**: 실제 컴포넌트에 `data-testid`를 추가해야 테스트가 작동합니다.
2. **개발 서버 실행**: 테스트 실행 시 자동으로 개발 서버가 시작됩니다.
3. **디바운스 고려**: 검색 등 디바운스가 적용된 기능은 적절한 대기 시간을 추가하세요.
4. **병렬 실행**: 테스트는 기본적으로 병렬로 실행되므로 격리(isolation)를 유지하세요.
