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

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

// Service Form Field interfaces for backend communication
export interface ServiceFormField {
  _id?: string;
  serviceId: string;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  options: string[];
}

export interface CreateServiceFormFieldDto {
  serviceId: string;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  options: string[];
}

export interface UpdateServiceFormFieldDto {
  fieldName?: string;
  fieldType?: string;
  isRequired?: boolean;
  options?: string[];
}

export interface BatchFormFieldDto {
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  options: string[];
}

export interface SaveBatchFormFieldsDto {
  fields: BatchFormFieldDto[];
}

export const serviceManagementApi = createApi({
  reducerPath: 'serviceManagementApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['ServiceManagement', 'ServiceFormField'],
  endpoints: builder => ({
    getServices: builder.query<ServiceManagement[], { userId: string }>({
      query: ({ userId }) => ({
        url: '/service',
        method: 'GET',
        params: { userId },
      }),
      providesTags: ['ServiceManagement'],
    }),

    getServicesIncludingDeleted: builder.query<
      ServiceManagement[],
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: '/service/all-including-deleted',
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

    // Service Form Field endpoints
    getServiceFormFields: builder.query<
      ServiceFormField[],
      { serviceId: string }
    >({
      query: ({ serviceId }) => ({
        url: '/service-form-fields',
        method: 'GET',
        params: { serviceId },
      }),
      providesTags: ['ServiceFormField'],
    }),

    createServiceFormField: builder.mutation<
      ServiceFormField,
      CreateServiceFormFieldDto
    >({
      query: data => ({
        url: '/service-form-fields',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ServiceFormField'],
    }),

    updateServiceFormField: builder.mutation<
      ServiceFormField,
      { id: string; data: UpdateServiceFormFieldDto }
    >({
      query: ({ id, data }) => ({
        url: `/service-form-fields/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['ServiceFormField'],
    }),

    deleteServiceFormField: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/service-form-fields/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ServiceFormField'],
    }),

    // Batch operations for form fields
    saveServiceFormFields: builder.mutation<
      ServiceFormField[],
      SaveBatchFormFieldsDto & { serviceId: string }
    >({
      query: ({ serviceId, fields }) => ({
        url: `/service-form-fields/batch/${serviceId}`,
        method: 'POST',
        data: { fields },
      }),
      invalidatesTags: ['ServiceFormField'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServicesIncludingDeletedQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceFormFieldsQuery,
  useCreateServiceFormFieldMutation,
  useUpdateServiceFormFieldMutation,
  useDeleteServiceFormFieldMutation,
  useSaveServiceFormFieldsMutation,
} = serviceManagementApi;
