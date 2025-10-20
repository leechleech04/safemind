import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const Tools = () => {
  return (
    <BasicContainer>
      <Text>Tools</Text>
    </BasicContainer>
  );
};

const Text = styled.Text`
  color: ${colors.white};
`;

export default Tools;
