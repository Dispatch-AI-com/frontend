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
import React, { useState } from 'react';

import type { CalendarItem } from '@/app/admin/settings/components/CalendarForm';
import CalendarOptionsList from '@/app/admin/settings/components/CalendarForm';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import ProFeatureModal from '@/components/ui/ProFeatureModal';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

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

interface IntegrationsSectionProps {
  editable?: boolean;
  showProBadge?: boolean;
}

export default function IntegrationsSection({
  editable = false,
  showProBadge = false,
}: IntegrationsSectionProps) {
  const user = useAppSelector(state => state.auth.user);
  const [showProModal, setShowProModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showGoogleEvents, setShowGoogleEvents] = useState(true);
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
      name: 'email51@company.com',
      color: '#989ffd',
      checked: true,
    },
  ]);

  const handleUnlockPro = () => setShowProModal(true);
  const handleCloseProModal = () => setShowProModal(false);
  const handleUpgrade = () => {
    // Redirect to billing or upgrade page
    window.location.href = '/admin/billing';
  };

  const handleConnect = () => {
    if (!editable) return;
    // TODO: Implement Google Calendar OAuth connection
    setIsConnected(true);
  };

  const handleRemove = () => {
    if (!editable) return;
    setIsConnected(false);
    setShowGoogleEvents(true);
    setCalendars(prev =>
      prev.map(cal => ({
        ...cal,
        checked: cal.id === 'email',
      })),
    );
  };

  const handleCalendarToggle = (calendarId: string) => {
    if (!editable) return;
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal,
      ),
    );
  };

  return (
    <>
      <SectionDivider />
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <SectionHeader title="Integrations" />
        {showProBadge && !editable && (
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
                  {user?.email ?? ''}
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
            <RemoveButton onClick={handleRemove} disabled={!editable}>
              Remove
            </RemoveButton>
          ) : editable ? (
            <ConnectButton onClick={handleConnect} disabled={!editable}>
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
              {user?.email ?? ''}
            </Typography>

            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={showGoogleEvents}
                  onChange={e => {
                    if (editable) setShowGoogleEvents(e.target.checked);
                  }}
                  size="small"
                  disabled={!editable}
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
              editable={editable}
            />
          </ConnectedInfo>
        )}
      </InfoRow>

      {/* Render the modal here */}
      <ProFeatureModal
        open={showProModal}
        onClose={handleCloseProModal}
        onUpgrade={handleUpgrade}
        featureName="Calendar Integrations"
      />
    </>
  );
}
