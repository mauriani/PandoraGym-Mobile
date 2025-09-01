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
      className="h-32 justify-end bg-secondary px-8 py-6"
      style={styles.header}>
      <View className="flex-row items-center justify-between">
        <View className="h-9 w-9" />

        <Text
          numberOfLines={1}
          className="font-primary_bold text-lg text-foreground">
          {title}
        </Text>

        <TouchableOpacity
          onPress={() => navigate('profile')}
          className="h-9 w-9 items-center justify-center">
          <UserCircle color={'#7C7C8A'} size={25} />
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
