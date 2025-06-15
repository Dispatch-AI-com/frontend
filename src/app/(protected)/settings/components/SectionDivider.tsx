import { Box } from '@mui/material';

interface SectionDividerProps {
  my?: number;
}

export default function SectionDivider({ my = 4 }: SectionDividerProps) {
  return (
    <Box my={my}>
      <Box sx={{ borderTop: '1px solid #eaeaea' }} />
    </Box>
  );
}
