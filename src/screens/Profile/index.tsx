import React from 'react'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar'

export function Profile() {
  return (
    <Container>
      <HeaderGoBack title={'Perfil'} />

      <Avatar>
        <AvatarImage
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1745949238519803904/ZHwM5B07_400x400.jpg',
          }}
        />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </Container>
  )
}
