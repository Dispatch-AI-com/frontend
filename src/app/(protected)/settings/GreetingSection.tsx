'use client';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import GreetingEditModal from '@/app/(protected)/settings/components/GreetingEditModal';
import SectionHeader from '@/app/(protected)/settings/components/SectionHeader';

const defaultGreeting = {
  message: `"
Hello! I'm an Dispatch AI assistant working for you.

Your team is not available to take the call right now.

I can take a message for you, or help you book an appointment with your team. What can I do for you today?

你也可以和我说普通话。`,
  isCustom: false,
};

export default function GreetingSection() {
  const [greeting, setGreeting] = useState(defaultGreeting);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };
  const handleSave = (message: string, isCustom: boolean) => {
    if (isCustom && (!message || message.trim().length === 0)) {
      return {
        success: false,
        error: 'Custom greeting message cannot be empty',
      };
    }
    if (message.trim().length > 1000) {
      return {
        success: false,
        error: 'Greeting message cannot exceed 1000 characters',
      };
    }
    setGreeting({ message: message.trim(), isCustom });
    return { success: true };
  };

  return (
    <>
      <SectionHeader title="Greeting" onEdit={handleEdit} />
      <Box>
        <Box display="flex" flexDirection={'row'} gap={1} mb={2}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Opening message:
          </Typography>
          <Chip
            label={greeting.isCustom ? 'Custom' : 'Default'}
            color="default"
            size="small"
            sx={{
              backgroundColor: greeting.isCustom ? '#ffe988' : '#a8f574',
            }}
          />
        </Box>
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={greeting.message}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      <GreetingEditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialMessage={greeting.message}
        isCustom={greeting.isCustom}
      />
    </>
  );
}
