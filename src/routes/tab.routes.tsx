import React from 'react'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Evolution } from '@screens/Evolution'
import { History } from '@screens/History'
import { PersonalTrainerList } from '@screens/PersonalTrainerList'
import { ReadyGymWorkouts } from '@screens/ReadyGymWorkouts'
import {
  BicepsFlexed,
  ChartNoAxesColumn,
  History as Time,
  House,
  SquareUser,
} from 'lucide-react-native'

import { Home } from '../screens/Home'

type RootStackParamList = {
  home: undefined
  history: undefined
  personalTrainerList: undefined
  readyGymWorkouts: undefined
  evolution: undefined
}

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<RootStackParamList>

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>()

export default function TabNavigator() {
  return (
    <Navigator
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
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => <Time color={color} size={size} />,
        }}
      />

      <Screen
        name="readyGymWorkouts"
        component={ReadyGymWorkouts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BicepsFlexed color={color} size={size} />
          ),
        }}
      />

      <Screen
        name="personalTrainerList"
        component={PersonalTrainerList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SquareUser color={color} size={size} />
          ),
        }}
      />

      <Screen
        name="evolution"
        component={Evolution}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChartNoAxesColumn color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  )
}
