import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type {
  ChangePlanDto,
  CreateSubscriptionDto,
  Subscription,
} from '@/types/subscription.d.ts';

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Subscription'],
  endpoints: builder => ({
    createSubscription: builder.mutation<
      { message: string; checkoutUrl: string },
      CreateSubscriptionDto
    >({
      query: dto => ({
        url: '/api/subscriptions',
        method: 'POST',
        data: dto,
      }),
    }),

    changePlan: builder.mutation<any, ChangePlanDto>({
      query: body => ({
        url: '/api/subscriptions/change',
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: ['Subscription'],
    }),

    downgradeToFree: builder.mutation<void, string>({
      query: userId => ({
        url: `/api/subscriptions/${userId}/free`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Subscription'],
    }),

    getSubscriptionByUser: builder.query<Subscription, string>({
      query: userId => ({
        url: `/api/subscriptions/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    getAllSubscriptions: builder.query<
      Subscription[],
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/api/subscriptions',
        method: 'GET',
        params: { page, limit },
      }),
    }),

    generateBillingPortalUrl: builder.mutation<{ url: string }, string>({
      query: userId => ({
        url: `/api/subscriptions/${userId}/retry-payment`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useChangePlanMutation,
  useDowngradeToFreeMutation,
  useGetSubscriptionByUserQuery,
  useGetAllSubscriptionsQuery,
  useGenerateBillingPortalUrlMutation,
} = subscriptionApi;
