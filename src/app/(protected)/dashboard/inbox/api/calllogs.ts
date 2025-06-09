import axios from 'axios';

import type { ICallLog } from '../types';

// 本地开发用固定URL
const BASE_URL = 'http://localhost:4000/api/companies/company-123/calllogs';

export async function getCallLogs(
  params?: Record<string, string>,
): Promise<ICallLog[]> {
  const res = await axios.get<{ data: ICallLog[] }>(BASE_URL, { params });
  return res.data.data;
}
