import { useEffect, useState } from 'react';

import { getTranscript } from '@/features/transcript/transcriptApi';
import { useAppDispatch } from '@/redux/hooks';
import type { ITranscript } from '@/types/transcript.d';

export default function useTranscript(calllogId?: string) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ITranscript | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!calllogId) return;
    setLoading(true);
    dispatch(getTranscript(calllogId))
      .unwrap()
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [calllogId, dispatch]);

  return { data, loading, error };
}
