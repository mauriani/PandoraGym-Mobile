import React from 'react'
import { Platform } from 'react-native'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { History } from '@screens/History'
import { PersonalTrainerList } from '@screens/PersonalTrainerList'
import { WorkoutsTemplates } from '@screens/WorkoutsTemplates'
import {
  BicepsFlexed,
  History as Time,
  House,
  SquareUser,
} from 'lucide-react-native'

import { Home } from '../screens/Home'

type AppRoutes = {
  home: undefined
  history: undefined
  personalTrainerList: undefined
  workoutsTemplates: undefined
  evolution: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export default function TabNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#7C7C8A',
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80,
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
        name="workoutsTemplates"
        component={WorkoutsTemplates}
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

      {/* <Screen
        name="evolution"
        component={Evolution}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChartNoAxesColumn color={color} size={size} />
          ),
        }}
      /> */}
    </Navigator>
  )
}
