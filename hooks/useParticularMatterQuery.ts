import { fetchParticularMatter } from '@/api/particularMatter';
import { useQuery } from '@tanstack/react-query';

export const useParticularMatter = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ['pm25', latitude, longitude],
    queryFn: () => fetchParticularMatter({ latitude, longitude }),
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 10,
  });
};
