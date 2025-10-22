import ReduxProvider from '@/ReduxProvider';
import colors from '@/utils/colors';
import { Slot } from 'expo-router';
import styled from 'styled-components/native';

export default function RootLayout() {
  return (
    <ReduxProvider>
      <Container>
        <Slot />
      </Container>
    </ReduxProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;
