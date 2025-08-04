import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useGetTranscriptChunksQuery } from '@/features/transcript-chunk/transcriptChunksApi';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

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
    max-height: 60vh;
    overflow-y: auto;
    position: relative;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #666;
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: #888;
  font-size: 14px;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: #d32f2f;
  font-size: 14px;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [allChunks, setAllChunks] = useState<ITranscriptChunk[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    data: chunksResponse,
    isLoading: loading,
    error,
    isFetching,
  } = useGetTranscriptChunksQuery(
    { transcriptId, page: currentPage, limit: 20 },
    {
      skip: !transcriptId || !open,
    },
  );

  // Reset state when modal opens/closes or transcriptId changes
  useEffect(() => {
    if (open && transcriptId) {
      setCurrentPage(1);
      setAllChunks([]);
      setHasMore(true);
      setIsLoadingMore(false);
    }
  }, [open, transcriptId]);

  // Update chunks when new data arrives
  useEffect(() => {
    if (chunksResponse) {
      if (currentPage === 1) {
        // First page - replace all chunks
        setAllChunks(chunksResponse.data);
      } else {
        // Subsequent pages - append chunks
        setAllChunks(prev => [...prev, ...chunksResponse.data]);
      }
      setHasMore(chunksResponse.pagination.hasNextPage);
      setIsLoadingMore(false);
    }
  }, [chunksResponse, currentPage]);

  const loadNextPage = useCallback(() => {
    if (!hasMore || loading || isFetching || isLoadingMore) return;

    setIsLoadingMore(true);
    setCurrentPage(prev => prev + 1);
  }, [hasMore, loading, isFetching, isLoadingMore]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || !hasMore || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Load more when within 100px of bottom
    if (distanceFromBottom <= 100) {
      loadNextPage();
    }
  }, [hasMore, isLoadingMore, loadNextPage]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

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
      <StyledDialogContent dividers ref={scrollContainerRef}>
        {loading && currentPage === 1 && (
          <LoadingContainer>
            <CircularProgress size={24} sx={{ marginRight: 2 }} />
            Loading transcript...
          </LoadingContainer>
        )}

        {error && (
          <ErrorMessage>
            Error loading transcript chunks for transcriptId: {transcriptId}
          </ErrorMessage>
        )}

        <ChatContainer>
          {allChunks.map((chunk, idx) => {
            const speaker = getSpeaker(chunk);
            const isUser = speaker === 'user';
            return (
              <MessageRow key={`${chunk._id}-${idx}`} $isUser={isUser}>
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

          {/* Loading more indicator */}
          {isLoadingMore && (
            <LoadingContainer>
              <CircularProgress size={20} sx={{ marginRight: 1 }} />
              Loading more messages...
            </LoadingContainer>
          )}

          {/* End of messages indicator */}
          {!hasMore && allChunks.length > 0 && (
            <EndMessage>
              End of conversation • {allChunks.length} messages total
            </EndMessage>
          )}
        </ChatContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
