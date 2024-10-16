import React from 'react'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Day } from '@_dtos_/trainingDTO'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateTrainingFirstStep } from '@screens/CreateTraining/CreateTrainingFirstStep'
import { CreateTrainingSecondStep } from '@screens/CreateTraining/CreateTrainingSecondStep'
import { CreateTrainingThirdStep } from '@screens/CreateTraining/CreateTrainingThirdStep'
import { EditProfile } from '@screens/EditProfile'
import { HelpMe } from '@screens/HelpMe'
import { Notifications } from '@screens/Notifications'
import { PersonalId } from '@screens/PersonalTrainerList/pages/PersonalId'
import { Profile } from '@screens/Profile'
import { StartTraining } from '@screens/StartTraining'
import { EditWorkout } from '@screens/StartTraining/pages/EditWorkout'
import { WorkoutAll } from '@screens/WorkoutsTemplates/pages/WorkoutAll'
import { WorkoutId } from '@screens/WorkoutsTemplates/pages/WorkoutId'

import { StackRoutesStatusBar } from './stack-routes-statusbar'
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
  personalId: {
    id: string
  }
  startTraining: {
    id: string
    name: string
    exclusive?: boolean
    weekDays?: Day[]
  }
  workoutId: {
    title: string
    id: string
    tumbnail: string
  }
  workoutAll: {
    title: string
    id: string
  }
  editProfile: undefined
  notifications: undefined
  helpMe: undefined
  editWorkout: {
    selectedItems: StartExerciseDTO[] | null
    title: string
    idWorkout: string
    weekDays: Day[]
  }
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export default function RootStack() {
  return (
    <>
      <StackRoutesStatusBar />
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
          name="personalId"
          component={PersonalId}
          options={{ headerShown: false }}
        />

        <Screen
          name="startTraining"
          component={StartTraining}
          options={{ headerShown: false }}
        />

        <Screen
          name="workoutId"
          component={WorkoutId}
          options={{ headerShown: false }}
        />
        <Screen
          name="workoutAll"
          component={WorkoutAll}
          options={{ headerShown: false }}
        />

        <Screen
          name="editProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

        <Screen
          name="editWorkout"
          component={EditWorkout}
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
