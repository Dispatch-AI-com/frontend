'use client';

import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/admin/inbox/components/InboxDetail';
import InboxList from '@/app/admin/inbox/components/InboxList';
import InboxSearchBar from '@/app/admin/inbox/components/InboxSearchBar';
import { useGetCallLogsQuery } from '@/features/callog/calllogApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';
import type { ICallLog } from '@/types/calllog.d';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f8faf7;
  margin-left: 0;

  ${theme.breakpoints.up('sm')} {
    margin-left: 50px;
  }

  ${theme.breakpoints.up('md')} {
    margin-left: 240px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [allCallLogs, setAllCallLogs] = useState<ICallLog[]>([]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useAppSelector(state => state.auth.user);
  const {
    data,
    error,
    isLoading: isPending,
    isFetching,
  } = useGetCallLogsQuery(
    {
      userId: user?._id ?? '',
      options: {
        status: tag !== 'all' ? tag : undefined,
        sort,
        pageSize: 20,
        page: currentPage,
      },
    },
    { skip: !user?._id },
  );

  const errorMsg =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : undefined;

  // Reset data when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setAllCallLogs([]);
  }, [tag, sort, user?._id]);

  // Accumulate data when new page is loaded
  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllCallLogs(data.data);
      } else {
        setAllCallLogs(prev => [...prev, ...data.data]);
      }
    }
  }, [data, currentPage]);

  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const isFetchingNextPage = isFetching && currentPage > 1;

  const fetchNextPage = React.useCallback(() => {
    if (hasNextPage && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage, isFetching]);

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
        <MainContent>
          <LoadingSpinner>Loading...</LoadingSpinner>
        </MainContent>
      </PageContainer>
    );
  }
  if (!allCallLogs.length) {
    return (
      <PageContainer>
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
                    fetchNextPage={fetchNextPage}
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
                  fetchNextPage={fetchNextPage}
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
