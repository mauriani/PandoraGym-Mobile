import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { HistoryCalendar } from '@components/HistoryCalendar'
import dayjs from 'dayjs'

import { MyTrainingHistoryCard } from './__components__/MyTrainingHistoryCard'

export function History() {
  const [selected, setSelected] = useState(
    dayjs(new Date()).format('YYYY-MM-DD'),
  )

  function handleSelectedDay(props) {
    setSelected(props)
  }

  const data: ITrainingHistory[] = [
    {
      id: '1',
      title: 'Straddle Planche',
      image:
        'https://cdn.shopify.com/s/files/1/0568/6280/2107/files/Straddle_planche_480x480.jpg?v=1693406244',
      volume: '3 séries x 12 repetições',
      time: '1:20',
      load: '20kg',
    },
    {
      id: '2',
      title: 'Straddle Planche',
      image:
        'https://cdn.shopify.com/s/files/1/0568/6280/2107/files/Straddle_planche_480x480.jpg?v=1693406244',
      volume: '3 séries x 12 repetições',
      time: '1:20',
      load: '20kg',
    },
    {
      id: '3',
      title: 'Straddle Planche',
      image:
        'https://cdn.shopify.com/s/files/1/0568/6280/2107/files/Straddle_planche_480x480.jpg?v=1693406244',
      volume: '3 séries x 12 repetições',
      time: '1:20',
      load: '20kg',
    },
  ]

  return (
    <Container>
      <Header title={'Histórico'} />
      <Content>
        <HistoryCalendar onPress={handleSelectedDay} selected={selected} />

        {/* <Text className="text-muted-foreground font-primary_bold tex-[16px] mt-8 mb-4">
          Data: {dayjs(selected).format('DD/MM/YYYY')}
        </Text> */}

        <View className="flex-row items-center justify-between mt-8 mb-1 mr-2">
          <Heading title="Treino de peito" />

          <Text className="text-muted-foreground font-primary_regular text-base">
            08:56
          </Text>
        </View>

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
              : { paddingBottom: 60, gap: 12 }
          }
          renderItem={({ item }) => <MyTrainingHistoryCard item={item} />}
        />
      </Content>
    </Container>
  )
}
