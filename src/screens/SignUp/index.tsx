import React from 'react'
import { View } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'

import { Bullet } from './__components__/Bullet'
import { Weight } from './__components__/Weight'
export function SignUp() {
  return (
    <Container>
      <HeaderGoBack title="Criar conta" />

      <Content>
        <View className="flex-row items-center">
          <Bullet active />
          <Bullet />
          <Bullet />
        </View>

        <Weight />
      </Content>
    </Container>
  )
}
