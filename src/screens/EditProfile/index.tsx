import { ScrollView, Text, View } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { SubTitle } from '@components/SubTitle'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

export function EditProfile() {
  return (
    <Container>
      <HeaderGoBack title="Editar Perfil" />

      <Content>
        <ScrollView>
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

          <Input placeholder="Nome" label={'Rodrigo Gonçalves'} />
          <Input placeholder="E-mail" label={'rodrigo@email.com'} />

          <View className="mt-4 gap-4 mb-4">
            <SubTitle title={'Alterar senha'} />

            <Input
              placeholder="Senha antiga"
              label={'Rodrigo Gonçalves'}
              keyboardType="numeric"
              secureTextEntry={true}
            />
            <Input
              placeholder="Senha nova"
              label={'rodrigo@email.com'}
              keyboardType="numeric"
              secureTextEntry={true}
            />
          </View>

          <Button label={'Atualizar'} />
        </ScrollView>
      </Content>
    </Container>
  )
}
