import axios from 'axios';

import type { ICallLog } from '../types';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCallLogs(
  userId: string | undefined,
  params?: Record<string, string>,
): Promise<ICallLog[]> {
  if (!baseURL) throw new Error('baseURL is not defined');
  if (!userId) throw new Error('userId is required');
  const url = `${baseURL}/api/users/${userId}/calllogs`;
  const res = await axios.get<{ data: ICallLog[] }>(url, { params });
  return res.data.data;
}

export async function getTranscriptChunks(
  transcriptId: string,
): Promise<ICallLog[]> {
  if (!baseURL) throw new Error('baseURL is not defined');
  if (!transcriptId) throw new Error('transcriptId is required');
  const res = await axios.get(
    `${baseURL}/api/transcripts/${transcriptId}/chunks`,
  );
  return res.data as ICallLog[];
}
