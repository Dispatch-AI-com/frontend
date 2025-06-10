import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import styled from 'styled-components';

import type { ICallLog } from '@/app/(protected)/dashboard/inbox/types';

const ListItemContainer = styled(Box)<{ selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: ${props => (props.selected ? '#fafafa' : '#fff')};
  cursor: pointer;
  border: 1px solid #f5f5f5;
`;

const AvatarContainer = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden;
`;

const ContentContainer = styled(Box)`
  flex: 1;
  min-width: 0;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NameText = styled(Typography)`
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled(Typography)`
  margin-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SummaryText = styled(Typography)`
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 8px 0;
  line-height: 1.5;
`;

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
    <ListItemContainer selected={selected} onClick={onClick}>
      <AvatarContainer>
        <Image
          src="/avatars/user-avatar.jpg"
          alt="avatar"
          width={40}
          height={40}
        />
      </AvatarContainer>
      <ContentContainer>
        <HeaderContainer>
          <NameText>{item.callerName}</NameText>
          <DateText variant="caption" color="text.secondary">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : ''}
          </DateText>
        </HeaderContainer>
        <StatusContainer>
          <Chip
            label={item.status}
            size="small"
            sx={{
              height: 20,
              fontSize: 12,
              mr: 1,
              backgroundColor:
                item.status === 'Missed'
                  ? '#ffebeb'
                  : item.status === 'Completed'
                    ? '#e7f8dc'
                    : '#fff0e6',
              color: '#000',
              '& .MuiChip-label': {
                color: '#000',
              },
            }}
          />
        </StatusContainer>
        <SummaryText variant="body2" color="text.secondary">
          {item.summary}
        </SummaryText>
      </ContentContainer>
    </ListItemContainer>
  );
}
