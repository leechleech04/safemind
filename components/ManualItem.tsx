import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const ManualItem = ({
  title,
  image,
}: {
  title: string;
  image: ImageSourcePropType;
}) => {
  const router = useRouter();

  return (
    <Container
      onPress={() =>
        router.push({
          pathname: '/manual/[title]',
          params: { title },
        })
      }
    >
      <ImageBox>
        <DisasterIcon source={image} style={{ tintColor: colors.red }} />
      </ImageBox>
      <Title>{title}</Title>
      <Ionicons
        name="chevron-forward"
        size={32}
        color={colors.lightGray}
        style={{ marginLeft: 'auto' }}
      />
    </Container>
  );
};

const Container = styled.Pressable`
  flex-direction: row;
  background-color: ${colors.darkGray};
  width: 100%;
  border-radius: 8px;
  align-items: center;
  padding: 16px;
`;

const ImageBox = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${colors.gray};
  align-items: center;
  justify-content: center;
`;

const DisasterIcon = styled(Image)`
  width: 40px;
  height: 40px;
`;

const Title = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  margin-left: 16px;
`;

export default ManualItem;
