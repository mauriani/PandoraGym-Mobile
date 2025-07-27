import {
  formatTime,
  convertSecondsToMinutes,
  secondsToHourMinute,
  timeStringToSeconds
} from '../formatTime'

describe('formatTime utils', () => {
  describe('formatTime', () => {
    it('formats seconds correctly', () => {
      expect(formatTime(0)).toBe('00:00')
      expect(formatTime(30)).toBe('00:30')
      expect(formatTime(60)).toBe('01:00')
      expect(formatTime(90)).toBe('01:30')
      expect(formatTime(3661)).toBe('61:01')
    })

    it('handles edge cases', () => {
      expect(formatTime(59)).toBe('00:59')
      expect(formatTime(3600)).toBe('60:00')
      expect(formatTime(1)).toBe('00:01')
    })
  })

  describe('convertSecondsToMinutes', () => {
    it('converts seconds to minutes format correctly', () => {
      expect(convertSecondsToMinutes(0)).toBe('00:00')
      expect(convertSecondsToMinutes(30)).toBe('00:30')
      expect(convertSecondsToMinutes(60)).toBe('01:00')
      expect(convertSecondsToMinutes(90)).toBe('01:30')
      expect(convertSecondsToMinutes(125)).toBe('02:05')
    })

    it('handles large numbers', () => {
      expect(convertSecondsToMinutes(3661)).toBe('61:01')
      expect(convertSecondsToMinutes(7200)).toBe('120:00')
    })
  })

  describe('secondsToHourMinute', () => {
    it('converts seconds to hour:minute format', () => {
      expect(secondsToHourMinute(0)).toBe('00h:00min')
      expect(secondsToHourMinute(60)).toBe('00h:01min')
      expect(secondsToHourMinute(3600)).toBe('01h:00min')
      expect(secondsToHourMinute(3661)).toBe('01h:01min')
      expect(secondsToHourMinute(7200)).toBe('02h:00min')
    })

    it('handles complex time calculations', () => {
      expect(secondsToHourMinute(3725)).toBe('01h:02min') // 1 hour, 2 minutes, 5 seconds
      expect(secondsToHourMinute(5400)).toBe('01h:30min') // 1 hour, 30 minutes
      expect(secondsToHourMinute(10800)).toBe('03h:00min') // 3 hours
    })

    it('handles edge cases', () => {
      expect(secondsToHourMinute(59)).toBe('00h:00min') // Less than a minute
      expect(secondsToHourMinute(119)).toBe('00h:01min') // 1 minute, 59 seconds
    })
  })

  describe('timeStringToSeconds', () => {
    it('converts time string to seconds correctly', () => {
      expect(timeStringToSeconds('00:00')).toBe(0)
      expect(timeStringToSeconds('00:30')).toBe(30)
      expect(timeStringToSeconds('01:00')).toBe(60)
      expect(timeStringToSeconds('01:30')).toBe(90)
      expect(timeStringToSeconds('02:05')).toBe(125)
    })

    it('handles larger time values', () => {
      expect(timeStringToSeconds('10:00')).toBe(600)
      expect(timeStringToSeconds('15:45')).toBe(945)
      expect(timeStringToSeconds('60:00')).toBe(3600)
    })

    it('handles single digit values', () => {
      expect(timeStringToSeconds('5:30')).toBe(330)
      expect(timeStringToSeconds('0:5')).toBe(5)
      expect(timeStringToSeconds('1:1')).toBe(61)
    })
  })

  describe('integration tests', () => {
    it('formatTime and timeStringToSeconds are inverse operations', () => {
      const seconds = 125
      const timeString = formatTime(seconds)
      const backToSeconds = timeStringToSeconds(timeString)
      expect(backToSeconds).toBe(seconds)
    })

    it('convertSecondsToMinutes and timeStringToSeconds are inverse operations', () => {
      const seconds = 90
      const timeString = convertSecondsToMinutes(seconds)
      const backToSeconds = timeStringToSeconds(timeString)
      expect(backToSeconds).toBe(seconds)
    })
  })
})
