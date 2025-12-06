import ManualDetailSection from '@/components/ManualDetailSection';
import ManualSectorButton from '@/components/ManualSectorButton';
import colors from '@/utils/colors';
import disasterDetails from '@/utils/disasterDetails';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView, Share } from 'react-native';
import styled from 'styled-components/native';

export type SectorType =
  | 'overview'
  | 'prevention'
  | 'during'
  | 'after'
  | 'references';

const SECTOR_CONFIG = [
  { name: 'overview' as SectorType, title: '개요' },
  { name: 'prevention' as SectorType, title: '사전 대비' },
  { name: 'during' as SectorType, title: '발생 시 행동 요령' },
  { name: 'after' as SectorType, title: '재난 후 행동 요령' },
  { name: 'references' as SectorType, title: '참고' },
];

const LEVEL_CONFIG = {
  1: { text: '주의', color: colors.yellow },
  2: { text: '경계', color: colors.orange },
  3: { text: '심각', color: colors.red },
} as const;

const ManualDetail = () => {
  const router = useRouter();
  const local = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const width = Dimensions.get('window').width;

  const [sector, setSector] = useState<SectorType>('overview');
  const [details, setDetails] = useState({
    overview: '',
    prevention: '',
    during: '',
    after: '',
    references: '',
    level: 1,
  });
  const [positions, setPositions] = useState<Record<SectorType, number>>({
    overview: 0,
    prevention: 0,
    during: 0,
    after: 0,
    references: 0,
  });

  useEffect(() => {
    const disasterData =
      disasterDetails[`${local.title}` as keyof typeof disasterDetails];

    if (disasterData) {
      setDetails({
        overview: disasterData.overview,
        prevention: disasterData.prevention,
        during: disasterData.during,
        after: disasterData.after,
        references: disasterData.references,
        level: disasterData.level,
      });
    }
  }, [local.title]);

  const handleLayout = (event: LayoutChangeEvent, section: SectorType) => {
    const { y } = event.nativeEvent.layout;
    setPositions((prev) => ({
      ...prev,
      [section]: y - 48,
    }));
  };

  const scrollToSection = (section: SectorType) => {
    const y = positions[section];
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  const handleShare = async () => {
    const shareContent = SECTOR_CONFIG.map(
      ({ name, title }) => `${title}\n${details[name]}`
    ).join('\n\n');

    await Share.share({
      title: `${local.title} 매뉴얼`,
      message: shareContent,
    });
  };

  useEffect(() => {
    scrollToSection(sector);
  }, [sector]);

  const levelInfo = LEVEL_CONFIG[details.level as keyof typeof LEVEL_CONFIG];

  return (
    <BasicContainer style={{ paddingBottom: 16 }}>
      <Header>
        <GoBackButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </GoBackButton>
        <Title>{local.title} 매뉴얼</Title>
        <ShareButton onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="white" />
        </ShareButton>
      </Header>
      <SectorNavigation style={{ width }}>
        {SECTOR_CONFIG.map(({ name }) => (
          <ManualSectorButton
            key={name}
            selected={sector === name}
            setSector={setSector}
            sectorName={name}
          />
        ))}
      </SectorNavigation>
      <ScrollContainer ref={scrollViewRef}>
        <LevelBox level={details.level}>
          <Ionicons name="warning" size={24} color={levelInfo.color} />
          <LevelText level={details.level}>
            위험 수준: {levelInfo.text}
          </LevelText>
        </LevelBox>
        {SECTOR_CONFIG.map(({ name, title }) => (
          <ManualDetailSection
            key={name}
            title={title}
            content={details[name]}
            sectorType={name}
            onLayout={handleLayout}
          />
        ))}
      </ScrollContainer>
    </BasicContainer>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

const GoBackButton = styled.Pressable`
  position: absolute;
  left: 8px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const ShareButton = styled.Pressable`
  position: absolute;
  right: 8px;
`;

const SectorNavigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  align-self: center;
  margin-top: 20px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const LevelBox = styled.View<{ level: number }>`
  flex-direction: row;
  background-color: ${({ level }: { level: number }) => {
    switch (level) {
      case 1:
        return colors.yellow + '22';
      case 2:
        return colors.orange + '22';
      case 3:
        return colors.red + '22';
    }
  }};
  border: 1px solid
    ${({ level }: { level: number }) => {
      switch (level) {
        case 1:
          return colors.yellow;
        case 2:
          return colors.orange;
        case 3:
          return colors.red;
      }
    }};
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

const LevelText = styled.Text<{ level: number }>`
  color: ${({ level }: { level: number }) => {
    switch (level) {
      case 1:
        return colors.yellow;
      case 2:
        return colors.orange;
      case 3:
        return colors.red;
    }
  }};
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

export default ManualDetail;
