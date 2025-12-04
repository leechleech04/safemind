import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components/native';

interface AlertBannerPropsType {
  iconName: ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  title: string;
  children?: ReactNode;
}

const AlertBanner = ({
  iconName,
  iconColor,
  title,
  children,
}: AlertBannerPropsType) => {
  return (
    <AlertConatiner>
      <Ionicons name={iconName} size={28} color={iconColor} />
      <AlertTitle>{title}</AlertTitle>
      {children}
    </AlertConatiner>
  );
};

const AlertConatiner = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.darkGray};
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
`;

const AlertTitle = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  margin-left: 16px;
`;

const AlertContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: auto;
`;

export default AlertBanner;
