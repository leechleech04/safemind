export const naturalDisasters = {
  title: '자연재난',
  summary: '기상 및 지질 변화로 발생하는 자연 현상 중심',
  items: [
    { title: '지진', imageUri: require('@/assets/images/earthquake.png') },
    { title: '홍수/폭우', imageUri: require('@/assets/images/flood.png') },
    { title: '산불', imageUri: require('@/assets/images/wildfire.png') },
    { title: '폭설', imageUri: require('@/assets/images/heavySnow.png') },
    { title: '태풍', imageUri: require('@/assets/images/typhoon.png') },
    { title: '낙뢰', imageUri: require('@/assets/images/lightning.png') },
    {
      title: '황사/미세먼지',
      imageUri: require('@/assets/images/yellowDust.png'),
    },
    { title: '폭염', imageUri: require('@/assets/images/heatWave.png') },
    { title: '한파', imageUri: require('@/assets/images/coldWave.png') },
    { title: '가뭄', imageUri: require('@/assets/images/drought.png') },
    { title: '해일', imageUri: require('@/assets/images/tsunami.png') },
  ],
};

export const urbanDisasters = {
  title: '생활·도시 재난',
  summary: '도심 환경, 시설물, 교통 관련 사고',
  items: [
    { title: '화재', imageUri: require('@/assets/images/fire.png') },
    { title: '정전', imageUri: require('@/assets/images/blackout.png') },
    { title: '단수', imageUri: require('@/assets/images/outage.png') },
    { title: '교통사고', imageUri: require('@/assets/images/carAccident.png') },
    {
      title: '철도 사고',
      imageUri: require('@/assets/images/trainAccident.png'),
    },
    {
      title: '항공기 사고',
      imageUri: require('@/assets/images/aviationAccident.png'),
    },
    {
      title: '가스 누출/폭발',
      imageUri: require('@/assets/images/gasLeak.png'),
    },
  ],
};

export const socialDisasters = {
  title: '사회·보건 재난',
  summary: '인간 활동 및 사회적 요인에 의한 위기',
  items: [
    { title: '감염병', imageUri: require('@/assets/images/infection.png') },
    {
      title: '방사능 누출',
      imageUri: require('@/assets/images/radioactivity.png'),
    },
    {
      title: '테러 위협',
      imageUri: require('@/assets/images/explosive.png'),
    },
    {
      title: '전쟁',
      imageUri: require('@/assets/images/war.png'),
    },
  ],
};

export const techDisasters = {
  title: '기술·정보 재난',
  summary: '현대 기술 의존성에 따른 위기',
  items: [
    {
      title: '통신 마비',
      imageUri: require('@/assets/images/cyberAttack.png'),
    },
    {
      title: '전력망 마비',
      imageUri: require('@/assets/images/batteryDischarge.png'),
    },
  ],
};
