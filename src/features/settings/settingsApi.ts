import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface UserProfileSettings {
  name: string;
  role: string;
  contact: string;
}

export interface CompanyInfoSettings {
  companyName: string;
  abn: string;
}

export interface BillingAddressSettings {
  unit?: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface UserSetting {
  _id: string;
  userId: string;
  category: string;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
export interface GreetingSettings {
  message: string;
  isCustom: boolean;
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['UserProfile', 'CompanyInfo', 'BillingAddress', 'Greeting'],
  endpoints: builder => ({
    getUserProfile: builder.query<UserProfileSettings, string>({
      query: userId => ({
        url: `/settings/frontend/profile/${userId}`,
        method: 'GET',
      }),
      providesTags: ['UserProfile'],
    }),
    updateUserProfile: builder.mutation<
      UserSetting,
      { userId: string } & UserProfileSettings
    >({
      query: ({ userId, ...profileData }) => ({
        url: `/settings/frontend/profile/${userId}`,
        method: 'PUT',
        data: profileData,
      }),
      invalidatesTags: ['UserProfile'],
    }),

    getCompanyInfo: builder.query<CompanyInfoSettings, string>({
      query: userId => ({
        url: `/settings/user/${userId}/company`,
        method: 'GET',
      }),
      providesTags: ['CompanyInfo'],
    }),
    updateCompanyInfo: builder.mutation<
      UserSetting,
      { userId: string } & CompanyInfoSettings
    >({
      query: ({ userId, ...companyData }) => ({
        url: `/settings/user/${userId}/company`,
        method: 'PUT',
        data: companyData,
      }),
      invalidatesTags: ['CompanyInfo'],
    }),

    getBillingAddress: builder.query<BillingAddressSettings, string>({
      query: userId => ({
        url: `/settings/user/${userId}/billing`,
        method: 'GET',
      }),
      providesTags: ['BillingAddress'],
    }),
    updateBillingAddress: builder.mutation<
      UserSetting,
      { userId: string } & BillingAddressSettings
    >({
      query: ({ userId, ...billingData }) => ({
        url: `/settings/user/${userId}/billing`,
        method: 'PUT',
        data: billingData,
      }),
      invalidatesTags: ['BillingAddress'],
    }),
    getGreeting: builder.query<GreetingSettings, string>({
      query: userId => ({
        url: `/companies/user/${userId}/greeting`,
        method: 'GET',
      }),
      providesTags: ['Greeting'],
    }),
    updateGreeting: builder.mutation<
      any,
      { userId: string } & GreetingSettings
    >({
      query: ({ userId, ...greetingData }) => ({
        url: `/companies/user/${userId}/greeting`,
        method: 'PATCH',
        data: greetingData,
      }),
      invalidatesTags: ['Greeting'],
    }),
    checkABNExists: builder.mutation<
      { exists: boolean },
      { abn: string; userId: string }
    >({
      query: ({ abn, userId }) => ({
        url: `/settings/check-abn-exists`,
        method: 'POST',
        data: { abn, userId },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
  useGetBillingAddressQuery,
  useUpdateBillingAddressMutation,
  useCheckABNExistsMutation,
  useGetGreetingQuery,
  useUpdateGreetingMutation,
} = settingsApi;
