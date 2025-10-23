import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Container>
      <GoBackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </GoBackButton>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.View`
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

export default Header;
