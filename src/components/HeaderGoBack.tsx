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
  const { goBack } = useNavigation()
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
        'bg-secondary h-32 flex-row items-center  justify-between px-7 py-5 z-[1000]'
      }
      style={styles.header}>
      <TouchableOpacity
        className="w-14 h-14 justify-center items-center  rounded-full"
        onPress={() => goBack()}>
        <ArrowLeft size={24} color={themes[colorScheme].primary} />
      </TouchableOpacity>

      <Text className="text-white text-center font-primary_bold text-lg">
        {title}
      </Text>

      {isMenu ? (
        <IconDropDown items={dropdownItems} />
      ) : (
        <View className="w-14 h-14" />
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
