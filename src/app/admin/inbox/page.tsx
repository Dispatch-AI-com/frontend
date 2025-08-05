'use client';

import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { styled as muiStyled, useMediaQuery, useTheme } from '@mui/material';
import { Box, Button, IconButton, InputBase } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import InboxDetail from '@/app/admin/inbox/components/InboxDetail';
import InboxFilterModal from '@/app/admin/inbox/components/InboxFilterModal';
import InboxList from '@/app/admin/inbox/components/InboxList';
import { AdminPageLayout } from '@/components/layout/admin-layout';
import { useGetCallLogsQuery } from '@/features/callog/calllogApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';
import type { ICallLog } from '@/types/calllog.d';

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #f5f5f5;
`;

const ListContainer = styled.div`
  width: 350px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100%;

  ${theme.breakpoints.down('sm')} {
    width: 100%;
    min-width: 0;
    border-right: none;
  }
`;

const ListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f8f9fa;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

const DetailContainer = styled.div`
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f8f9fa;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
`;

const EmptyDetailContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #666;
  font-size: 16px;
  min-height: 100%;
`;

const MobileBackButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #e3f2fd;
  }
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

const SearchWrapper = muiStyled(Box)(({ theme }) => ({
  width: '232px',
  height: '40px',
  margin: '0 12px 0 0',
  padding: '12px 144px 12px 16px',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '180px',
    margin: '0 8px 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    margin: '0 4px 0 0',
    padding: '12px 8px',
  },
}));

const StyledInput = muiStyled(InputBase)(() => ({
  flex: 1,
  fontSize: '14px',
}));

const FilterButton = muiStyled(Button)(({ theme }) => ({
  width: '40px',
  height: '40px',
  minWidth: '40px',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
  border: 'none',
  margin: '0 12px 0 0',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '&.active': {
    backgroundColor: '#e0e0e0',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 4px 0 0',
  },
}));

const SortButton = muiStyled(Box)(({ theme }) => ({
  height: '40px',
  padding: '10px 16px',
  borderRadius: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: '#333',
  },
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    padding: '8px 12px',
    fontSize: '13px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 10px',
    fontSize: '12px',
    minWidth: '60px',
  },
}));

const ClearFilterButton = muiStyled(IconButton)(({ theme }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#ffebee',
  color: '#d32f2f',
  border: '1px solid #d32f2f',
  margin: '0 8px 0 0',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#d32f2f',
    color: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    width: '28px',
    height: '28px',
    margin: '0 4px 0 0',
  },
}));

const ActiveFiltersContainer = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  padding: '8px 12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
  minHeight: '40px',
  [theme.breakpoints.down('sm')]: {
    gap: '4px',
    padding: '6px 8px',
    minHeight: '36px',
  },
}));

const FilterChip = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 8px',
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 500,
  border: '1px solid #bbdefb',
  [theme.breakpoints.down('sm')]: {
    fontSize: '11px',
    padding: '3px 6px',
    gap: '4px',
  },
}));

type SortOption = 'newest' | 'oldest';

