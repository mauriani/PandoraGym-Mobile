import React, { useEffect } from 'react'
import { View } from 'react-native'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import { useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { Planos } from './_tabs_/Planos'
import { Profile } from './_tabs_/Profile'

type IRouteParams = {
  id: string
  planId?: string
}

export function PersonalTrainerProfile() {
  const route = useRoute()
  const { id, planId } = route.params as IRouteParams

  const { data, error } = useQuery<IPersonalDTO>({
    queryKey: ['get-personal-id', id],
    queryFn: async () => {
      const { data } = await api.get(`/list-personal/${id}`)

      return data.data as IPersonalDTO
    },
  })

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

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
            <Profile data={data} />
          </TabsContent>
          <TabsContent value="planos">
            <Planos data={data?.plan} planId={planId} />
          </TabsContent>
        </Tabs>
      </View>
    </Container>
  )
}
