import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Container>
      <GoBackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </GoBackButton>
      <Title>{title}</Title>
      <View style={{ width: 24 }} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px 16px 8px;
`;

const GoBackButton = styled.Pressable`
  width: 24px;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

export default Header;
