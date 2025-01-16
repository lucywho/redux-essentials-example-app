import { parseISO, formatDistanceToNow } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

export function TimeAgo({ timestamp }: TimeAgoProps) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return (
    <time title={timestamp} dateTime={timestamp}>
      &nbsp;<i id="timestamp">{timeAgo}</i>
    </time>
  )
}
