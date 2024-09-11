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
        selectedDayBackgroundColor: themes[colorScheme].purple,
        selectedDayTextColor: themes[colorScheme].primary,
        arrowColor: themes[colorScheme].primary,
        monthTextColor: themes[colorScheme].foreground,
        dayTextColor: themes[colorScheme].foreground,
        textDisabledColor: themes[colorScheme].mutedForeground,
        textMonthFontWeight: '700',
        textDayHeaderFontSize: 10,
        textMonthFontSize: 14,
      }}
      onDayPress={(day) => {
        onPress(day.dateString)
      }}
      markingType={'custom'}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          customStyles: {
            container: {
              borderRadius: 0,
            },
          },
        },
      }}
    />
  )
}
