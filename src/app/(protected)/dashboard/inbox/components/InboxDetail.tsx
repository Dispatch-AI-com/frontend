import PhoneIcon from '@mui/icons-material/Phone';
import { Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import styled from 'styled-components';

import type { ICallLog } from '@/app/(protected)/dashboard/inbox/types';

import TranscriptSection from './TranscriptSection';

const DetailContainer = styled.div`
  padding: 24px 0 0 0;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
`;

const AvatarImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled(Typography)`
  font-weight: 700;
  font-size: 14px;
`;

const UserPhone = styled(Typography)`
  color: #888;
  font-size: 14px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 24px 0 0 0;
`;

const MainContent = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SummaryText = styled(Typography)`
  && {
    font-size: 15px;
    font-weight: 700;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: #222;
  }
`;

const StatusChip = styled(Chip)<{ status: string }>`
  height: 20px;
  font-size: 13px;
  margin-right: 8px;
  background-color: ${({ status }) =>
    status === 'Missed'
      ? '#ffebeb'
      : status === 'Completed'
        ? '#e7f8dc'
        : '#fff0e6'} !important;
  color: #000 !important;
  font-weight: 500;
  .MuiChip-label {
    color: #000 !important;
    padding: 16px 8px;
  }
`;

const DateText = styled(Typography)`
  && {
    font-size: 15px;
    font-weight: 700;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: #222;
  }
`;

const ThreeColRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  margin-top: 16px;
`;

const ColIcon = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 0 0 32px;
`;

const ColMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

const SummaryStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TranscriptContainer = styled.div`
  padding: 0 32px 0 32px;
`;

export default function InboxDetail({ item }: { item?: ICallLog }) {
  if (!item) {
    return (
      <DetailContainer style={{ color: '#666', padding: 32 }}>
        Select a message to view details.
      </DetailContainer>
    );
  }

  // 日期格式: Apr 15, 2025 at 07:16 PM
  let formattedDate = '';
  if (item.createdAt) {
    try {
      formattedDate = format(
        new Date(item.createdAt),
        "MMM dd, yyyy 'at' hh:mm a",
      );
    } catch {
      formattedDate = '';
    }
  }

  return (
    <DetailContainer>
      <AvatarSection>
        <AvatarImg>
          <AvatarImage
            src="/avatars/user-avatar.jpg"
            alt="avatar"
            width={40}
            height={40}
          />
        </AvatarImg>
        <UserInfo>
          <UserName>{item.callerName}</UserName>
          <UserPhone>{item.callerNumber}</UserPhone>
        </UserInfo>
      </AvatarSection>
      <Divider />
      <MainContent>
        <ThreeColRow>
          <ColIcon>
            <PhoneIcon sx={{ fontSize: 20, color: '#222' }} />
          </ColIcon>
          <ColMain>
            <SummaryStatusRow>
              <SummaryText>{item.summary}</SummaryText>
              <StatusChip
                label={item.status}
                status={item.status}
                size="small"
              />
            </SummaryStatusRow>
            <DateText>{formattedDate}</DateText>
          </ColMain>
        </ThreeColRow>
      </MainContent>
      <TranscriptContainer>
        <TranscriptSection calllogId={item._id ?? ''} />
      </TranscriptContainer>
    </DetailContainer>
  );
}
