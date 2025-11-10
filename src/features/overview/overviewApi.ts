import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface Service {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  price: number;
  notifications?: {
    preferNotificationType?: 'SMS' | 'EMAIL' | 'BOTH';
    phoneNumber?: string;
    email?: string;
  };
  isAvailable: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const overviewApi = createApi({
  reducerPath: 'overviewApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Service'],
  endpoints: builder => ({
    getRecentServices: builder.query<Service[], string | undefined>({
      query: userId => ({
        url: '/service',
        method: 'GET',
        params: userId ? { userId } : {},
      }),
      providesTags: ['Service'],
    }),
  }),
});

export const { useGetRecentServicesQuery } = overviewApi;
