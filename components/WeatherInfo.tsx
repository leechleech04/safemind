import colors from '@/utils/colors';
import { getWeatherIcon } from '@/utils/weatherFormatter';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface WeatherInfoPropsType {
  weather?: {
    temperature: number | null;
    precipitation: number | null;
    perceivedTemperature: number | null;
  };
  isWeatherLoading: boolean;
}

const WeatherInfo = ({ weather, isWeatherLoading }: WeatherInfoPropsType) => {
  return (
    <>
      <BannerTitle>현재 날씨</BannerTitle>
      <WeatherBanner>
        <TemparatureBox>
          {weather && !isWeatherLoading ? (
            <>
              <TemparatureText>{weather.temperature}°C</TemparatureText>
              <ApparantTempratureText>
                체감 온도 {weather.perceivedTemperature}°C
              </ApparantTempratureText>
            </>
          ) : (
            <>
              <TemparatureText>--°C</TemparatureText>
              <ApparantTempratureText>체감 온도 --°C</ApparantTempratureText>
            </>
          )}
        </TemparatureBox>
        {weather ? (
          <Ionicons
            name={getWeatherIcon(weather.precipitation ?? 0).name}
            size={80}
            color={getWeatherIcon(weather.precipitation ?? 0).color}
            style={{ marginLeft: 'auto' }}
          />
        ) : (
          <ActivityIndicator
            style={{ marginLeft: 'auto' }}
            color={colors.red}
            size={'large'}
          />
        )}
      </WeatherBanner>
    </>
  );
};

const BannerTitle = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`;

const WeatherBanner = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.darkGray};
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
`;

const TemparatureBox = styled.View``;

const TemparatureText = styled.Text`
  color: ${colors.white};
  font-size: 36px;
  font-weight: bold;
`;

const ApparantTempratureText = styled.Text`
  color: ${colors.lightGray};
  font-size: 16px;
  margin-top: 4px;
`;

export default WeatherInfo;
