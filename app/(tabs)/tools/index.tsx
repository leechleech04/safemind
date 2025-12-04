import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

const Tools = () => {
  const router = useRouter();

  const [flashOn, setFlashOn] = useState(false);
  const [permission, requsetPermission] = useCameraPermissions();

  const tools = [
    {
      title: '사이렌',
      subtitle: '긴급 상황 시 경고음 울리기',
      image: require('@/assets/images/tools/siren.png'),
      onPress: () => router.push('/tools/siren'),
    },
    {
      title: '비상물품',
      subtitle: '필수 비상물품 점검표',
      image: require('@/assets/images/tools/checklist.png'),
      onPress: () => router.push('/tools/checklist'),
    },
    {
      title: '응급처치',
      subtitle: '위급 상황별 응급처치법',
      image: require('@/assets/images/tools/firstAid.png'),
      onPress: () => router.push('/tools/firstAid'),
    },
  ];

  const flashlightToggle = () => {
    if (!permission?.granted) {
      requsetPermission();
      return;
    }
    setFlashOn(!flashOn);
  };

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : process.env.EXPO_PUBLIC_BANNER_AD_UNIT_ID;

  const bannerRef = useRef<BannerAd>(null);

  return (
    <BasicContainer>
      {flashOn && (
        <CameraView style={{ width: 0, height: 0 }} enableTorch={true} />
      )}
      <Header>
        <HeaderTitle>비상 도구함</HeaderTitle>
      </Header>
      <ScrollContainer>
        <ToolContainer>
          <FlashlightBox onPress={flashlightToggle} flashOn={flashOn}>
            <ToolItemImage
              source={require('@/assets/images/tools/flashlight.png')}
              resizeMode="contain"
              style={{ tintColor: flashOn ? colors.yellow : colors.red }}
            />
            <ToolItemTitle flashOn={flashOn}>손전등</ToolItemTitle>
            <ToolItemSubtitle flashOn={flashOn}>
              어두운 곳을 빠르게 비추기
            </ToolItemSubtitle>
          </FlashlightBox>
          {tools.map((tool, index) => (
            <ToolItemBox key={index} onPress={tool.onPress}>
              <ToolItemImage
                source={tool.image}
                resizeMode="contain"
                style={{ tintColor: colors.red }}
              />
              <ToolItemTitle>{tool.title}</ToolItemTitle>
              <ToolItemSubtitle>{tool.subtitle}</ToolItemSubtitle>
            </ToolItemBox>
          ))}
        </ToolContainer>
      </ScrollContainer>
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

const Header = styled.View`
  width: 100%;
  align-items: center;
  padding: 8px 0;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ToolContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px 0;
`;

const ToolItemBox = styled.Pressable`
  background-color: ${colors.darkGray};
  width: 160px;
  height: 160px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const ToolItemImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const ToolItemTitle = styled.Text`
  margin-top: 10px;
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const ToolItemSubtitle = styled.Text`
  margin-top: 4px;
  color: ${colors.lightGray};
  font-size: 12px;
  text-align: center;
`;

const FlashlightBox = styled(ToolItemBox)<{ flashOn: boolean }>`
  background-color: ${({ flashOn }: { flashOn: boolean }) =>
    flashOn ? `${colors.yellow}22` : colors.darkGray};
  border: 3px solid
    ${({ flashOn }: { flashOn: boolean }) =>
      flashOn ? colors.yellow : colors.darkGray};
`;

export default Tools;
