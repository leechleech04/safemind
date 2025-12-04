import { fetchWarning } from '@/api/warningApi';
import { useQuery } from '@tanstack/react-query';

export const useWarningQuery = () => {
  return useQuery({
    queryKey: ['warnings'],
    queryFn: fetchWarning,
    staleTime: 1000 * 60,
  });
};
