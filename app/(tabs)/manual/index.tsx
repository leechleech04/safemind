import DisasterItem from '@/components/DisasterItem';
import colors from '@/utils/colors';
import {
  naturalDisasters,
  socialDisasters,
  techDisasters,
  urbanDisasters,
} from '@/utils/disasters';
import { BasicContainer } from '@/utils/utilComponents';
import { useEffect, useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import styled from 'styled-components/native';

const Manual = () => {
  const [selectedSection, setSelectedSection] = useState<
    'natural' | 'urban' | 'social' | 'tech'
  >('natural');

  const [disasterData, setDisasterData] = useState<
    {
      title: string;
      imageUri: ImageSourcePropType;
    }[]
  >([]);

  useEffect(() => {
    if (selectedSection === 'natural') {
      setDisasterData(naturalDisasters.items);
    } else if (selectedSection === 'urban') {
      setDisasterData(urbanDisasters.items);
    } else if (selectedSection === 'social') {
      setDisasterData(socialDisasters.items);
    } else if (selectedSection === 'tech') {
      setDisasterData(techDisasters.items);
    }
  }, [selectedSection]);

  return (
    <BasicContainer>
      <SectionNav>
        <SectionButton
          isSelected={selectedSection === 'natural'}
          onPress={() => setSelectedSection('natural')}
        >
          <SectionButtonText>자연</SectionButtonText>
        </SectionButton>
        <View style={{ width: 1, height: 20, backgroundColor: colors.white }} />
        <SectionButton
          isSelected={selectedSection === 'urban'}
          onPress={() => setSelectedSection('urban')}
        >
          <SectionButtonText>생활·도시</SectionButtonText>
        </SectionButton>
        <View style={{ width: 1, height: 20, backgroundColor: colors.white }} />
        <SectionButton
          isSelected={selectedSection === 'social'}
          onPress={() => setSelectedSection('social')}
        >
          <SectionButtonText>사회·보건</SectionButtonText>
        </SectionButton>
        <View style={{ width: 1, height: 20, backgroundColor: colors.white }} />
        <SectionButton
          isSelected={selectedSection === 'tech'}
          onPress={() => setSelectedSection('tech')}
        >
          <SectionButtonText>기술·정보</SectionButtonText>
        </SectionButton>
      </SectionNav>
      <DisasterList
        data={disasterData}
        renderItem={({
          item,
        }: {
          item: { title: string; imageUri: ImageSourcePropType };
        }) => <DisasterItem title={item.title} imageUri={item.imageUri} />}
        keyExtractor={({ title }: { title: string }) => title}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </BasicContainer>
  );
};

const SectionNav = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${colors.darkGray};
  padding: 12px 0;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionButton = styled.Pressable<{ isSelected: boolean }>`
  border-bottom-width: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? '2px' : '0px'};
  border-bottom-color: ${colors.white};
`;

const SectionButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const DisasterList = styled.FlatList``;

export default Manual;