export default function InboxPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useMediaQuery(theme.breakpoints.down('md'));

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showDetailMobile, setShowDetailMobile] = useState(false);
  const [sort, setSort] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCallLogs, setAllCallLogs] = useState<ICallLog[]>([]);
  const [search, setSearch] = useState('');
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [callerNameFilter, setCallerNameFilter] = useState<string>('');
  const [dateFromFilter, setDateFromFilter] = useState<string>('');
  const [dateToFilter, setDateToFilter] = useState<string>('');

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

  // Helper function to get display values for search
  const getSearchableName = (name?: string) => {
    const trimmed = name?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : 'Unknown Caller';
  };

  const getSearchableNumber = (number?: string) => {
    const trimmed = number?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : 'Unknown number';
  };

  // Filter call logs based on search term and filters
  const filteredCallLogs = allCallLogs.filter((item: ICallLog) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const callerName = getSearchableName(item.callerName).toLowerCase();
      const callerNumber = getSearchableNumber(item.callerNumber).toLowerCase();

      if (
        !callerName.includes(searchLower) &&
        !callerNumber.includes(searchLower)
      ) {
        return false;
      }
    }

    // Caller name filter
    if (callerNameFilter) {
      const callerName = (item.callerName ?? '').toLowerCase();
      const filterName = callerNameFilter.toLowerCase();
      if (!callerName.includes(filterName)) {
        return false;
      }
    }

    // Date range filter
    if (dateFromFilter || dateToFilter) {
      const callDate = new Date(item.startAt ?? '');

      // Set start of day for fromDate (00:00:00)
      const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
      if (fromDate) {
        fromDate.setHours(0, 0, 0, 0);
      }

      // Set end of day for toDate (23:59:59.999)
      const toDate = dateToFilter ? new Date(dateToFilter) : null;
      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
      }

      if (fromDate && callDate < fromDate) {
        return false;
      }
      if (toDate && callDate > toDate) {
        return false;
      }
    }

    return true;
  });

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (isSmallScreen) setShowDetailMobile(true);
  };

  const handleBack = () => {
    setShowDetailMobile(false);
  };

  const handleCallLogDeleted = () => {
    // Reset selected item if it was deleted
    setSelectedId(undefined);
    if (isSmallScreen) {
      setShowDetailMobile(false);
    }
    // Reset pagination to refresh the list
    setCurrentPage(1);
    setAllCallLogs([]);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
  };

  const handleFilterApply = (filters: Record<string, unknown>) => {
    setCallerNameFilter((filters.callerName as string) || '');
    setDateFromFilter((filters.dateFrom as string) || '');
    setDateToFilter((filters.dateTo as string) || '');
  };

  const handleFilterClear = () => {
    setCallerNameFilter('');
    setDateFromFilter('');
    setDateToFilter('');
  };

  const hasActiveFilters = callerNameFilter || dateFromFilter || dateToFilter;

  const headerActions = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '8px' : '12px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? 1 : 0,
          justifyContent: isMobile ? 'space-between' : 'flex-start',
        }}
      >
        <SearchWrapper>
          <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
          <StyledInput
            placeholder="Search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
          />
          {search && (
            <ClearIcon
              sx={{ color: '#ccc', fontSize: 18, cursor: 'pointer' }}
              onClick={handleClearSearch}
            />
          )}
        </SearchWrapper>
        {hasActiveFilters && (
          <ClearFilterButton onClick={handleFilterClear}>
            <ClearIcon sx={{ fontSize: 16 }} />
          </ClearFilterButton>
        )}
        <FilterButton
          onClick={handleFilterClick}
          className={hasActiveFilters ? 'active' : ''}
        >
          <FilterListIcon
            sx={{ color: hasActiveFilters ? '#1976d2' : '#666' }}
          />
        </FilterButton>
        <SortButton
          onClick={() =>
            handleSortChange(sort === 'newest' ? 'oldest' : 'newest')
          }
        >
          {sort === 'newest' ? 'Newest' : 'Oldest'}
        </SortButton>
      </Box>
      {hasActiveFilters && (
        <ActiveFiltersContainer>
          <span
            style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#666',
              fontWeight: 500,
              display: isMobile ? 'none' : 'inline',
            }}
          >
            Active Filters:
          </span>
          {callerNameFilter && (
            <FilterChip>
              Caller: {callerNameFilter}
              <ClearIcon
                sx={{ fontSize: 14, cursor: 'pointer' }}
                onClick={() => handleFilterClear()}
              />
            </FilterChip>
          )}
          {(dateFromFilter || dateToFilter) && (
            <FilterChip>
              Date: {dateFromFilter || 'Any'} - {dateToFilter || 'Any'}
              <ClearIcon
                sx={{ fontSize: 14, cursor: 'pointer' }}
                onClick={() => handleFilterClear()}
              />
            </FilterChip>
          )}
        </ActiveFiltersContainer>
      )}
    </Box>
  );

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
        headerActions={headerActions}
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
      headerActions={headerActions}
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
                  searchTerm={search}
                  sort={sort}
                  allItems={filteredCallLogs}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                  isLoading={isPending}
                />
              </ListContent>
            </ListContainer>
            {selectedItem ? (
              <DetailContainer>
                <InboxDetail
                  item={selectedItem}
                  onCallLogDeleted={handleCallLogDeleted}
                />
              </DetailContainer>
            ) : (
              <EmptyDetailContainer>
                Select a call to view details
              </EmptyDetailContainer>
            )}
          </>
        ) : showDetailMobile ? (
          <DetailContainer>
            <MobileBackButton onClick={handleBack}>
              ← Back to calls
            </MobileBackButton>
            {selectedItem && (
              <InboxDetail
                item={selectedItem}
                onCallLogDeleted={handleCallLogDeleted}
              />
            )}
          </DetailContainer>
        ) : (
          <ListContainer>
            <ListContent>
              <InboxList
                selectedId={selectedId}
                onSelect={handleSelect}
                searchTerm={search}
                sort={sort}
                allItems={filteredCallLogs}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                isLoading={isPending}
              />
            </ListContent>
          </ListContainer>
        )}
      </ContentContainer>
      <InboxFilterModal
        anchorEl={filterAnchor}
        onClose={handleFilterClose}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
        currentFilters={{
          callerName: callerNameFilter,
          dateFrom: dateFromFilter,
          dateTo: dateToFilter,
        }}
      />
    </AdminPageLayout>
  );
}
