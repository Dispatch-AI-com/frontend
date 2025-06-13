'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/(protected)/inbox/components/InboxDetail';
import InboxList from '@/app/(protected)/inbox/components/InboxList';
import InboxSearchBar from '@/app/(protected)/inbox/components/InboxSearchBar';
import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import useCallLogs from '@/hooks/useCallLog';
import { useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

const PageContainer = styled.div`
  display: flex;
  padding-left: 240px;
  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8faf7;
`;

const UserInfoBox = styled.div`
  padding: 16px;
  background-color: #e8f5e9;
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
`;

const ListContainer = styled.div`
  width: 350px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const DetailContainer = styled.div`
  flex: 1;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const EmptyStateContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyStateContent = styled.div`
  text-align: center;
`;

const EmptyStateImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;

const EmptyStateText = styled.div`
  font-size: 20px;
  color: #666;
  font-weight: 500;
`;

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');
  const [sort, setSort] = useState('newest');

  const user = useAppSelector(state => state.auth.user);
  const { data: calllogs = [], error } = useCallLogs();

  const errorMsg =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : undefined;

  const filteredCalllogs = calllogs
    .filter((item: ICallLog) => {
      // tag filter
      if (tag === 'all') return true;
      if (tag === 'missed') return item.status === 'Missed';
      if (tag === 'completed') return item.status === 'Completed';
      if (tag === 'followup') return item.status === 'Follow-up';
      return true;
    })
    .filter((item: ICallLog) => {
      // search filter
      if (!search) return true;
      const keyword = search.toLowerCase();
      return [
        item.callerName?.toLowerCase(),
        item.callerNumber,
        item.summary?.toLowerCase(),
      ].some(field => field?.includes(keyword) ?? false);
    })
    .sort((a: ICallLog, b: ICallLog) => {
      // sort
      const dateA = new Date(a.createdAt ?? '').getTime();
      const dateB = new Date(b.createdAt ?? '').getTime();
      if (sort === 'newest') return dateB - dateA;
      if (sort === 'oldest') return dateA - dateB;
      return 0;
    });

  const pageSize = 5;
  const pagedCalllogs = filteredCalllogs.slice(0, pageSize);

  React.useEffect(() => {
    if (filteredCalllogs.length && !selectedId) {
      setSelectedId(filteredCalllogs[0]._id);
    }
  }, [filteredCalllogs, selectedId]);

  const selectedItem = filteredCalllogs.find(
    (item: ICallLog) => item._id === selectedId,
  );

  if (errorMsg) return <div>Error loading data: {errorMsg}</div>;
  if (!filteredCalllogs.length) {
    return (
      <PageContainer>
        <Sidebar />
        <MainContent>
          <UserInfoBox>
            {user ? (
              <>
                <strong>User:</strong> {user._id} ({user.email})
              </>
            ) : (
              <span>No user info</span>
            )}
          </UserInfoBox>
          <InboxSearchBar
            search={search}
            onSearchChange={setSearch}
            tag={tag}
            onTagChange={setTag}
            sort={sort}
            onSortChange={setSort}
          />
          <EmptyStateContainer>
            <EmptyStateContent>
              <EmptyStateImage
                src="/dashboard/inbox/empty-inbox.svg"
                alt="Empty inbox"
              />
              <EmptyStateText>Your inbox is empty.</EmptyStateText>
            </EmptyStateContent>
          </EmptyStateContainer>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <UserInfoBox>
          {user ? (
            <>
              <strong>User:</strong> {user._id} ({user.email})
            </>
          ) : (
            <span>No user info</span>
          )}
        </UserInfoBox>
        <InboxSearchBar
          search={search}
          onSearchChange={setSearch}
          tag={tag}
          onTagChange={setTag}
          sort={sort}
          onSortChange={setSort}
        />
        <ContentContainer>
          <ListContainer>
            <InboxList
              selectedId={selectedId}
              onSelect={setSelectedId}
              data={pagedCalllogs}
            />
          </ListContainer>
          <DetailContainer>
            <InboxDetail item={selectedItem} />
          </DetailContainer>
        </ContentContainer>
      </MainContent>
    </PageContainer>
  );
}
