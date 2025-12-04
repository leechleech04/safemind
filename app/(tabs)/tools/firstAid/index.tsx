import Header from '@/components/Header';
import colors from '@/utils/colors';
import firstAids from '@/utils/firstAids';
import { BasicContainer } from '@/utils/utilComponents';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

const FirstAid = () => {
  const router = useRouter();

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : process.env.EXPO_PUBLIC_BANNER_AD_UNIT_ID;

  const bannerRef = useRef<BannerAd>(null);

  return (
    <BasicContainer>
      <Header title="응급처치 가이드" />
      <FlatList
        ListHeaderComponent={
          <>
            <Title>무슨 상황인가요?</Title>
            <SubTitle>
              가장 유사한 상황을 선택하여 응급처치 방법을 확인하세요.
            </SubTitle>
          </>
        }
        data={firstAids}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <AidItem>
            <ImageContainer>
              <Image source={item.image} style={{ width: 160, height: 160 }} />
            </ImageContainer>
            <AidTitle>{item.title}</AidTitle>
            <AidSubTitle>{item.subTitle}</AidSubTitle>
            <AidButton
              onPress={() =>
                router.push({
                  pathname: '/tools/firstAid/[title]',
                  params: {
                    title: item.title,
                  },
                })
              }
            >
              <AidButtonText>자세히 보기</AidButtonText>
            </AidButton>
          </AidItem>
        )}
      />
      <BannerAdContainer>
        <BannerAd
          ref={bannerRef}
          unitId={adUnitId!}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </BannerAdContainer>
    </BasicContainer>
  );
};

const BannerAdContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
  margin-top: 32px;
  align-self: center;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  color: ${colors.lightGray};
  margin-top: 12px;
  align-self: center;
  text-align: center;
`;

const AidItem = styled.View`
  background-color: ${colors.darkGray};
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  padding-bottom: 16px;
`;

const ImageContainer = styled.View`
  width: 100%;
  padding: 16px 0;
  background-color: ${colors.blue + '22'};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const AidTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.white};
  margin-top: 16px;
  padding: 0 16px;
`;

const AidSubTitle = styled.Text`
  font-size: 16px;
  color: ${colors.lightGray};
  margin-top: 4px;
  padding: 0 16px;
`;

const AidButton = styled.Pressable`
  background-color: ${colors.blue};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 12px 16px 0 16px;
`;

const AidButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`;

export default FirstAid;
