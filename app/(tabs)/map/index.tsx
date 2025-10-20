import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const Map = () => {
  return (
    <BasicContainer>
      <Text>Map</Text>
    </BasicContainer>
  );
};

const Text = styled.Text`
  color: ${colors.white};
`;

export default Map;
