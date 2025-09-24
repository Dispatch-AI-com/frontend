'use client';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

import theme from '@/theme';

interface SectionHeaderProps {
  title: string;
  onEdit?: () => void;
  showEditIcon?: boolean;
}

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
});

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onEdit,
  showEditIcon = true,
}) => {
  return (
    <HeaderContainer>
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
    </HeaderContainer>
  );
};

export default SectionHeader;
