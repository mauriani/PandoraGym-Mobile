import { MMKV } from 'react-native-mmkv'
import { AuthState } from '@hooks/auth'

export const storage = new MMKV()

export const USER_STORAGE_KEY = '@pandora:user'

export function saveUserInStorage(user: AuthState) {
  storage.set(USER_STORAGE_KEY, JSON.stringify(user))
}

export function getUserFromStorage() {
  const jsonUser = storage.getString(USER_STORAGE_KEY)
  const userObject = jsonUser ? JSON.parse(jsonUser) : null

  return userObject as AuthState
}

export function removeUserFromStorage() {
  storage.delete(USER_STORAGE_KEY)
}
