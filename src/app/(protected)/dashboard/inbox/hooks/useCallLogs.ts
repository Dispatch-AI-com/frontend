import { useEffect, useState } from 'react';

import { getCallLogs } from '../api/calllogs';
import type { ICallLog } from '../types';

export default function useCallLogs(params?: Record<string, string>) {
  const [data, setData] = useState<ICallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setLoading(true);
    getCallLogs(params)
      .then(setData)
      .catch((err: unknown) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}
