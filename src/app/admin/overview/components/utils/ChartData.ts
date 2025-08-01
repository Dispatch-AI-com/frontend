import { endOfWeek, format, parseISO, startOfWeek } from 'date-fns';

import type { ServiceBooking } from '@/features/service/serviceBookingApi';
import type { ICallLog } from '@/types/calllog.d';

export type SimpleAggregatedLog =
  | { type: 'call'; name: string; count: number }
  | { type: 'service'; name: string; completed: number; followUp: number };

function formatLabel(
  date: Date,
  period: 'daily' | 'weekly' | 'monthly',
): string {
  if (period === 'daily') return format(date, 'do MMM');
  if (period === 'weekly') {
    const start = format(startOfWeek(date), 'do MMM');
    const end = format(endOfWeek(date), 'do MMM');
    return `${start} - ${end}`;
  }
  return format(date, 'MMM');
}

export function CallogsData(
  logs: ICallLog[],
  period: 'daily' | 'weekly' | 'monthly',
): SimpleAggregatedLog[] {
  const map = new Map<string, number>();
  logs.forEach(log => {
    const date =
      typeof log.startAt === 'string' ? parseISO(log.startAt) : log.startAt;
    const key = formatLabel(date, period);
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  return Array.from(map.entries()).map(([name, count]) => ({
    type: 'call',
    name,
    count,
  }));
}

export function ServiceLogsData(
  logs: ServiceBooking[],
  period: 'daily' | 'weekly' | 'monthly',
): SimpleAggregatedLog[] {
  const map = new Map<string, { completed: number; followUp: number }>();

  logs.forEach(log => {
    const date =
      typeof log.bookingTime === 'string'
        ? parseISO(log.bookingTime)
        : log.bookingTime;
    const key = formatLabel(date, period);

    const prev = map.get(key) ?? { completed: 0, followUp: 0 };
    if (log.status === 'Confirmed') prev.followUp += 1;
    if (log.status === 'Done') prev.completed += 1;
    map.set(key, prev);
  });

  return Array.from(map.entries()).map(([name, { completed, followUp }]) => ({
    type: 'service',
    name,
    completed,
    followUp,
  }));
}
