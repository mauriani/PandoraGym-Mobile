import React, { useContext } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ptBR } from '@utils/localeConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

type IProps = {
  onPress: (dateString: string) => void
  selected: string
}

export function HistoryCalendar({ onPress, selected }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <Calendar
      style={{
        height: 320,
        borderRadius: 6,
      }}
      theme={{
        calendarBackground: themes[colorScheme].secondary,
        textSectionTitleColor: themes[colorScheme].foreground,
        selectedDayBackgroundColor: themes[colorScheme].primary,
        selectedDayTextColor: themes[colorScheme].background,
        arrowColor: themes[colorScheme].primary,
        monthTextColor: themes[colorScheme].foreground,
        dayTextColor: themes[colorScheme].foreground,
        textDisabledColor: themes[colorScheme].mutedForeground,
        textMonthFontWeight: '700',
        textDayHeaderFontSize: 10,
        textMonthFontSize: 16,
      }}
      onDayPress={(day) => {
        onPress(day.dateString)
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
        },
      }}
    />
  )
}
