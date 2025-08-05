'use client';
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { isToday, parseISO } from 'date-fns';
import { format } from 'date-fns';
import Image from 'next/image';

import HalfCircleProgress from '@/components/ui/HalfCircleProgress';
import { useGetTodayMetricsQuery } from '@/features/callog/calllogApi';
import { useGetTwilioPhoneNumberQuery } from '@/features/overview/overviewApi';
import { useGetBookingsQuery } from '@/features/service/serviceBookingApi';
import { useSubscription } from '@/features/subscription/useSubscription';
import { useAppSelector } from '@/redux/hooks';

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

const SectionContainer = styled(Box)`
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;

  & > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  @media (max-width: 600px) {
    max-width: 340px;
  }
  @media (min-width: 600px) and (max-width: 800px) {
    max-width: 650px;
  }
  @media (min-width: 800px) and (max-width: 1100px) {
    max-width: 720px;
  }
  @media (min-width: 1100px) and (max-width: 1200px) {
    max-width: 800px;
  }
  @media (min-width: 1200px) {
    max-width: 1220px;
  }
`;

const Title = styled(Typography)({
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#060606',
});

const CardContainer = styled(Box)({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
});

const StatCard = styled(Box)({
  width: 180,
  height: 152,
  padding: '20px 20px 24px',
  borderRadius: 16,
  border: '1px solid #eaeaea',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const TypeColors = {
  phone: '#fff0e6',
  book: '#e1f0ff',
  follow: '#e7f8dc',
};

const IconWrapper = styled('div')<{ type: 'phone' | 'book' | 'follow' }>(
  ({ type }) => ({
    width: 32,
    height: 32,
    padding: 8,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TypeColors[type],
  }),
);

const Label = styled(Typography)({
  fontSize: 14,
  color: '#060606',
  marginLeft: 12,
  marginBottom: 24,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'normal',
});

const Value = styled(Typography)({
  fontSize: 36,
  fontWeight: 'bold',
  color: '#060606',
  marginLeft: 44,
});

const InfoCard = styled(Box)(({ bgcolor }: { bgcolor: string }) => ({
  width: '256px',
  height: '188px',
  padding: '20px 20px 0 20px',
  borderRadius: '16px',
  backgroundColor: bgcolor,
}));

const PlanTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#060606',
});

const SubTitle = styled(Typography)({
  fontSize: '14px',
  color: '#6d6d6d',
  marginBottom: '16px',
});

const UserName = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 1.25,
  color: '#fff',
});

export default function ActivitySection() {
  const user = useAppSelector(state => state.auth.user);
  const userId = useAppSelector(state => state.auth.user?._id);
  const { data } = useGetTodayMetricsQuery(userId ?? '', { skip: !userId });
  const { subscription } = useSubscription();

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
    {
      skip: !userId,
    },
  );

  return (
    <SectionContainer>
      <Box>
        <Title>Today's Activity</Title>
        <CardContainer>
          <StatCard>
            <Box display="flex">
              <IconWrapper type="phone">
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

          <StatCard>
            <Box display="flex">
              <IconWrapper type="book">
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

          <StatCard>
            <Box display="flex">
              <IconWrapper type="follow">
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
        </CardContainer>
      </Box>

      <InfoCard bgcolor="#a8f574">
        <PlanTitle>{subscription?.planId.name ?? 'Free Plan'}</PlanTitle>
        <SubTitle>
          {formatSubscriptionPeriod(subscription?.startAt, subscription?.endAt)}
        </SubTitle>
        <Box sx={{ marginLeft: '16px' }}>
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
          padding: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            margin: '20px 0 16px 20px',
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
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
            width: '232px',
            height: '100px',
            display: 'flex',
            margin: '16px 13px 0 13px',
            padding: '16px 16px 0 16px',
            backgroundColor: '#fff',
            borderRadius: '12px',
          }}
        >
          <Image
            src="/overview/mynumber.svg"
            alt="number"
            width={16}
            height={16}
          />
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                color: '#060606',
                marginLeft: '12px',
                fontWeight: 'normal',
              }}
            >
              Your Number:
            </Typography>

            <Typography
              sx={{
                fontSize: '14px',
                color: '#060606',
                marginLeft: '12px',
                fontWeight: 'normal',
              }}
            >
              {twilioPhoneNumber ?? 'No number assigned'}
            </Typography>

            <Box
              sx={{
                width: '61px',
                height: '24px',
                margin: '10px 0 0 10px',
                padding: '4px 12px',
                borderRadius: '12px',
                backgroundColor: '#a8f574',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'normal',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.23,
                  letterSpacing: 'normal',
                  color: '#060606',
                }}
              >
                Active
              </Typography>
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </SectionContainer>
  );
}
