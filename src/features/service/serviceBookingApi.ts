import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface ServiceBooking {
  _id?: string;
  serviceId: string;
  companyId: string;
  client: { name: string; phoneNumber: string; address: string };
  serviceFormValues: { serviceFieldId: string; answer: string }[];
  bookingTime: string;
  status?: 'Cancelled' | 'Confirmed' | 'Done';
  note?: string;
  userId: string;
}

export const serviceBookingApi = createApi({
  reducerPath: 'serviceBookingApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createServiceBooking: builder.mutation<
      ServiceBooking,
      Partial<ServiceBooking>
    >({
      query: body => ({
        url: '/bookings',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: [{ type: 'ServiceBooking', id: 'LIST' }],
    }),
    getBookings: builder.query<
      ServiceBooking[],
      { userId?: string; serviceId?: string }
    >({
      query: params => ({
        url: '/bookings',
        method: 'GET',
        params,
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'ServiceBooking' as const,
                id: _id,
              })),
              { type: 'ServiceBooking', id: 'LIST' },
            ]
          : [{ type: 'ServiceBooking', id: 'LIST' }],
    }),
    deleteServiceBooking: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ServiceBooking', id: 'LIST' }],
    }),
    updateServiceBooking: builder.mutation<
      ServiceBooking,
      { id: string; data: Partial<ServiceBooking> }
    >({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: [{ type: 'ServiceBooking', id: 'LIST' }],
    }),
  }),
  tagTypes: ['ServiceBooking'],
});

export const {
  useCreateServiceBookingMutation,
  useGetBookingsQuery,
  useDeleteServiceBookingMutation,
  useUpdateServiceBookingMutation,
} = serviceBookingApi;
