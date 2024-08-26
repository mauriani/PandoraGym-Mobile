import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const KEY_USER_ADMIN = '@pincel:adm:usuario'

type IUser = {
  name: string
}

function setUserAdmin(user: IUser) {
  storage.set(KEY_USER_ADMIN, JSON.stringify(user))
}

function getUserAdmin(user: IUser) {
  const jsonUser = storage.getString(KEY_USER_ADMIN)
  const userObject = JSON.parse(jsonUser)
  return userObject
}
