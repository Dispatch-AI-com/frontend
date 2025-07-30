'use client';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import type { CalendarItem } from '@/app/admin/settings/components/CalendarForm';
import CalendarOptionsList from '@/app/admin/settings/components/CalendarForm';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import {
  useGetGoogleAuthURLMutation,
  useHandleGoogleAuthCallbackMutation,
  useLinkGoogleAccountMutation,
  useRevokeGoogleAuthMutation,
} from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';
import {
  checkCalendarIntegrationStatus,
  getGoogleAccountForCalendar,
} from '@/utils/calendarUtils';
import {
  checkForGoogleAuthCallback,
  initiateGoogleAuth,
  isValidGoogleEmail,
} from '@/utils/googleAuthUtils';

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
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkEmail, setLinkEmail] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  // get current user info
  const user = useAppSelector(state => state.auth.user);
  const userEmail = user?.email ?? 'email51@company.com'; // default value as fallback

  // check Google Calendar integration status
  const integrationStatus = checkCalendarIntegrationStatus(user);
  const googleAccount = getGoogleAccountForCalendar(user);

  // RTK Query hooks
  const [getGoogleAuthURL] = useGetGoogleAuthURLMutation();
  const [handleGoogleAuthCallback] = useHandleGoogleAuthCallbackMutation();
  const [linkGoogleAccount] = useLinkGoogleAccountMutation();
  const [revokeGoogleAuth] = useRevokeGoogleAuthMutation();

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
      name: googleAccount?.email ?? userEmail,
      color: '#989ffd',
      checked: true,
    },
  ]);

  // use useCallback to avoid dependency issues
  const handleGoogleCallback = useCallback(
    async (code: string, state: string) => {
      setIsAuthorizing(true);
      setAuthError(null);

      try {
        const result = await handleGoogleAuthCallback({ code, state }).unwrap();

        if (result.success) {
          setIsConnected(true);
          // clear URL parameters
          router.replace('/admin/settings');
        } else {
          setAuthError('Failed to complete Google authorization');
        }
      } catch {
        setAuthError('An error occurred during Google authorization');
      } finally {
        setIsAuthorizing(false);
      }
    },
    [handleGoogleAuthCallback, router],
  );

  // check Google OAuth callback in URL parameters
  useEffect(() => {
    const { code, state, error } = checkForGoogleAuthCallback();

    if (error) {
      setAuthError('Google authorization was cancelled or failed');
      return;
    }

    if (code && state) {
      void handleGoogleCallback(code, state);
    }
  }, [handleGoogleCallback]);

  //  when userEmail changes, update the calendar list
  useEffect(() => {
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === 'email'
          ? { ...cal, name: googleAccount?.email ?? userEmail }
          : cal,
      ),
    );
  }, [userEmail, googleAccount?.email]);

  const handleConnect = useCallback(async () => {
    if (integrationStatus.canUseGoogleCalendar) {
      setIsAuthorizing(true);
      setAuthError(null);

      try {
        const { authUrl } = await initiateGoogleAuth(getGoogleAuthURL);
        // redirect to Google authorization page
        window.location.href = authUrl;
      } catch {
        setAuthError('Failed to start Google authorization');
        setIsAuthorizing(false);
      }
    } else {
      // show link Google account dialog
      setShowLinkDialog(true);
    }
  }, [integrationStatus.canUseGoogleCalendar, getGoogleAuthURL]);

  const handleRemove = useCallback(async () => {
    try {
      await revokeGoogleAuth().unwrap();
      setIsConnected(false);
      setShowGoogleEvents(true);
      setCalendars(prev =>
        prev.map(cal => ({
          ...cal,
          checked: cal.id === 'email',
        })),
      );
    } catch {
      setAuthError('Failed to revoke Google authorization');
    }
  }, [revokeGoogleAuth]);

  const handleCalendarToggle = (calendarId: string) => {
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal,
      ),
    );
  };

  const handleLinkGoogleAccount = useCallback(async () => {
    if (!linkEmail || !isValidGoogleEmail(linkEmail)) {
      setAuthError('Please enter a valid Gmail address');
      return;
    }

    setIsAuthorizing(true);
    setAuthError(null);

    try {
      const result = await linkGoogleAccount({
        googleEmail: linkEmail,
      }).unwrap();

      if (result.success) {
        setShowLinkDialog(false);
        setLinkEmail('');
        // re-check integration status
        window.location.reload();
      } else {
        setAuthError(result.message || 'Failed to link Google account');
      }
    } catch {
      setAuthError('An error occurred while linking Google account');
    } finally {
      setIsAuthorizing(false);
    }
  }, [linkEmail, linkGoogleAccount]);

  const handleConnectClick = useCallback(() => {
    void handleConnect();
  }, [handleConnect]);

  const handleRemoveClick = useCallback(() => {
    void handleRemove();
  }, [handleRemove]);

  const handleLinkGoogleAccountClick = useCallback(() => {
    void handleLinkGoogleAccount();
  }, [handleLinkGoogleAccount]);

  const getStatusMessage = () => {
    if (authError) {
      return (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setAuthError(null)}
        >
          {authError}
        </Alert>
      );
    }

    if (integrationStatus.hasCalendarAccess) {
      return null; // already connected, no message
    }

    if (integrationStatus.canUseGoogleCalendar) {
      return (
        <Alert severity="info" sx={{ mb: 2 }}>
          You can connect to Google Calendar, but you need to authorize to use
          this feature.
        </Alert>
      );
    }

    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        {integrationStatus.reason}
        {!integrationStatus.isGmailAccount &&
          !integrationStatus.isGoogleLogin && (
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowLinkDialog(true)}
              >
                Link Google Account
              </Button>
            </Box>
          )}
      </Alert>
    );
  };

  return (
    <>
      <SectionDivider />
      <SectionHeader title="Integrations" />

      {getStatusMessage()}

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
                  {googleAccount?.email ?? userEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sync your appointments to Google Calendar. Online booking
                  times will be unavailable for any Google events marked as
                  busy.
                </Typography>
                {integrationStatus.hasGoogleAccountLinked && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Linked Google Account: {integrationStatus.linkedGoogleEmail}
                  </Typography>
                )}
              </ContentSection>
            </IconAndContentRow>
          </LeftSection>

          {isConnected ? (
            <RemoveButton onClick={handleRemoveClick} disabled={isAuthorizing}>
              {isAuthorizing ? <CircularProgress size={16} /> : 'Remove'}
            </RemoveButton>
          ) : (
            <ConnectButton
              onClick={handleConnectClick}
              disabled={
                !integrationStatus.canUseGoogleCalendar || isAuthorizing
              }
            >
              {isAuthorizing ? (
                <CircularProgress size={16} color="inherit" />
              ) : integrationStatus.hasCalendarAccess ? (
                'Connect'
              ) : (
                'Authorize'
              )}
            </ConnectButton>
          )}
        </IntegrationItem>

        {isConnected && (
          <ConnectedInfo>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Connected account:
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              {googleAccount?.email ?? userEmail}
            </Typography>

            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={showGoogleEvents}
                  onChange={e => setShowGoogleEvents(e.target.checked)}
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

      {/* Google account link dialog */}
      <Dialog
        open={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Link Google Account</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            To use Google Calendar, you need to link a Google account. Please
            enter the Gmail address you want to link:
          </Typography>
          <TextField
            label="Google Email Address"
            type="email"
            value={linkEmail}
            onChange={e => setLinkEmail(e.target.value)}
            placeholder="your-email@gmail.com"
            fullWidth
            sx={{ mb: 2 }}
            error={!!(linkEmail && !isValidGoogleEmail(linkEmail))}
            helperText={
              linkEmail && !isValidGoogleEmail(linkEmail)
                ? 'Please enter a valid Gmail address'
                : ''
            }
          />
          <Typography variant="caption" color="text.secondary">
            After linking, you will need to authorize access to your Google
            Calendar.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowLinkDialog(false)}
            disabled={isAuthorizing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLinkGoogleAccountClick}
            variant="contained"
            disabled={!isValidGoogleEmail(linkEmail) || isAuthorizing}
          >
            {isAuthorizing ? <CircularProgress size={16} /> : 'Link Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
