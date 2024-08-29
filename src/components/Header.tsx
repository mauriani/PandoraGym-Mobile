import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

type IProps = {
  title: string
}

export function Header({ title }: IProps) {
  return (
    <View
      className={'bg-border h-36 items-center - justify-center'}
      style={styles.header}>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
})
