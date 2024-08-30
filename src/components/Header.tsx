import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

type IProps = {
  title: string
}

export function Header({ title }: IProps) {
  return (
    <View
      className={'bg-secondary h-32 items-center - justify-center'}
      style={styles.header}>
      <Text className="text-white text-center primary_bold font-bold text-md mb-6">
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
})
