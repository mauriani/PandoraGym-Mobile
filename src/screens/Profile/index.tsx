import React, { useEffect } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { UserData } from '@_dtos_/profileDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Loading } from '@components/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { getUserFromStorage, savePlanInStorage } from '@storage/index'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { ButtonProfile } from './__components__/ButtonProfile'

export function Profile() {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  const { id } = getUserFromStorage()

  function handleLogout() {
    Alert.alert(
      'Sair',
      'Você realmente deseja sair do Pandora Gym ?',
      [
        {
          text: 'Sair',
          onPress: () => submitLogout(),
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  async function submitLogout() {
    await signOut()
  }

  const { data, error, isLoading } = useQuery<UserData>({
    queryKey: ['get-profile-user-id', user.token, id],
    queryFn: async () => {
      const { data } = await api.get('/profile')

      const planId = data?.userData?.planId ? data?.userData?.planId : null

      savePlanInStorage(planId)

      return data.userData
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <HeaderGoBack title={'Perfil'} />
          <Content>
            <View className="items-center justify-center gap-4">
              <Avatar>
                <AvatarImage
                  source={{
                    uri: data?.avatarUrl,
                  }}
                />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>

              <View className="items-center justify-center gap-1">
                <Text className="text-base text-primary font-primary_bold">
                  {data?.name}
                </Text>
                <Text className="text-muted-foreground font-primary_regular text-sm">
                  {data?.email}
                </Text>
              </View>

              {data?.planName && (
                <TouchableOpacity className="py-2 w-44 rounded-full items-center bg-primary-foreground ">
                  <Text className="text-muted-foreground font-base">
                    {data?.planName}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView contentContainerStyle={{ gap: 12, marginTop: 20 }}>
              {data?.personalId && (
                <ButtonProfile
                  title={'Meu Personal'}
                  iconName="ChevronRight"
                  onPress={() =>
                    navigate('personalId', {
                      id: data?.personalId,
                    })
                  }
                />
              )}

              <ButtonProfile
                title={'Editar dados do Perfil'}
                iconName="ChevronRight"
                onPress={() => navigate('editProfile')}
              />

              <ButtonProfile
                title={'Sair'}
                iconName="LogOut"
                size={22}
                onPress={handleLogout}
              />
            </ScrollView>
          </Content>
        </Container>
      )}
    </>
  )
}
