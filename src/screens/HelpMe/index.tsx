import { Text } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { InputWithButton } from '@components/InputWithButton'

export function HelpMe() {
  return (
    <Container>
      <HeaderGoBack title="Me ajuda?" />

      <Content>
        <Text className="mb-4 font-primary_bold text-base text-foreground">
          Como podemos te <Text className="text-primary">ajudar</Text> hoje,
          Othavio ?
        </Text>
        <InputWithButton
          label="Qual é a sua duvida ?"
          iconName="Send"
          size={20}
        />
      </Content>
    </Container>
  )
}
