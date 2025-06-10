export type CallLogStatus = 'Missed' | 'Completed' | 'Follow-up';
export type SpeakerType = 'AI' | 'User';

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

export interface ITranscript {
  _id: string;
  calllogId: string;
  summary: string;
  keyPoints?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITranscriptChunk {
  _id: string;
  transcriptId: string;
  speakerType: SpeakerType;
  text: string;
  startAt: number;
  endAt: number;
  createdAt?: Date;
  updatedAt?: Date;
}
