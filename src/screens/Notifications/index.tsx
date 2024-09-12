import { FlatList } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { NoContent } from '@components/NoContent'

import { CardNotification } from './__components__/CardNotification'

export function Notifications() {
  const data = [
    {
      id: '1',
      title: 'Super promoção !!',
      message: `Estamos com um super desconto em
whey, juntos com a growth. CUPOM: PANDORAPBZ`,
    },
    {
      id: '2',
      title: 'Parabéns !!',
      message: `Obrigada por assinar o nosso plano anual. Estamos felizes por ter você conosco.`,
    },
    {
      id: '3',
      title: 'Parabéns !!',
      message: `Obrigada por assinar o nosso plano anual. Estamos felizes por ter você conosco.Obrigada por assinar o nosso plano anual. Estamos felizes por ter você conosco.Obrigada por assinar o nosso plano anual. Estamos felizes por ter você conosco.`,
    },
  ]

  return (
    <Container>
      <HeaderGoBack title="Notificações" />

      <Content>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            data?.length == 0
              ? {
                  flexGrow: 1,
                  padding: 10,
                }
              : { paddingBottom: 30, gap: 12, paddingTop: 10 }
          }
          renderItem={({ item }) => (
            <CardNotification key={item.id} item={item} />
          )}
          ListEmptyComponent={() => (
            <NoContent
              message={'Nenhuma notificação enviada até o momento !'}
            />
          )}
        />
      </Content>
    </Container>
  )
}
