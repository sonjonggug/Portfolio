# 손종국 · Portfolio

Live: https://sonjonggug.github.io/Portfolio/

채용 담당자가 소개 → 대표 프로젝트 → 경력 → 실제 제품 화면 순서로 읽을 수 있도록 구성한 정적 포트폴리오입니다. 프로젝트 전체 개요와 직접 담당한 업무를 구분했습니다.

## Run locally

Node.js 18 이상에서 설치 단계 없이 실행합니다.

```sh
npm run dev
npm run check
```

Preview: `http://127.0.0.1:4173/Portfolio/`. GitHub Pages는 `main`의 루트 파일을 그대로 제공합니다. 별도 빌드나 프레임워크 런타임은 없습니다.

## Content and assets

- 경력 및 소개: 사용자가 제공한 Notion 이력서, 2026-10-26 확인. 하나은행·CJ 푸드빌을 대표 프로젝트로 배치했습니다. 문화진흥원은 본인 담당인 문화여정 에이전트 범위만 기재했습니다.
- 리퍼: 사용자의 `reaper-app` 저장소 `store/raw/ko/home.png`, `store/raw/ko/store.png` 실제 화면. 공개 소개: https://reaper-app.pages.dev
- 쇼츠 도구: 사용자의 `ai-shorts-factory` 실제 프런트엔드와 테스트 fixture를 격리된 로컬 환경에서 표시한 스크린샷. 실제 계정이나 인증 정보를 포함하지 않으며, 페이지에 샘플 데이터임을 명시했습니다.
- 쇼츠 영상: 사용자가 소유한다고 확인한 YouTube `@생물콕` 채널의 공개 썸네일 3개. 각 액자에서 해당 영상으로 이동합니다. 동영상 ID: `UyBxCI8U2Oo`, `sYqbj_7lT18`, `-GwXad-eRDw`. 2026-10-26 확인.
- 책린지: 기존 `assets/img/portfolio/app_1.png` ~ `app_7.png` 7장 모두 보존하고 갤러리에 표시했습니다. 담당 영역은 백엔드입니다.
- 프로필: 기존 `assets/img/portfolio/profile.png`.
- 기업 프로젝트 구성도는 담당 기능을 설명하는 HTML 도식입니다. 실제 시스템 스크린샷으로 표시하지 않습니다.

## Files

- `index.html`: 콘텐츠, 구조, 이미지 및 링크
- `assets/css/portfolio.css`: 디자인, 반응형 레이아웃, 인쇄 스타일
- `assets/js/portfolio.js`: 모바일 메뉴, 이미지 갤러리, 인쇄 시 상세 업무 펼치기
- `scripts/check.mjs`: 로컬 이미지·앵커·갤러리 누락 검사

이미지 갤러리는 방향키와 Escape를 지원합니다. 브라우저 인쇄 / PDF 저장 시 상세 경력이 펼쳐지고, 종료 후 기존 상태로 돌아옵니다. 기존 vendor 자산은 보존하되 새 페이지에서는 불러오지 않습니다.
