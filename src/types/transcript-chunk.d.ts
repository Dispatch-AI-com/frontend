export type SpeakerType = 'AI' | 'User';

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
