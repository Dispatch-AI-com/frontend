import { Box, Chip, Typography } from '@mui/material';

import type { ICallLog } from '@/app/(protected)/dashboard/inbox/types';

export default function InboxDetail({ item }: { item?: ICallLog }) {
  if (!item) {
    return (
      <Box p={4} color="text.secondary">
        Select a message to view details.
      </Box>
    );
  }
  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          width={48}
          height={48}
          borderRadius="50%"
          bgcolor="#222"
          color="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight={700}
          fontSize={22}
          mr={2}
        >
          {item.callerNumber}
        </Box>
        <Box>
          <Typography fontWeight={700}>{item.callerNumber}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.companyId}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography fontWeight={700} mr={1}>
          {item.serviceBookedId ? 'Service Booked' : 'No Service'}
        </Typography>
        <Chip
          label={item.status}
          size="small"
          color={
            item.status === 'Missed'
              ? 'error'
              : item.status === 'Completed'
                ? 'success'
                : 'default'
          }
          sx={{ height: 20, fontSize: 12 }}
        />
        <Typography variant="caption" color="text.secondary" ml={2}>
          {item.startAt ? new Date(item.startAt).toLocaleString() : ''}
        </Typography>
      </Box>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Call Log Info
      </Typography>
      <Box mb={2}>
        <Typography variant="body2">Call ID: {item._id}</Typography>
        <Typography variant="body2">Audio ID: {item.audioId ?? '-'}</Typography>
        <Typography variant="body2">
          Transcript ID: {item.transcriptId ?? '-'}
        </Typography>
      </Box>
      {/* 语音播放条、转录按钮等可后续补充 */}
    </Box>
  );
}
