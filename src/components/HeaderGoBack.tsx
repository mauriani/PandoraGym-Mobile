import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'

type IProps = {
  title: string
}

export function HeaderGoBack({ title }: IProps) {
  const { goBack } = useNavigation()

  return (
    <View
      className={
        'bg-secondary h-32 flex-row items-center  justify-between px-7 py-5'
      }
      style={styles.header}>
      <TouchableOpacity
        className="w-14 h-14 justify-center items-cente"
        onPress={() => goBack()}>
        <ArrowLeft size={24} color={'#FDC500'} />
      </TouchableOpacity>

      <Text className="text-white text-center primary_bold font-bold">
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
