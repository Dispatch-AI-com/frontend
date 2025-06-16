import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useCallLogs from '@/hooks/useCallLog';

const List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  position: relative;
`;

const ListItem = styled.div<{ selected?: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#fafafa' : 'transparent')};
  transition: background-color 0.2s;
  height: 140px;
  width: 324px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
  }

  &:hover {
    background-color: ${props => (props.selected ? '#fafafa' : '#f5f5f5')};
  }
`;

const CallerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CallerName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    max-width: 60%;
  }
`;

const CallTime = styled.div`
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const CallSummary = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #060606;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  margin-top: 8px;
`;

const StatusChip = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
  color: #060606;
  background-color: ${props => {
    switch (props.status) {
      case 'Completed':
        return '#e7f8dc';
      case 'Missed':
        return '#ffebeb';
      case 'Follow-up':
        return '#fff0e6';
      default:
        return '#f5f5f5';
    }
  }};

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    background-color: ${props => {
      switch (props.status) {
        case 'Completed':
          return '#2e7d32';
        case 'Missed':
          return '#c62828';
        case 'Follow-up':
          return '#f57c00';
        default:
          return '#757575';
      }
    }};
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const HighlightedText = styled.span`
  background-color: #fff3cd;
  padding: 0 2px;
  border-radius: 2px;
`;

interface InboxListProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  searchTerm?: string;
  tag?: 'all' | 'Missed' | 'Completed' | 'Follow-up';
  sort?: 'newest' | 'oldest';
}

const ITEM_HEIGHT = 140; // Updated to match the new ListItem height

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm || !text) return text;

  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedSearchTerm})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <HighlightedText key={i}>{part}</HighlightedText>
    ) : (
      part
    ),
  );
};

export default function InboxList({
  selectedId,
  onSelect,
  searchTerm = '',
  tag = 'all',
  sort = 'newest',
}: InboxListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCallLogs({
      search: searchTerm,
      status: tag !== 'all' ? tag : undefined,
      sort,
    });

  const allItems = data?.pages.flatMap(page => page.data) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  const handleScroll = useCallback(() => {
    if (!parentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  if (isLoading) {
    return (
      <List>
        {Array.from({ length: 5 }).map((_, index) => (
          <ListItem key={index}>
            <CallerInfo>
              <CallerName>Loading...</CallerName>
              <CallTime>--:--</CallTime>
            </CallerInfo>
            <StatusContainer>
              <StatusChip status="loading">Loading...</StatusChip>
            </StatusContainer>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <List ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const item = allItems[virtualRow.index];
          return (
            <div
              key={item._id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ListItem
                selected={item._id === selectedId}
                onClick={() => item._id && onSelect?.(item._id)}
              >
                <CallerInfo>
                  <CallerName>
                    {highlightText(item.callerName ?? 'Unknown', searchTerm)}
                  </CallerName>
                  <CallTime>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : '--:--'}
                  </CallTime>
                </CallerInfo>
                <StatusContainer>
                  <StatusChip status={item.status ?? 'Unknown'}>
                    {item.status ?? 'Unknown'}
                  </StatusChip>
                </StatusContainer>
                <CallSummary>
                  {highlightText(item.summary ?? '', searchTerm)}
                </CallSummary>
              </ListItem>
            </div>
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div style={{ position: 'relative', marginTop: '8px' }}>
          <ListItem>
            <CallerInfo>
              <CallerName>Loading more...</CallerName>
              <CallTime>--:--</CallTime>
            </CallerInfo>
            <StatusContainer>
              <StatusChip status="loading">Loading...</StatusChip>
            </StatusContainer>
          </ListItem>
        </div>
      )}
    </List>
  );
}
