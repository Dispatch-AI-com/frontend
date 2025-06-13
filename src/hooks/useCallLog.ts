import { useEffect, useState } from 'react';

import { getCallLogs } from '@/features/callog/calllogApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import type { ICallLog } from '@/types/calllog.d';

export default function useCallLogs(params?: Record<string, string>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState<ICallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!user?._id) return;
    setLoading(true);
    dispatch(getCallLogs({ userId: user._id, params }))
      .unwrap()
      .then(res => {
        if (Array.isArray(res)) {
          setData(res);
          return;
        }
        if (
          typeof res === 'object' &&
          'data' in res &&
          Array.isArray((res as { data?: unknown }).data)
        ) {
          setData((res as { data: ICallLog[] }).data);
          return;
        }
        setData([]);
      })
      .catch((err: unknown) => {
        setError(err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, JSON.stringify(params)]);

  return { data, loading, error };
}
