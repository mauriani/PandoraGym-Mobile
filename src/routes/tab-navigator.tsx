import React from 'react'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { History } from '@screens/History'
import { PersonalTrainerList } from '@screens/PersonalTrainerList'
import { Profile } from '@screens/Profile'
import { themes } from '@theme/themes'
import {
  BicepsFlexed,
  CircleUserRound,
  History as Time,
  House,
} from 'lucide-react-native'

import { Home } from '../screens/Home'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  personalTrainerList: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const Tab = createBottomTabNavigator<AppRoutes>()

console.log('themes', themes)

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#7C7C8A',
        tabBarStyle: {
          backgroundColor: '#202024',
          borderTopWidth: 0,
          paddingBottom: 40,
          paddingTop: 24,
        },
      }}
      initialRouteName="home">
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => <Time color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="personalTrainerList"
        component={PersonalTrainerList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BicepsFlexed color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
