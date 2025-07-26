import type { CalendarEvent } from '@/features/calendar/calendarApi';
import type { usePushCalendarEventMutation } from '@/features/calendar/calendarApi';

export type EventType = 'booking' | 'service' | 'reminder' | 'followup';

export interface CalendarEventData {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  organizer?: string;
  eventType?: EventType;
  clientInfo?: {
    name: string;
    phone: string;
    email?: string;
  };
  serviceInfo?: {
    name: string;
    price: number;
    duration: number;
  };
}

export function createCalendarEventData(
  data: CalendarEventData,
): CalendarEvent {
  const {
    title,
    start,
    end,
    description,
    location,
    organizer,
    eventType,
    clientInfo,
    serviceInfo,
  } = data;

  let eventDescription = description ?? '';

  if (eventType === 'booking' && clientInfo) {
    eventDescription += `\n客户信息:\n姓名: ${clientInfo.name}\n电话: ${clientInfo.phone}`;
    if (clientInfo.email) {
      eventDescription += `\n邮箱: ${clientInfo.email}`;
    }
  }

  if (serviceInfo) {
    eventDescription += `\n服务信息:\n服务: ${serviceInfo.name}\n价格: $${serviceInfo.price}\n时长: ${serviceInfo.duration}分钟`;
  }

  return {
    title,
    start: start.toISOString(),
    end: end.toISOString(),
    description: eventDescription.trim(),
    location: location ?? '待定',
    organizer: organizer ?? '',
  };
}

/**
 * push service booking event to Google Calendar
 */
export async function pushBookingEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  bookingData: {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    serviceName: string;
    servicePrice: number;
    serviceDuration: number;
    bookingTime: Date;
    location?: string;
    notes?: string;
    organizer?: string;
  },
) {
  const {
    clientName,
    clientPhone,
    clientEmail,
    serviceName,
    servicePrice,
    serviceDuration,
    bookingTime,
    location,
    notes,
    organizer,
  } = bookingData;

  const endTime = new Date(bookingTime.getTime() + serviceDuration * 60000);

  const eventData = createCalendarEventData({
    title: `服务预订: ${clientName}`,
    start: bookingTime,
    end: endTime,
    description: notes ?? '',
    location: location ?? '待定',
    organizer: organizer ?? '',
    eventType: 'booking',
    clientInfo: {
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
    },
    serviceInfo: {
      name: serviceName,
      price: servicePrice,
      duration: serviceDuration,
    },
  });

  try {
    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * 推送服务任务事件到Google Calendar
 */
export async function pushServiceEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  serviceData: {
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    serviceDuration: number;
    serviceTime: Date;
    location?: string;
    organizer?: string;
  },
) {
  const {
    serviceName,
    serviceDescription,
    servicePrice,
    serviceDuration,
    serviceTime,
    location,
    organizer,
  } = serviceData;

  const endTime = new Date(serviceTime.getTime() + serviceDuration * 60000);

  const eventData = createCalendarEventData({
    title: `服务任务: ${serviceName}`,
    start: serviceTime,
    end: endTime,
    description: serviceDescription,
    location: location ?? '待定',
    organizer: organizer ?? '',
    eventType: 'service',
    serviceInfo: {
      name: serviceName,
      price: servicePrice,
      duration: serviceDuration,
    },
  });

  try {
    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function pushReminderEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  reminderData: {
    title: string;
    description: string;
    reminderTime: Date;
    duration?: number;
    location?: string;
    organizer?: string;
  },
) {
  const {
    title,
    description,
    reminderTime,
    duration = 30,
    location,
    organizer,
  } = reminderData;

  const endTime = new Date(reminderTime.getTime() + duration * 60000);

  const eventData = createCalendarEventData({
    title: `提醒: ${title}`,
    start: reminderTime,
    end: endTime,
    description,
    location: location ?? '待定',
    organizer: organizer ?? '',
    eventType: 'reminder',
  });

  try {
    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function pushFollowupEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  followupData: {
    clientName: string;
    clientPhone: string;
    followupTime: Date;
    reason: string;
    duration?: number;
    location?: string;
    organizer?: string;
  },
) {
  const {
    clientName,
    clientPhone,
    followupTime,
    reason,
    duration = 60,
    location,
    organizer,
  } = followupData;

  const endTime = new Date(followupTime.getTime() + duration * 60000);

  const eventData = createCalendarEventData({
    title: `跟进: ${clientName}`,
    start: followupTime,
    end: endTime,
    description: `跟进原因: ${reason}\n客户电话: ${clientPhone}`,
    location: location ?? '待定',
    organizer: organizer ?? '',
    eventType: 'followup',
    clientInfo: {
      name: clientName,
      phone: clientPhone,
    },
  });

  try {
    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}
