export interface ITranscript {
  _id: string;
  calllogId: string;
  summary: string;
  keyPoints?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
