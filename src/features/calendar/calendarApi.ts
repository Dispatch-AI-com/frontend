import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface Booking {
  _id: string;
  serviceId: string;
  client?: {
    name?: string;
  };
  bookingTime: string | Date;
  status: string;
}

interface BookingParams extends Record<string, unknown> {
  companyId?: string;
}

export interface Service {
  _id: string;
  name: string;
  price?: number;
  notifications?: {
    phoneNumber?: string;
    email?: string;
  };
  isAvailable?: boolean;
  description?: string;
}

export const calendarApi = createApi({
  reducerPath: 'calendarApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getBookings: builder.query<Booking[], BookingParams>({
      query: params => ({
        url: '/bookings',
        method: 'GET',
        params,
      }),
    }),
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: '/service',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBookingsQuery, useGetServicesQuery } = calendarApi;
