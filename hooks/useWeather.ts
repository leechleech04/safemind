import { RootState } from '@/store';
import axios from 'axios';
import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';

interface WarningType {
  type: string;
  regions: string;
  image: ImageSourcePropType | null;
}

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

const useWeather = () => {
  const location = useSelector((state: RootState) => state.location);

  const [temperature, setTemperature] = useState<number | null>(null);
  const [precipitation, setPrecipitation] = useState<number | null>(null);
  const [perceivedTemperature, setPerceivedTemperature] = useState<
    number | null
  >(null);
  const [particularMatter, setParticularMatter] = useState<number | null>(null);
  const [warnings, setWarnings] = useState<WarningType[]>([]);

  const getBaseDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours < 2 || (hours === 2 && minutes < 10)) {
      date.setDate(date.getDate() - 1);
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}${month}${day}`;
  };

  const getBaseTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

    let baseTime = baseTimes[0];
    for (let i = baseTimes.length - 1; i >= 0; i--) {
      if (hours > baseTimes[i] || (hours === baseTimes[i] && minutes >= 10)) {
        baseTime = baseTimes[i];
        break;
      }
    }

    return ('0' + baseTime).slice(-2) + '00';
  };

  const latLonToGrid = (latitude: number, longitude: number) => {
    const map = {
      Re: 6371.00877, // 지도반경
      grid: 5.0, // 격자간격 (km)
      slat1: 30.0, // 표준위도 1
      slat2: 60.0, // 표준위도 2
      olon: 126.0, // 기준점 경도
      olat: 38.0, // 기준점 위도
      xo: 210 / 5.0, // 기준점 X좌표
      yo: 675 / 5.0, // 기준점 Y좌표
    };

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = map.Re / map.grid;
    const slat1 = map.slat1 * DEGRAD;
    const slat2 = map.slat2 * DEGRAD;
    const olon = map.olon * DEGRAD;
    const olat = map.olat * DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    //------------------------------
    // 0: 위경도 → x,y 변환
    //------------------------------
    let ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);

    let theta = longitude * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const x = Math.floor(ra * Math.sin(theta) + map.xo + 1.5);
    const y = Math.floor(ro - ra * Math.cos(theta) + map.yo + 1.5);

    return { x, y };
  };

  function getWindSpeedFromComponents(UUU: number, VVV: number) {
    const u = Number(UUU);
    const v = Number(VVV);

    if (!isFinite(u) || !isFinite(v)) return 0;

    const speed = Math.sqrt(u * u + v * v);
    return Math.round(speed * 10) / 10;
  }

  const calculatePerceivedTemperature = (
    temperature: number,
    windSpeed: number,
    humidity: number
  ) => {
    const T = Number(temperature);
    const V = Number(windSpeed);
    const R = Number(humidity);

    if (!isFinite(T)) return T;

    if (T <= 10 && V >= 4.8) {
      const vPow = Math.pow(V, 0.16);

      const windChill = 13.12 + 0.6215 * T - 11.37 * vPow + 0.3965 * T * vPow;

      return Math.round(windChill * 10) / 10;
    }

    if (T >= 27 && R >= 40) {
      const Tf = (T * 9) / 5 + 32;
      let HI =
        -42.379 +
        2.04901523 * Tf +
        10.14333127 * R -
        0.22475541 * Tf * R -
        0.00683783 * Tf * Tf -
        0.05481717 * R * R +
        0.00122874 * Tf * Tf * R +
        0.00085282 * Tf * R * R -
        0.00000199 * Tf * Tf * R * R;

      HI = ((HI - 32) * 5) / 9;

      return Math.round(HI * 10) / 10;
    }

    return Math.round(T * 10) / 10;
  };

  const getWeather = async () => {
    const { x, y } = latLonToGrid(location.latitude!, location.longitude!);
    try {
      const response = await axios.get(
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

      const tempItem = items.find((item: any) => item.category === 'TMP');
      if (tempItem) {
        setTemperature(parseFloat(tempItem.fcstValue));
      }

      const ptyItem = items.find((item: any) => item.category === 'PTY');
      if (ptyItem) {
        setPrecipitation(parseInt(ptyItem.fcstValue));
      }

      const rehItem = items.find((item: any) => item.category === 'REH');
      const uuuItem = items.find((item: any) => item.category === 'UUU');
      const vvvItem = items.find((item: any) => item.category === 'VVV');
      if (rehItem && uuuItem && vvvItem) {
        const humidity = parseFloat(rehItem.fcstValue);
        const windSpeed = getWindSpeedFromComponents(
          parseFloat(uuuItem.fcstValue),
          parseFloat(vvvItem.fcstValue)
        );
        const perceivedTemp = calculatePerceivedTemperature(
          parseFloat(tempItem.fcstValue),
          windSpeed,
          humidity
        );
        setPerceivedTemperature(perceivedTemp);
      }
    } catch (error) {
      console.error('날씨 정보 가져오기 실패:', error);
      throw error;
    }
  };

  const getParticularMatter = async () => {
    const url = `https://api.waqi.info/feed/geo:${location.latitude};${location.longitude}/`;

    try {
      const response = await axios.get(url, {
        params: {
          token: process.env.EXPO_PUBLIC_WAQI_TOKEN,
        },
      });
      if (response.data.status === 'ok') {
        const pm25 = response.data.data.iaqi.pm25.v;
        setParticularMatter(pm25);
      } else {
        console.error('미세먼지 정보 가져오기 실패: 응답 상태가 ok가 아님');
      }
    } catch (error) {
      console.error('미세먼지 정보 가져오기 실패:', error);
      throw error;
    }
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

  const getSpecialReport = async () => {
    const uri =
      'https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus';

    try {
      const response = await axios.get(uri, {
        params: {
          serviceKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
          pageNo: '1',
          numOfRows: '10',
          dataType: 'JSON',
        },
      });

      const report = response.data.response.body.items.item[0].t6;
      const parsedWarnings = parseWarnings(report);
      setWarnings(parsedWarnings);
    } catch (error) {
      console.error('특보 정보 가져오기 실패:', error);
      throw error;
    }
  };

  return {
    getWeather,
    getParticularMatter,
    getSpecialReport,
    temperature,
    setTemperature,
    precipitation,
    setPrecipitation,
    perceivedTemperature,
    setPerceivedTemperature,
    particularMatter,
    setParticularMatter,
    warnings,
    setWarnings,
  };
};

export default useWeather;
