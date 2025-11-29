import { RootState } from '@/store';
import colors from '@/utils/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const Map = () => {
  const location = useSelector((state: RootState) => state.location);

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude || 37.78825,
          longitude: location.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

export default Map;
