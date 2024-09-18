import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

export type RootSAuthParamList = {
  login: undefined
  signUp: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootSAuthParamList>()

export default function AuthRoutes() {
  return (
    <>
      <Navigator
        initialRouteName="login"
        screenOptions={{
          headerTransparent: false,
        }}>
        <Screen
          name="login"
          component={SignIn}
          options={{ headerShown: false }}
        />

        <Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Navigator>
    </>
  )
}
