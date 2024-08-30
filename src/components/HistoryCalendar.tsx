import React, { useContext, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ptBR } from '@utils/localeConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export function HistoryCalendar() {
  const [selected, setSelected] = useState('')

  const { colorScheme } = useContext(ThemeContext)

  const currentTheme = colorScheme === 'dark' ? themes.dark : themes.light

  console.log('currentTheme', currentTheme['--border'])

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
      }}
      onDayPress={(day) => {
        setSelected(day.dateString)
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          //   selectedDotColor: 'orange',
        },
      }}
    />
  )
}
