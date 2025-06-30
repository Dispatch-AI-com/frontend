export type CallLogStatus = 'Missed' | 'Completed' | 'Follow-up';

export interface ICallLog {
  _id?: string;
  companyId: string;
  serviceBookedId?: string;
  callerNumber: string;
  callerName?: string;
  status: CallLogStatus;
  startAt: string | Date;
  endAt?: string | Date;
  audioId?: string;
  transcriptId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  summary?: string;
}

export interface ICallLogPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ICallLogResponse {
  data: ICallLog[];
  pagination: ICallLogPagination;
}

export interface ICallLogMetrics {
  totalCalls: number;
  liveCalls: number;
}
