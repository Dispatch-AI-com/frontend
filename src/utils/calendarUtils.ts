import type { useRefreshGoogleTokenMutation } from '@/features/auth/authApi';
import type {
  CalendarEvent,
  usePushCalendarEventMutation,
} from '@/features/calendar/calendarApi';
import { refreshGoogleTokenIfNeeded } from '@/utils/googleAuthUtils';

export type EventType = 'booking' | 'service' | 'reminder' | 'followup';

// Google Calendar集成状态
export interface CalendarIntegrationStatus {
  canUseGoogleCalendar: boolean;
  isGmailAccount: boolean;
  isGoogleLogin: boolean;
  hasGoogleAccountLinked: boolean;
  hasCalendarAccess: boolean;
  reason?: string;
  linkedGoogleEmail?: string;
}

// Google账户关联信息
export interface GoogleAccountLink {
  primaryEmail: string; // 用户的主要邮箱
  googleEmail?: string; // 关联的Google邮箱
  googleAccessToken?: string;
  googleRefreshToken?: string;
  tokenExpiresAt?: Date;
  calendarAccessGranted: boolean;
  lastSyncTime?: Date;
}

// 用户类型定义
export interface User {
  email?: string;
  provider?: string;
  googleAccountLink?: GoogleAccountLink;
}

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

/**
 * 检查用户是否可以使用Google Calendar集成
 */
export function checkCalendarIntegrationStatus(
  user: User | null,
): CalendarIntegrationStatus {
  const userEmail = user?.email ?? '';
  const provider = user?.provider;
  const googleAccountLink = user?.googleAccountLink;

  // 检查是否为Gmail账户
  const isGmailAccount =
    userEmail.includes('@gmail.com') || userEmail.includes('@googlemail.com');

  // 检查是否为Google登录
  const isGoogleLogin = provider === 'google';

  // 检查是否有关联的Google账户
  const hasGoogleAccountLinked = !!googleAccountLink?.googleEmail;

  // 检查是否可以连接Google Calendar
  const canUseGoogleCalendar =
    isGmailAccount || isGoogleLogin || hasGoogleAccountLinked;

  // 检查是否已有日历访问权限
  const hasCalendarAccess =
    (isGoogleLogin && isGmailAccount) ||
    (hasGoogleAccountLinked && googleAccountLink?.calendarAccessGranted);

  let reason: string | undefined;

  if (!canUseGoogleCalendar) {
    reason =
      '需要Gmail账户、Google登录或关联Google账户才能使用Google Calendar集成';
  } else if (!hasCalendarAccess) {
    reason = '需要完成Google Calendar授权才能使用此功能';
  }

  return {
    canUseGoogleCalendar,
    isGmailAccount,
    isGoogleLogin,
    hasGoogleAccountLinked,
    hasCalendarAccess,
    reason,
    linkedGoogleEmail: googleAccountLink?.googleEmail,
  };
}

/**
 * 获取用于日历推送的Google账户信息（包含自动刷新）
 */
export async function getGoogleAccountForCalendarWithRefresh(
  user: User | null,
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
): Promise<{ email: string; accessToken?: string } | null> {
  const userEmail = user?.email ?? '';
  const provider = user?.provider;
  const googleAccountLink = user?.googleAccountLink;

  // 如果是Google登录的Gmail用户
  if (
    provider === 'google' &&
    (userEmail.includes('@gmail.com') || userEmail.includes('@googlemail.com'))
  ) {
    return {
      email: userEmail,
      // 这里需要从JWT或session中获取access_token
      accessToken: undefined, // 实际实现中需要获取
    };
  }

  // 如果有关联的Google账户
  if (
    googleAccountLink?.googleEmail &&
    googleAccountLink?.calendarAccessGranted
  ) {
    // 检查并刷新token
    const currentTokenInfo = googleAccountLink.tokenExpiresAt
      ? {
          accessToken: googleAccountLink.googleAccessToken ?? '',
          refreshToken: googleAccountLink.googleRefreshToken ?? '',
          expiresAt: new Date(googleAccountLink.tokenExpiresAt),
          tokenType: 'Bearer',
        }
      : undefined;

    const refreshedToken = await refreshGoogleTokenIfNeeded(
      refreshGoogleToken,
      currentTokenInfo,
    );

    return {
      email: googleAccountLink.googleEmail,
      accessToken: refreshedToken ?? googleAccountLink.googleAccessToken,
    };
  }

  return null;
}

