'use client';
import { Box, Chip, TextField, Typography } from '@mui/material';

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
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Opening message:
          </Typography>
          <Chip
            label="Default"
            color="default"
            size="small"
            sx={{ backgroundColor: '#a8f574' }}
          />
        </Box>
        {/* <Paper elevation={1} sx={{ width: 580, padding: 4 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {greeting.message}
          </Typography>
        </Paper> */}
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={greeting.message}
          // onChange={e => {
          //   /* handle change here */
          // }}
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
    </>
  );
}
