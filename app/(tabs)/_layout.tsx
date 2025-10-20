import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
const TabLayout = () => {
  return (
    <Container>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            backgroundColor: colors.black,
            borderBottomColor: colors.yellow,
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
                size={30}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="manual/index"
          options={{
            title: '매뉴얼',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="book"
                size={30}
                color={focused ? colors.yellow : colors.gray}
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
                size={30}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tools/index"
          options={{
            title: '도구',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="construct"
                size={30}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: '설정',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings"
                size={30}
                color={focused ? colors.yellow : colors.gray}
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
