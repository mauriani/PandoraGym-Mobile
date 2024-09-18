import { MMKV } from 'react-native-mmkv'
import { IUser } from '@_dtos_/userDTO'

export const storage = new MMKV()

export const USER_STORAGE_KEY = '@pandora:user'

export function saveUserInStorage(user: IUser) {
  storage.set(USER_STORAGE_KEY, JSON.stringify(user))
}

export function getUserFromStorage() {
  const jsonUser = storage.getString(USER_STORAGE_KEY)
  const userObject = jsonUser ? JSON.parse(jsonUser) : null

  return userObject as IUser
}
