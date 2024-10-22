import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { HistoryCalendar } from '@components/HistoryCalendar'
import { NoContent } from '@components/NoContent'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { secondsToHourMinute } from '@utils/formatTime'
import dayjs from 'dayjs'

import { MyTrainingHistoryCard } from './__components__/MyTrainingHistoryCard'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'

export function History() {
  const [selected, setSelected] = useState(
    dayjs(new Date()).format('YYYY-MM-DD'),
  )

  function handleSelectedDay(props) {
    setSelected(props)
  }

  const { data, isFetching } = useQuery<ITrainingHistory[]>({
    queryKey: ['get-history-training', selected],
    queryFn: async () => {
      const { data } = await api.post('/workout/history', {
        date: dayjs(selected).toISOString(),
      })

      return data
    },
  })

  return (
    <Container>
      <Header title={'Histórico'} />
      {isFetching ? (
        <SkeletonAnimation />
      ) : (
        <Content>
          <HistoryCalendar onPress={handleSelectedDay} selected={selected} />

          <View className="flex-row items-center justify-between mt-8 mb-1 mr-2">
            <Heading title={data && data[0]?.workout?.name} />

            <Text className="text-muted-foreground font-primary_regular text-base">
              {data?.length > 0 &&
                secondsToHourMinute(data[0]?.timeTotalWorkout)}
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
            ListEmptyComponent={
              <NoContent
                message={'Você não realizou nenghum treino nessa data !'}
              />
            }
          />
        </Content>
      )}
    </Container>
  )
}
