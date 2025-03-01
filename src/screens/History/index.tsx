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

  const { data, isLoading } = useQuery<ITrainingHistory[]>({
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

      <Content>
        <HistoryCalendar onPress={handleSelectedDay} selected={selected} />
        <>
          {isLoading ? (
            <SkeletonAnimation />
          ) : (
            <>
              <View
                className={`flex-row items-center justify-between ${data?.length !== 0 ? 'mb-1 mr-2 mt-8' : ''}`}>
                <Heading title={data && data[0]?.workout?.name} />

                <Text className="font-primary_regular text-base text-muted-foreground">
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
            </>
          )}
        </>
      </Content>
    </Container>
  )
}
