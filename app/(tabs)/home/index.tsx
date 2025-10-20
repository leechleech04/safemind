import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';

const Home = () => {
  return (
    <BasicContainer>
      <DisasterBox>
        <DisasterBoxTitle>🔔 재난 알림</DisasterBoxTitle>
        <DisasterTitle>🌪️ 태풍 '가온' 북상 중</DisasterTitle>
        <DisasterContent>
          - 최대 풍속: 42m/s
          {'\n'}- 예상 강수량: 250mm
          {'\n'}- 이동 속도: 시속 35km 북진
        </DisasterContent>
        <MoreManualContainer>
          <DisasterTitle>📘 대비 매뉴얼</DisasterTitle>
          <MoreManualButton>
            <MoreManualButtonText>[자세히 ▶︎]</MoreManualButtonText>
          </MoreManualButton>
        </MoreManualContainer>
        <DisasterContent>
          - 실외 활동 금지
          {'\n'}- 유리창에 테이프 부착
          {'\n'}- 배수구 및 하수구 점검
        </DisasterContent>
      </DisasterBox>
      <WeatherBox>
        <WeatherBoxTitle>🌤 현재 날씨</WeatherBoxTitle>
        <WeatherTitle>서울특별시 [🌧️]</WeatherTitle>
        <WeatherContent>
          - 기온: 28°C
          {'\n'}- 습도: 92% / 풍속: 20m/s
          {'\n'}- 미세먼지: 좋음
        </WeatherContent>
      </WeatherBox>
      <WarningCard
        horizontal
        showHorizontalScrollIndicator={false}
        data={[
          { id: '1', title: '태풍 경보', emoji: '🌪️' },
          { id: '2', title: '호우주의보', emoji: '🌧️' },
          { id: '3', title: '강풍주의보', emoji: '💨' },
        ]}
        renderItem={({
          item,
        }: {
          item: { id: string; title: string; emoji: string };
        }) => (
          <WarningCardItem>
            <WarningCardItemEmoji>{item.emoji}</WarningCardItemEmoji>
            <WarningCardItemTitle>{item.title}</WarningCardItemTitle>
          </WarningCardItem>
        )}
        keyExtractor={(item: { id: string }) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </BasicContainer>
  );
};

const DisasterBox = styled.View`
  width: 100%;
  background-color: ${colors.blue};
  padding: 12px;
  border-radius: 8px;
`;

const DisasterBoxTitle = styled.Text`
  color: ${colors.white};
  font-size: 24px;
  font-weight: bold;
`;

const DisasterTitle = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

const DisasterContent = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  line-height: 28px;
  font-weight: bold;
  margin-top: 8px;
`;

const MoreManualContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const MoreManualButton = styled.Pressable`
  margin-left: 8px;
`;

const MoreManualButtonText = styled.Text`
  color: ${colors.gray};
  font-size: 16px;
  font-weight: bold;
`;

const WeatherBox = styled.View`
  width: 100%;
  background-color: ${colors.yellow};
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
`;

const WeatherBoxTitle = styled.Text`
  color: ${colors.black};
  font-size: 24px;
  font-weight: bold;
`;

const WeatherTitle = styled.Text`
  color: ${colors.black};
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

const WeatherContent = styled.Text`
  color: ${colors.black};
  font-size: 18px;
  line-height: 28px;
  font-weight: bold;
  margin-top: 8px;
`;

const WarningCard = styled(FlatList)`
  width: 100%;
  margin-top: 16px;
  flex-direction: row;
`;

const WarningCardItem = styled.View`
  padding: 8px;
  border-radius: 8px;
  background-color: ${colors.red};
  align-items: center;
  justify-content: center;
`;

const WarningCardItemEmoji = styled.Text`
  font-size: 36px;
`;

const WarningCardItemTitle = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

export default Home;
