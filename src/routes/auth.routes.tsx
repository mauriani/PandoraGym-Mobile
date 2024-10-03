import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SingUpFirstStep } from '@screens/SignUp/SingUpFirstStep'
import { SingUpSecondStep } from '@screens/SignUp/SingUpSecondStep'

export type RootSAuthParamList = {
  login: undefined
  singUpFirstStep: undefined
  singUpSecondStep: {
    data: {
      name?: string
      email?: string
      age?: number
      bornDate?: string
      phone?: string
    }
  }
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
          name="singUpFirstStep"
          component={SingUpFirstStep}
          options={{ headerShown: false }}
        />

        <Screen
          name="singUpSecondStep"
          component={SingUpSecondStep}
          options={{ headerShown: false }}
        />
      </Navigator>
    </>
  )
}
