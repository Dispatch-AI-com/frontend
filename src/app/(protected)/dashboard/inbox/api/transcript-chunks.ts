import axios from 'axios';

import type { ITranscriptChunk } from '../types';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getTranscriptChunks(
  transcriptId: string,
): Promise<ITranscriptChunk[]> {
  if (!baseURL) throw new Error('baseURL is not defined');
  if (!transcriptId) throw new Error('transcriptId is required');
  const res = await axios.get(
    `${baseURL}/api/transcripts/${transcriptId}/chunks`,
  );
  return res.data as ITranscriptChunk[];
}
