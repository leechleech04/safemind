export const naturalDisasters = {
  title: '자연재난',
  summary:
    '지진, 태풍, 폭우·폭설, 산불 등 기상·지질 변화로 발생하는 자연 현상에 따른 재난을 포괄하며, 사전 대비, 경보 이해, 대피·응급 대응, 피해 복구까지의 핵심 가이드를 제공합니다.',
  items: [
    {
      title: '지진',
      image: require('@/assets/images/disasters/earthquake.png'),
    },
    {
      title: '홍수/폭우',
      image: require('@/assets/images/disasters/flood.png'),
    },
    { title: '산불', image: require('@/assets/images/disasters/wildfire.png') },
    {
      title: '폭설',
      image: require('@/assets/images/disasters/heavySnow.png'),
    },
    { title: '태풍', image: require('@/assets/images/disasters/typhoon.png') },
    {
      title: '낙뢰',
      image: require('@/assets/images/disasters/lightning.png'),
    },
    {
      title: '황사/미세먼지',
      image: require('@/assets/images/disasters/yellowDust.png'),
    },
    { title: '폭염', image: require('@/assets/images/disasters/heatWave.png') },
    { title: '한파', image: require('@/assets/images/disasters/coldWave.png') },
    { title: '가뭄', image: require('@/assets/images/disasters/drought.png') },
    { title: '해일', image: require('@/assets/images/disasters/tsunami.png') },
  ],
};

export const urbanDisasters = {
  title: '생활·도시 재난',
  summary:
    '도심 인프라와 생활 시설, 교통 수단에서 발생하는 화재, 정전·단수, 교통·철도·항공 사고, 가스 누출/폭발 등 일상과 밀접한 재난을 다루며, 안전 수칙과 초기 대응, 복구 절차를 안내합니다.',
  items: [
    { title: '화재', image: require('@/assets/images/disasters/fire.png') },
    { title: '정전', image: require('@/assets/images/disasters/blackout.png') },
    { title: '단수', image: require('@/assets/images/disasters/outage.png') },
    {
      title: '교통사고',
      image: require('@/assets/images/disasters/carAccident.png'),
    },
    {
      title: '철도 사고',
      image: require('@/assets/images/disasters/trainAccident.png'),
    },
    {
      title: '항공기 사고',
      image: require('@/assets/images/disasters/aviationAccident.png'),
    },
    {
      title: '가스 누출/폭발',
      image: require('@/assets/images/disasters/gasLeak.png'),
    },
  ],
};

export const socialDisasters = {
  title: '사회·보건 재난',
  summary:
    '감염병 확산, 방사능 누출, 테러 위협, 전쟁 등 인간 활동과 사회·정치적 요인에서 비롯되는 재난을 포함하며, 개인·지역사회 차원의 예방, 경보 대응, 상황별 행동 요령을 제공합니다.',
  items: [
    {
      title: '감염병',
      image: require('@/assets/images/disasters/infection.png'),
    },
    {
      title: '방사능 누출',
      image: require('@/assets/images/disasters/radioactivity.png'),
    },
    {
      title: '테러 위협',
      image: require('@/assets/images/disasters/terrorism.png'),
    },
    {
      title: '전쟁',
      image: require('@/assets/images/disasters/war.png'),
    },
  ],
};

export const techDisasters = {
  title: '기술·정보 재난',
  summary:
    '통신 마비, 전력망 장애 등 현대 기술 인프라 의존성에서 발생하는 재난을 대상으로, 서비스 중단 시 대체 수단 확보, 업무 연속성 확보, 단계적 복원 전략을 제시합니다.',
  items: [
    {
      title: '통신 마비',
      image: require('@/assets/images/disasters/coommunicationParalysis.png'),
    },
    {
      title: '전력망 마비',
      image: require('@/assets/images/disasters/powerParalysis.png'),
    },
  ],
};
