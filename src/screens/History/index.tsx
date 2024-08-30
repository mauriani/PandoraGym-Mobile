import React from 'react'
import { View } from 'react-native'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { HistoryCalendar } from '@components/HistoryCalendar'

export function History() {
  return (
    <Container>
      <Header title={'Histórico'} />
      <View className="px-5 mt-10">
        <HistoryCalendar />
      </View>
    </Container>
  )
}
