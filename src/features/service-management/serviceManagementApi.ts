import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

export interface ServiceManagement {
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

export interface CreateServiceManagementDto {
  name: string;
  description?: string;
  price: number;
  notifications?: {
    preferNotificationType?: 'SMS' | 'EMAIL' | 'BOTH';
    phoneNumber?: string;
    email?: string;
  };
  isAvailable?: boolean;
  userId: string;
}

export interface UpdateServiceManagementDto {
  name?: string;
  description?: string;
  price?: number;
  notifications?: {
    preferNotificationType?: 'SMS' | 'EMAIL' | 'BOTH';
    phoneNumber?: string;
    email?: string;
  };
  isAvailable?: boolean;
}

export const serviceManagementApi = createApi({
  reducerPath: 'serviceManagementApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['ServiceManagement'],
  endpoints: builder => ({
    getServices: builder.query<ServiceManagement[], { userId: string }>({
      query: ({ userId }) => ({
        url: '/service',
        method: 'GET',
        params: { userId },
      }),
      providesTags: ['ServiceManagement'],
    }),

    getServiceById: builder.query<ServiceManagement, string>({
      query: id => ({
        url: `/service/${id}`,
        method: 'GET',
      }),
      providesTags: ['ServiceManagement'],
    }),

    createService: builder.mutation<
      ServiceManagement,
      CreateServiceManagementDto
    >({
      query: data => ({
        url: '/service',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ServiceManagement'],
    }),

    updateService: builder.mutation<
      ServiceManagement,
      { id: string; data: UpdateServiceManagementDto }
    >({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['ServiceManagement'],
    }),

    deleteService: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/service/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ServiceManagement'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceManagementApi;
