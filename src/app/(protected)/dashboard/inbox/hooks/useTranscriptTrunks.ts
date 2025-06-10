import { useEffect, useState } from 'react';

import { getTranscriptChunks } from '../api/transcript-chunks';
import type { ITranscriptChunk } from '../types';

export default function useTranscriptTrunks(transcriptId?: string) {
  const [data, setData] = useState<ITranscriptChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!transcriptId) return;
    setLoading(true);
    getTranscriptChunks(transcriptId)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [transcriptId]);

  return { data, loading, error };
}
