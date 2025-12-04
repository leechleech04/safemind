import Header from '@/components/Header';
import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import AsyncStroage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

const Checklist = () => {
  interface ChecklistItemType {
    sectors: { name: String; items: { label: String; isChecked: Boolean }[] }[];
  }

  const [checklistItems, setChecklistItems] =
    useState<ChecklistItemType | null>(null);

  const [progressPercentage, setProgressPercentage] = useState(0);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  useEffect(() => {
    if (checklistItems) {
      let totalItems = 0;
      let checkedItems = 0;
      checklistItems.sectors.forEach((sector) => {
        sector.items.forEach((item) => {
          totalItems += 1;
          if (item.isChecked) {
            checkedItems += 1;
          }
        });
        const progress =
          totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);
        setProgressPercentage(progress);
      });
    }
  }, [checklistItems]);

  const handleToggleItem = async (sectorIndex: number, itemIndex: number) => {
    if (checklistItems) {
      const updatedChecklist = { ...checklistItems };
      updatedChecklist.sectors[sectorIndex].items[itemIndex].isChecked =
        !updatedChecklist.sectors[sectorIndex].items[itemIndex].isChecked;
      setChecklistItems(updatedChecklist);
      try {
        await AsyncStroage.setItem(
          '@safemind/checklist',
          JSON.stringify(updatedChecklist)
        );
      } catch (error) {
        console.error('Error saving checklist items:', error);
      }
    }
  };

  const handleDeleteItem = (sectorIndex: number, itemIndex: number) => {
    if (checklistItems) {
      Alert.alert(
        '항목 삭제',
        '정말로 이 항목을 삭제하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제',
            style: 'destructive',
            onPress: async () => {
              const updatedChecklist = { ...checklistItems };
              updatedChecklist.sectors[sectorIndex].items.splice(itemIndex, 1);
              setChecklistItems(updatedChecklist);
              try {
                await AsyncStroage.setItem(
                  '@safemind/checklist',
                  JSON.stringify(updatedChecklist)
                );
              } catch (error) {
                console.error('Error saving checklist items:', error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleAddItem = async () => {
    if (newItemLabel.trim() === '' || !checklistItems) {
      return;
    }
    const updatedChecklist = { ...checklistItems };
    updatedChecklist.sectors[updatedChecklist.sectors.length - 1].items.push({
      label: newItemLabel,
      isChecked: false,
    });
    setChecklistItems(updatedChecklist);
    setNewItemLabel('');
    setIsInputVisible(false);
    try {
      await AsyncStroage.setItem(
        '@safemind/checklist',
        JSON.stringify(updatedChecklist)
      );
    } catch (error) {
      console.error('Error saving checklist items:', error);
    }

    setIsInputFocused(false);
  };

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : process.env.EXPO_PUBLIC_BANNER_AD_UNIT_ID;

  const bannerRef = useRef<BannerAd>(null);

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
                <ItemCheckButton
                  onPress={() => handleToggleItem(sectorIndex, itemIndex)}
                >
                  <Ionicons
                    name={item.isChecked ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.isChecked ? colors.blue : colors.white}
                  />
                </ItemCheckButton>
                <ItemLabel isChecked={item.isChecked}>{item.label}</ItemLabel>
                <ItemDeleteButton
                  onPress={() => handleDeleteItem(sectorIndex, itemIndex)}
                >
                  <Ionicons name="trash-outline" size={24} color={colors.red} />
                </ItemDeleteButton>
              </ItemContainer>
            ))}
          </SectorContainer>
        ))}
        {isInputVisible ? (
          <AddItemInputContainer>
            <AddItemTextInput
              placeholder="추가할 항목을 입력하세요"
              placeholderTextColor={colors.lightGray}
              value={newItemLabel}
              onChangeText={setNewItemLabel}
              onFocus={() => {
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
              }}
              isFocused={isInputFocused}
            />
            <AddItemConfirmButton onPress={() => handleAddItem()}>
              <Ionicons name="add-outline" size={32} color={colors.blue} />
            </AddItemConfirmButton>
          </AddItemInputContainer>
        ) : (
          <AddItemButton
            onPress={() => {
              setIsInputVisible(true);
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.blue} />
            <AddItemText>직접 항목 추가하기</AddItemText>
          </AddItemButton>
        )}
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

const AddItemButton = styled.Pressable`
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

const AddItemInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const AddItemTextInput = styled.TextInput<{ isFocused: boolean }>`
  flex: 1;
  border-width: 1px;
  border-color: ${colors.gray};
  border-radius: 8px;
  padding: 12px;
  color: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? colors.black : colors.white};
  background-color: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? colors.white : colors.darkGray};
  font-size: 16px;
`;

const AddItemConfirmButton = styled.Pressable`
  border-radius: 8px;
  background-color: ${colors.blue + '22'};
  border: 2px solid ${colors.blue};
  margin-left: 12px;
`;

export default Checklist;
