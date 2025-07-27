import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import type { ICallLog } from '@/types/calllog.d';

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
  height: 100px;
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

const CallerPhone = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  flex: 1;
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
      case 'Done':
        return '#E8F5E8';
      case 'Cancelled':
        return '#FEE4E2';
      case 'Confirmed':
        return '#FEF0C7';
      default:
        return '#F7F8FA';
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
        case 'Done':
          return '#28A745';
        case 'Cancelled':
          return '#DC3545';
        case 'Confirmed':
          return '#FFC107';
        default:
          return '#757575';
      }
    }};
  }
`;

const PhoneStatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 24px;
`;

const HighlightedText = styled.span`
  background-color: #fff3cd;
  padding: 0 2px;
  border-radius: 2px;
`;

const VirtualContainer = styled.div`
  width: 100%;
  position: relative;
`;

const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const LoadingContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const EndMessage = styled.div`
  padding: 16px;
  text-align: center;
  color: #666;
  font-size: 14px;
  font-style: italic;
`;

interface InboxListProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  searchTerm?: string;
  tag?: 'all' | 'Cancelled' | 'Done' | 'Confirmed';
  sort?: 'newest' | 'oldest';
  allItems?: ICallLog[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  isLoading?: boolean;
}

const ITEM_HEIGHT = 100; // Updated to match the new ListItem height

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
  allItems = [],
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  isLoading = false,
}: InboxListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
    // Maintain scroll position when new items are added
    getItemKey: index => allItems[index]?._id ?? index,
  });

  const handleScroll = useCallback(() => {
    if (!parentRef.current || !fetchNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Trigger next page when within 200px of bottom
    if (distanceFromBottom <= 200 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
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
            <PhoneStatusRow>
              <CallerPhone>Loading...</CallerPhone>
              <StatusChip status="loading">Loading...</StatusChip>
            </PhoneStatusRow>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <List ref={parentRef}>
      <VirtualContainer
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const item = allItems[virtualRow.index];
          if (!item) return null;

          return (
            <VirtualItem
              key={item._id}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <ListItem
                selected={item._id === selectedId}
                onClick={() => onSelect?.(item._id!)}
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
                <PhoneStatusRow>
                  <CallerPhone>
                    {highlightText(
                      item.callerNumber ?? 'Unknown number',
                      searchTerm,
                    )}
                  </CallerPhone>
                  <StatusChip status={item.status ?? 'Unknown'}>
                    {item.status ?? 'Unknown'}
                  </StatusChip>
                </PhoneStatusRow>
              </ListItem>
            </VirtualItem>
          );
        })}
      </VirtualContainer>
      {isFetchingNextPage && (
        <LoadingContainer>
          <ListItem>
            <CallerInfo>
              <CallerName>Loading more...</CallerName>
              <CallTime>--:--</CallTime>
            </CallerInfo>
            <PhoneStatusRow>
              <CallerPhone>Loading...</CallerPhone>
              <StatusChip status="loading">Loading...</StatusChip>
            </PhoneStatusRow>
          </ListItem>
        </LoadingContainer>
      )}
      {!hasNextPage && allItems.length > 0 && (
        <EndMessage>
          No more call logs to load • Total: {allItems.length} items
        </EndMessage>
      )}
    </List>
  );
}
