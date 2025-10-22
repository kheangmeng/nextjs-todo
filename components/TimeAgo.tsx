import { parseISO, formatDistanceToNow } from 'date-fns';
import type React from 'react';

interface TimeAgoProps extends React.ComponentPropsWithoutRef<'time'> {
  dateString: string;
}

export const TimeAgo = ({ dateString, ...props }: TimeAgoProps) => {
  const date = parseISO(dateString);
  return <time suppressHydrationWarning={true} dateTime={dateString} {...props}>{formatDistanceToNow(date)}</time>;
}
