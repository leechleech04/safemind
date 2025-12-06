import ManualItem from '@/components/ManualItem';
import colors from '@/utils/colors';
import {
  naturalDisasters,
  socialDisasters,
  techDisasters,
  urbanDisasters,
} from '@/utils/disasters';
import { BasicContainer } from '@/utils/utilComponents';
import { useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

interface DisasterType {
  title: string;
  summary: string;
  items: { title: string; image: ImageSourcePropType }[];
}

const Manual = () => {
  const [sector, setSector] = useState<'natural' | 'urban' | 'social' | 'tech'>(
    'natural'
  );

  const [disasterData, setDisasterData] = useState<DisasterType | null>(null);

  useEffect(() => {
    if (sector === 'natural') {
      setDisasterData(naturalDisasters);
    } else if (sector === 'urban') {
      setDisasterData(urbanDisasters);
    } else if (sector === 'social') {
      setDisasterData(socialDisasters);
    } else if (sector === 'tech') {
      setDisasterData(techDisasters);
    }
  }, [sector]);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : process.env.EXPO_PUBLIC_BANNER_AD_UNIT_ID;

  const bannerRef = useRef<BannerAd>(null);

  return (
    <BasicContainer>
      <Header>
        <HeaderTitle>재난 대응 매뉴얼</HeaderTitle>
      </Header>
      <SectorNavigation>
        <SectorButton
          selected={sector === 'natural'}
          onPress={() => setSector('natural')}
        >
          <SectorButtonText selected={sector === 'natural'}>
            자연재난
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'urban'}
          onPress={() => setSector('urban')}
        >
          <SectorButtonText selected={sector === 'urban'}>
            생활·도시
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'social'}
          onPress={() => setSector('social')}
        >
          <SectorButtonText selected={sector === 'social'}>
            사회·보건
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'tech'}
          onPress={() => setSector('tech')}
        >
          <SectorButtonText selected={sector === 'tech'}>
            기술·정보
          </SectorButtonText>
        </SectorButton>
      </SectorNavigation>
      <ManualList
        data={disasterData ? disasterData.items : []}
        keyExtractor={(item: DisasterType) => item.title}
        renderItem={({
          item,
        }: {
          item: { title: string; image: ImageSourcePropType };
        }) => <ManualItem title={item.title} image={item.image} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={() => {
          return disasterData ? (
            <SectorSummary>{disasterData.summary}</SectorSummary>
          ) : null;
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
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

const SectorNavigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  background-color: ${colors.darkGray};
  border-radius: 8px;
`;

const SectorButton = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  padding: 8px 0;
  border-radius: 8px;
  background-color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.red : colors.darkGray};
`;

const SectorButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.white : colors.lightGray};
  font-size: 14px;
  font-weight: bold;
`;

const SectorSummary = styled.Text`
  color: ${colors.lightGray};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`;

const ManualList = styled.FlatList`
  width: 100%;
  margin-top: 16px;
`;

export default Manual;
