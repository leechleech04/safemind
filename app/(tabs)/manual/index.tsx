import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const Manual = () => {
  return (
    <BasicContainer>
      <Text>Manual</Text>
    </BasicContainer>
  );
};

const Text = styled.Text`
  color: ${colors.white};
`;

export default Manual;
