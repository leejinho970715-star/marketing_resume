'use strict';

// Curated summaries of the public resume. Keep evidence and future plans separate.
// No external model, user-input transmission, or persistent chat storage is used.
(() => {
  const root = document.querySelector('.portfolio-guide');
  if (!root) return;
  const launcher = root.querySelector('.guide-launcher');
  const panel = root.querySelector('.guide-panel');
  const closeButton = root.querySelector('.guide-close');
  const resetButton = root.querySelector('.guide-reset');
  const select = root.querySelector('.guide-select');
  const log = root.querySelector('.guide-log');
  const form = root.querySelector('.guide-form');
  const input = root.querySelector('.guide-input');
  const send = root.querySelector('.guide-send');
  const avatar = launcher.querySelector('img').getAttribute('src');
  function updateViewport() {
    const viewport = window.visualViewport;
    const height = viewport && viewport.scale === 1 ? viewport.height : window.innerHeight;
    const inset = viewport && viewport.scale === 1 && !panel.hidden ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
    root.style.setProperty('--guide-viewport-height', `${height}px`);
    root.style.setProperty('--guide-keyboard-inset', `${inset}px`);
  }
  const topics = [
    {
      id: 'overview', title: '핵심 역량', question: '어떤 강점을 가진 지원자인가요?',
      aliases: ['핵심역량', '강점', '장점', '어떤사람', '지원자소개', '자기소개', '한눈에', '전체요약', '요약해', '디자인가능한마케터', '왜그로스', '경쟁력'],
      lead: 'UX/UI를 바탕으로 콘텐츠와 웹을 직접 만들고, 고객 반응을 살피며 개선하는 그로스 마케터를 지향합니다.',
      points: ['UX/UI 기획·디자인과 웹 화면 구현을 함께 수행합니다.', '블로그 운영과 기업 웹 리뉴얼의 전후 지표를 살핀 경험이 있습니다.', '사용자 인터뷰와 고객 소통을 제작·개선 방향에 연결합니다.'],
      sections: [['main', '메인 소개 보기'], ['experience', '경력·도구 보기']], follow: ['blog', 'gpters'],
    },
    {
      id: 'blog', title: '블로그 성장', question: '블로그 16.2배 성장은 어떤 의미인가요?',
      aliases: ['블로그', '162배', '162x', '조회수', '3771', '233', '일과삶의디자인', '디자인일기장', '검색유입', '군정보'],
      lead: '블로그 월간 조회수가 2026년 9월 233회에서 10월 3,771회로 늘어, 전월의 약 16.2배가 되었습니다.',
      points: ['디자인 소식에서 청년 정책·군 관련 정보까지 콘텐츠 주제를 넓혔습니다.', '통계 회고에서 10월 조회수 상위 5개 글이 모두 군 관련 정보임을 확인했습니다.', '군 보직·입영 정보의 후속 글과 관련 글 연결을 보강하는 방향을 정했습니다.'],
      note: '발행량·주제·게시 시점이 함께 변했습니다. 특정 주제나 SEO만의 효과, 매출 성장으로 단정한 수치는 아닙니다.',
      sections: [['blog', '블로그 운영 사례 보기']], follow: ['evidence', 'next'],
    },
    {
      id: 'ione', title: '기업 리뉴얼 성과', question: '아이원소프트뱅크 리뉴얼은 무엇을 개선했나요?',
      aliases: ['아이원소프트뱅크', '소프트뱅크', '기업리뉴얼', '리뉴얼성과', '문의율', '180', '재방문율90', '로딩시간', '화질', '확대뷰', 'jsp'],
      lead: '제품 이미지와 설명의 정확도, 검색 접근성, 상담 전 진단 경험을 함께 개선한 실무 프로젝트입니다.',
      points: ['이미지 업스케일링·확대 뷰, 설명에 맞는 화면과 국·영문 제품명을 적용했습니다.', '반복 콘텐츠를 줄이고 메타태그와 ERP 가상 컨설팅 체크리스트를 구성했습니다.', '2026년 9월 대비 10월 집계: 제품 문의율 약 +50%, 방문 유입률 +180%, 재방문율 +90%, 평균 로딩시간 약 2초 감소.'],
      note: 'GA4·Search Console·관리자 고객 DB를 활용한 본인 제공 전후 집계입니다. 기준값·계산식·원본 보고서는 미첨부이며, 개별 기능의 인과 효과로 구분한 결과는 아닙니다.',
      sections: [['ione-renewal', '리뉴얼·BEFORE / AFTER 보기']], follow: ['customer-data', 'seo'],
    },
    {
      id: 'gpters', title: 'GPTers 인터뷰', question: 'GPTers에서 인터뷰로 무엇을 발견했나요?',
      aliases: ['gpters', '지피터스', '지피터즈', '13명', '사용자인터뷰', '인터뷰', '리서치', '가독성', '정보구조', '정체성'],
      lead: 'GPTers 개인 리뉴얼에서 사용자 13명을 직접 인터뷰하고, 이용을 시작하기 전에 겪는 이해의 어려움을 정리했습니다.',
      points: ['주요 문제는 낮은 가독성, 복잡한 정보 구조·레이아웃, 한눈에 와닿지 않는 사이트 정체성이었습니다.', '정보 위계와 첫 화면의 가치 전달을 정리하고, 역할별 AI 사례 탐색·스터디 참여 동선을 기획했습니다.', '인터뷰·리서치부터 UX/UI와 웹 제작까지 수행했습니다.'],
      note: '리뉴얼 후 전환율 개선을 실측한 사례는 아닙니다. 사례 클릭·신청·재방문 지표는 후속 검증 계획입니다.',
      sections: [['gpters', '13명 인터뷰 사례 보기']], follow: ['nseoul', 'evidence'],
    },
    {
      id: 'nseoul', title: 'N서울타워 팀 프로젝트', question: 'N서울타워 팀 프로젝트에서 어떤 역할을 했나요?',
      aliases: ['n서울타워', 'nseoul', '엔서울', '서울타워', '팀프로젝트', '팀장', 'n패스', '프로토타입평가'],
      lead: 'KDT 팀 프로젝트에서 팀장·PM, UX 기획과 일부 디자인·개발을 맡았습니다.',
      points: ['현장 조사와 인터뷰·리뷰를 토대로 정보 탐색과 방문 여정의 문제를 정리했습니다.', '음식점 페이지 디자인·개발, 인트로 개발, 문서·일정 관리와 평가 정리·발표에 참여했습니다.', '팀 보고서의 프로토타입 평가를 바탕으로 CTA·N패스·재방문 콘텐츠의 추가 개선 과제를 살폈습니다.'],
      note: '팀의 조사·평가 기록과 본인 역할을 구분합니다. 실제 예약률·매출·재방문율 상승을 측정한 결과는 아닙니다.',
      sections: [['nseoul', '팀 프로젝트·평가 보기']], follow: ['gpters', 'archive'],
    },
    {
      id: 'b2b', title: 'B2B 제작 경험', question: 'B2B 고객 여정과 연결되는 제작 경험은 무엇인가요?',
      aliases: ['b2b', '기업고객', '고객여정', '영업지원', '제안서', '회사소개서', '라이브러리', '이음스퀘어', '디지털웨어'],
      lead: '기업 웹·진단 도구·제안 자료·CRM 화면을 제작한 경험을 고객 여정 관점으로 연결했습니다.',
      points: ['제품 이해: 기업 홈페이지 UX/UI와 화면 개발.', '상황 진단·상담 준비: AX/DX·ERP 체크리스트와 회사소개서·PMS 제안서·제안서 라이브러리.', '후속 관리: CRM 디자인 시스템과 UI 리뉴얼·화면 개발.'],
      note: '각 제작물을 하나의 여정으로 해석한 설명입니다. 전체 도구가 실제로 자동 연동된 퍼널이라는 뜻은 아닙니다.',
      sections: [['b2b', '고객 여정별 제작물 보기']], follow: ['customer-data', 'crm'],
    },
    {
      id: 'customer-data', title: '고객 DB 활용 방향', question: 'ERP·AX/DX 진단 고객 DB는 어떻게 활용할 계획인가요?',
      aliases: ['고객db', '고객데이터', '데이터가공', '데이터수집', '관리자페이지', '체크리스트', 'erp진단', 'axdx', '자가진단', '세그먼트', '중복제거', '리드'],
      lead: '진단 웹 제작 경험을 바탕으로 고객 DB를 수집 → 정리·가공 → 과제별 분류 → 상담·콘텐츠 개선에 활용하는 운영 방향을 제안합니다.',
      points: ['진단 응답·결과·신청일·상담 동의 등 필요한 수집 항목을 설계합니다.', '중복·누락값과 표기를 정리하고, 관심 업무·진단 결과·도입 검토 단계로 분류합니다.', '상담 질문과 제안 자료를 준비하고, 반복되는 업무 과제는 FAQ·랜딩·콘텐츠 주제에 반영합니다.'],
      note: '운영 확장 제안입니다. 자동 수집·분류·CRM 연동을 모두 운영했다는 의미는 아닙니다.',
      sections: [['customer-data', '고객 DB 활용 제안 보기']], follow: ['crm', 'next'],
    },
    {
      id: 'crm', title: 'CRM 구현과 운영 범위', question: 'CRM은 실제 운영했나요, 화면을 제작했나요?',
      aliases: ['crm', '디자인시스템', '고객관리', '리드관리', '영업화면'],
      lead: 'CRM 디자인 시스템 설계와 UI 리뉴얼·화면 개발 경험을 소개하고 있습니다.',
      points: ['리드·활동·유입 정보 등 고객 대응에 필요한 정보를 확인하는 화면을 설계했습니다.', '문의 출처·진행 단계·다음 연락 일정을 연결해 후속 관리를 지원하는 방향을 제안합니다.'],
      note: '현재 포트폴리오의 CRM 화면은 샘플 데이터 기반입니다. 실제 운영 데이터 연동과 자동화는 추가 과제이며, 화면의 리드 수·계약 금액은 사업 성과가 아닙니다.',
      sections: [['b2b', 'CRM 제작 범위 보기'], ['customer-data', '운영 확장 방향 보기']], follow: ['customer-data', 'evidence'],
    },
    {
      id: 'seo', title: 'SEO·GEO 역량', question: 'SEO·GEO와 검색 등록은 어떤 경험이 있나요?',
      aliases: ['seo', 'geo', '메타태그', '메타정보', '검색등록', '서치콘솔', 'searchconsole', '사이트맵', '색인', '크롤러', '검색최적화', 'ogimage'],
      lead: 'HTML 메타태그와 정보 구조를 작성하고, Google Search Console에서 사이트맵 제출·색인 요청을 직접 진행한 경험이 있습니다.',
      points: ['title·description·canonical, 시맨틱 HTML과 OG 공유 미리보기를 구성합니다.', 'sitemap.xml·robots.txt·내부 링크 등 검색 접근성을 고려합니다.', '명확한 제목·핵심 설명·출처·질문에 답하는 콘텐츠 구조로 AI 검색을 고려한 웹을 설계합니다.'],
      note: '검색 순위나 생성형 AI의 인용을 보장하는 역량으로 설명하지 않습니다. GEO는 콘텐츠·접근성 설계 관점으로 소개합니다.',
      sections: [['search-optimization', 'SEO·GEO 경험 보기'], ['ione-renewal', '실제 메타태그 근거 보기']], follow: ['ione', 'blog'],
    },
    {
      id: 'ads', title: '광고 게재·보고서', question: '광고 관련 도구는 어떤 범위까지 다룰 수 있나요?',
      aliases: ['광고', '애드센스', 'adsense', '애드핏', 'adfit', '애드포스트', 'adpost', '광고코드', '광고수익', '구글애즈', 'googleads'],
      lead: 'Google AdSense·카카오 애드핏·네이버 애드포스트의 광고 게재 설정과 제공되는 성과 보고서 확인 역량을 소개합니다.',
      points: ['AdSense·AdFit: 사이트 광고코드 적용, 게재 상태와 노출·클릭·수익 확인.', 'AdPost: 미디어 등록, 광고 노출 설정과 노출·클릭·수입 보고서 확인.'],
      note: '광고를 게재하는 매체 운영 역량입니다. Google Ads·Meta 등의 광고주 예산 집행이나 ROAS 개선 실적으로 제시한 내용은 아닙니다.',
      sections: [['ads-operations', '광고 게재 역량 보기']], follow: ['campaigns', 'evidence'],
    },
    {
      id: 'campaigns', title: '콘텐츠·캠페인', question: '콘텐츠 제작과 지금 어디에어 캠페인을 요약해 주세요.',
      aliases: ['캠페인', '에어비앤비', 'airbnb', '지금어디에어', '국토대장정', '콘텐츠제작', '뉴스레터', '숏츠', '홍보물', '엘케이브라더스'],
      lead: '실무 홍보 콘텐츠 제작 경험과 교육 과정의 참여형 캠페인 기획을 구분해 소개합니다.',
      points: ['엘케이브라더스: 서비스 소개용 랜딩·뉴스레터·SNS 소재, 짧은 영상·썸네일 등을 제작했습니다.', '지금 어디에어: 국토대장정 여행자의 위치 인증·공유를 주변 숙소·체험 탐색과 이용 동기로 연결한 캠페인입니다.'],
      note: '에어비앤비 사례는 교육 팀 과제의 기획·목업입니다. 실제 캠페인 집행이나 예약 성과로 소개하지 않았습니다.',
      sections: [['campaigns', '콘텐츠·캠페인 보기'], ['airbnb-campaign', '지금 어디에어 자세히']], follow: ['archive', 'b2b'],
    },
    {
      id: 'experience', title: '경력·자격', question: '사회 경험과 보유 자격증을 알려 주세요.',
      aliases: ['경력', '사회경험', '자격증', '자격', 'kh', '취업매니저', '학원', '교육원', '상담일정', '사회조사분석사', '컴퓨터활용능력'],
      lead: '제품 디자인과 사람·기업을 연결하는 운영 경험을 바탕으로 실행·소통 역량을 소개합니다.',
      points: ['KH정보교육원 취업매니저 8개월: 수강생·강사 소통, 상담 일정·운영 계획, 취업·연계기업 관리, 컨설팅·교안 제작·특강 운영.', '엘케이브라더스 Web3·블록체인 디자이너 인턴, 아이원소프트뱅크 ERP·PMS·CRM 제품 디자이너 인턴 약 2개월.', '보유 자격: 사회조사분석사 2급, 컴퓨터활용능력 2급.'],
      sections: [['experience', '경력·교육·자격 보기']], follow: ['tools', 'overview'],
    },
    {
      id: 'tools', title: '실무 도구', question: '어떤 실무 도구를 사용하나요?',
      aliases: ['도구', '툴', 'tools', '피그마', 'figma', 'codex', '코덱스', 'claudecode', '클로드', 'grok', '그록', 'wbs', 'outlook', '캘린더'],
      lead: '기획·디자인·일정 관리와 AI를 활용한 콘텐츠·웹 제작에 다음 도구를 활용합니다.',
      points: ['기획·디자인·일정: WBS, Outlook, Google Calendar, Figma.', 'AI 제작 보조: Codex, Claude Code, Grok.', '검색·전후 지표 확인 경험: Google Search Console, GA4, 관리자 고객 DB.'],
      note: '도구 활용과 실제 사업 성과를 구분하며, 확인되지 않은 자동화 절감 시간이나 광고 성과를 추가하지 않았습니다.',
      sections: [['experience', '실무 도구 보기'], ['search-optimization', '검색 도구 경험 보기']], follow: ['seo', 'customer-data'],
    },
    {
      id: 'next', title: '입사 후 업무 방향', question: '입사 후 어떤 프로세스로 일할 계획인가요?',
      aliases: ['입사후', '앞으로', '업무프로세스', '프로세스', '업무계획', '반복개선', '가설', 'ab테스트', '에이비테스트', '실험', '그로스마케터목표'],
      lead: '데이터 수집 → 고객 행동 분석 → 문제 발견 → 개선 가설 수립 → A/B 테스트 실행 → 성과 측정 → 반복 개선의 흐름을 지향합니다.',
      points: ['블로그에서는 글마다 같은 관찰 기간의 반응과 관련 글 이동을 비교하는 작은 시도부터 시작합니다.', 'B2B에서는 고객 질문·요구사항을 기록하고, 문의 동선과 설명 자료를 개선하는 실행에 기여하고자 합니다.', '이벤트 수집·실험 방법을 더 익히고, 트래픽과 조건이 갖춰졌을 때 A/B 테스트를 적용할 계획입니다.'],
      note: '앞으로 확장할 업무 계획입니다. 이미 통제된 A/B 테스트를 완료한 실적으로 소개하지 않았습니다.',
      sections: [['next', '다음 실행 계획 보기']], follow: ['customer-data', 'evidence'],
    },
    {
      id: 'archive', title: '제작물 아카이브', question: '다른 개인 웹 작업은 어떻게 보면 되나요?',
      aliases: ['아카이브', '개인작업', '개인웹', '전체작업', '프로젝트목록', 'spaceworld', 'synapse', 'cloudlabs', 'unusual', 'unknown', 'connectlabs', 'emotionlabs', 'orbit', 'nova', 'haxlab', 'hexlab'],
      lead: '개인·팀·실무 16개 아카이브 항목은 디자인·콘텐츠 구성·웹 구현 역량을 보여주는 보조 자료로 정리했습니다.',
      points: ['대표 근거는 블로그 운영, 기업 웹 리뉴얼과 사용자 리서치 사례에 집중했습니다.', '일반 개인 웹 작업은 성장 실적이나 실제 고객 전환 성과로 확대하지 않았습니다.', '아래 버튼을 누르면 접힌 작업 아카이브를 펼쳐서 볼 수 있습니다.'],
      sections: [['archive', '작업 아카이브 펼쳐보기']], follow: ['gpters', 'ione'],
    },
    {
      id: 'evidence', title: '성과와 계획의 구분', question: '실제 수행한 경험과 향후 계획은 어떻게 구분되나요?',
      aliases: ['실제성과', '대표성과', '핵심성과', '실측', '성과요약', '어떤성과', '검증', '근거', '실제경험', '계획구분', '매출', 'roas', 'cac', 'sql', '예산'],
      lead: '직접 수행한 경험, 운영 집계, 앞으로 검증할 계획을 구분해 소개합니다.',
      points: ['운영 집계: 블로그 월간 통계, 본인이 제공한 기업 리뉴얼 전후 지표.', '수행 경험: GPTers 13명 인터뷰, UX/UI·웹·콘텐츠 제작, N서울타워 팀 조사·프로토타입 평가.', '확장 계획: DB 자동 분류·CRM 실데이터 연동, 이벤트 수집 고도화, 조건을 갖춘 A/B 테스트.'],
      note: 'ROAS·CAC·매출 기여, SQL 분석 숙련도 등을 입증하는 수치는 이 페이지에 제시되어 있지 않습니다.',
      sections: [['blog', '블로그 근거 보기'], ['ione-renewal', '리뉴얼 성과 범위 보기']], follow: ['gpters', 'next'],
    },
    {
      id: 'pdf', title: 'PDF 다운로드', question: 'PDF 이력서는 어디서 받을 수 있나요?',
      aliases: ['pdf', '다운로드', '인쇄', '저장', '문서파일'],
      lead: '상단의 PDF 다운로드 버튼에서 인쇄용 포트폴리오를 받을 수 있습니다. 아래 버튼으로도 바로 열 수 있습니다.',
      points: ['웹페이지의 대표 사례·경력·업무 방향을 정리한 정적 문서입니다.'],
      action: 'pdf', sections: [], follow: ['overview', 'contact'],
    },
    {
      id: 'contact', title: '연락처', question: '연락할 수 있는 이메일을 알려 주세요.',
      aliases: ['연락', '이메일', '메일', 'email', 'contact', '문의방법'],
      lead: '포트폴리오에 공개한 이메일은 leejinho970715@gmail.com 입니다.',
      points: ['아래 버튼을 누르면 사용 중인 메일 앱에서 새 메일을 작성할 수 있습니다.'],
      action: 'email', sections: [], follow: ['overview', 'pdf'],
    },
  ];
  const byId = new Map(topics.map(topic => [topic.id, topic]));
  const normalize = text => text.normalize('NFKC').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const scrollLog = node => {
    log.scrollTop = node ? node.getBoundingClientRect().top - log.getBoundingClientRect().top + log.scrollTop - 8 : log.scrollHeight;
  };
  function message(role) {
    const node = element('article', `guide-message guide-message--${role}`);
    node.setAttribute('aria-label', role === 'user' ? '나의 질문' : '포트폴리오 가이드 답변');
    log.append(node);
    while (log.children.length > 40) log.firstElementChild.remove();
    return node;
  }
  function questionButton(id) {
    const topic = byId.get(id);
    const button = element('button', 'guide-question', topic.title);
    button.type = 'button';
    button.addEventListener('click', () => answerTopic(id, true));
    return button;
  }
  function close(restoreFocus = true) {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', '포트폴리오 가이드 열기');
    updateViewport();
    if (restoreFocus) launcher.focus({ preventScroll: true });
  }
  function sectionLink(id, label) {
    const link = element('a', 'guide-source-link', `${label} ↗`);
    link.href = `#${id}`;
    link.addEventListener('click', () => {
      if (id === 'archive') document.querySelector('.archive-disclosure').open = true;
      close(false);
      window.ScrollTrigger?.refresh();
      requestAnimationFrame(() => {
        const section = document.getElementById(id);
        if (!section) return;
        const heading = section.querySelector('h1, h2') || section;
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      });
    });
    return link;
  }
  function answerTopic(id, showQuestion) {
    const topic = byId.get(id);
    if (!topic) return;
    if (showQuestion) message('user').append(element('p', '', topic.question));
    const node = message('assistant');
    node.append(element('h3', 'guide-message-title', topic.title));
    node.append(element('p', '', topic.lead));
    if (topic.points?.length) {
      const list = element('ul', 'guide-answer-list');
      topic.points.forEach(point => list.append(element('li', '', point)));
      node.append(list);
    }
    if (topic.note) node.append(element('p', 'guide-answer-note', topic.note));
    const links = element('div', 'guide-answer-links');
    topic.sections.forEach(([id, label]) => links.append(sectionLink(id, label)));
    if (topic.action) {
      const source = document.querySelector(topic.action === 'pdf' ? '.download' : '.closing a[href^="mailto:"]');
      const link = element('a', 'guide-source-link', topic.action === 'pdf' ? 'PDF 열기 ↗' : '이메일 작성 ↗');
      link.href = source.getAttribute('href');
      if (topic.action === 'pdf') { link.target = '_blank'; link.rel = 'noopener'; }
      links.append(link);
    }
    node.append(links);
    const follow = element('div', 'guide-followups');
    topic.follow.forEach(id => follow.append(questionButton(id)));
    node.append(follow);
    select.value = id;
    scrollLog(node);
  }
  function welcome() {
    log.replaceChildren();
    select.value = '';
    const node = message('assistant');
    node.classList.add('guide-welcome');
    const image = element('img', 'guide-welcome-avatar');
    image.src = avatar; image.alt = ''; image.width = 92; image.height = 92;
    node.append(image);
    node.append(element('h3', 'guide-message-title', '어떤 경험이 궁금하신가요?'));
    node.append(element('p', '', '이은규님의 포트폴리오를 항목별로 짧게 정리해 드려요. 질문을 선택하거나 직접 입력해 보세요.'));
    const questions = element('div', 'guide-welcome-questions');
    ['overview', 'blog', 'ione', 'gpters', 'customer-data', 'experience'].forEach(id => questions.append(questionButton(id)));
    node.append(questions);
    log.scrollTop = 0;
  }
  function findTopic(question) {
    const query = normalize(question);
    if (/연봉|생년월일|주민번호|전화번호|집주소|비밀번호|합격확률/.test(query)) return null;
    if (/^(안녕|반가|hello|hi$|도움말|사용법)/.test(query)) return byId.get('overview');
    const ranked = topics.map(topic => ({ topic, score: topic.aliases.reduce((score, alias) => {
      const word = normalize(alias);
      return query.includes(word) ? score + Math.max(2, Math.min(word.length, 12)) : score;
    }, 0) })).sort((a, b) => b.score - a.score);
    return ranked[0].score >= 2 ? ranked[0].topic : null;
  }
  topics.forEach(topic => {
    const option = element('option', '', topic.title);
    option.value = topic.id;
    select.append(option);
  });
  launcher.hidden = false;
  launcher.addEventListener('click', () => {
    if (!panel.hidden) { close(); return; }
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', '포트폴리오 가이드 닫기');
    updateViewport();
    input.focus({ preventScroll: true });
  });
  closeButton.addEventListener('click', () => close());
  resetButton.addEventListener('click', () => { welcome(); input.value = ''; send.disabled = true; input.focus(); });
  select.addEventListener('change', () => { if (select.value) answerTopic(select.value, true); });
  input.addEventListener('input', () => { send.disabled = !input.value.trim(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim().slice(0, 200);
    if (!question) return;
    input.value = ''; send.disabled = true;
    message('user').append(element('p', '', question));
    const topic = findTopic(question);
    if (topic) answerTopic(topic.id, false);
    else {
      const node = message('assistant');
      node.append(element('p', '', '그 내용은 공개된 이력서에서 확인하기 어려워요. 경험과 성과, 제작물, 앞으로의 업무 계획을 안내해 드릴 수 있습니다. 위의 항목 선택을 이용하거나 아래 질문을 골라주세요.'));
      const follow = element('div', 'guide-followups');
      ['overview', 'evidence', 'contact'].forEach(id => follow.append(questionButton(id)));
      node.append(follow); scrollLog(node);
    }
    input.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); close(); }
  });
  window.visualViewport?.addEventListener('resize', updateViewport);
  window.visualViewport?.addEventListener('scroll', updateViewport);
  window.addEventListener('resize', updateViewport);
  updateViewport();
  welcome();
})();
