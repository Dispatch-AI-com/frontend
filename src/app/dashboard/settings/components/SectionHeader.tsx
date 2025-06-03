'use client';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  onEdit?: () => void;
  showEditIcon?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onEdit,
  showEditIcon = true,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>

      {showEditIcon && onEdit && (
        <Tooltip title="Edit">
          <IconButton
            onClick={onEdit}
            size="small"
            aria-label={`Edit ${title}`}
          >
            <Image
              src="/dashboard/settings/edit.svg"
              width={16}
              height={16}
              alt="Profile Details"
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default SectionHeader;
