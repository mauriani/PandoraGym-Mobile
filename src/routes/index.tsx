import React from 'react'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateTrainingFirstStep } from '@screens/CreateTraining/CreateTrainingFirstStep'
import { CreateTrainingSecondStep } from '@screens/CreateTraining/CreateTrainingSecondStep'
import { DetailsTemplate } from '@screens/DetailsTemplates'
import { EditProfile } from '@screens/EditProfile'
import { HelpMe } from '@screens/HelpMe'
import { Notifications } from '@screens/Notifications'
import { PersonalTrainerProfile } from '@screens/PersonalTrainerProfile'
import { Profile } from '@screens/Profile'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { StartTraining } from '@screens/StartTraining'

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
  startTraining: {
    id_exercise: string
    name: string
  }
  detailsTemplate: {
    title: string
  }
  editProfile: undefined
  notifications: undefined
  helpMe: undefined
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
          name="startTraining"
          component={StartTraining}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="detailsTemplate"
          component={DetailsTemplate}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="helpMe"
          component={HelpMe}
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