/**
 * 获取用于日历推送的Google账户信息（不包含刷新）
 */
export function getGoogleAccountForCalendar(
  user: User | null,
): { email: string; accessToken?: string } | null {
  const userEmail = user?.email ?? '';
  const provider = user?.provider;
  const googleAccountLink = user?.googleAccountLink;

  // if the user is a Google login Gmail user
  if (
    provider === 'google' &&
    (userEmail.includes('@gmail.com') || userEmail.includes('@googlemail.com'))
  ) {
    return {
      email: userEmail,
      // here we need to get the access_token from JWT or session
      accessToken: undefined, // actually we need to get it
    };
  }

  // if there is a linked Google account
  if (
    googleAccountLink?.googleEmail &&
    googleAccountLink?.calendarAccessGranted
  ) {
    return {
      email: googleAccountLink.googleEmail,
      accessToken: googleAccountLink.googleAccessToken,
    };
  }

  return null;
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
    eventDescription += `\nClient info:\nName: ${clientInfo.name}\nPhone: ${clientInfo.phone}`;
    if (clientInfo.email) {
      eventDescription += `\nEmail: ${clientInfo.email}`;
    }
  }

  if (serviceInfo) {
    eventDescription += `\nService info:\nService: ${serviceInfo.name}\nPrice: $${serviceInfo.price}\nDuration: ${serviceInfo.duration} minutes`;
  }

  return {
    title,
    start: start.toISOString(),
    end: end.toISOString(),
    description: eventDescription.trim(),
    location: location ?? 'TBD',
    organizer: organizer ?? '',
  };
}

/**
 * push service booking event to Google Calendar
 */
export async function pushBookingEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
  user: User | null,
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
    title: `Service booking: ${clientName}`,
    start: bookingTime,
    end: endTime,
    description: notes ?? '',
    location: location ?? 'TBD',
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
    // get and refresh Google account info
    const googleAccount = await getGoogleAccountForCalendarWithRefresh(
      user,
      refreshGoogleToken,
    );

    if (!googleAccount?.accessToken) {
      return { success: false, error: 'Cannot get valid Google access token' };
    }

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
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
  user: User | null,
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
    title: `Service task: ${serviceName}`,
    start: serviceTime,
    end: endTime,
    description: serviceDescription,
    location: location ?? 'TBD',
    organizer: organizer ?? '',
    eventType: 'service',
    serviceInfo: {
      name: serviceName,
      price: servicePrice,
      duration: serviceDuration,
    },
  });

  try {
    // get and refresh Google account info
    const googleAccount = await getGoogleAccountForCalendarWithRefresh(
      user,
      refreshGoogleToken,
    );

    if (!googleAccount?.accessToken) {
      return { success: false, error: 'Cannot get valid Google access token' };
    }

    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function pushReminderEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
  user: User | null,
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
    title: `Reminder: ${title}`,
    start: reminderTime,
    end: endTime,
    description,
    location: location ?? 'TBD',
    organizer: organizer ?? '',
    eventType: 'reminder',
  });

  try {
    // get and refresh Google account info
    const googleAccount = await getGoogleAccountForCalendarWithRefresh(
      user,
      refreshGoogleToken,
    );

    if (!googleAccount?.accessToken) {
      return { success: false, error: 'Cannot get valid Google access token' };
    }

    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function pushFollowupEvent(
  pushCalendarEvent: ReturnType<typeof usePushCalendarEventMutation>[0],
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
  user: User | null,
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
    title: `Follow up: ${clientName}`,
    start: followupTime,
    end: endTime,
    description: `Follow up reason: ${reason}\nClient phone: ${clientPhone}`,
    location: location ?? 'TBD',
    organizer: organizer ?? '',
    eventType: 'followup',
    clientInfo: {
      name: clientName,
      phone: clientPhone,
    },
  });

  try {
    // get and refresh Google account info
    const googleAccount = await getGoogleAccountForCalendarWithRefresh(
      user,
      refreshGoogleToken,
    );

    if (!googleAccount?.accessToken) {
      return { success: false, error: 'Cannot get valid Google access token' };
    }

    const result = await pushCalendarEvent(eventData).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}
