import { getBaseDate, getBaseTime } from '@/utils/getDateTime';
import { latLonToGrid } from '@/utils/gridConverter';
import {
  calculatePerceivedTemperature,
  getWindSpeedFromComponents,
} from '@/utils/temperatureCalculator';
import axios from 'axios';
interface WeatherItemType {
  category: string;
  fcstValue: string;
}

interface WeatherResponseType {
  response: {
    body: {
      items: {
        item: WeatherItemType[];
      };
    };
  };
}

export const fetchWeather = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const { x, y } = latLonToGrid(latitude, longitude);
  const response = await axios.get<WeatherResponseType>(
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
    {
      params: {
        serviceKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
        pageNo: '1',
        numOfRows: '12',
        dataType: 'JSON',
        base_date: getBaseDate(),
        base_time: getBaseTime(),
        nx: x.toString(),
        ny: y.toString(),
      },
    }
  );

  const items = response.data.response.body.items.item;

  const tempItem = items.find(
    (item: WeatherItemType) => item.category === 'TMP'
  );
  const ptyItem = items.find(
    (item: WeatherItemType) => item.category === 'PTY'
  );
  const rehItem = items.find(
    (item: WeatherItemType) => item.category === 'REH'
  );
  const uuuItem = items.find(
    (item: WeatherItemType) => item.category === 'UUU'
  );
  const vvvItem = items.find(
    (item: WeatherItemType) => item.category === 'VVV'
  );
  const humidity = rehItem ? parseFloat(rehItem.fcstValue) : null;
  const windSpeed =
    uuuItem && vvvItem
      ? getWindSpeedFromComponents(
          parseFloat(uuuItem.fcstValue),
          parseFloat(vvvItem.fcstValue)
        )
      : null;

  return {
    temperature: tempItem ? parseFloat(tempItem.fcstValue) : null,
    precipitation: ptyItem ? parseInt(ptyItem.fcstValue) : null,
    perceivedTemperature:
      humidity && windSpeed && tempItem
        ? calculatePerceivedTemperature(
            parseFloat(tempItem.fcstValue),
            windSpeed,
            humidity
          )
        : null,
  };
};
