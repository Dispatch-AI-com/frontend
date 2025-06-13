import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';

import useTranscriptChunks from '@/hooks/useTranscriptChunk';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`;

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background: ${props => (props.$isUser ? '#a8f574' : '#fafafa')};
  color: #222;
  border-radius: 16px;
  padding: 12px 16px;
  max-width: 70%;
  margin: 0 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  word-break: break-word;
`;

const ChatAvatar = styled(Avatar)<{ $isUser: boolean }>`
  width: 32px;
  height: 32px;
  margin: ${props => (props.$isUser ? '0 0 0 8px' : '0 8px 0 0')};
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
  & > span {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 700 !important;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 36px;
  }
`;

// Main Component
interface TranscriptChunksModalProps {
  open: boolean;
  onClose: () => void;
  transcriptId: string;
}

export default function TranscriptChunksModal({
  open,
  onClose,
  transcriptId,
}: TranscriptChunksModalProps) {
  const { data: chunks, loading, error } = useTranscriptChunks(transcriptId);

  const getSpeaker = (chunk: ITranscriptChunk) => {
    return chunk.speakerType.toLowerCase() === 'user' ? 'user' : 'ai';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        Transcript
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        {loading && <div>Loading...</div>}
        {error != null && (
          <div>
            Error loading transcript chunks for transcriptId: {transcriptId}
          </div>
        )}
        <ChatContainer>
          {chunks.map((chunk, idx) => {
            const speaker = getSpeaker(chunk);
            const isUser = speaker === 'user';
            return (
              <MessageRow key={idx} $isUser={isUser}>
                {!isUser && (
                  <ChatAvatar
                    $isUser={isUser}
                    src="/avatars/AI-avatar.svg"
                    alt="AI"
                  />
                )}
                <MessageBubble $isUser={isUser}>{chunk.text}</MessageBubble>
                {isUser && (
                  <ChatAvatar
                    $isUser={isUser}
                    src="/avatars/user-avatar.jpg"
                    alt="User"
                  />
                )}
              </MessageRow>
            );
          })}
        </ChatContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
