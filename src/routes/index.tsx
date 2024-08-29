import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

import TabNavigator from './tab-navigator'

export type RootStackParamList = {
  login: undefined
  tabNavigator: undefined
  signUp: undefined
}

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerTransparent: false,
        }}>
        <Stack.Screen
          name="login"
          component={SignIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="tabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
