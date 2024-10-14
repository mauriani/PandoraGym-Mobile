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
import { UserCircle } from 'lucide-react-native'

type IProps = {
  title: string
}

export function Header({ title }: IProps) {
  const { navigate } = useNavigation()
  return (
    <View
      className=" h-32 bg-secondary justify-end px-8 py-6"
      style={styles.header}>
      <View className="flex-row  justify-between items-center">
        <View className="h-9 w-9" />

        <Text
          numberOfLines={1}
          className="text-white font-primary_bold text-lg">
          {title}
        </Text>

        <TouchableOpacity
          onPress={() => navigate('profile')}
          className="h-9 w-9 items-center justify-center">
          <UserCircle color={'#FDC500'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop:
      Platform.OS == 'ios' ? getStatusBarHeight() + 45 : getStatusBarHeight(),
  },
})
