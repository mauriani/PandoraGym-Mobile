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
        'z-[1000] h-32 flex-row items-center justify-between bg-background px-7 py-5'
      }
      style={styles.header}>
      <TouchableOpacity
        className="h-14 w-14 items-center justify-center rounded-full"
        onPress={onGoBack}>
        <ArrowLeft size={24} color={themes[colorScheme].primary} />
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        className="flex-1 text-center font-primary_bold text-lg text-white">
        {title}
      </Text>

      <View className="h-14 w-14" />
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
