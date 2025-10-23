import colors from './colors';

export default {
  siren: {
    title: '긴급 사이렌',
    subTitle: '위급 상황에서 빠르게 주의를 끌고 구조 요청 시 사용하세요.',
    sirenSound: require('@/assets/sounds/policeSiren.mp3'),
    image: require('@/assets/images/siren/megaphone.png'),
    imageColor: colors.red,
  },
  alert: {
    title: '경고음',
    subTitle:
      '비상 상황이나 재난 경보 시 주변에 경고음을 울려 주의를 환기시키세요.',
    sirenSound: require('@/assets/sounds/alert.mp3'),
    image: require('@/assets/images/siren/warning.png'),
    imageColor: colors.yellow,
  },
  sos: {
    title: 'SOS 신호',
    subTitle:
      '국제적으로 통용되는 모스코드 SOS 패턴를 통해 도움을 요청할 때 사용하세요.',
    sirenSound: require('@/assets/sounds/sos.mp3'),
    image: require('@/assets/images/siren/sos.png'),
    imageColor: colors.blue,
  },
};
