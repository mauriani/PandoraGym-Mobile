import React, { useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { ICreateSchedulingDTO } from '@_dtos_/schedulingDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Button } from '@components/ui/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

type RouteParams = {
  personalId: string
  personalName: string
}

const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

export function Scheduling() {
  const route = useRoute()
  const navigation = useNavigation()
  const { personalId, personalName } = route.params as RouteParams

  const today = new Date().toISOString().split('T')[0]

  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSchedule() {
    if (!selectedDate || !selectedTime) {
      toast.error('Selecione uma data e horário')
      return
    }

    try {
      setLoading(true)

      const schedulingData: ICreateSchedulingDTO = {
        personalId,
        date: selectedDate,
        time: selectedTime,
      }

      await api.post('/schedule', schedulingData)

      toast.success('Agendamento realizado com sucesso!')
      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Erro ao realizar agendamento. Tente novamente.'

      toast.error(title)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <HeaderGoBack title="Agendamento" />

      <View className="flex-1 p-4">
        <Text className="mb-4 text-lg font-bold text-white">
          Agendar com {personalName}
        </Text>

        <Text className="mb-3 text-base text-gray-300">
          Selecione uma data:
        </Text>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#facc15',
            },
          }}
          minDate={today}
          theme={{
            backgroundColor: '#202024',
            calendarBackground: '#202024',
            textSectionTitleColor: '#facc15',
            selectedDayBackgroundColor: '#facc15',
            selectedDayTextColor: '#000',
            todayTextColor: '#facc15',
            dayTextColor: '#fff',
            textDisabledColor: '#666',
            monthTextColor: '#facc15',
            arrowColor: '#facc15',
          }}
        />

        {selectedDate && (
          <>
            <Text className="mb-3 mt-6 text-base text-gray-300">
              Horários disponíveis:
            </Text>

            <View className="mb-6 flex-row flex-wrap gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onPress={() => setSelectedTime(time)}
                  className="min-w-[70px]">
                  <Text
                    className={
                      selectedTime === time ? 'text-black' : 'text-white'
                    }>
                    {time}
                  </Text>
                </Button>
              ))}
            </View>
          </>
        )}
        <View
          style={{
            marginTop: 'auto',
            paddingHorizontal: 20,
            paddingBottom:
              Platform.OS == 'ios'
                ? getBottomSpace() + 60
                : getBottomSpace() + 10,
          }}>
          <Button
            onPress={handleSchedule}
            disabled={!selectedDate || !selectedTime || loading}
            className="mt-auto"
            loading={loading}>
            <Text className="font-semibold text-black">
              {loading ? 'Agendando...' : 'Confirmar Agendamento'}
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  )
}
