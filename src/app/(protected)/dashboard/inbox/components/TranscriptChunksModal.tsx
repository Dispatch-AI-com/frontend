import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import useTranscriptChunks from '../hooks/useTranscriptTrunks';

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Transcript
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading && <div>Loading...</div>}
        {error != null && (
          <div>
            Error loading transcript chunks for transcriptId: {transcriptId}
          </div>
        )}
        {chunks.length > 0 ? (
          <ul>
            {chunks.map((chunk, idx) => (
              <li key={idx}>{chunk.text}</li>
            ))}
          </ul>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
