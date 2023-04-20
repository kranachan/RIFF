import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTimePlugin)

export const toRelativeTime = (date: Date): string => {
  return dayjs().from(date, true)
}
