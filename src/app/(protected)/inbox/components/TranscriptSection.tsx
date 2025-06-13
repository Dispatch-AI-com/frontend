import DownloadIcon from '@mui/icons-material/Download';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Button, IconButton, Typography } from '@mui/material';
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

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OutlinedIconButton = styled(IconButton)`
  border: 1.5px solid #d5d5d5 !important;
  background: #fff !important;
  border-radius: 12px !important;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpeedButton = styled.div`
  border: 1.5px solid #d5d5d5;
  background: #fff;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: #757575;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 128px;
  margin-top: 48px;
`;

const Waveform = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 0;
`;

function StaticWaveform() {
  return (
    <Waveform>
      <svg width="400" height="40" viewBox="0 0 400 40">
        {Array.from({ length: 36 }).map((_, i) => {
          const x = i * 11;
          const heights = [8, 16, 24, 16, 8, 12, 20, 12];
          const y = 20 - heights[i % heights.length] / 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="6"
              height={heights[i % heights.length]}
              fill="#bdbdbd"
              rx="2"
            />
          );
        })}
      </svg>
    </Waveform>
  );
}

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
      <IconRow>
        <IconGroup>
          <OutlinedIconButton>
            <VolumeUpIcon sx={{ fontSize: 22, color: '#757575' }} />
          </OutlinedIconButton>
          <StaticWaveform />
          <SpeedButton>2.5X</SpeedButton>
          <OutlinedIconButton>
            <DownloadIcon sx={{ fontSize: 22, color: '#757575' }} />
          </OutlinedIconButton>
        </IconGroup>
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
      </IconRow>
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
