'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { CalendarItem } from '@/app/admin/settings/components/CalendarForm';
import CalendarOptionsList from '@/app/admin/settings/components/CalendarForm';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import ProFeatureModal from '@/components/ui/ProFeatureModal';
import { useAppSelector } from '@/redux/hooks';
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

const ConnectButton = styled(Button, {
  shouldForwardProp: prop => prop !== '$disabled',
})<{ $disabled?: boolean }>(({ $disabled }) => ({
  backgroundColor: $disabled ? '#e0e0e0' : '#000000',
  color: 'white',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: $disabled ? '#e0e0e0' : '#374151',
  },
}));

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

const EmailTypeWarning = styled(Box)({
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeaa7',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    color: '#856404',
  },
});

interface IntegrationsSectionProps {
  editable?: boolean;
  showProBadge?: boolean;
}

export default function IntegrationsSection({
  editable = false,
  showProBadge = false,
}: IntegrationsSectionProps) {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const searchParams = useSearchParams();
  const isEditable =
    editable ||
    user?.role === 'admin' ||
    user?.plan === 'pro' ||
    process.env.NEXT_PUBLIC_FORCE_EDITABLE === 'true';
  const [showProModal, setShowProModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showGoogleEvents, setShowGoogleEvents] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState<string | null>(null);
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [showEmailTypeWarning, setShowEmailTypeWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUnbindSuccess, setShowUnbindSuccess] = useState(false);
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
      name: user?.email ?? process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ?? '',
      color: '#989ffd',
      checked: true,
    },
  ]);

  const getUserId = (): string | null => {
    return user?._id ?? process.env.NEXT_PUBLIC_CALENDAR_USER_ID ?? null;
  };

  const getUserEmail = (): string | null => {
    return user?.email ?? process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ?? null;
  };

  // Get current display email (prioritize Google email, otherwise login email)
  const getDisplayEmail = (): string | null => {
    return googleEmail ?? loginEmail ?? userEmail;
  };

  // Get display email with source label for UI
  const getDisplayEmailInfo = (): {
    email: string | null;
    source: 'google' | 'login' | 'fallback' | null;
  } => {
    if (googleEmail) return { email: googleEmail, source: 'google' };
    if (loginEmail) return { email: loginEmail, source: 'login' };
    return { email: userEmail, source: userEmail ? 'fallback' : null };
  };

  // Check if email is Gmail
  const isGmailEmail = (email: string | null): boolean => {
    if (!email) return false;
    const gmailDomains = ['gmail.com', 'googlemail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return gmailDomains.includes(domain);
  };

  // Get email type information
  const getEmailTypeInfo = (): { isGmail: boolean; message: string } => {
    const currentEmail = loginEmail ?? userEmail;
    const isGmail = isGmailEmail(currentEmail);

    if (isGmail) {
      return {
        isGmail: true,
        message:
          'Your login email is Gmail, you can directly connect to Google Calendar',
      };
    } else {
      return {
        isGmail: false,
        message:
          'Your login email is not Gmail, connecting to Google Calendar requires a Gmail account',
      };
    }
  };

  // Get Google Calendar user information
  const fetchGoogleProfile = async (
    userId: string,
  ): Promise<{
    googleUserId?: string;
    userEmail?: string;
    userName?: string;
    userPicture?: string;
  } | null> => {
    try {
      const response = await fetch(
        buildApiUrl(
          `/calendar-token/user/${encodeURIComponent(userId)}/profile`,
        ),
      );
      if (response.ok) {
        return (await response.json()) as {
          googleUserId?: string;
          userEmail?: string;
          userName?: string;
          userPicture?: string;
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleUnlockPro = () => setShowProModal(true);
  const handleCloseProModal = () => setShowProModal(false);
  const handleUpgrade = () => {
    // Redirect to billing or upgrade page
    window.location.href = '/admin/billing';
  };

  const handleConnect = () => {
    if (!isEditable) return;

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

    // Check if current login email is Gmail
    const emailInfo = getEmailTypeInfo();
    if (!emailInfo.isGmail) {
      // If not Gmail, show confirmation dialog
      const confirmMessage = `${emailInfo.message}\n\nClick "OK" to redirect to Gmail login page, you need to use a Gmail account for authorization.\n\nNote: After connection, the calendar will use your Gmail account, not the current login email.`;
      if (!window.confirm(confirmMessage)) {
        return;
      }
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
      // First, get CSRF token
      const csrfResponse = await fetch(
        buildApiUrl('/calendar-token/csrf-token'),
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!csrfResponse.ok) {
        throw new Error('Failed to get CSRF token');
      }

      const csrfData = (await csrfResponse.json()) as { csrfToken?: string };
      const csrfToken = csrfData.csrfToken;

      if (!csrfToken) {
        throw new Error('No CSRF token received');
      }

      // Then delete the calendar token
      const deleteResponse = await fetch(
        buildApiUrl(`/calendar-token/user/${encodeURIComponent(userId)}`),
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          cache: 'no-store',
        },
      );

      if (deleteResponse.ok) {
        const result = (await deleteResponse.json()) as { message?: string };

        // Reset local state immediately
        setIsConnected(false);
        setGoogleEmail(null);
        setUserEmail(loginEmail);
        setShowGoogleEvents(true);

        // Update calendars to show login email
        setCalendars(prev =>
          prev.map(cal => ({
            ...cal,
            checked: cal.id === 'email',
            name: cal.id === 'email' ? (loginEmail ?? '') : cal.name,
          })),
        );

        // Show warning if login email is not Gmail
        if (loginEmail && !isGmailEmail(loginEmail)) {
          setShowEmailTypeWarning(true);
        }

        // 使用路由替换并附加一次性標記，避免緊接著的有效性檢查誤判
        router.replace('/admin/settings?removed=1');
      } else {
        console.error(
          'Failed to delete calendar token:',
          deleteResponse.status,
          deleteResponse.statusText,
        );
      }
    } catch (error) {
      console.error('Error during calendar token deletion:', error);
      // Reset local UI even if server deletion fails
      setIsConnected(false);
      setGoogleEmail(null);
      setUserEmail(loginEmail);
      setShowGoogleEvents(true);

      // Update calendars and show warning if needed
      setCalendars(prev =>
        prev.map(cal => ({
          ...cal,
          checked: cal.id === 'email',
          name: cal.id === 'email' ? (loginEmail ?? '') : cal.name,
        })),
      );

      if (loginEmail && !isGmailEmail(loginEmail)) {
        setShowEmailTypeWarning(true);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      // Show success snackbar when success=1
      const success = params.get('success');
      const error = params.get('error');
      if (success === '1' && !error) {
        setShowSuccess(true);
        // Immediately remove the 'success' param to avoid repeated snackbar on refresh
        const cleanSuccess = new URL(window.location.href);
        cleanSuccess.searchParams.delete('success');
        window.history.replaceState({}, '', cleanSuccess.toString());
        // Auto close after 2.5s
        setTimeout(() => setShowSuccess(false), 2500);
      }
      // If just removed, skip one backend check and keep disconnected state
      const removed = params.get('removed');
      if (removed === '1') {
        // Prefill with current login email for display
        const currentLogin =
          user?.email ?? process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ?? null;
        setLoginEmail(currentLogin);
        setUserEmail(currentLogin);
        if (currentLogin) {
          setCalendars(prev =>
            prev.map(cal =>
              cal.id === 'email' ? { ...cal, name: currentLogin } : cal,
            ),
          );
        }
        setIsConnected(false);
        setGoogleEmail(null);
        setShowEmailTypeWarning(
          !!(currentLogin && !isGmailEmail(currentLogin)),
        );
        // Show disconnect success snackbar
        setShowUnbindSuccess(true);
        setTimeout(() => setShowUnbindSuccess(false), 2500);
        // Remove 'removed' from URL
        const clean = new URL(window.location.href);
        clean.searchParams.delete('removed');
        window.history.replaceState({}, '', clean.toString());
        return;
      }
      const connected = params.get('connected');
      const gEmail = params.get('gEmail');
      if (connected === 'google') {
        if (window.location.pathname !== '/admin/settings') {
          window.location.replace('/admin/settings?connected=google');
          return;
        }
        // Immediately set connected state to prevent warning from showing
        setIsConnected(true);
        setShowEmailTypeWarning(false);

        // If gEmail is returned, prioritize and persist it
        if (gEmail) {
          setGoogleEmail(gEmail);
          setUserEmail(gEmail);
          // Update email display in calendar list
          setCalendars(prev =>
            prev.map(cal =>
              cal.id === 'email' ? { ...cal, name: gEmail } : cal,
            ),
          );
        } else {
          // No gEmail in URL, try to fetch profile immediately to resolve googleEmail
          const uid = getUserId();
          if (uid) {
            void (async () => {
              const profile = await fetchGoogleProfile(uid);
              if (profile?.userEmail) {
                setGoogleEmail(profile.userEmail);
                setUserEmail(profile.userEmail);
                setCalendars(prev =>
                  prev.map(cal =>
                    cal.id === 'email'
                      ? { ...cal, name: profile.userEmail! }
                      : cal,
                  ),
                );
              }
            })();
          }
        }
        // Early return to prevent further processing
        return;
      }
    }

    const userId = getUserId();
    const email = getUserEmail();

    // Set login email (from localStorage)
    const storedLoginEmail =
      user?.email ?? process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ?? null;
    setLoginEmail(storedLoginEmail);

    // Check if email type warning should be displayed (only when not connected and not Gmail)
    if (!isConnected && storedLoginEmail && !isGmailEmail(storedLoginEmail)) {
      setShowEmailTypeWarning(true);
    }

    // Set current display email
    setUserEmail(email);
    if (email) {
      setCalendars(prev =>
        prev.map(cal => (cal.id === 'email' ? { ...cal, name: email } : cal)),
      );
    }

    const effectiveUserId = userId ?? null;
    if (!effectiveUserId) return;

    // Check if backend already has a valid token
    const checkValid = async () => {
      try {
        const res = await fetch(
          buildApiUrl(
            `/calendar-token/user/${encodeURIComponent(effectiveUserId)}/valid`,
          ),
          { cache: 'no-store' },
        );
        if (res.ok) {
          // Convention: having a valid token means connected
          setIsConnected(true);
          setShowEmailTypeWarning(false); // Hide warning after successful connection
          // Use new profile API to get Google user information
          try {
            const profile = await fetchGoogleProfile(effectiveUserId);
            if (profile?.userEmail) {
              setGoogleEmail(profile.userEmail);
              setUserEmail(profile.userEmail);
              // Update email display in calendar list
              setCalendars(prev =>
                prev.map(cal =>
                  cal.id === 'email'
                    ? { ...cal, name: profile.userEmail! }
                    : cal,
                ),
              );
            }
          } catch {
            // Ignore profile fetch errors
          }
        } else if (res.status === 404) {
          setIsConnected(false);
        }
      } catch {
        // Ignore errors and keep default state
        // If there's an error, assume not connected and clean localStorage
        setIsConnected(false);
      }
    };

    // Run backend validity check immediately
    void checkValid();
  }, []);

  // Listen for URL search param changes (e.g., router.replace with new query on same route)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');
    if (success === '1' && !error) {
      setShowSuccess(true);
      const clean = new URL(window.location.href);
      clean.searchParams.delete('success');
      window.history.replaceState({}, '', clean.toString());
      setTimeout(() => setShowSuccess(false), 2500);
    }
    const removed = params.get('removed');
    if (removed === '1') {
      setShowUnbindSuccess(true);
      const clean = new URL(window.location.href);
      clean.searchParams.delete('removed');
      window.history.replaceState({}, '', clean.toString());
      setTimeout(() => setShowUnbindSuccess(false), 2500);
    }
  }, [searchParams]);

  // When Redux user info is ready, if disconnected or display email is empty, backfill login email and update calendar display
  useEffect(() => {
    const emailFromUser =
      user?.email ?? process.env.NEXT_PUBLIC_CALENDAR_USER_EMAIL ?? null;
    // Only backfill when disconnected or none of the display sources is set to avoid overriding known googleEmail
    const noDisplayEmail = !googleEmail && !loginEmail && !userEmail;
    if (!isConnected || noDisplayEmail) {
      setLoginEmail(emailFromUser);
      if (!googleEmail) {
        setUserEmail(emailFromUser);
        if (emailFromUser) {
          setCalendars(prev =>
            prev.map(cal =>
              cal.id === 'email' ? { ...cal, name: emailFromUser } : cal,
            ),
          );
        }
      }
    }
  }, [user]);

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
  }, [isConnected, getUserId]);

  const handleCalendarToggle = (calendarId: string) => {
    if (!isEditable) return;
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal,
      ),
    );
  };

  return (
    <>
      <SectionDivider />
      <Box mb={1}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <SectionHeader title="Integrations" />
          {/* Pro badge */}
          {showProBadge && !isEditable && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: '#fff2d0',
                padding: '2px 6px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#333',
                border: '1px solid #ffd700',
                mb: '20px',
              }}
            >
              <Image src="/plan/pro.svg" alt="Pro" width={12} height={12} />
              <span style={{ fontSize: '10px', fontWeight: 'bold' }}>PRO</span>
            </Box>
          )}
        </Box>
        {/* Email type warning */}
        {showEmailTypeWarning && !isConnected && (
          <EmailTypeWarning>
            <Typography variant="body2">
              <strong>Note:</strong>
              {getEmailTypeInfo().message}
            </Typography>
          </EmailTypeWarning>
        )}
      </Box>

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
                  {getDisplayEmailInfo().email}
                  {getDisplayEmailInfo().source && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({getDisplayEmailInfo().source})
                    </Typography>
                  )}
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
            <RemoveButton
              onClick={() => void handleRemove()}
              disabled={!isEditable}
            >
              Remove
            </RemoveButton>
          ) : isEditable ? (
            <ConnectButton onClick={handleConnect} disabled={!isEditable}>
              Connect
            </ConnectButton>
          ) : (
            <Button
              variant="contained"
              color="warning"
              onClick={handleUnlockPro}
              sx={{
                backgroundColor: '#fff2d0',
                color: '#333',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#ffd54f',
                },
              }}
              startIcon={
                <Image src="/plan/pro.svg" alt="Pro" width={16} height={16} />
              }
            >
              Unlock with Pro
            </Button>
          )}
        </IntegrationItem>

        {isConnected && (
          <ConnectedInfo>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Connected account:
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              {googleEmail ?? userEmail}
            </Typography>

            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={showGoogleEvents}
                  onChange={e => {
                    if (isEditable) setShowGoogleEvents(e.target.checked);
                  }}
                  size="small"
                  disabled={!isEditable}
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
              editable={isEditable}
            />
          </ConnectedInfo>
        )}
      </InfoRow>

      {/* Render the modal here */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Google Calendar connected successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={showUnbindSuccess}
        autoHideDuration={2500}
        onClose={() => setShowUnbindSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowUnbindSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Google Calendar disconnected successfully
        </Alert>
      </Snackbar>
      <ProFeatureModal
        open={showProModal}
        onClose={handleCloseProModal}
        onUpgrade={handleUpgrade}
        featureName="Calendar Integrations"
      />
    </>
  );
}
