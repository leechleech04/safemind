import Header from '@/components/Header';
import { BasicContainer } from '@/utils/utilComponents';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

const firstAidDetail = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();

  const [data, setData] = useState<any>(null);

  return (
    <BasicContainer>
      <Header title={title as string} />
    </BasicContainer>
  );
};

export default firstAidDetail;
