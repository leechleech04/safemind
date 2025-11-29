import colors from '@/utils/colors';
import disasterDetails from '@/utils/disasterDetails';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView, Share } from 'react-native';
import styled from 'styled-components/native';

const ManualDetail = () => {
  const router = useRouter();
  const local = useLocalSearchParams();

  const [sector, setSector] = useState<
    'overview' | 'prevention' | 'during' | 'after' | 'references'
  >('overview');

  const [overview, setOverview] = useState<string>('');
  const [prevention, setPrevention] = useState<string>('');
  const [during, setDuring] = useState<string>('');
  const [after, setAfter] = useState<string>('');
  const [references, setReferences] = useState<string>('');

  const [level, setLevel] = useState<number>(1);

  const width = Dimensions.get('window').width;

  useEffect(() => {
    const details =
      disasterDetails[`${local.title}` as keyof typeof disasterDetails];
    setOverview(details?.overview);
    setPrevention(details?.prevention);
    setDuring(details?.during);
    setAfter(details?.after);
    setReferences(details?.references);
    setLevel(details?.level);
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);

  const [positions, setPositions] = useState({
    overview: 0,
    prevention: 0,
    during: 0,
    after: 0,
    references: 0,
  });

  const handleLayout = (
    event: LayoutChangeEvent,
    section: 'overview' | 'prevention' | 'during' | 'after' | 'references'
  ) => {
    const { y } = event.nativeEvent.layout;
    setPositions((prevPositions) => ({
      ...prevPositions,
      [section]: y - 48,
    }));
  };

  const scrollToSection = (section: string) => {
    const y = positions[section as keyof typeof positions];
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  useEffect(() => {
    scrollToSection(sector);
  }, [sector]);

  return (
    <BasicContainer>
      <Header>
        <GoBackButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </GoBackButton>
        <Title>{local.title} 매뉴얼</Title>
        <ShareButton
          onPress={() => {
            Share.share({
              title: `${local.title} 매뉴얼`,
              message: `개요\n${overview}\n\n사전 대비\n${prevention}\n\n발생 시 행동 요령\n${during}\n\n재난 후 행동 요령\n${after}\n\n참고\n${references}`,
            });
          }}
        >
          <Ionicons name="share-social" size={24} color="white" />
        </ShareButton>
      </Header>
      <SectorNavigation style={{ width: width }}>
        <SectorButton
          selected={sector === 'overview'}
          onPress={() => {
            setSector('overview');
          }}
        >
          <SectorButtonText selected={sector === 'overview'}>
            개요
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'prevention'}
          onPress={() => setSector('prevention')}
        >
          <SectorButtonText selected={sector === 'prevention'}>
            사전 대비
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'during'}
          onPress={() => setSector('during')}
        >
          <SectorButtonText selected={sector === 'during'}>
            발생 시
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'after'}
          onPress={() => setSector('after')}
        >
          <SectorButtonText selected={sector === 'after'}>
            재난 후
          </SectorButtonText>
        </SectorButton>
        <SectorButton
          selected={sector === 'references'}
          onPress={() => setSector('references')}
        >
          <SectorButtonText selected={sector === 'references'}>
            참고
          </SectorButtonText>
        </SectorButton>
      </SectorNavigation>
      <ScrollContainer ref={scrollViewRef}>
        <SectorTitle
          onLayout={(event: LayoutChangeEvent) =>
            handleLayout(event, 'overview')
          }
        >
          개요
        </SectorTitle>
        <SectorContent>{overview}</SectorContent>
        <LevelBox level={level}>
          <Ionicons
            name="warning"
            size={24}
            color={
              level === 1
                ? colors.yellow
                : level === 2
                ? colors.orange
                : colors.red
            }
          />
          <LevelText level={level}>
            위험 수준: {level === 1 ? '주의' : level === 2 ? '경계' : '심각'}
          </LevelText>
        </LevelBox>
        <SectorTitle
          onLayout={(event: LayoutChangeEvent) =>
            handleLayout(event, 'prevention')
          }
        >
          사전 대비
        </SectorTitle>
        <SectorContent>{prevention}</SectorContent>
        <SectorTitle
          onLayout={(event: LayoutChangeEvent) => handleLayout(event, 'during')}
        >
          발생 시 행동 요령
        </SectorTitle>
        <SectorContent>{during}</SectorContent>
        <SectorTitle
          onLayout={(event: LayoutChangeEvent) => handleLayout(event, 'after')}
        >
          재난 후 행동 요령
        </SectorTitle>
        <SectorContent>{after}</SectorContent>
        <SectorTitle
          onLayout={(event: LayoutChangeEvent) =>
            handleLayout(event, 'references')
          }
        >
          참고
        </SectorTitle>
        <SectorContent>{references}</SectorContent>
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

const SectorButton = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  align-items: center;
`;

const SectorButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.white : colors.lightGray};
  padding: 12px 8px;
  border-bottom-width: ${({ selected }: { selected: boolean }) =>
    selected ? '3px' : '0px'};
  border-bottom-color: ${colors.blue};
  font-size: 14px;
  font-weight: bold;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const SectorTitle = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
  margin-top: 48px;
`;

const SectorContent = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  line-height: 28px;
  margin-top: 24px;
  padding: 0px 8px;
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
