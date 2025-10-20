import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const Settings = () => {
  return (
    <BasicContainer>
      <Text>Settings</Text>
    </BasicContainer>
  );
};

const Text = styled.Text`
  color: ${colors.white};
`;

export default Settings;
