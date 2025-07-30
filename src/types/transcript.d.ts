export interface ITranscript {
  _id: string;
  callSid: string;
  summary: string;
  keyPoints?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
