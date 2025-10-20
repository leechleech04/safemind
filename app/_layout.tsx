import { Slot } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import colors from '@/utils/colors';
import styled from 'styled-components/native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
