'use client';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import GreetingEditModal from '@/app/admin/settings/components/GreetingEditModal';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import {
  useGetGreetingQuery,
  useUpdateGreetingMutation,
} from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';
import { validateGreeting } from '@/utils/validationSettings';

export default function GreetingSection() {
  const user = useAppSelector(state => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch greeting data from API
  const {
    data: greeting,
    isLoading,
    error,
  } = useGetGreetingQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  // Update greeting mutation
  const [updateGreeting] = useUpdateGreetingMutation();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = (message: string, isCustom: boolean) => {
    const validation = validateGreeting(message, isCustom);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    if (!user?._id) {
      return { success: false, error: 'User not logged in' };
    }

    void updateGreeting({
      userId: user._id,
      message: message.trim(),
      isCustom,
    });

    return { success: true };
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!greeting) {
    return <Box>Error loading greeting data</Box>;
  }

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
              backgroundColor: '#fafafa',
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
