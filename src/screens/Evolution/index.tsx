import React from 'react'
import { View } from 'react-native'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'

export function Evolution() {
  return (
    <Container>
      <Header title={'Evolução'} />

      <View className="px-5 mt-10">
        <Heading title="Como estou indo ?" />
      </View>
    </Container>
  )
}
