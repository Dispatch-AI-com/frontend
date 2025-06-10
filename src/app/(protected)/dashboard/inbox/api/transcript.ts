import axios from 'axios';

import type { ITranscript } from '../types';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getTranscript(calllogId: string): Promise<ITranscript> {
  if (!baseURL) throw new Error('baseURL is not defined');
  if (!calllogId) throw new Error('calllogId is required');
  const res = await axios.get(
    `${baseURL}/api/calllogs/${calllogId}/transcript`,
  );
  return res.data as ITranscript;
}
