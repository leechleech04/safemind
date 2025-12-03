import axios from 'axios';

export const fetchParticularMatter = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const url = `https://api.waqi.info/feed/geo:${latitude};${longitude}/`;

  const response = await axios.get(url, {
    params: {
      token: process.env.EXPO_PUBLIC_WAQI_TOKEN,
    },
  });
  if (response.data.status === 'ok') {
    const pm25 = response.data.data.iaqi.pm25.v;
    return pm25;
  } else {
    console.error('미세먼지 정보 가져오기 실패: 응답 상태가 ok가 아님');
    return null;
  }
};
