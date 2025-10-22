import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

const Tools = () => {
  const router = useRouter();

  const tools = [
    {
      title: '손전등',
      subtitle: '어두운 곳을 빠르게 비추기',
      image: require('@/assets/images/tools/flashlight.png'),
      onPress: () => router.push('/tools/flashlight'),
    },
    {
      title: '사이렌',
      subtitle: '긴급 상황 시 경고음 울리기',
      image: require('@/assets/images/tools/siren.png'),
      onPress: () => router.push('/tools/siren'),
    },
    {
      title: '비상물품',
      subtitle: '필수 비상물품 점검표',
      image: require('@/assets/images/tools/checklist.png'),
      onPress: () => router.push('/tools/checklist'),
    },
    {
      title: '응급처치',
      subtitle: '위급 상황별 응급처치법',
      image: require('@/assets/images/tools/firstAid.png'),
      onPress: () => router.push('/tools/firstAid'),
    },
    {
      title: '사고 트라우마',
      subtitle: '사고 후 심리 회복 가이드',
      image: require('@/assets/images/tools/trauma.png'),
      onPress: () => router.push('/tools/trauma'),
    },
    {
      title: '대피소 생활',
      subtitle: '대피소에서의 생활 안내',
      image: require('@/assets/images/tools/shelter.png'),
      onPress: () => router.push('/tools/shelter'),
    },
    {
      title: '위치 공유',
      subtitle: '긴급 상황 시 내 위치 알리기',
      image: require('@/assets/images/tools/locationShare.png'),
      onPress: () => router.push('/tools/locationShare'),
    },
    {
      title: '긴급 전화',
      subtitle: '긴급 연락처 빠르게 호출하기',
      image: require('@/assets/images/tools/emergencyContact.png'),
      onPress: () => router.push('/tools/emergencyContact'),
    },
  ];

  return (
    <BasicContainer>
      <ScrollContainer>
        <ToolContainer>
          {tools.map((tool, index) => (
            <ToolItemBox key={index} onPress={tool.onPress}>
              <ToolItemImage
                source={tool.image}
                resizeMode="contain"
                style={{ tintColor: colors.red }}
              />
              <ToolItemTitle>{tool.title}</ToolItemTitle>
              <ToolItemSubtitle>{tool.subtitle}</ToolItemSubtitle>
            </ToolItemBox>
          ))}
        </ToolContainer>
      </ScrollContainer>
    </BasicContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ToolContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px 0;
`;

const ToolItemBox = styled.Pressable`
  background-color: ${colors.gray};
  width: 160px;
  height: 160px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const ToolItemImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const ToolItemTitle = styled.Text`
  margin-top: 10px;
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const ToolItemSubtitle = styled.Text`
  margin-top: 4px;
  color: ${colors.lightGray};
  font-size: 12px;
  text-align: center;
`;

export default Tools;
