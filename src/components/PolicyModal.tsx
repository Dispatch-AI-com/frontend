'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    maxWidth: '800px',
    width: '90vw',
    maxHeight: '80vh',
    borderRadius: '12px',
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 16px 24px',
  borderBottom: '1px solid #e0e0e0',
});

const StyledDialogContent = styled(DialogContent)({
  padding: '24px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#a8a8a8',
  },
});

const CloseButton = styled(IconButton)({
  color: '#666',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

interface PolicyModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function PolicyModal({
  open,
  onClose,
  title,
  content,
}: PolicyModalProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box sx={{ lineHeight: 1.6 }}>{content}</Box>
      </StyledDialogContent>
    </StyledDialog>
  );
}
