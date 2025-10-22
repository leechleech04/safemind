import colors from '@/utils/colors';
import {
  naturalDisasters,
  socialDisasters,
  techDisasters,
  urbanDisasters,
} from '@/utils/disasters';
import { BasicContainer } from '@/utils/utilComponents';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const Manual = () => {
  const [sector, setSector] = useState<'natural' | 'urban' | 'social' | 'tech'>(
    'natural'
  );

  const [disasterData, setDisasterData] = useState<{
    title: string;
    summary: string;
    items: { title: string; image: ImageSourcePropType }[];
  } | null>(null);

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
      {disasterData && (
        <>
          <SectorSummary>{disasterData.summary}</SectorSummary>
        </>
      )}
    </BasicContainer>
  );
};

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
  margin-top: 16px;
`;

export default Manual;
