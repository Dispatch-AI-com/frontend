'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import type { CalendarItem } from '@/app/admin/settings/components/CalendarForm';
import CalendarOptionsList from '@/app/admin/settings/components/CalendarForm';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import theme from '@/theme';

// Backend base URL (e.g., http://localhost:4000 or http://localhost:4000/api)
// Recommended environment variable without /api (e.g., http://localhost:4000). For compatibility, prevent duplicate concatenation here.
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
  /\/+$/,
  '',
);

const buildApiUrl = (path: string): string => {
  // Normalize path to start with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return normalizedPath; // Relative path, delegate to same-origin proxy

  return `${API_BASE}${normalizedPath}`;
};

const InfoRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
});

const IntegrationItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%',
});

const LeftSection = styled(Box)({
  flex: 1,
});

const ContentSection = styled(Box)({
  flex: 1,
});

const IconAndContentRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
});

const ConnectButton = styled(Button)({
  backgroundColor: '#000000',
  color: 'white',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#374151',
  },
});

const RemoveButton = styled(Button)({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
});

const ConnectedInfo = styled(Box)({
  width: '100%',
});

const CustomCheckbox = styled(Checkbox)({
  padding: 0,
  marginRight: theme.spacing(1),
  alignSelf: 'flex-start',
  '&.Mui-checked': {
    color: '#58c112',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
  '&:not(.Mui-checked) .MuiSvgIcon-root': {
    color: '#e0e0e0',
    border: '1px solid #e0e0e0',
    borderRadius: 3,
  },
});

export default function IntegrationsSection() {
  const [isConnected, setIsConnected] = useState(false);
  const [showGoogleEvents, setShowGoogleEvents] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [calendars, setCalendars] = useState<CalendarItem[]>([
    { id: 'family', name: 'Family', color: '#d076eb', checked: false },
    { id: 'birthdays', name: 'Birthdays', color: '#ae725d', checked: false },
    {
      id: 'holidays',
      name: 'Holidays in Australia',
      color: '#f590b2',
      checked: false,
    },
    {
      id: 'email',
      name:
        (typeof window !== 'undefined'
          ? (localStorage.getItem('userEmail') ??
            process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL)
          : null) ?? '',
      color: '#989ffd',
      checked: true,
    },
  ]);

  const getUserId = (): string | null => {
    // Prefer reading from sessionStorage/localStorage; replace with your global user context if needed
    if (typeof window === 'undefined') return null;
    return (
      localStorage.getItem('userId') ??
      process.env.NEXT_PUBLIC_CALENDAR_USER_ID ??
      null
    );
  };

  const getUserEmail = (): string | null => {
    if (typeof window === 'undefined') return null;
    return (
      localStorage.getItem('userEmail') ??
      process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ??
      null
    );
  };

  const readUserFromStorage = (): { id?: string; email?: string } => {
    if (typeof window === 'undefined') return {};
    const tryParse = (
      val: string | null,
    ): { _id?: string; id?: string; email?: string } | null => {
      if (!val) return null;
      try {
        return JSON.parse(val) as { _id?: string; id?: string; email?: string };
      } catch {
        return null;
      }
    };
    const candidates = [
      localStorage.getItem('user'),
      localStorage.getItem('currentUser'),
      localStorage.getItem('auth_user'),
    ];
    for (const raw of candidates) {
      const obj = tryParse(raw);
      if (obj && (obj._id ?? obj.id)) {
        return { id: obj._id ?? obj.id, email: obj.email };
      }
    }
    // Fallback: try global variables (if any)
    const anyWindow = window as unknown as Record<string, unknown>;
    const globalUser = (anyWindow.__APP_USER__ ??
      anyWindow.__CURRENT_USER__ ??
      anyWindow.user) as
      | { _id?: string; id?: string; email?: string }
      | undefined;
    if (globalUser && (globalUser._id ?? globalUser.id)) {
      return { id: globalUser._id ?? globalUser.id, email: globalUser.email };
    }
    return {};
  };

  const handleConnect = () => {
    const userId = getUserId();
    if (!userId) {
      if (typeof window !== 'undefined') {
        // Replace with a nicer UI toast if desired
        alert(
          'User ID not detected, please login and try again, or set NEXT_PUBLIC_CALENDAR_USER_ID',
        );
      }
      return;
    }
    // Validate MongoDB ObjectId (24 hex chars) to avoid backend 500
    const isValidObjectId = /^[a-f\d]{24}$/i.test(userId);
    if (!isValidObjectId) {
      alert(
        'Invalid user ID format: requires 24-character hexadecimal string (Mongo ObjectId).',
      );
      return;
    }
    // Build state so backend can parse userId and return URL
    const from = encodeURIComponent('/admin/settings?connected=google');
    const stateObj: Record<string, string> = { u: userId, from };
    // If backend supports login_hint, include email in state for future use
    if (userEmail) {
      stateObj.e = userEmail;
    }
    const state = encodeURIComponent(JSON.stringify(stateObj));
    const userParam = userId ? `userId=${encodeURIComponent(userId)}` : '';
    const joiner = userParam ? '&' : '';
    // Redirect to backend OAuth entry
    if (typeof window !== 'undefined') {
      window.location.href = `${buildApiUrl('/calendar/oauth/google')}?${userParam}${joiner}state=${state}`;
    }
  };

  const handleRemove = async () => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm(
        'Are you sure you want to remove the connection to Google Calendar?',
      );
      if (!ok) return;
    }
    const userId = getUserId();
    if (!userId) {
      // Without userId we cannot delete server token; reset local UI only
      setIsConnected(false);
      setShowGoogleEvents(true);
      setCalendars(prev =>
        prev.map(cal => ({
          ...cal,
          checked: cal.id === 'email',
        })),
      );
      return;
    }

    try {
      await fetch(
        buildApiUrl(`/calendar-token/user/${encodeURIComponent(userId)}`),
        {
          method: 'DELETE',
        },
      );
    } catch {
      // Ignore deletion errors; still reset local UI
    }

    setIsConnected(false);
    setShowGoogleEvents(true);
    setCalendars(prev =>
      prev.map(cal => ({
        ...cal,
        checked: cal.id === 'email',
      })),
    );
  };

  useEffect(() => {
    // Handle callback param /settings/calendar?connected=google
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const connected = params.get('connected');
      if (connected === 'google') {
        if (window.location.pathname !== '/admin/settings') {
          window.location.replace('/admin/settings?connected=google');
          return;
        }
        setIsConnected(true);
      }
    }

    const userId = getUserId();
    const email = getUserEmail();
    setUserEmail(email);
    if (email) {
      setCalendars(prev =>
        prev.map(cal => (cal.id === 'email' ? { ...cal, name: email } : cal)),
      );
    }
    if (!userId) {
      // Fallback: try common storage keys/global variables
      const fromStore = readUserFromStorage();
      if (fromStore.id) {
        localStorage.setItem('userId', fromStore.id);
      }
      if (fromStore.email) {
        localStorage.setItem('userEmail', fromStore.email);
        setUserEmail(fromStore.email);
        setCalendars(prev =>
          prev.map(cal =>
            cal.id === 'email' ? { ...cal, name: fromStore.email! } : cal,
          ),
        );
      }
    }
    const effectiveUserId = userId ?? readUserFromStorage().id ?? null;
    if (!effectiveUserId) return;

    // Check if backend already has a valid token
    const checkValid = async () => {
      try {
        const res = await fetch(
          buildApiUrl(
            `/calendar-token/user/${encodeURIComponent(effectiveUserId)}/valid`,
          ),
        );
        if (res.ok) {
          // Convention: having a valid token means connected
          setIsConnected(true);
        } else if (res.status === 404) {
          setIsConnected(false);
        }
      } catch {
        // Ignore errors and keep default state
      }
    };

    void checkValid();
  }, []);

  useEffect(() => {
    // When connected, periodically check if token is expiring; refresh if needed
    if (!isConnected) return;
    const userId = getUserId();
    if (!userId) return;

    const intervalId = setInterval(
      () => {
        void (async () => {
          try {
            const exp = await fetch(
              buildApiUrl(
                `/calendar-token/user/${encodeURIComponent(userId)}/expiring`,
              ),
            );
            if (exp.ok) {
              const data = (await exp.json()) as { isExpiringSoon?: boolean };
              if (data?.isExpiringSoon) {
                await fetch(
                  buildApiUrl(
                    `/calendar-token/user/${encodeURIComponent(userId)}/refresh`,
                  ),
                  { method: 'POST' },
                );
              }
            }
          } catch {
            // Fail silently; try again in the next interval
          }
        })();
      },
      5 * 60 * 1000,
    ); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [isConnected]);

  const handleCalendarToggle = (calendarId: string) => {
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal,
      ),
    );
  };

  return (
    <>
      <SectionDivider />
      <SectionHeader title="Integrations" />
      <InfoRow>
        <IntegrationItem>
          <LeftSection>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
              Google Calendar:
            </Typography>
            <IconAndContentRow>
              <Image
                src="/dashboard/settings/google-calendar.svg"
                alt="Google Calendar"
                width={70}
                height={70}
                style={{ objectFit: 'contain' }}
              />
              <ContentSection>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  {userEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sync your appointments to Google Calendar. Online booking
                  times will be unavailable for any Google events marked as
                  busy.
                </Typography>
              </ContentSection>
            </IconAndContentRow>
          </LeftSection>

          {isConnected ? (
            <RemoveButton onClick={() => void handleRemove()}>
              Remove
            </RemoveButton>
          ) : (
            <ConnectButton onClick={handleConnect}>Connect</ConnectButton>
          )}
        </IntegrationItem>

        {isConnected && (
          <ConnectedInfo>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Connected account:
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              {userEmail}
            </Typography>

            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={showGoogleEvents}
                  onChange={event => {
                    setShowGoogleEvents(event.target.checked);
                  }}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  Show Google events on calendar by default
                </Typography>
              }
              sx={{
                alignItems: 'flex-start',
                margin: 0,
                '& .MuiFormControlLabel-label': {
                  paddingTop: '2px',
                },
              }}
            />
            <CalendarOptionsList
              calendars={calendars}
              onToggle={handleCalendarToggle}
            />
          </ConnectedInfo>
        )}
      </InfoRow>
    </>
  );
}
