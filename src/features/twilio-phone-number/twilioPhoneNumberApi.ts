import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface TwilioPhoneNumberResponse {
  twilioPhoneNumber: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  twilioPhoneNumber?: string;
}

export const twilioPhoneNumberApi = createApi({
  reducerPath: 'twilioPhoneNumberApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['TwilioPhoneNumber'],
  endpoints: builder => ({
    getTwilioPhoneNumber: builder.query<TwilioPhoneNumberResponse, string>({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: User): TwilioPhoneNumberResponse => ({
        twilioPhoneNumber: response.twilioPhoneNumber ?? '',
      }),
      providesTags: ['TwilioPhoneNumber'],
    }),
  }),
});

// Export hooks
export const { useGetTwilioPhoneNumberQuery } = twilioPhoneNumberApi;

// Export raw endpoints
export const getTwilioPhoneNumber =
  twilioPhoneNumberApi.endpoints.getTwilioPhoneNumber.initiate;
