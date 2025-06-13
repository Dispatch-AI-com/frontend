import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

import useTranscript from '@/hooks/useTranscript';

import TranscriptChunksModal from './TranscriptChunksModal';

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin: 24px 0 8px 0;
`;

const KeyPointsList = styled.ul`
  margin: 0 0 0 16px;
  padding: 0;
  list-style: disc;
  color: #222;
  font-size: 15px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const KeyPointItem = styled.li`
  margin-bottom: 4px;
  line-height: 1.6;
`;

const SummaryBody = styled.div`
  color: #222;
  font-size: 15px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.7;
`;

const ErrorText = styled(Typography)`
  color: #d32f2f;
  font-size: 15px;
  margin-top: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

interface TranscriptSectionProps {
  calllogId: string;
}

export default function TranscriptSection({
  calllogId,
}: TranscriptSectionProps) {
  const { data: transcript, loading, error } = useTranscript(calllogId);
  const [openChunksModal, setOpenChunksModal] = useState(false);

  if (loading)
    return <Typography sx={{ mt: 2 }}>Loading transcript…</Typography>;
  if (error)
    return (
      <ErrorText>Transcript not found for calllogId: {calllogId}</ErrorText>
    );
  if (!transcript) return null;

  return (
    <>
      {transcript.keyPoints && transcript.keyPoints.length > 0 && (
        <>
          <SectionTitle>Key Points</SectionTitle>
          <KeyPointsList>
            {transcript.keyPoints.map((point, idx) => (
              <KeyPointItem key={idx}>{point}</KeyPointItem>
            ))}
          </KeyPointsList>
        </>
      )}
      {transcript.summary && (
        <>
          <SectionTitle>Summary</SectionTitle>
          <SummaryBody>{transcript.summary}</SummaryBody>
        </>
      )}
      <ButtonRow>
        <Button
          variant="outlined"
          sx={{
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontSize: 14,
            color: '#000',
            borderColor: '#000',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 400,
            minWidth: 160,
            '&:hover': {
              borderColor: '#000',
              background: '#f5f5f5',
              color: '#000',
            },
          }}
          onClick={() => {
            setOpenChunksModal(true);
          }}
        >
          View Transcript
        </Button>
      </ButtonRow>
      <TranscriptChunksModal
        open={openChunksModal}
        onClose={() => {
          setOpenChunksModal(false);
        }}
        transcriptId={transcript._id}
      />
    </>
  );
}
