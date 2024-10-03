import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(tz)

export function dateFormatter(dateString: string) {
  return dayjs(dateString).utc().tz().format('DD/MM/YYYY')
}
