import useWeather from '@/hooks/useWeather';
import { RootState } from '@/store';
import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import {
  getColdWaveLevel,
  getHeatWaveLevel,
  getParticularMatterLevel,
  getWeatherIcon,
} from '@/utils/weather';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

const Home = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log('location:', location.coords);
      dispatch({
        type: 'location/setLocation',
        payload: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    };
    getCurrentLocation();
  }, []);

  const {
    getWeather,
    getParticularMatter,
    temperature,
    setTemperature,
    precipitation,
    setPrecipitation,
    perceivedTemperature,
    setPerceivedTemperature,
    particularMatter,
    setParticularMatter,
  } = useWeather();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getWeather();
      getParticularMatter();
    }
  }, [location]);

  const weatherIcon = getWeatherIcon(precipitation ?? 0);

  return (
    <BasicContainer>
      <LocationHeader>
        <Ionicons name="location-outline" size={32} color="white" />
        <LocationText>서울시 동작구</LocationText>
      </LocationHeader>
      <ScrollContainer>
        <WariningBanner>
          <MoreManualsButton>
            <MoreManualsText>대응 매뉴얼 보기</MoreManualsText>
            <Ionicons
              name="chevron-forward-outline"
              size={28}
              color={colors.lightGray}
            />
          </MoreManualsButton>
          <Image
            source={require('@/assets/images/disasters/heatWave.png')}
            style={{ width: 160, height: 160 }}
          />
          <WarningTitle>현재 폭염주의보 발령 중</WarningTitle>
          <WarningContent>
            <WarningText>
              야외 활동을 자제하고 수분 섭취에 유의하세요.
            </WarningText>
            <Ionicons name="warning-outline" size={48} color={colors.red} />
          </WarningContent>
        </WariningBanner>
        <BannerTitle>현재 날씨</BannerTitle>
        <WeatherBanner>
          <TemparatureBox>
            {temperature ? (
              <TemparatureText>{temperature}°C</TemparatureText>
            ) : (
              <TemparatureText>--°C</TemparatureText>
            )}
            {perceivedTemperature ? (
              <ApparantTempratureText>
                체감 온도 {perceivedTemperature}°C
              </ApparantTempratureText>
            ) : (
              <ApparantTempratureText>체감 온도 --°C</ApparantTempratureText>
            )}
          </TemparatureBox>
          <Ionicons
            name="sunny-outline"
            size={80}
            color={colors.yellow}
            style={{ marginLeft: 'auto' }}
          />
        </WeatherBanner>
        <BannerTitle>주요 경보</BannerTitle>
        <AlertBanner>
          <Ionicons name="thermometer-outline" size={28} color={colors.red} />
          <AlertTitle>폭염</AlertTitle>
          <HeatWaveContent>
            {temperature ? getHeatWaveLevel(temperature) : '--'}
          </HeatWaveContent>
        </AlertBanner>
        <AlertBanner>
          <Ionicons name="snow-outline" size={28} color={colors.blue} />
          <AlertTitle>한파</AlertTitle>
          <ColdWaveContent>
            {temperature ? getColdWaveLevel(temperature) : '--'}
          </ColdWaveContent>
        </AlertBanner>
        <AlertBanner>
          <Ionicons name="business-outline" size={28} color={colors.orange} />
          <AlertTitle>미세먼지</AlertTitle>
          {particularMatter ? (
            <ParticularMatter>{particularMatter} ㎍/㎥</ParticularMatter>
          ) : (
            <ParticularMatter>-- ㎍/㎥</ParticularMatter>
          )}
          {particularMatter ? (
            <FineDustContent>
              {getParticularMatterLevel(particularMatter)}
            </FineDustContent>
          ) : (
            <FineDustContent>--</FineDustContent>
          )}
        </AlertBanner>
      </ScrollContainer>
    </BasicContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const LocationHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

const LocationText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  margin-left: 8px;
  font-weight: bold;
`;

const WariningBanner = styled.View`
  background-color: ${colors.red}22;
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
  width: 100%;
`;

const MoreManualsButton = styled.Pressable`
  position: absolute;
  right: 16px;
  top: 16px;
  flex-direction: row;
  align-items: center;
`;

const MoreManualsText = styled.Text`
  color: ${colors.lightGray};
  font-size: 16px;
  margin-right: 4px;
`;

const WarningTitle = styled.Text`
  color: ${colors.white};
  font-size: 24px;
  font-weight: bold;
`;

const WarningContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  margin-top: 4px;
`;

const WarningText = styled.Text`
  flex: 1;
  color: ${colors.lightGray};
  font-size: 16px;
`;

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

const AlertBanner = styled.View`
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

const HeatWaveContent = styled(AlertContent)`
  color: ${colors.red};
`;

const ColdWaveContent = styled(AlertContent)`
  color: ${colors.blue};
`;

const FineDustContent = styled(AlertContent)`
  color: ${colors.orange};
`;

const ParticularMatter = styled.Text`
  color: ${colors.lightGray};
  font-size: 16px;
  margin-left: 8px;
`;

export default Home;
