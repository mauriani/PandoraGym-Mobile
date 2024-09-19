import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'

import { ButtonProfile } from './__components__/ButtonProfile'

export function Profile() {
  const { signOut } = useAuth()
  const { navigate } = useNavigation()

  function handleLogout() {
    Alert.alert(
      'Sair',
      'Você realmente deseja sair do Fall Alert ?',
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

  return (
    <Container>
      <HeaderGoBack title={'Perfil'} />
      <Content>
        <View className="items-center justify-center gap-4">
          <Avatar>
            <AvatarImage
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1745949238519803904/ZHwM5B07_400x400.jpg',
              }}
            />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>

          <Text className="text-base text-primary font-primary_bold">
            Othávio Augusto Morais Rubim
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ gap: 12, marginTop: 20 }}>
          <ButtonProfile
            title={'Editar dados do Perfil'}
            iconName="ChevronRight"
            onPress={() => navigate('editProfile')}
          />
          <ButtonProfile
            title={'Notificações'}
            iconName="ChevronRight"
            onPress={() => navigate('notifications')}
          />
          <ButtonProfile
            title={'Me ajuda ?'}
            iconName="ChevronRight"
            onPress={() => navigate('helpMe')}
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
  )
}
