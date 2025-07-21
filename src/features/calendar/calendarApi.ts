import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

interface Booking {
  _id: string;
  serviceId?: {
    name?: string;
  };
  client?: {
    name?: string;
  };
  bookingTime: string | Date;
  status: string;
}

interface BookingParams extends Record<string, unknown> {
  companyId?: string;
}

export const calendarApi = createApi({
  reducerPath: 'calendarApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getBookings: builder.query<Booking[], BookingParams>({
      query: params => ({
        url: '/bookings/filter',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetBookingsQuery } = calendarApi;
