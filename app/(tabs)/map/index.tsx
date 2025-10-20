import colors from '@/utils/colors';
import styled from 'styled-components/native';

const Map = () => {
  return (
    <Container>
      <Text>Map</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

const Text = styled.Text`
  color: ${colors.white};
`;

export default Map;
