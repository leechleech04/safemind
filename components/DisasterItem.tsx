import colors from '@/utils/colors';
import { Image } from 'expo-image';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const DisasterItem = ({
  title,
  imageUri,
}: {
  title: string;
  imageUri: ImageSourcePropType;
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <DisasterImage source={imageUri} contentFit="contain" />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.darkGray};
  width: 100%;
  border-radius: 8px;
  align-items: center;
  padding-left: 24px;
  height: 80px;
  overflow: hidden;
`;

const Title = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
`;

const DisasterImage = styled(Image)`
  margin-left: auto;
  width: 160px;
  height: 160px;
`;

export default DisasterItem;
