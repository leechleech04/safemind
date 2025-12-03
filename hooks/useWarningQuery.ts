import { fetchWarning } from '@/api/warning';
import { useQuery } from '@tanstack/react-query';

export const useWarningsQuery = () => {
  return useQuery({
    queryKey: ['warnings'],
    queryFn: fetchWarning,
    staleTime: 1000 * 60,
  });
};
