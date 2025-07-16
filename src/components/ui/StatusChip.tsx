import { Box, Typography } from '@mui/material';

type StatusType = 'paid' | 'unpaid' | 'refunded';

interface Props {
  status: StatusType;
}

const statusStyles = {
  paid: {
    bg: '#e7f8dc',
    dot: '#58c112',
    text: 'Paid',
  },
  unpaid: {
    bg: '#ffebeb',
    dot: '#ff3f3f',
    text: 'Unpaid',
  },
  refunded: {
    bg: '#fff0e6',
    dot: '#ff7206',
    text: 'Refunded',
  },
};

const StatusChip = ({ status }: Props) => {
  const { bg, dot, text } = statusStyles[status];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 1.5,
        py: 0.5,
        borderRadius: '12px',
        backgroundColor: bg,
        width: 'fit-content',
        height: 24,
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: dot,
          marginRight: 1,
        }}
      />
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: 13,
          fontWeight: 'normal',
          lineHeight: 1.23,
          color: '#060606',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default StatusChip;
