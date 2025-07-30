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
      <Typography variant="h3">{title}</Typography>

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
              alt="Edit button"
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default SectionHeader;
