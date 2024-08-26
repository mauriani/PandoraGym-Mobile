import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'

export type RootStackParamList = {
  login: undefined
  DrawerNavigator: undefined
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

        {/* <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
