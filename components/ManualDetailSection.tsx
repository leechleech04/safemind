import { SectorType } from '@/app/(tabs)/manual/[title]';
import colors from '@/utils/colors';
import { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';

interface ManualSectionPropsType {
  title: string;
  content: string;
  sectorType: SectorType;
  onLayout: (event: LayoutChangeEvent, section: SectorType) => void;
}

const ManualDetailSection = ({
  title,
  content,
  sectorType,
  onLayout,
}: ManualSectionPropsType) => {
  return (
    <>
      <SectorTitle
        onLayout={(event: LayoutChangeEvent) => onLayout(event, sectorType)}
      >
        {title}
      </SectorTitle>
      <SectorContent>{content}</SectorContent>
    </>
  );
};

const SectorTitle = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
  margin-top: 48px;
`;

const SectorContent = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  line-height: 28px;
  margin-top: 24px;
  padding: 0px 8px;
`;

export default ManualDetailSection;
