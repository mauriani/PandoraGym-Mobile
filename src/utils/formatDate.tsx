import { getStartWorkoutStorage } from '@storage/index'
import { differenceInMilliseconds } from 'date-fns'
import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(tz)

export function dateFormatter(dateString: string) {
  return dayjs(dateString).utc().tz().format('DD/MM/YYYY')
}

export function onFinallyWorkoutTime() {
  const endTime = new Date()
  const startTime = getStartWorkoutStorage()

  const diffInMilliseconds = differenceInMilliseconds(endTime, startTime)

  const seconds = diffInMilliseconds / 1000

  return seconds
}
