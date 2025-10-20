import colors from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import styled from 'styled-components/native';
const TabLayout = () => {
  return (
    <Container>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: { backgroundColor: colors.backgroundColor },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={32}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="manual/index"
          options={{
            title: 'Manual',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="book"
                size={32}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="map/index"
          options={{
            title: 'Map',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="map"
                size={32}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tools/index"
          options={{
            title: 'Tools',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="construct"
                size={32}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: 'Settings',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings"
                size={32}
                color={focused ? colors.yellow : colors.gray}
              />
            ),
          }}
        />
      </Tabs>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

export default TabLayout;
