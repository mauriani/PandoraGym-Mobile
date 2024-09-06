import React from 'react'
import { View } from 'react-native'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'

import { Planos } from './_tabs_/Planos'
import { Profile } from './_tabs_/Profile'

export function PersonalTrainerProfile() {
  return (
    <Container>
      <HeaderGoBack title={'Trainers'} />
      <View className="mt-3">
        <Tabs defaultValue="perfil">
          <TabsList>
            <TabsTrigger id="perfil" title="Perfil" value="perfil" />
            <TabsTrigger id="planos" title="Plano" value="planos" />
          </TabsList>
          <TabsContent value="perfil">
            <Profile />
          </TabsContent>
          <TabsContent value="planos">
            <Planos />
          </TabsContent>
        </Tabs>
      </View>
    </Container>
  )
}
