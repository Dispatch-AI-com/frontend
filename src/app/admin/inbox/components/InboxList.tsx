import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  padding: 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#fafafa' : 'transparent')};
  transition: background-color 0.2s;
  height: 100px;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => (props.selected ? '#fafafa' : '#f5f5f5')};
  }
`;

const CallerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 16px 16px 0 16px;
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

const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 0 16px 16px 16px;
`;

const HighlightedText = styled.span`
  background-color: #fff3cd;
  padding: 0 2px;
  border-radius: 2px;
`;

const VirtualContainer = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
  min-height: 0;
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
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
  flex-shrink: 0;
`;

interface InboxListProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  searchTerm?: string;
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
  const [isAtBottom, setIsAtBottom] = useState(false);

  const rowVirtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
    // Use index as key to ensure uniqueness
    getItemKey: index => index,
  });

  const handleScroll = useCallback(() => {
    if (!parentRef.current || !fetchNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Check if we're at the bottom (within 10px)
    const atBottom = distanceFromBottom <= 10;
    setIsAtBottom(atBottom);

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
            <PhoneRow>
              <CallerPhone>Loading...</CallerPhone>
            </PhoneRow>
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
              key={virtualRow.index}
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
                    {item.startAt
                      ? new Date(item.startAt).toLocaleString()
                      : '--:--'}
                  </CallTime>
                </CallerInfo>
                <PhoneRow>
                  <CallerPhone>
                    {highlightText(
                      item.callerNumber ?? 'Unknown number',
                      searchTerm,
                    )}
                  </CallerPhone>
                </PhoneRow>
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
            <PhoneRow>
              <CallerPhone>Loading...</CallerPhone>
            </PhoneRow>
          </ListItem>
        </LoadingContainer>
      )}
      {!hasNextPage && allItems.length > 0 && isAtBottom && (
        <EndMessage>
          No more call logs to load • Total: {allItems.length} items
        </EndMessage>
      )}
    </List>
  );
}
