'use client';

import { useGetHealthQuery } from '@/features/public/publicApiSlice';

export default function TestPage() {
  const { data, isLoading, isError } = useGetHealthQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Connection failed</p>;

  return <div>{data?.status}</div>;
}
