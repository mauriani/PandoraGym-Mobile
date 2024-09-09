import React from 'react'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateTrainingFirstStep } from '@screens/CreateTraining/CreateTrainingFirstStep'
import { CreateTrainingSecondStep } from '@screens/CreateTraining/CreateTrainingSecondStep'
import { PersonalTrainerProfile } from '@screens/PersonalTrainerProfile'
import { Profile } from '@screens/Profile'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { TrainingDetails } from '@screens/TrainingDetails'

import TabNavigator from './tab-navigator'

export type RootStackParamList = {
  login: undefined
  tabNavigator: undefined
  signUp: undefined
  createTrainingFirstStep: {
    title: string | null
  }
  createTrainingSecondStep: {
    title: string
    selectedItems: IExercise[] | null
  }
  profile: undefined
  personalTrainerProfile: undefined
  trainingDetails: {
    id_exercise: string
    name: string
  }
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
          name="createTrainingFirstStep"
          component={CreateTrainingFirstStep}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="createTrainingSecondStep"
          component={CreateTrainingSecondStep}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="personalTrainerProfile"
          component={PersonalTrainerProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="trainingDetails"
          component={TrainingDetails}
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
