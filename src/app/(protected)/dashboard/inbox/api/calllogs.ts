import axios from 'axios';

import type { ICallLog } from '../types';

export async function getCallLogs(
  userId: string,
  params?: Record<string, string>,
): Promise<ICallLog[]> {
  const BASE_URL = `http://localhost:4000/api/users/${userId}/calllogs`;
  const res = await axios.get<{ data: ICallLog[] }>(BASE_URL, { params });
  return res.data.data;
}
