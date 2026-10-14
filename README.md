# marketing_resume(이은규)

디자인과 웹 제작 경험을 바탕으로 마케팅팀에 기여하기 위한 업무 제안 페이지입니다.

배포 주소: https://leejinho970715-star.github.io/marketing_resume/

## 파일 구성

- `index.html`: GitHub Pages 시작 페이지
- `marketing-resume.html`: 동일한 내용을 담은 로컬 열람용 HTML
- `assets/`: 파비콘, 1200 × 630 공유 이미지, Pretendard 폰트와 라이선스
- `assets/marketing_resume.pdf`: 현재 이력서를 담은 다운로드용 A4 PDF

HTML과 `assets` 폴더를 같은 경로에 두면 인터넷 없이도 열람할 수 있습니다. 본문은 16px, 보조 문구는 최소 14px이며 모바일 화면과 인쇄에 맞춘 레이아웃을 포함합니다.

## 배포와 수정

GitHub Pages는 `main` 브랜치의 루트(`/`)를 사용합니다. `main`에 변경 사항을 푸시하면 배포됩니다. 내용을 수정할 때는 `index.html`과 `marketing-resume.html`을 동일하게 유지하세요.

상단과 소개 영역의 **PDF 다운로드** 버튼을 누르면 현재 내용을 담은 PDF가 저장됩니다. 하단의 인쇄 버튼으로 브라우저에서 직접 인쇄하거나 PDF로 저장할 수도 있습니다. 이력서 내용을 수정할 때는 다운로드용 PDF도 다시 생성해야 합니다.

공유 이미지 주소는 HTML의 `og:image`와 `twitter:image`에 설정되어 있습니다. 공유 서비스의 캐시에 따라 새 이미지가 반영되기까지 시간이 걸릴 수 있습니다.

폰트는 [Pretendard 공식 프로젝트](https://github.com/orioncactus/pretendard)에서 제공하는 v1.3.9 가변 폰트이며, 라이선스는 `assets/fonts/OFL-LICENSE.txt`에 포함했습니다.
