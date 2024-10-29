import React, { useEffect } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker'
import { UserData } from '@_dtos_/profileDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import {
  Avatar,
  AvatarEditButton,
  AvatarFallback,
  AvatarImage,
} from '@components/ui/Avatar'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { getUserFromStorage, savePlanInStorage } from '@storage/index'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { useOpenDialogAlert } from '../../context/DialogAlertContext'

import { ButtonProfile } from './__components__/ButtonProfile'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'

export function Profile() {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  const { id } = getUserFromStorage()
  const { openDialogAlert } = useOpenDialogAlert()

  function handleLogout() {
    openDialogAlert({
      title: 'Sair',
      message: 'Você realmente deseja sair do Pandora Gym ?',
      isButtonCancel: true,
      isButtonTitleConfirm: 'Sim, tenho certeza!',
      onConfirm: () => {
        submitLogout()
      },
    })
  }

  async function submitLogout() {
    await signOut()
  }

  const { data, error, isFetching, refetch } = useQuery<UserData>({
    queryKey: ['get-profile-user-id', user.token, id],
    queryFn: async () => {
      const { data } = await api.get('/profile')

      const planId = data?.userData?.planId ? data?.userData?.planId : null

      savePlanInStorage(planId)

      return data.userData
    },
  })

  function handleSelectImage() {
    const options: ImageLibraryOptions = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return
      }

      if (response?.errorCode) {
        Alert.alert('Atenção', response.errorMessage)
      } else {
        const asset = response.assets[0]

        if (asset) {
          const { type, uri } = asset
          uploadImageAvatar(uri, type)
        }
      }
    })
  }

  async function uploadImageAvatar(uri: string, type: string) {
    const formData = new FormData()
    const filename = uri.split('/').pop()

    formData.append('avatar', {
      uri,
      name: filename,
      type,
    })

    try {
      await api.post('/profile/upload-avatar', formData).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          refetch()
        } else {
          toast.error(response.data.message)
        }
      })
    } catch (err) {
      Alert.alert(err)
    }
  }

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  const nameFormatted = data?.name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return (
    <Container>
      <HeaderGoBack title={'Perfil'} />
      {isFetching ? (
        <SkeletonAnimation />
      ) : (
        <Content>
          <View className="items-center justify-center gap-4">
            <View>
              <Avatar>
                <AvatarImage
                  source={{
                    uri: data?.avatarUrl ? data?.avatarUrl : '',
                  }}
                />
                <AvatarFallback className="font-extrabold">
                  {nameFormatted}
                </AvatarFallback>
              </Avatar>
              <AvatarEditButton onEditPress={() => handleSelectImage()} />
            </View>

            <View className="items-center justify-center gap-1">
              <Text className="font-primary_bold text-base text-primary">
                {data?.name}
              </Text>
              <Text className="font-primary_regular text-sm text-muted-foreground">
                {data?.email}
              </Text>
            </View>

            {data?.planName && (
              <TouchableOpacity className="w-44 items-center rounded-full bg-primary-foreground py-2">
                <Text className="font-base text-muted-foreground">
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
              onPress={() =>
                navigate('editProfile', {
                  user: data,
                })
              }
            />

            <ButtonProfile
              title={'Sair'}
              iconName="LogOut"
              size={22}
              onPress={handleLogout}
            />
          </ScrollView>
        </Content>
      )}
    </Container>
  )
}
