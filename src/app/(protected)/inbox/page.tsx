'use client';

import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/(protected)/inbox/components/InboxDetail';
import InboxList from '@/app/(protected)/inbox/components/InboxList';
import InboxSearchBar from '@/app/(protected)/inbox/components/InboxSearchBar';
import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import useCallLogs from '@/hooks/useCallLog';
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

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
`;

const ListContainer = styled.div`
  width: 350px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    display: flex;
  }
`;

const ListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LoadingSpinner = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

const DetailContainer = styled.div`
  flex: 1;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
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

type TagOption = 'all' | 'Missed' | 'Completed' | 'Follow-up';
type SortOption = 'newest' | 'oldest';

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showDetailMobile, setShowDetailMobile] = useState(false);
  const [tag, setTag] = useState<TagOption>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const isMobile = useMediaQuery('(max-width:600px)');

  const { data, error, isFetchingNextPage, isPending } = useCallLogs({
    status: tag !== 'all' ? tag : undefined,
    sort,
  });

  const errorMsg =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : undefined;

  const allCallLogs = React.useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data],
  );

  React.useEffect(() => {
    if (allCallLogs.length && !selectedId) {
      setSelectedId(allCallLogs[0]._id);
    }
  }, [allCallLogs, selectedId]);

  const selectedItem = allCallLogs.find(
    (item: ICallLog) => item._id === selectedId,
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (isMobile) setShowDetailMobile(true);
  };
  const handleBack = () => {
    setShowDetailMobile(false);
  };

  if (errorMsg) return <div>Error loading data: {errorMsg}</div>;
  if (isPending) {
    return (
      <PageContainer>
        <Sidebar />
        <MainContent>
          <LoadingSpinner>Loading...</LoadingSpinner>
        </MainContent>
      </PageContainer>
    );
  }
  if (!allCallLogs.length) {
    return (
      <PageContainer>
        <Sidebar />
        <MainContent>
          <InboxSearchBar
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
        <InboxSearchBar
          tag={tag}
          onTagChange={setTag}
          sort={sort}
          onSortChange={setSort}
        />
        <ContentContainer>
          {!isMobile ? (
            <>
              <ListContainer>
                <ListContent>
                  <InboxList
                    selectedId={selectedId}
                    onSelect={handleSelect}
                    data={allCallLogs}
                    isLoading={isPending}
                  />
                  {isFetchingNextPage && (
                    <LoadingSpinner>Loading more...</LoadingSpinner>
                  )}
                </ListContent>
              </ListContainer>
              <DetailContainer>
                <InboxDetail item={selectedItem} />
              </DetailContainer>
            </>
          ) : showDetailMobile ? (
            <DetailContainer>
              <div style={{ padding: '16px 0 0 16px' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1976d2',
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginBottom: 16,
                  }}
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>
              <InboxDetail item={selectedItem} />
            </DetailContainer>
          ) : (
            <ListContainer style={{ width: '100%' }}>
              <ListContent>
                <InboxList
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  data={allCallLogs}
                  isLoading={isPending}
                />
                {isFetchingNextPage && (
                  <LoadingSpinner>Loading more...</LoadingSpinner>
                )}
              </ListContent>
            </ListContainer>
          )}
        </ContentContainer>
      </MainContent>
    </PageContainer>
  );
}
