'use client';

import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/admin/inbox/components/InboxDetail';
import InboxList from '@/app/admin/inbox/components/InboxList';
import InboxSearchBar from '@/app/admin/inbox/components/InboxSearchBar';
import { AdminPageLayout } from '@/components/layout/admin-layout';
import { useGetCallLogsQuery } from '@/features/callog/calllogApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';
import type { ICallLog } from '@/types/calllog.d';

const ContentContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 200px);
  overflow: hidden;
`;

const ListContainer = styled.div`
  width: 350px;
  background-color: #fff;
  border-radius: 12px;
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

const DetailContainer = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    margin-top: 16px;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const EmptyStateImage = styled.img`
  width: 100px;
  height: 100px;
`;

const EmptyStateText = styled.div`
  font-size: 18px;
  color: #666;
  font-weight: 500;
`;

type SortOption = 'newest' | 'oldest';

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showDetailMobile, setShowDetailMobile] = useState(false);
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
  }, [sort, user?._id]);

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

  if (errorMsg) {
    return (
      <AdminPageLayout title="Inbox">
        <div>Error loading data: {errorMsg}</div>
      </AdminPageLayout>
    );
  }

  if (isPending) {
    return (
      <AdminPageLayout title="Inbox">
        <EmptyStateContainer>
          <EmptyStateContent>
            <EmptyStateText>Loading...</EmptyStateText>
          </EmptyStateContent>
        </EmptyStateContainer>
      </AdminPageLayout>
    );
  }

  if (!allCallLogs.length) {
    return (
      <AdminPageLayout
        title="Inbox"
        headerActions={<InboxSearchBar sort={sort} onSortChange={setSort} />}
        padding="normal"
      >
        <EmptyStateContainer>
          <EmptyStateContent>
            <EmptyStateImage
              src="/dashboard/inbox/empty-inbox.svg"
              alt="Empty inbox"
            />
            <EmptyStateText>Your inbox is empty.</EmptyStateText>
          </EmptyStateContent>
        </EmptyStateContainer>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Inbox"
      headerActions={<InboxSearchBar sort={sort} onSortChange={setSort} />}
      padding="normal"
    >
      <ContentContainer>
        {!isSmallScreen ? (
          <>
            <ListContainer>
              <ListContent>
                <InboxList
                  selectedId={selectedId}
                  onSelect={handleSelect}
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
    </AdminPageLayout>
  );
}
