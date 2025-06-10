import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';

import type { ICallLog } from '@/app/(protected)/dashboard/inbox/types';

export default function InboxListItem({
  item,
  selected,
  onClick,
}: {
  item: ICallLog;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      p={2}
      bgcolor={selected ? '#F8FAF7' : '#fff'}
      borderLeft={selected ? '4px solid #A8F574' : '4px solid transparent'}
      sx={{ cursor: 'pointer', borderRadius: 2, mb: 1 }}
      onClick={onClick}
    >
      {/* 头像可根据callerNumber生成或用默认图 */}
      <Box
        width={40}
        height={40}
        borderRadius="50%"
        bgcolor="#222"
        color="#fff"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight={700}
        fontSize={18}
        mr={1.5}
        flexShrink={0}
        overflow="hidden"
      >
        <Image
          src="/avatars/user-avatar.jpg"
          alt="avatar"
          width={40}
          height={40}
        />
      </Box>
      <Box flex={1} minWidth={0}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} noWrap>
            Jeon Chen
          </Typography>
          <Typography variant="caption" color="text.secondary" ml={2} noWrap>
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : ''}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <Chip
            label={item.status}
            size="small"
            color={
              item.status === 'Missed'
                ? 'error'
                : item.status === 'Completed'
                  ? 'success'
                  : 'warning'
            }
            sx={{ height: 20, fontSize: 12, mr: 1 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {item.summary}
        </Typography>
      </Box>
    </Box>
  );
}
