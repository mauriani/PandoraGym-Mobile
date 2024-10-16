import React, { useContext } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ArrowLeft } from 'lucide-react-native'

type IProps = {
  title: string
  onGoBack: () => void
}

export function HeaderGoBackModal({ title, onGoBack }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <View
      className={
        'bg-background h-32 flex-row items-center  justify-between px-7 py-5 z-[1000]'
      }
      style={styles.header}>
      <TouchableOpacity
        className="w-14 h-14 justify-center items-center  rounded-full"
        onPress={onGoBack}>
        <ArrowLeft size={24} color={themes[colorScheme].primary} />
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        className="text-white text-center font-primary_bold text-lg flex-1">
        {title}
      </Text>

      <View className="w-14 h-14" />
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
