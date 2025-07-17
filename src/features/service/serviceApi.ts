// frontend/src/features/service/serviceApi.ts

import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

// -------------------- Type Definitions --------------------

// Task status type definition
export type TaskStatus = 'Completed' | 'Missed' | 'Follow-up';

// Service type definition (includes task management features)
export interface Service {
  _id?: string;
  companyId: string;
  name: string;
  description: string;
  price: number;
  notifications: {
    preferNotificationType: string;
    phoneNumber: string;
    email: string;
  };
  isAvailable: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Task management related fields
  createdBy?: {
    name: string;
    avatar: string;
  };
  status?: TaskStatus;
  dateTime?: string;
  userId?: string; // Used to specify the user when creating a task
  serviceFieldId?: string; // 新增：用于编辑时传递 serviceFieldId
}

// Pagination response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query parameters for pagination and search
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// -------------------- Service API --------------------

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Service'],
  endpoints: builder => ({
    // Get all services (tasks) list, support query by userId
    getTasksByUser: builder.query<Service[], string>({
      query: (userId: string) => ({
        url: '/service',
        method: 'GET',
        params: { userId },
      }),
      providesTags: (result, _error, _userId) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Service' as const,
                id: _id,
              })),
              { type: 'Service', id: 'LIST' },
            ]
          : [{ type: 'Service', id: 'LIST' }],
    }),

    // Create service (task)
    createService: builder.mutation<Service, Partial<Service>>({
      query: body => ({
        url: '/service',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    // Update service (task)
    updateTask: builder.mutation<
      Service,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }],
    }),

    // Delete service (task)
    deleteTask: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/service/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Service', id }],
    }),

    // Get paginated service list
    getServices: builder.query<PaginatedResponse<Service>, PaginationParams>({
      query: params => ({
        url: '/service',
        method: 'GET',
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
          search: params.search,
        },
      }),
    }),

    // Get a service by ID
    getServiceById: builder.query<Service, string>({
      query: id => ({
        url: `/service/${id}`,
        method: 'GET',
      }),
    }),

    // Update an existing service
    updateService: builder.mutation<
      Service,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: 'PATCH',
        data,
      }),
    }),

    // Delete a service by ID
    deleteService: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/service/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTasksByUserQuery,
  useCreateServiceMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
