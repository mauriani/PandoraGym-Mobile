import React, { useContext } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ArrowLeft } from 'lucide-react-native'

import IconDropDown, { DropDownItemProps } from './IconDropDrown'

type IProps = {
  title: string
  isMenu?: boolean
  onDeleteWorkout?: () => void
  onEditWorkout?: () => void
}

export function HeaderGoBack({
  title,
  isMenu = false,
  onDeleteWorkout,
  onEditWorkout,
}: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  const dropdownItems: DropDownItemProps[] = [
    {
      iconName: 'Pencil',
      label: 'Editar Treino',
      onPress: () => onEditWorkout(),
    },
    {
      iconName: 'Trash2',
      label: 'Apagar Treino',
      onPress: () => onDeleteWorkout(),
    },
  ]

  return (
    <View
      className={
        'z-[1000] h-32 flex-row items-center justify-between bg-secondary px-7 py-5'
      }
      style={styles.header}>
      <ButtonGoBack />

      <Text
        numberOfLines={1}
        className="flex-1 text-center font-primary_bold text-lg text-white">
        {title}
      </Text>

      {isMenu ? (
        <IconDropDown items={dropdownItems} />
      ) : (
        <View className="h-14 w-14" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop:
      Platform.OS == 'ios'
        ? getStatusBarHeight() + 30
        : getStatusBarHeight() + 10,
  },
})

export function ButtonGoBack() {
  const { goBack } = useNavigation()
  const { colorScheme } = useContext(ThemeContext)
  return (
    <TouchableOpacity
      className="h-14 w-14 items-center justify-center rounded-full"
      onPress={() => goBack()}>
      <ArrowLeft size={24} color={themes[colorScheme].primary} />
    </TouchableOpacity>
  )
}
