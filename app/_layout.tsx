import colors from '@/utils/colors';
import { useAssets } from 'expo-asset';
import { Slot } from 'expo-router';
import styled from 'styled-components/native';

export default function RootLayout() {
  const [assets, error] = useAssets([
    require('@/assets/images/earthquake.png'),
    require('@/assets/images/flood.png'),
    require('@/assets/images/wildfire.png'),
    require('@/assets/images/heavySnow.png'),
    require('@/assets/images/typhoon.png'),
    require('@/assets/images/lightning.png'),
    require('@/assets/images/yellowDust.png'),
    require('@/assets/images/heatWave.png'),
    require('@/assets/images/coldWave.png'),
    require('@/assets/images/drought.png'),
    require('@/assets/images/tsunami.png'),
    require('@/assets/images/fire.png'),
    require('@/assets/images/blackout.png'),
    require('@/assets/images/outage.png'),
    require('@/assets/images/carAccident.png'),
    require('@/assets/images/trainAccident.png'),
    require('@/assets/images/aviationAccident.png'),
    require('@/assets/images/gasLeak.png'),
    require('@/assets/images/infection.png'),
    require('@/assets/images/radioactivity.png'),
    require('@/assets/images/explosive.png'),
    require('@/assets/images/war.png'),
    require('@/assets/images/cyberAttack.png'),
    require('@/assets/images/batteryDischarge.png'),
  ]);

  if (!assets) {
    return null;
  }

  return (
    <Container>
      <Slot />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;
