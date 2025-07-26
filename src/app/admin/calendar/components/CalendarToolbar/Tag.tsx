import { Box, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const tags = [
  { label: 'Confirmed', color: '#e1f0ff', dot: '#0687ff' },
  { label: 'Done', color: '#e7f8dc', dot: '#58c112' },
  { label: 'Cancelled', color: '#fff0e6', dot: '#ff7206' },
];

const Tag: React.FC = () => {
  const show = useMediaQuery('(min-width:1100px)');
  if (!show) return null;
  return (
    <Stack direction="row" spacing={0} alignItems="center" height={40}>
      {tags.map((tag, idx) => (
        <Box
          key={tag.label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            padding: '0 8px',
            fontSize: 12,
            color: '#222',
            fontWeight: 500,
            height: 24,
            boxSizing: 'border-box',
            background: tag.color,
            marginRight: idx === tags.length - 1 ? 2 : 1,
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              width: 4,
              height: 4,
              borderRadius: '50%',
              margin: '6px 4px 6px 0',
              background: tag.dot,
            }}
          />
          {tag.label}
        </Box>
      ))}
    </Stack>
  );
};

export default Tag;
