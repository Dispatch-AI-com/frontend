'use client';

import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { format, isToday, parseISO } from 'date-fns';
import Image from 'next/image';

import HalfCircleProgress from '@/components/ui/HalfCircleProgress';
import { useGetTodayMetricsQuery } from '@/features/callog/calllogApi';
import { useGetTwilioPhoneNumberQuery } from '@/features/overview/overviewApi';
import { useGetBookingsQuery } from '@/features/service/serviceBookingApi';
import { useSubscription } from '@/features/subscription/useSubscription';
import { useAppSelector } from '@/redux/hooks';
import { getPlanTier, isFreeOrBasicPlan } from '@/utils/planUtils';

function formatSubscriptionPeriod(
  start?: string | Date,
  end?: string | Date,
): string {
  if (!start || !end) return '--';
  try {
    return `${format(new Date(start), 'yyyy/MM/dd')} - ${format(new Date(end), 'yyyy/MM/dd')}`;
  } catch {
    return '--';
  }
}

const PageGrid = styled(Box, {
  shouldForwardProp: prop => prop !== 'equal',
})<{ equal: boolean }>(({ equal }) => ({
  display: 'grid',
  width: '100%',
  gap: 24,
  '@media (max-width: 450px)': {
    gap: 12,
  },

  gridTemplateColumns: equal ? '1fr 2fr' : '6fr 5fr',
}));

const Title = styled(Typography)({
  fontSize: 'clamp(14px, 2vw, 16px)',
  fontWeight: 700,
  color: '#060606',
  marginBottom: 16,
});

const ActivityGrid = styled(Box)({
  display: 'grid',
  gap: 12,
  justifyItems: 'start',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
});

const InfoGrid = styled(Box)({
  alignItems: 'center',
  display: 'grid',
  gap: 24,
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  '@media (max-width: 450px)': {
    gap: 12,
  },
});

const StatCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: 16,
  border: '1px solid #eaeaea',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '152px',
  [theme.breakpoints.down('sm')]: { padding: '12px' },
}));

const TypeColors = {
  phone: '#fff0e6',
  book: '#e1f0ff',
  follow: '#e7f8dc',
} as const;

const IconWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'variant',
})<{ variant: 'phone' | 'book' | 'follow' }>(({ variant }) => ({
  width: 32,
  height: 32,
  padding: 8,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: TypeColors[variant],
  flexShrink: 0,
}));

const Label = styled(Typography)({
  fontSize: 'clamp(12px, 1.6vw, 14px)',
  color: '#060606',
  marginLeft: 12,
  marginBottom: 12,
  minHeight: 30,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
});

const Value = styled(Typography)({
  fontSize: 'clamp(24px, 4vw, 36px)',
  fontWeight: 800,
  color: '#060606',
  marginLeft: 44,
});

const InfoCard = styled(Box, {
  shouldForwardProp: prop => prop !== 'bgcolor',
})<{ bgcolor: string }>(({ bgcolor }) => ({
  padding: 20,
  borderRadius: 16,
  backgroundColor: bgcolor,
  maxWidth: '100%',
  height: '188px',
  '@media (max-width: 450px)': {
    padding: 12,
  },
}));

const PlanTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: 'clamp(18px, 2.2vw, 20px)',
  fontWeight: 800,
  color: '#060606',
  display: 'inline-block',
});

const SubTitle = styled(Typography)({
  fontSize: 'clamp(12px, 1.8vw, 14px)',
  color: '#6d6d6d',
  marginBottom: 16,
  display: 'inline-block',
});

const UserName = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: 'clamp(14px, 2vw, 16px)',
  fontWeight: 800,
  lineHeight: 1.25,
  color: '#fff',
  alignContent: 'center',
});

