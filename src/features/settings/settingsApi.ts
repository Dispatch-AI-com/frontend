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
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
export interface GreetingSettings {
  message: string;
  isCustom: boolean;
}
export interface VerificationSettings {
  type: 'SMS' | 'Email' | 'Both';
  mobile?: string;
  email?: string;
  mobileVerified?: boolean;
  emailVerified?: boolean;
  marketingPromotions?: boolean;
}

export interface AddressSettings {
  unitAptPOBox?: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'UserProfile',
    'CompanyInfo',
    'BillingAddress',
    'Greeting',
    'Verification',
    'Address',
  ],
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
      invalidatesTags: ['UserProfile', 'Verification'],
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
        url: `/users/${userId}/greeting`,
        method: 'GET',
      }),
      providesTags: ['Greeting'],
    }),
    updateGreeting: builder.mutation<
      GreetingSettings,
      { userId: string } & GreetingSettings
    >({
      query: ({ userId, ...greetingData }) => ({
        url: `/users/${userId}/greeting`,
        method: 'PATCH',
        data: greetingData,
      }),
      invalidatesTags: ['Greeting'],
    }),
    getVerification: builder.query<VerificationSettings, string>({
      query: userId => ({
        url: `/api/settings/user/${userId}/verification`,
        method: 'GET',
      }),
      providesTags: ['Verification'],
    }),
    updateVerification: builder.mutation<
      UserSetting,
      { userId: string } & VerificationSettings
    >({
      query: ({ userId, ...verificationData }) => ({
        url: `/api/settings/user/${userId}/verification`,
        method: 'PUT',
        data: verificationData,
      }),
      invalidatesTags: ['Verification', 'UserProfile'],
    }),
    verifyMobile: builder.mutation<
      { success: boolean; message: string },
      { userId: string; mobile: string }
    >({
      query: ({ userId, mobile }) => ({
        url: `/api/settings/user/${userId}/verification/mobile`,
        method: 'POST',
        data: { mobile },
      }),
      invalidatesTags: ['Verification'],
    }),
    verifyEmail: builder.mutation<
      { success: boolean; message: string },
      { userId: string; email: string }
    >({
      query: ({ userId, email }) => ({
        url: `/api/settings/user/${userId}/verification/email`,
        method: 'POST',
        data: { email },
      }),
      invalidatesTags: ['Verification'],
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
    getAddress: builder.query<AddressSettings, string>({
      query: userId => ({
        url: `/users/${userId}/address`,
        method: 'GET',
      }),
      providesTags: ['Address'],
    }),
    updateAddress: builder.mutation<
      AddressSettings,
      { userId: string; address: AddressSettings }
    >({
      query: ({ userId, address }) => ({
        url: `/users/${userId}/address`,
        method: 'PATCH',
        body: address,
      }),
      invalidatesTags: ['Address'],
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
  useGetVerificationQuery,
  useUpdateVerificationMutation,
  useVerifyMobileMutation,
  useVerifyEmailMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} = settingsApi;
