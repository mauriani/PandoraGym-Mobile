import { MMKV } from 'react-native-mmkv'
import { IUser } from '@_dtos_/userDTO'

export const storage = new MMKV()

export const USER_STORAGE_KEY = '@pandora:user'
export const USER_STORAGE_TOKEN = '@pandora:token'
export const USER_STORAGE_PLAN = '@pandora:plan'

export function saveUserInStorage(user: IUser) {
  storage.set(USER_STORAGE_KEY, JSON.stringify(user))
}

export function saveTokenInStorage(token: string) {
  storage.set(USER_STORAGE_TOKEN, JSON.stringify(token))
}

export function savePlanInStorage(plan: string | null) {
  storage.set(USER_STORAGE_PLAN, JSON.stringify(plan))
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

export function removeUserFromStorage() {
  storage.delete(USER_STORAGE_KEY)
}

export function removeTokenFromStorage() {
  storage.delete(USER_STORAGE_TOKEN)
}
