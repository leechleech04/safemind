import { setLocation } from '@/slices/locationSlice';
import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
const TabLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      const location = await getCurrentPositionAsync({});
      dispatch(
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    };
    getLocation();
  }, []);

  return (
    <Container>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.lightGray,
          tabBarStyle: {
            backgroundColor: colors.backgroundColor,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: '홈',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? colors.red : colors.lightGray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="manual"
          options={{
            title: '매뉴얼',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="book"
                size={24}
                color={focused ? colors.red : colors.lightGray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="map/index"
          options={{
            title: '지도',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="map"
                size={24}
                color={focused ? colors.red : colors.lightGray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: '도구',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="construct"
                size={24}
                color={focused ? colors.red : colors.lightGray}
              />
            ),
          }}
        />
      </Tabs>
    </Container>
  );
};

const Container = styled(SafeAreaView).attrs({
  edges: ['top'],
})`
  flex: 1;
  background-color: ${colors.black};
`;

export default TabLayout;
