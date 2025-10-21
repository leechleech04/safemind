import colors from '@/utils/colors';
import { Slot } from 'expo-router';
import styled from 'styled-components/native';

export default function RootLayout() {
  return (
    <Container>
      <Slot />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;
