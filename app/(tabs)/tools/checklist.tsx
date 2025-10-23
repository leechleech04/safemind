import Header from '@/components/Header';
import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import AsyncStroage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Checklist = () => {
  interface ChecklistItemType {
    sectors: { name: String; items: { label: String; isChecked: Boolean }[] }[];
  }

  const [checklistItems, setChecklistItems] =
    useState<ChecklistItemType | null>(null);

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const getChecklistItems = async () => {
      try {
        const response = await AsyncStroage.getItem('@safemind/checklist');
        if (response) {
          const parsedResponse = JSON.parse(response);
          setChecklistItems(parsedResponse);
        } else {
          console.log('No checklist items found in storage.');
        }
      } catch (error) {
        console.error('Error retrieving checklist items:', error);
      }
    };

    getChecklistItems();
  }, []);

  return (
    <BasicContainer>
      <Header title="비상용품 체크리스트" />
      <ProgressTextContainer>
        <ProgressText>진행률</ProgressText>
        <ProgressPercentageText>{progressPercentage}%</ProgressPercentageText>
      </ProgressTextContainer>
      <ProgressBarContainer>
        <ProgressBarFill progress={progressPercentage} />
      </ProgressBarContainer>
      <ScrollContainer>
        {checklistItems?.sectors.map((sector, sectorIndex) => (
          <SectorContainer key={sectorIndex}>
            <SectorTitle>{sector.name}</SectorTitle>
            {sector.items.map((item, itemIndex) => (
              <ItemContainer key={itemIndex}>
                <ItemCheckButton>
                  <Ionicons
                    name={item.isChecked ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.isChecked ? colors.blue : colors.white}
                  />
                </ItemCheckButton>
                <ItemLabel isChecked={item.isChecked}>{item.label}</ItemLabel>
                <ItemDeleteButton>
                  <Ionicons name="trash-outline" size={24} color={colors.red} />
                </ItemDeleteButton>
              </ItemContainer>
            ))}
          </SectorContainer>
        ))}
        <AddItemContainer>
          <Ionicons name="add-circle-outline" size={24} color={colors.blue} />
          <AddItemText>직접 항목 추가하기</AddItemText>
        </AddItemContainer>
      </ScrollContainer>
    </BasicContainer>
  );
};

const ProgressTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

const ProgressText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

const ProgressPercentageText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const ProgressBarContainer = styled.View`
  height: 10px;
  width: 100%;
  background-color: ${colors.blue + '22'};
  border-radius: 5px;
  margin-top: 16px;
  margin-bottom: 12px;
`;

const ProgressBarFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${({ progress }: { progress: number }) => progress}%;
  background-color: ${colors.blue};
  border-radius: 5px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const SectorContainer = styled.View`
  margin-top: 32px;
`;

const SectorTitle = styled.Text`
  color: ${colors.white};
  font-size: 22px;
  font-weight: bold;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

const ItemCheckButton = styled.Pressable``;

const ItemLabel = styled.Text<{ isChecked: boolean }>`
  color: ${({ isChecked }: { isChecked: boolean }) =>
    isChecked ? colors.lightGray : colors.white};
  font-size: 16px;
  margin-left: 12px;
`;

const ItemDeleteButton = styled.Pressable`
  margin-left: auto;
`;

const AddItemContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  border-top-width: 0.5px;
  border-top-color: ${colors.blue};
  padding-top: 12px;
`;

const AddItemText = styled.Text`
  color: ${colors.lightGray};
  font-size: 16px;
  margin-left: 12px;
`;

export default Checklist;
