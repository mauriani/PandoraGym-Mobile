import { MMKV } from 'react-native-mmkv'
import { IUser } from '@_dtos_/userDTO'

import { IPropsCurrentWorkout } from '../context/WorkoutContext'

export const storage = new MMKV()

export const USER_STORAGE_KEY = '@pandora:user'
export const USER_STORAGE_TOKEN = '@pandora:token'
export const USER_STORAGE_PLAN = '@pandora:plan'
export const USER_START_WORKOUT_STORAGE = '@pandora:startworkout'
export const USER_STORAGE_TABBAR = '@pandora:bottom'
export const USER_STORAGE_CURRENTWORKOUT = '@pandora:currentworkout'

export function saveUserInStorage(user: IUser) {
  storage.set(USER_STORAGE_KEY, JSON.stringify(user))
}

export function saveTokenInStorage(token: string) {
  storage.set(USER_STORAGE_TOKEN, JSON.stringify(token))
}

export function savePlanInStorage(plan: string | null) {
  storage.set(USER_STORAGE_PLAN, JSON.stringify(plan))
}

export function saveStartWorkoutStorage(date: Date | string | null) {
  storage.set(USER_START_WORKOUT_STORAGE, JSON.stringify(date))
}

export function saveBottomBarStorage(bottom: number | null) {
  storage.set(USER_STORAGE_TABBAR, JSON.stringify(bottom))
}

export function saveCurrentWorkoutStorage(workout: IPropsCurrentWorkout) {
  storage.set(USER_STORAGE_CURRENTWORKOUT, JSON.stringify(workout))
}

export function getUserFromStorage() {
  const jsonUser = storage.getString(USER_STORAGE_KEY)
  const userObject = jsonUser ? JSON.parse(jsonUser) : null

  return userObject as IUser
}

export function getTokenFromStorage() {
  const jsonUser = storage.getString(USER_STORAGE_TOKEN)
  const token = jsonUser ? JSON.parse(jsonUser) : null

  return token
}

export function getTokenPlanStorage() {
  const jsonPlan = storage.getString(USER_STORAGE_PLAN)
  const plan = jsonPlan ? JSON.parse(jsonPlan) : null

  return plan
}

export function getStartWorkoutStorage() {
  const startWorkpout = storage.getString(USER_START_WORKOUT_STORAGE)
  const time = startWorkpout ? JSON.parse(startWorkpout) : null

  return time
}

export function getBottomBarStorage() {
  const height = storage.getString(USER_STORAGE_TABBAR)
  const bottom = height ? JSON.parse(height) : null

  return bottom
}

export function getCurrentWorkoutStorage() {
  const workout = storage.getString(USER_STORAGE_CURRENTWORKOUT)
  const currentWorkout = workout ? JSON.parse(workout) : null

  return currentWorkout
}

export function removeUserFromStorage() {
  storage.delete(USER_STORAGE_KEY)
}

export function removeTokenFromStorage() {
  storage.delete(USER_STORAGE_TOKEN)
}

export function removeCurrentWorkoutFromStorage() {
  storage.delete(USER_STORAGE_CURRENTWORKOUT)
}

export function removeStartWorkoutromStorage() {
  storage.delete(USER_START_WORKOUT_STORAGE)
}
