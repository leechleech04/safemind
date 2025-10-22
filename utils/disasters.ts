export const naturalDisasters = {
  title: '자연재난',
  summary:
    '지진, 태풍, 폭우·폭설, 산불, 해일, 미세먼지·황사 등 기상·지질 변화로 인한 재난을 포괄합니다. 사전 대비–경보 이해–대피·응급 대응–피해 복구까지 즉시 실행 가능한 핵심 가이드를 제공합니다.',
  items: [
    {
      title: '지진',
      image: require('@/assets/images/disasters/earthquake.png'),
    },
    {
      title: '홍수',
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
      title: '미세먼지',
      image: require('@/assets/images/disasters/fineDust.png'),
    },
    {
      title: '황사',
      image: require('@/assets/images/disasters/yellowDust.png'),
    },
    { title: '폭염', image: require('@/assets/images/disasters/heatWave.png') },
    { title: '한파', image: require('@/assets/images/disasters/coldWave.png') },
    { title: '가뭄', image: require('@/assets/images/disasters/drought.png') },
    { title: '해일', image: require('@/assets/images/disasters/tsunami.png') },
    {
      title: '화산폭발',
      image: require('@/assets/images/disasters/volcano.png'),
    },
  ],
};

export const urbanDisasters = {
  title: '생활·도시 재난',
  summary:
    '화재, 정전·단수, 교통·철도·항공 사고, 가스 누출 등 도심 인프라와 일상 환경에서 발생하는 위험을 다룹니다. 초기 안전 수칙–현장 대응 순서–복구 절차를 간결한 체크리스트로 안내합니다.',
  items: [
    { title: '화재', image: require('@/assets/images/disasters/fire.png') },
    { title: '정전', image: require('@/assets/images/disasters/blackout.png') },
    { title: '단수', image: require('@/assets/images/disasters/outage.png') },
    {
      title: '교통사고',
      image: require('@/assets/images/disasters/carAccident.png'),
    },
    {
      title: '철도사고',
      image: require('@/assets/images/disasters/trainAccident.png'),
    },
    {
      title: '항공기사고',
      image: require('@/assets/images/disasters/aviationAccident.png'),
    },
    {
      title: '가스누출',
      image: require('@/assets/images/disasters/gasLeak.png'),
    },
  ],
};

export const socialDisasters = {
  title: '사회·보건 재난',
  summary:
    '감염병, 방사능 누출, 테러 위협, 전쟁 등 인위적·사회적 요인에 따른 고위험 상황을 포함합니다. 개인·지역사회의 예방–경보 대응–상황별 행동 요령–심리·의료 지원을 체계적으로 제공합니다.',
  items: [
    {
      title: '감염병',
      image: require('@/assets/images/disasters/infection.png'),
    },
    {
      title: '방사능누출',
      image: require('@/assets/images/disasters/radioactivity.png'),
    },
    {
      title: '테러위협',
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
    '통신 마비, 전력망 마비(배터리 방전 포함), 사이버테러 등에 따른 기술 인프라 중단 상황을 대상으로 합니다. 대체 수단 확보–업무 연속성 유지–우선순위 기반 복원 전략을 제시합니다.',
  items: [
    {
      title: '통신마비',
      image: require('@/assets/images/disasters/coommunicationParalysis.png'),
    },
    {
      title: '전력망마비',
      image: require('@/assets/images/disasters/powerParalysis.png'),
    },
  ],
};
