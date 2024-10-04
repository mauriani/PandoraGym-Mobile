import { FlatList } from 'react-native'
import { Plan } from '@_dtos_/personalDTO'
import { NoContent } from '@components/NoContent'

import { CardPlan } from './__components__/CardPlan'

type IProps = {
  data: Plan[]
  planId?: string
  refetch: () => void
}

export function Planos({ data, planId, refetch}: IProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        data.length == 0
          ? {
              flexGrow: 1,
              padding: 10,
            }
          : {
              gap: 12,
              paddingBottom: 210,
              paddingTop: 30,
              paddingHorizontal: 20,
            }
      }
      ListEmptyComponent={
        <NoContent message="Nenhum plano cadastrado até o momento !" />
      }
      renderItem={({ item }) => (
        <CardPlan key={item.id} item={item} planId={planId} refetch={refetch}/>
      )}
    />
  )
}
