'use client';

import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { styled, width } from '@mui/system';
import { format, isToday, parseISO } from 'date-fns';
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

const ResponsiveFrame = styled(Box)`
  width: 100%;
  // margin-inline: auto;
  padding-inline: 0;

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

/** default container */
const SectionContainer = styled(Box)`
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }

  & > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
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
  maxWidth: '100%',
  height: 152,
  padding: '20px 20px 24px 20px',
  borderRadius: 16,
  border: '1px solid #eaeaea',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '@media (max-width: 480px)': {
    width: '160px',
    padding: '10px 10px 10px 10px',
  },
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
  maxWidth: '100%',
  height: 188,
  padding: '20px 20px 0 20px',
  borderRadius: 16,
  backgroundColor: bgcolor,

  '@media (max-width:600px)': {
    justifyContent: 'center',
    width: '340px',
  },
}));

const PlanTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: 20,
  fontWeight: 'bold',
  color: '#060606',
});

const SubTitle = styled(Typography)({
  fontSize: 14,
  color: '#6d6d6d',
  marginBottom: 16,
});

const UserName = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 1.25,
  color: '#fff',
});

/** tablet container */
const Pager = styled(Box)`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  display: flex;
  scroll-behavior: smooth;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page = styled(Box)`
  min-width: 100%;
  max-width: 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  box-sizing: border-box;
`;

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
    { skip: !userId },
  );

  const isMd = useMediaQuery('(min-width:600px) and (max-width:1439px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const ActivityBlock = (
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
            <Label>
              {isMobile
                ? 'Phone Calls Received'
                : 'Number of Phone Calls Received'}
            </Label>
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
            <Label>
              {' '}
              {isMobile ? 'Bookings Done' : 'Number of Bookings Done'}
            </Label>
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
            <Label>
              {isMobile ? 'Bookings Confirmed' : 'Number of Bookings Confirmed'}
            </Label>
          </Box>
          <Value>{confirmedToday}</Value>
        </StatCard>
      </CardContainer>
    </Box>
  );

  const InfoBlock = (
    <>
      <InfoCard bgcolor="#a8f574">
        <PlanTitle>{subscription?.planId.name ?? 'Free Plan'}</PlanTitle>
        <SubTitle>
          {formatSubscriptionPeriod(subscription?.startAt, subscription?.endAt)}
        </SubTitle>
        <Box
          sx={{
            marginLeft: '16px',
            '@media (max-width:600px)': {
              marginLeft: '60px',
            },
          }}
        >
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
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            margin: '20px 0 0 20px',
            '@media (max-width:600px)': {
              margin: '0 0 0 16px',
            },
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
            '@media (max-width:600px)': {
              width: '310px',
              height: '100px',
            },
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
                  lineHeight: 1.23,
                  color: '#060606',
                }}
              >
                Active
              </Typography>
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </>
  );

  if (isMd) {
    return (
      <ResponsiveFrame>
        <Pager aria-label="Activity pager">
          <Page>
            <Box
              sx={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                maxWidth: '100%',
                minWidth: 0,
              }}
            >
              {ActivityBlock}
            </Box>
          </Page>

          <Page>
            <Box
              sx={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                maxWidth: '100%',
                minWidth: 0,
              }}
            >
              {InfoBlock}
            </Box>
          </Page>
        </Pager>
      </ResponsiveFrame>
    );
  }

  return (
    <ResponsiveFrame>
      <SectionContainer>
        {ActivityBlock}
        {InfoBlock}
      </SectionContainer>
    </ResponsiveFrame>
  );
}
