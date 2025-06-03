'use client';
import { Box, Chip, Paper, Typography } from '@mui/material';

import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

const greeting = {
  message:
    "“ Hello! I'm an Dispatch AI assistant working for you. Your team is not available to take the call right now. I can take a message for you, or help you book an appointment with your team. What can I do for you today? 你也可以和我说普通话。",
};

export default function GreetingSection() {
  return (
    <>
      <SectionHeader
        title="Greeting"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box>
        <Box display="flex" flexDirection={'row'} gap={1} mb={2}>
          <Typography variant="body1" sx={{ color: 'secondary.main' }}>
            Opening message:
          </Typography>
          <Chip label="Default" color="success" size="small" />
        </Box>
        <Paper elevation={1} sx={{ width: 580, padding: 4, marginTop: 1 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {greeting.message}
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
