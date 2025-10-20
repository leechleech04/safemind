import colors from '@/utils/colors';
import styled from 'styled-components/native';

const Tools = () => {
  return (
    <Container>
      <Text>Tools</Text>
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

export default Tools;
