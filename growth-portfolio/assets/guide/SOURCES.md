# 포트폴리오 가이드

## 로봇 이미지

- 생성일: 2026.11.04
- 생성 방식: 내장 image_gen 도구. 투명 배경 PNG를 생성했습니다.
- 최종 웹 에셋: `growth-portfolio/assets/guide/growth-guide-robot.webp` (512px, 투명 알파 유지)
- 프로젝트 내 원본: `output/imagegen/portfolio-guide-robot.png` (로컬 보관, 배포하지 않음)
- 리사이즈와 WebP 형식 변환만 적용했으며 이미지 내용은 합성·편집하지 않았습니다.

프롬프트:

Use case: stylized-concept. Asset type: website chatbot avatar, isolated transparent cutout. Primary request: a friendly 3D clay robot portfolio guide for a Korean UX/UI-based growth marketer resume. Match a muted forest-green (#185b49), sage green and warm ivory professional portfolio. A single charming small robot with a rounded ivory head, dark forest-green face panel, two warm mint eyes and a subtle friendly smile, sage-green rounded body, short soft clay arms and feet. One arm gives a welcoming wave, the other holds a small ivory tablet with a simple raised green upward growth chart (three bars and a small arrow; no text or numbers). A tiny rounded antenna. Premium matte sculpted clay with tactile softness and restrained detail, soft diffuse studio light, subtle ambient shadow. Three-quarter front view, full body, centered square composition with generous padding, clear silhouette recognizable at 56px. Genuinely transparent background with alpha. No scene, floor plane, lettering, words, logos or watermark. Friendly and polished, suitable for a professional resume; no shiny metal, neon, photorealism or flat vector style.

## 답변과 기능 범위

- `portfolio-guide.js`: 현재 공개 이력서의 내용을 바탕으로 직접 구성한 18개 항목별 요약과 관련 섹션 링크.
- 질문 선택 또는 키워드가 포함된 직접 입력으로 해당 요약을 안내합니다. 페이지 밖의 사실을 새로 생성하는 LLM 서비스는 아닙니다.
- 사용자 입력을 HTML로 실행하지 않으며, 외부 API로 전송하거나 영구 저장하지 않습니다.
- 블로그·기업 리뉴얼의 집계, GPTers 13명 인터뷰, 실제 제작 경험과 향후 DB·A/B 테스트 운영 계획을 구분했습니다. 확인되지 않은 성과·기간·연봉·SQL 숙련도는 추가하지 않았습니다.
- 질문 분류와 키워드가 맞지 않는 경우 항목 선택을 안내합니다. 이력서 내용이 변경되면 이 파일의 요약도 함께 갱신해야 합니다.
- 키보드 열기·닫기, Escape, 포커스 복귀, 비모달 대화 영역, 모바일 크기, 인쇄 시 숨김을 지원합니다.
