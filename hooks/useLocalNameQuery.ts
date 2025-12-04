import { fetchLocalName } from '@/api/localNameApi';
import { useQuery } from '@tanstack/react-query';

export const useLocalNameQuery = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ['localName', latitude, longitude],
    queryFn: () => fetchLocalName({ latitude, longitude }),
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
