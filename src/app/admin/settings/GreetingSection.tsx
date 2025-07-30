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

  if (error) {
    // 检查是否是 404 错误（Company not found）
    const errorMessage =
      typeof error === 'string'
        ? error
        : 'data' in error
          ? error.data
          : 'message' in error
            ? error.message
            : 'Unknown error';

    if (
      typeof errorMessage === 'string' &&
      (errorMessage.includes('Company not found') ||
        ('status' in error && error.status === 404))
    ) {
      return (
        <Box>
          <SectionHeader title="Greeting" />
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: 1,
              color: '#856404',
            }}
          >
            <Typography variant="body2">
              No company information found. Please complete your company profile
              first.
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <SectionHeader title="Greeting" />
        <Box
          sx={{
            p: 2,
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: 1,
            color: '#721c24',
          }}
        >
          <Typography variant="body2">
            Error loading greeting data: {errorMessage}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!greeting) {
    return (
      <Box>
        <SectionHeader title="Greeting" />
        <Box
          sx={{
            p: 2,
            backgroundColor: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: 1,
            color: '#0c5460',
          }}
        >
          <Typography variant="body2">
            No greeting data available. Please contact support if this issue
            persists.
          </Typography>
        </Box>
      </Box>
    );
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
