import AlertBanner from '@/components/AlertBanner';
import WeatherInfo from '@/components/WeatherInfo';
import { useLocalNameQuery } from '@/hooks/useLocalNameQuery';
import { useParticularMatter } from '@/hooks/useParticularMatterQuery';
import { useWarningQuery } from '@/hooks/useWarningQuery';
import { useWeatherQuery } from '@/hooks/useWeatherQuery';
import { RootState } from '@/store';
import colors from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import {
  getColdWaveLevel,
  getHeatWaveLevel,
  getParticularMatterLevel,
} from '@/utils/weatherFormatter';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
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

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: weather,
    isLoading: isWeatherLoading,
    refetch: weatherRefetch,
  } = useWeatherQuery(location.latitude!, location.longitude!);

  const {
    data: pm25,
    isLoading: isPm25Loading,
    refetch: particularMatterRefetch,
  } = useParticularMatter(location.latitude!, location.longitude!);

  const {
    data: warning,
    isLoading: isWarningLoading,
    refetch: warningRefetch,
  } = useWarningQuery();

  const {
    data: localName,
    isLoading: isLocalNameLoading,
    refetch: localNameRefetch,
  } = useLocalNameQuery(location.latitude!, location.longitude!);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      weatherRefetch(),
      particularMatterRefetch(),
      warningRefetch(),
      localNameRefetch(),
    ]);
    setRefreshing(false);
  }, []);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : process.env.EXPO_PUBLIC_BANNER_AD_UNIT_ID;

  const bannerRef = useRef<BannerAd>(null);

  return (
    <BasicContainer>
      <LocationHeader>
        <Ionicons name="location-outline" size={32} color="white" />
        {!localName || isLocalNameLoading ? (
          <LocationText>위치 불러오는 중...</LocationText>
        ) : (
          <LocationText>{localName}</LocationText>
        )}
      </LocationHeader>
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <WeatherInfo weather={weather} isWeatherLoading={isWarningLoading} />
        <BannerTitle>주요 경보</BannerTitle>
        <AlertBanner
          iconName="thermometer-outline"
          iconColor={colors.red}
          title="폭염"
        >
          <HeatWaveContent>
            {weather && !isWeatherLoading ? (
              getHeatWaveLevel(weather.temperature!)
            ) : (
              <ActivityIndicator color={colors.red} size={'small'} />
            )}
          </HeatWaveContent>
        </AlertBanner>
        <AlertBanner
          iconName="snow-outline"
          iconColor={colors.blue}
          title="한파"
        >
          <ColdWaveContent>
            {weather && !isWeatherLoading ? (
              getColdWaveLevel(weather.temperature!)
            ) : (
              <ActivityIndicator color={colors.blue} size={'small'} />
            )}
          </ColdWaveContent>
        </AlertBanner>
        <AlertBanner
          iconName="business-outline"
          iconColor={colors.orange}
          title="미세먼지"
        >
          {pm25 && !isPm25Loading ? (
            <>
              <ParticularMatter>{pm25} ㎍/㎥</ParticularMatter>
              <FineDustContent>
                {getParticularMatterLevel(pm25)}
              </FineDustContent>
            </>
          ) : (
            <>
              <ParticularMatter>-- ㎍/㎥</ParticularMatter>
              <ActivityIndicator
                color={colors.orange}
                style={{ marginLeft: 'auto' }}
                size={'small'}
              />
            </>
          )}
        </AlertBanner>
        {warning &&
          !isWarningLoading &&
          warning.map((warningItem, index) => (
            <WariningBanner
              key={index}
              isWarning={warningItem.type.includes('경보')}
            >
              <Image
                source={warningItem.image}
                style={{ width: 120, height: 120 }}
              />
              <WarningTitle>{warningItem.type} 발령 중</WarningTitle>
              <WarningRegion>{warningItem.regions}</WarningRegion>
            </WariningBanner>
          ))}
      </ScrollContainer>
      <BannerAdContainer>
        <BannerAd
          ref={bannerRef}
          unitId={adUnitId!}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </BannerAdContainer>
    </BasicContainer>
  );
};

const BannerAdContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const LocationHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 8px 16px 8px;
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
