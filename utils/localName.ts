import axios from 'axios';

export const getLocalName = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const geocodeUrl = `https://nominatim.openstreetmap.org/reverse`;

  try {
    const response = await axios.get(geocodeUrl, {
      params: {
        lat: latitude.toString(),
        lon: longitude.toString(),
        format: 'json',
      },
      headers: {
        'User-Agent': 'safemind-app (leechleech04@gmail.com)',
      },
    });
    const data = response.data;
    const localName =
      data.address?.city +
      ' ' +
      data.address?.borough +
      ' ' +
      data.address?.suburb;
    if (!localName.trim()) {
      return data.address?.contry || 'Unknown Location';
    }
    return localName;
  } catch (error) {
    console.error('Error fetching local name:', error);
    return 'Unknown Location';
  }
};
