import { SectorType } from '@/app/(tabs)/manual/[title]';
import colors from '@/utils/colors';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';

interface ManualSectorButtonPropsType {
  selected: boolean;
  setSector: Dispatch<SetStateAction<SectorType>>;
  sectorName: SectorType;
}

const ManualSectorButton = ({
  selected,
  setSector,
  sectorName,
}: ManualSectorButtonPropsType) => {
  return (
    <SectorButton
      selected={selected}
      onPress={() => {
        setSector(sectorName);
      }}
    >
      <SectorButtonText selected={selected}>
        {sectorName === 'overview'
          ? '개요'
          : sectorName === 'prevention'
          ? '사전 대비'
          : sectorName === 'during'
          ? '발생 시'
          : sectorName === 'after'
          ? '재난 후'
          : '참고'}
      </SectorButtonText>
    </SectorButton>
  );
};

const SectorButton = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  align-items: center;
`;

const SectorButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.white : colors.lightGray};
  padding: 12px 8px;
  border-bottom-width: ${({ selected }: { selected: boolean }) =>
    selected ? '3px' : '0px'};
  border-bottom-color: ${colors.blue};
  font-size: 14px;
  font-weight: bold;
`;

export default ManualSectorButton;
