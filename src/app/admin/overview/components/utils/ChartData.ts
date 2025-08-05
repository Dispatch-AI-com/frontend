import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  parseISO,
  startOfDay,
  startOfWeek,
  subDays,
} from 'date-fns';

import type { ServiceBooking } from '@/features/service/serviceBookingApi';
import type { ICallLog } from '@/types/calllog.d';

export type SimpleAggregatedLog =
  | { type: 'call'; name: string; count: number }
  | { type: 'service'; name: string; completed: number; followUp: number };

function formatLabel(
  date: Date,
  period: 'daily' | 'weekly' | 'monthly',
): string {
  if (period === 'daily') return format(date, 'do MMM'); // 5 Aug
  if (period === 'weekly') {
    const start = format(startOfWeek(date), 'do MMM');
    const end = format(endOfWeek(date), 'do MMM');
    return `${start} - ${end}`;
  }
  return format(date, 'MMM'); // Jan, Feb, ...
}

function generateLabels(
  period: 'daily' | 'weekly' | 'monthly',
  isService: boolean,
): string[] {
  const now = startOfDay(new Date());

  if (period === 'daily') {
    const days = eachDayOfInterval({
      start: isService ? now : subDays(now, 14),
      end: isService ? addDays(now, 14) : now,
    });
    return days.map(date => formatLabel(date, period));
  }

  if (period === 'weekly') {
    const weeks = eachWeekOfInterval({
      start: isService ? now : subDays(now, 7 * 4),
      end: isService ? addDays(now, 7 * 4) : now,
    });
    return weeks.map(date => formatLabel(date, period));
  }

  return Array.from({ length: 12 }, (_, i) =>
    format(new Date(now.getFullYear(), i, 1), 'MMM'),
  );
}

// ===== Call Logs =====
export function CallogsData(
  logs: ICallLog[],
  period: 'daily' | 'weekly' | 'monthly',
): SimpleAggregatedLog[] {
  const labels = generateLabels(period, false);
  const map = new Map<string, number>();

  logs.forEach(log => {
    const date =
      typeof log.startAt === 'string' ? parseISO(log.startAt) : log.startAt;
    const label = formatLabel(date, period);
    if (labels.includes(label)) {
      map.set(label, (map.get(label) ?? 0) + 1);
    }
  });

  return labels.map(label => ({
    type: 'call',
    name: label,
    count: map.get(label) ?? 0,
  }));
}

// ===== Service Logs =====
export function ServiceLogsData(
  logs: ServiceBooking[],
  period: 'daily' | 'weekly' | 'monthly',
): SimpleAggregatedLog[] {
  const labels = generateLabels(period, true);
  const map = new Map<string, { completed: number; followUp: number }>();

  logs.forEach(log => {
    const date =
      typeof log.bookingTime === 'string'
        ? parseISO(log.bookingTime)
        : log.bookingTime;
    const label = formatLabel(date, period);
    if (!labels.includes(label)) return;

    const prev = map.get(label) ?? { completed: 0, followUp: 0 };
    if (log.status === 'Confirmed') prev.followUp += 1;
    if (log.status === 'Done') prev.completed += 1;
    map.set(label, prev);
  });

  return labels.map(label => {
    const { completed = 0, followUp = 0 } = map.get(label) ?? {};
    return {
      type: 'service',
      name: label,
      completed,
      followUp,
    };
  });
}
