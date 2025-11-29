import colors from './colors';

const tempWarningLevel = {
  normal: '좋음',
  attention: '주의',
  warning: '경고',
  danger: '위험',
};

export const getHeatWaveLevel = (temp: number) => {
  if (temp >= 35) return tempWarningLevel.danger;
  if (temp >= 33) return tempWarningLevel.warning;
  if (temp >= 32) return tempWarningLevel.attention;
  return tempWarningLevel.normal;
};

export const getColdWaveLevel = (temp: number) => {
  if (temp <= -15) return tempWarningLevel.danger;
  if (temp <= -10) return tempWarningLevel.warning;
  if (temp <= -5) return tempWarningLevel.attention;
  return tempWarningLevel.normal;
};

export const getWeatherIcon = (percipitationCode: number) => {
  switch (percipitationCode) {
    case 0:
      return { name: 'sunny-outline' as const, color: colors.yellow };
    case 1:
      return { name: 'rainy-outline' as const, color: colors.blue };
    case 2:
      return { name: 'cloudy-outline' as const, color: colors.gray };
    case 3:
      return { name: 'snow-outline' as const, color: colors.lightBlue };
    case 4:
      return { name: 'thunderstorm-outline' as const, color: colors.darkBlue };
    default:
      return { name: 'sunny-outline' as const, color: colors.yellow };
  }
};

export const getParticularMatterLevel = (pm25: number) => {
  if (pm25 <= 15) return '좋음';
  if (pm25 <= 35) return '보통';
  if (pm25 <= 75) return '나쁨';
  return '매우나쁨';
};
