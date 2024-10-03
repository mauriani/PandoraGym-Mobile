import React from 'react'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateTrainingFirstStep } from '@screens/CreateTraining/CreateTrainingFirstStep'
import { CreateTrainingSecondStep } from '@screens/CreateTraining/CreateTrainingSecondStep'
import { CreateTrainingThirdStep } from '@screens/CreateTraining/CreateTrainingThirdStep'
import { DetailsTemplate } from '@screens/DetailsTemplates'
import { EditProfile } from '@screens/EditProfile'
import { HelpMe } from '@screens/HelpMe'
import { Notifications } from '@screens/Notifications'
import { PersonalTrainerProfile } from '@screens/PersonalTrainerProfile'
import { Profile } from '@screens/Profile'
import { StartTraining } from '@screens/StartTraining'

import TabNavigator from './tab.routes'

export type RootStackParamList = {
  tabNavigator: undefined
  createTrainingFirstStep: {
    title: string | null
  }
  createTrainingSecondStep: {
    title: string | null
    selectedItems: IExercise[] | null
  }
  createTrainingThirdStep: {
    title: string | null
    selectedItems: IExercise[] | null
  }
  profile: undefined
  personalTrainerProfile: {
    id: string
    planId?: string
    isButtonComment?: boolean
  }
  startTraining: {
    id: string
    name: string
    exclusive: boolean
  }
  detailsTemplate: {
    title: string
    id: string
    tumbnail: string
  }
  editProfile: undefined
  notifications: undefined
  helpMe: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export default function RootStack() {
  return (
    <>
      <Navigator
        initialRouteName="tabNavigator"
        screenOptions={{
          headerTransparent: false,
        }}>
        <Screen
          name="createTrainingFirstStep"
          component={CreateTrainingFirstStep}
          options={{ headerShown: false }}
        />

        <Screen
          name="createTrainingSecondStep"
          component={CreateTrainingSecondStep}
          options={{ headerShown: false }}
        />

        <Screen
          name="createTrainingThirdStep"
          component={CreateTrainingThirdStep}
          options={{ headerShown: false }}
        />

        <Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Screen
          name="personalTrainerProfile"
          component={PersonalTrainerProfile}
          options={{ headerShown: false }}
        />

        <Screen
          name="startTraining"
          component={StartTraining}
          options={{ headerShown: false }}
        />

        <Screen
          name="detailsTemplate"
          component={DetailsTemplate}
          options={{ headerShown: false }}
        />

        <Screen
          name="editProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

        <Screen
          name="notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />

        <Screen
          name="helpMe"
          component={HelpMe}
          options={{ headerShown: false }}
        />

        <Screen
          name="tabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Navigator>
    </>
  )
}
