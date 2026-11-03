# Vercel 배포

`growth-portfolio`만 독립 사이트로 배포합니다. GitHub Pages의 기존 세 이력서 원본은 수정하지 않습니다.

```powershell
node deployment/prepare-vercel.mjs https://eungyu-growth-portfolio.vercel.app
vercel --cwd .preview/vercel-growth-portfolio --project eungyu-growth-portfolio --prod --yes
```

배포 주소: https://eungyu-growth-portfolio.vercel.app/

배포 대상 프로젝트를 `--project`로 명시합니다. 로그인 정보는 Git에 포함하지 않습니다. 다른 프로젝트로 배포할 때 Vercel이 다른 도메인을 배정했다면 해당 도메인으로 준비 명령을 다시 실행한 뒤 배포합니다.

준비 스크립트는 포트폴리오 HTML·CSS·JS, 공개 이미지·PDF, 공유 폰트·아이콘만 복사합니다. 로컬 `output/` 분석 자료는 포함하지 않습니다. 내부 자산 경로와 canonical·OG·구조화 데이터 주소를 Vercel 주소로 조정합니다.

## 한글 컴퓨터 이름이 있는 Windows

Vercel CLI 54.20.1 및 65.10.0에서 컴퓨터 이름을 OAuth User-Agent에 넣을 때 ByteString 오류가 발생할 수 있습니다. 아래 명령은 이 CLI 프로세스에서만 컴퓨터 이름을 퍼센트 인코딩합니다. 인증 절차나 시스템 컴퓨터 이름은 바꾸지 않습니다.

```powershell
node --require ./deployment/vercel-ascii-host.cjs "$env:APPDATA/npm/node_modules/vercel/dist/vc.js" --cwd .preview/vercel-growth-portfolio --project eungyu-growth-portfolio --prod --yes
```
