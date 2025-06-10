import { useEffect, useState } from 'react';

import { getTranscript } from '../api/transcript';
import type { ITranscript } from '../types';

export default function useTranscript(calllogId?: string) {
  const [data, setData] = useState<ITranscript | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!calllogId) return;
    setLoading(true);
    getTranscript(calllogId)
      .then(res => {
        setData(res);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [calllogId]);

  return { data, loading, error };
}
