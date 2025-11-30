import useWeather from '@/hooks/useWeather';
import { RootState } from '@/store';
import colors from '@/utils/colors';
import { getLocalName } from '@/utils/localName';
import { BasicContainer } from '@/utils/utilComponents';
import {
  getColdWaveLevel,
  getHeatWaveLevel,
  getParticularMatterLevel,
} from '@/utils/weather';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { getWeatherIcon } from './../../../utils/weather';

const Home = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);
  const [localName, setLocalName] =
    useState<string>('위치 정보 불러오는 중...');

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const name = getLocalName(location.latitude, location.longitude);
      name.then((res) => setLocalName(res));
    }
  }, [location]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
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
    getSpecialReport,
    temperature,
    setTemperature,
    precipitation,
    setPrecipitation,
    perceivedTemperature,
    setPerceivedTemperature,
    particularMatter,
    setParticularMatter,
    warnings,
    setWarnings,
  } = useWeather();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getWeather();
      getParticularMatter();
      getSpecialReport();
    }
  }, [location]);

  return (
    <BasicContainer>
      <LocationHeader>
        <Ionicons name="location-outline" size={32} color="white" />
        <LocationText>{localName}</LocationText>
      </LocationHeader>
      <ScrollContainer>
        {warnings.length > 0 &&
          warnings.map((warning, index) => (
            <WariningBanner
              key={index}
              isWarning={warning.type.includes('경보')}
            >
              <Image
                source={warning.image}
                style={{ width: 120, height: 120 }}
              />
              <WarningTitle>현재 {warning.type} 발령 중</WarningTitle>
              <WarningRegion>{warning.regions}</WarningRegion>
            </WariningBanner>
          ))}
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
            name={getWeatherIcon(precipitation ?? 0).name}
            size={80}
            color={getWeatherIcon(precipitation ?? 0).color}
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
  background-color: ${({ isWarning }: { isWarning: boolean }) =>
    isWarning ? colors.red : colors.orange}22;
  border: ${({ isWarning }: { isWarning: boolean }) =>
    isWarning ? `2px solid ${colors.red}` : `2px solid ${colors.orange}`};
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
  width: 100%;
`;

const WarningTitle = styled.Text`
  color: ${colors.white};
  font-size: 22px;
  font-weight: bold;
`;

const WarningRegion = styled.Text`
  flex: 1;
  color: ${colors.lightGray};
  font-size: 14px;
  margin-top: 4px;
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
