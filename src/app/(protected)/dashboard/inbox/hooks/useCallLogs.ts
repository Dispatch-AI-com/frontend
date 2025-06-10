import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import { getCallLogs } from '../api/calllogs';
import type { ICallLog } from '../types';

export default function useCallLogs(params?: Record<string, string>) {
  const user = useAppSelector(state => state.auth.user);
  const [data, setData] = useState<ICallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!user?._id) return;
    setLoading(true);
    getCallLogs(user._id, params)
      .then(setData)
      .catch((err: unknown) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, JSON.stringify(params)]);

  return { data, loading, error };
}