export default function ActivitySection() {
  const user = useAppSelector(state => state.auth.user);
  const userId = useAppSelector(state => state.auth.user?._id);
  const { data } = useGetTodayMetricsQuery(userId ?? '', { skip: !userId });
  const { subscription } = useSubscription();

  // Check if user has FREE or BASIC plan
  const planTier = getPlanTier(subscription);
  const shouldHideBookingFeatures = isFreeOrBasicPlan(planTier);

  const { data: bookings } = useGetBookingsQuery({ userId }, { skip: !userId });

  const todayBookings = (bookings ?? []).filter(booking => {
    const time =
      typeof booking.bookingTime === 'string'
        ? parseISO(booking.bookingTime)
        : booking.bookingTime;
    return isToday(time);
  });

  const doneToday = todayBookings.filter(b => b.status === 'Done').length;
  const confirmedToday = todayBookings.filter(
    b => b.status === 'Confirmed',
  ).length;

  const { data: { twilioPhoneNumber } = {} } = useGetTwilioPhoneNumberQuery(
    userId ?? '',
    { skip: !userId },
  );

  return (
    <PageGrid equal={shouldHideBookingFeatures}>
      <Box>
        <Title>Today's Activity</Title>
        <ActivityGrid>
          <StatCard>
            <Box display="flex">
              <IconWrapper variant="phone">
                <Image
                  src="/overview/phone.svg"
                  alt="phone"
                  width={16}
                  height={16}
                />
              </IconWrapper>
              <Label>Number of Phone Calls Received</Label>
            </Box>
            <Value>{data?.totalCalls ?? 0}</Value>
          </StatCard>

          {!shouldHideBookingFeatures && (
            <StatCard>
              <Box display="flex">
                <IconWrapper variant="book">
                  <Image
                    src="/overview/book.svg"
                    alt="booked"
                    width={16}
                    height={16}
                  />
                </IconWrapper>
                <Label>Number of Bookings Done</Label>
              </Box>
              <Value>{doneToday}</Value>
            </StatCard>
          )}

          {!shouldHideBookingFeatures && (
            <StatCard>
              <Box display="flex">
                <IconWrapper variant="follow">
                  <Image
                    src="/overview/follow.svg"
                    alt="follow up"
                    width={16}
                    height={16}
                  />
                </IconWrapper>
                <Label>Number of Bookings Confirmed</Label>
              </Box>
              <Value>{confirmedToday}</Value>
            </StatCard>
          )}
        </ActivityGrid>
      </Box>

      <InfoGrid>
        <InfoCard bgcolor="#a8f574">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 1,
              marginBottom: 2,
            }}
          >
            <PlanTitle sx={{ flex: '0 0 auto' }}>
              {subscription?.planId.name ?? 'Free Plan'}
            </PlanTitle>
            <SubTitle
              sx={{ marginBottom: 0, flex: '0 1 auto', textAlign: 'right' }}
            >
              {formatSubscriptionPeriod(
                subscription?.startAt,
                subscription?.endAt,
              )}
            </SubTitle>
          </Box>
          <Box sx={{ justifyItems: 'center' }}>
            <HalfCircleProgress
              value={523}
              maxValue={1000}
              unitText="/Unlimited"
            />
          </Box>
        </InfoCard>

        <InfoCard
          bgcolor="#060606"
          sx={{
            paddingBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                maxWidth: '40px',
                bgcolor: '#e5fcd5',
                color: '#222',
                border: '1px solid #fff',
              }}
            >
              {user?.firstName?.charAt(0)?.toUpperCase() ?? 'U'}
            </Avatar>
            <UserName>
              {user?.firstName ?? ''}
              {user?.lastName ? ` ${user.lastName}` : ''}
            </UserName>
          </Box>

          <Box
            sx={{
              display: 'flex',
              mt: 2,
              p: '8px',
              bgcolor: '#fff',
              borderRadius: '12px',
              flex: 1,
            }}
          >
            <Image
              src="/overview/mynumber.svg"
              alt="number"
              width={16}
              height={16}
            />
            <Box>
              <Typography sx={{ fontSize: '13px', color: '#060606', ml: 1.5 }}>
                Your Number:
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#060606', ml: 1.5 }}>
                {twilioPhoneNumber ?? 'No number assigned'}
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  mt: 1,
                  ml: 1.25,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '12px',
                  bgcolor: '#a8f574',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: '13px',
                    color: '#060606',
                  }}
                >
                  Active
                </Typography>
              </Box>
            </Box>
          </Box>
        </InfoCard>
      </InfoGrid>
    </PageGrid>
  );
}
