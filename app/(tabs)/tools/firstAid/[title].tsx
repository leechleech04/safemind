import Header from '@/components/Header';
import colors from '@/utils/colors';
import firstAids from '@/utils/firstAids';
import { BasicContainer } from '@/utils/utilComponents';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const firstAidDetail = () => {
  interface FirstAidType {
    title: string;
    subTitle: string;
    image: ImageSourcePropType;
    manuals: { step: number; stepTitle: string; text: string }[];
  }

  const { title } = useLocalSearchParams();

  const [data, setData] = useState<FirstAidType | null>(null);

  useEffect(() => {
    setData(firstAids.find((aid) => aid.title === title) || null);
  }, []);

  return (
    <BasicContainer>
      <Header title={title as string} />
      <ScrollContainer>
        <ImageContainer>
          <Image source={data?.image} style={{ tintColor: colors.black }} />
        </ImageContainer>
        <SubTitle>{data?.subTitle}</SubTitle>
        {data &&
          data.manuals.map(
            (manual: { step: number; stepTitle: string; text: string }) => (
              <StepContainer key={manual.step}>
                <StepHeader>
                  <StepNumberCircle>
                    <StepNumber>{manual.step}</StepNumber>
                  </StepNumberCircle>
                  <StepTitle>{manual.stepTitle}</StepTitle>
                </StepHeader>
                <StepText>{manual.text}</StepText>
              </StepContainer>
            )
          )}
      </ScrollContainer>
    </BasicContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ImageContainer = styled.View`
  width: 100%;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 16px;
`;

const Image = styled.Image`
  width: 240px;
  height: 240px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  color: ${colors.lightGray};
  margin: 16px 0;
`;

const StepContainer = styled.View``;

const StepHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StepNumberCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.yellow};
  justify-content: center;
  align-items: center;
`;

const StepNumber = styled.Text`
  font-size: 16px;
  color: ${colors.black};
  font-weight: bold;
`;

const StepTitle = styled.Text`
  margin-left: 12px;
  font-size: 18px;
  color: ${colors.white};
  font-weight: bold;
`;

const StepText = styled.Text`
  font-size: 16px;
  line-height: 28px;
  color: ${colors.white};
  margin-top: 8px;
  margin-left: 16px;
  padding-left: 28px;
  padding-bottom: 12px;
  border-left-width: 2px;
  border-left-color: ${colors.gray};
`;

export default firstAidDetail;
