import ReduxProvider from '@/ReduxProvider';
import { assets } from '@/utils/assets';
import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { default as AsyncStroage } from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Asset } from 'expo-asset';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

const RootLayout = () => {
  const [queryClient] = useState(() => new QueryClient());

  const preloadImages = () => {
    return Asset.loadAsync(assets);
  };

  useEffect(() => {
    const load = async () => {
      await Ionicons.loadFont();
      await preloadImages();
      await SplashScreen.hideAsync();
    };
    load();
  }, []);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => {
        console.log('AdMob initialized');
      });
  }, []);

  useEffect(() => {
    const setChecklistItems = async () => {
      try {
        // await AsyncStorage.removeItem('@safemind/checklist');
        const response = await AsyncStroage.getItem('@safemind/checklist');
        if (!response) {
          const defaultChecklist = {
            sectors: [
              {
                name: '생존 필수품',
                items: [
                  {
                    label: '식수',
                    isChecked: false,
                  },
                  {
                    label: '비상식량(즉석밥, 통조림, 에너지바 등)',
                    isChecked: false,
                  },
                  {
                    label: '보조배터리',
                    isChecked: false,
                  },
                  {
                    label: '손전등/헤드램프 + 예비건전지',
                    isChecked: false,
                  },
                  {
                    label: '휴대 라디오',
                    isChecked: false,
                  },
                  {
                    label: '멀티툴',
                    isChecked: false,
                  },
                  {
                    label: '현금 소액',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '응급·의약품',
                items: [
                  {
                    label: '개인 복용약',
                    isChecked: false,
                  },
                  {
                    label: '소독제·거즈·붕대·밴드·테이프',
                    isChecked: false,
                  },
                  {
                    label: '진통/해열·지사제·항히스타민',
                    isChecked: false,
                  },
                  {
                    label: '체온계',
                    isChecked: false,
                  },
                  {
                    label: '일회용 장갑',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '위생·보호',
                items: [
                  {
                    label: 'KF94 마스크',
                    isChecked: false,
                  },
                  {
                    label: '손 소독제·물티슈',
                    isChecked: false,
                  },
                  {
                    label: '위생백·휴지',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '도구·정비/취사',
                items: [
                  {
                    label: '가스버너 + 부탄',
                    isChecked: false,
                  },
                  {
                    label: '라이터/방수 성냥',
                    isChecked: false,
                  },
                  {
                    label: '접이 컵·수저·물통',
                    isChecked: false,
                  },
                  {
                    label: '미니 공구·덕트테이프·케이블타이',
                    isChecked: false,
                  },
                  {
                    label: '호루라기·방수포·로프',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '의복·보온',
                items: [
                  {
                    label: '보온포/담요',
                    isChecked: false,
                  },
                  {
                    label: '여벌 속옷/양말',
                    isChecked: false,
                  },
                  {
                    label: '장갑(작업/보온), 모자, 튼튼한 신발',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '통신·정보·문서',
                items: [
                  {
                    label: '비상 연락망 카드',
                    isChecked: false,
                  },
                  {
                    label: '신분증·등본 사본(방수팩)',
                    isChecked: false,
                  },
                  {
                    label: '오프라인 지도·나침반',
                    isChecked: false,
                  },
                ],
              },
              {
                name: '기타',
                items: [],
              },
            ],
          };
          await AsyncStroage.setItem(
            '@safemind/checklist',
            JSON.stringify(defaultChecklist)
          );
        }
      } catch (error) {
        console.error('Error setting default checklist items:', error);
      }
    };

    setChecklistItems();
  }, []);

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Slot />
        </Container>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

export default RootLayout;
