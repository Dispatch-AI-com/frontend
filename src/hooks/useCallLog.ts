import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

type SortOption = 'newest' | 'oldest';
type TagOption = 'all' | 'Missed' | 'Completed' | 'Follow-up';

interface UseCallLogsOptions {
  search?: string;
  status?: TagOption;
  sort?: SortOption;
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
  const { search, status, sort = 'newest' } = options;

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
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sort,
        ...(search && { search: search.trim() }),
        ...(status && status !== 'all' && { status }),
      });

      const response = await fetch(
        `${API_URL}/users/${user._id}/calllogs?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch call logs');
      }
      return response.json() as Promise<CallLogResponse>;
    },
    [user?._id, search, status, sort],
  );

  const query = useInfiniteQuery<CallLogResponse, Error>({
    queryKey: ['callLogs', user?._id, search, status, sort],
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

  // Prefetch next page when current page is loaded
  useEffect(() => {
    if (
      query.data?.pages.length &&
      query.hasNextPage &&
      !query.isFetchingNextPage
    ) {
      void query.fetchNextPage();
    }
  }, [
    query.data?.pages.length,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
    query,
  ]);

  return query;
}
