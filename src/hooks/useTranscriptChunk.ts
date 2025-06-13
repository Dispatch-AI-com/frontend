import { useEffect, useState } from 'react';

import { getTranscriptChunks } from '@/features/callog/calllogApi';
import { useAppDispatch } from '@/redux/hooks';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

export default function useTranscriptChunks(transcriptId?: string) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ITranscriptChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!transcriptId) return;
    setLoading(true);
    dispatch(getTranscriptChunks(transcriptId))
      .unwrap()
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [transcriptId, dispatch]);

  return { data, loading, error };
}
