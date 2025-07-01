import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

interface Company {
  _id: string;
  businessName: string;
  jobTitle: string;
  address: string;
  email: string;
  number: string;
  user: {
    _id: string;
    email: string;
  };
}

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCompanyByUserId: builder.query<Company, string>({
      query: userId => ({
        url: `/companies/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCompanyByUserIdQuery } = companyApi;
