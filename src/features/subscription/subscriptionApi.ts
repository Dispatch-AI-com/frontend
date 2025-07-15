import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type {
  ChangePlanDto,
  CreateSubscriptionDto,
  Subscription,
} from '@/types/subscription.d.ts';

export interface SubscriptionListQuery {
  page?: number;
  limit?: number;
}

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
        url: '/subscriptions',
        method: 'POST',
        data: dto,
      }),
    }),

    changePlan: builder.mutation<void, ChangePlanDto>({
      query: body => ({
        url: '/subscriptions/change',
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: ['Subscription'],
    }),

    downgradeToFree: builder.mutation<void, string>({
      query: userId => ({
        url: `/subscriptions/${userId}/free`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Subscription'],
    }),

    getSubscriptionByUser: builder.query<Subscription, string>({
      query: userId => ({
        url: `/subscriptions/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    getAllSubscriptions: builder.query<Subscription[], SubscriptionListQuery>({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/subscriptions',
        method: 'GET',
        params: { page, limit },
      }),
    }),

    generateBillingPortalUrl: builder.mutation<{ url: string }, string>({
      query: userId => ({
        url: `/subscriptions/${userId}/retry-payment`,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks
export const {
  useCreateSubscriptionMutation,
  useChangePlanMutation,
  useDowngradeToFreeMutation,
  useGetSubscriptionByUserQuery,
  useGetAllSubscriptionsQuery,
  useGenerateBillingPortalUrlMutation,
} = subscriptionApi;

// Export raw endpoints
export const createSubscription =
  subscriptionApi.endpoints.createSubscription.initiate;
export const changePlan = subscriptionApi.endpoints.changePlan.initiate;
export const downgradeToFree =
  subscriptionApi.endpoints.downgradeToFree.initiate;
export const getSubscriptionByUser =
  subscriptionApi.endpoints.getSubscriptionByUser.initiate;
export const getAllSubscriptions =
  subscriptionApi.endpoints.getAllSubscriptions.initiate;
export const generateBillingPortalUrl =
  subscriptionApi.endpoints.generateBillingPortalUrl.initiate;
