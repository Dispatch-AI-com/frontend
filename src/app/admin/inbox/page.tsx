'use client';

import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/admin/inbox/components/InboxDetail';
import InboxList from '@/app/admin/inbox/components/InboxList';
import InboxSearchBar from '@/app/admin/inbox/components/InboxSearchBar';
import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import theme from '@/theme';
import type { ICallLog } from '@/types/calllog.d';

import useCallLogs from './hooks/useCallLog';

const PageContainer = styled.div`
  display: flex;
  padding-left: 240px;
  height: 100vh;
  overflow: hidden;

  ${theme.breakpoints.down('md')} {
    padding-left: 80px;
  }

  ${theme.breakpoints.down('sm')} {
    padding-left: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8faf7;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  height: calc(100vh - 130px);
  overflow: hidden;
`;

const ListContainer = styled.div`
  width: 350px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${theme.breakpoints.down('sm')} {
    width: 100%;
    min-width: 0;
  }
`;

const ListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 150px);
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
  height: 100%;
  min-height: calc(100vh - 130px);
`;

const EmptyStateContent = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data,
    error,
    isFetchingNextPage,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useCallLogs({
    status: tag !== 'all' ? tag : undefined,
    sort,
    pageSize: 20,
  });

  const handleFetchNextPage = React.useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);

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
    if (isSmallScreen) setShowDetailMobile(true);
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
      <MainContent
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <InboxSearchBar
          tag={tag}
          onTagChange={setTag}
          sort={sort}
          onSortChange={setSort}
        />
        <ContentContainer style={{ flex: 1, overflow: 'hidden' }}>
          {!isSmallScreen ? (
            <>
              <ListContainer>
                <ListContent>
                  <InboxList
                    selectedId={selectedId}
                    onSelect={handleSelect}
                    tag={tag}
                    sort={sort}
                    allItems={allCallLogs}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={handleFetchNextPage}
                    isLoading={isPending}
                  />
                </ListContent>
              </ListContainer>
              <DetailContainer>
                {selectedItem && <InboxDetail item={selectedItem} />}
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
              {selectedItem && <InboxDetail item={selectedItem} />}
            </DetailContainer>
          ) : (
            <ListContainer style={{ width: '100%' }}>
              <ListContent>
                <InboxList
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  tag={tag}
                  sort={sort}
                  allItems={allCallLogs}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={handleFetchNextPage}
                  isLoading={isPending}
                />
              </ListContent>
            </ListContainer>
          )}
        </ContentContainer>
      </MainContent>
    </PageContainer>
  );
}
