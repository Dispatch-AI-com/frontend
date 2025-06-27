import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useCallback } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

type SortOption = 'newest' | 'oldest';
type TagOption = 'all' | 'Missed' | 'Completed' | 'Follow-up';

interface UseCallLogsOptions {
  search?: string;
  status?: TagOption;
  sort?: SortOption;
  pageSize?: number;
}

interface CallLogResponse {
  data: ICallLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const STALE_TIME = 60 * 1000; // 1 minute

export default function useCallLogs(options: UseCallLogsOptions = {}) {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const { search, status, sort = 'newest', pageSize = 20 } = options;

  const fetchCallLogs = useCallback(
    async ({ pageParam }: { pageParam: unknown }) => {
      if (!user?._id) {
        return {
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }
      const page = typeof pageParam === 'number' ? pageParam : 1;
      const params = {
        page: page.toString(),
        limit: pageSize.toString(),
        sort,
        ...(search && { search: search.trim() }),
        ...(status && status !== 'all' && { status }),
      };

      try {
        const response = await axios({
          baseURL: API_URL,
          url: `/users/${user._id}/calllogs`,
          method: 'GET',
          params,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        return response.data as CallLogResponse;
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.response?.status === 401) {
          dispatch(logout());
        }
        throw new Error(
          axiosError.response?.data?.message ?? 'Failed to fetch call logs',
        );
      }
    },
    [user?._id, token, search, status, sort, pageSize, dispatch],
  );

  const query = useInfiniteQuery<CallLogResponse, Error>({
    queryKey: ['callLogs', user?._id, search, status, sort, pageSize],
    queryFn: fetchCallLogs,
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const { pagination } = lastPage;
      return pagination.hasNextPage ? pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!user?._id,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Note: Removed automatic prefetching - let user scroll control when to load more

  return query;
}
