import { fetchWeather } from '@/api/weatherApi';
import { useQuery } from '@tanstack/react-query';

export const useWeatherQuery = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeather({ latitude, longitude }),
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
