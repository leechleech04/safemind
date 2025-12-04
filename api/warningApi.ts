import axios from 'axios';
import { ImageSourcePropType } from 'react-native';

interface WarningType {
  type: string;
  regions: string;
  image: ImageSourcePropType | null;
}

export const fetchWarning = async () => {
  const uri = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus';

  const response = await axios.get(uri, {
    params: {
      serviceKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      pageNo: '1',
      numOfRows: '10',
      dataType: 'JSON',
    },
  });

  const report = response.data.response.body.items.item[0].t6;
  if (report) {
    const parsedWarnings = parseWarnings(report);
    return parsedWarnings;
  }
  return [];
};

const parseWarnings = (warningText: string): WarningType[] => {
  if (warningText === 'o 없음') {
    return [];
  }

  const warnings = warningText
    .split('\r\n')
    .filter((line) => line.trim().startsWith('o'))
    .map((line) => {
      const match = line.match(/o\s*([^:]+)\s*:\s*(.+)/);
      if (match) {
        const type = match[1].trim();
        const regions = match[2].trim();
        const image = warningImages[type] || null;
        return { type, regions, image };
      }
      return null;
    })
    .filter((w): w is WarningType => w !== null);

  return warnings;
};

const warningImages: {
  [key: string]: ImageSourcePropType;
} = {
  강풍주의보: require('../assets/images/disasters/strongWind.png'),
  강풍경보: require('../assets/images/disasters/strongWind.png'),
  호우주의보: require('../assets/images/disasters/flood.png'),
  호우경보: require('../assets/images/disasters/flood.png'),
  한파주의보: require('../assets/images/disasters/coldWave.png'),
  한파경보: require('../assets/images/disasters/coldWave.png'),
  건조주의보: require('../assets/images/disasters/drought.png'),
  건조경보: require('../assets/images/disasters/drought.png'),
  폭풍해일주의보: require('../assets/images/disasters/tsunami.png'),
  폭풍해일경보: require('../assets/images/disasters/tsunami.png'),
  풍랑주의보: require('../assets/images/disasters/tsunami.png'),
  풍랑경보: require('../assets/images/disasters/tsunami.png'),
  태풍주의보: require('../assets/images/disasters/typhoon.png'),
  태풍경보: require('../assets/images/disasters/typhoon.png'),
  대설주의보: require('../assets/images/disasters/heavySnow.png'),
  대설경보: require('../assets/images/disasters/heavySnow.png'),
  황사주의보: require('../assets/images/disasters/yellowDust.png'),
  황사경보: require('../assets/images/disasters/yellowDust.png'),
  폭염주의보: require('../assets/images/disasters/heatWave.png'),
  폭염경보: require('../assets/images/disasters/heatWave.png'),
};
