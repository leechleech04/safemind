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
  }
  return null;
};
