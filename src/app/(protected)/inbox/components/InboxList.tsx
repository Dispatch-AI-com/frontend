import React, { useState } from 'react';
import styled from 'styled-components';

import type { ICallLog } from '@/types/calllog.d';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div<{ selected?: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#fafafa' : 'transparent')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => (props.selected ? '#fafafa' : '#f5f5f5')};
  }
`;

const CallerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CallerName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const CallTime = styled.div`
  color: #666;
  font-size: 0.9em;
`;

const CallSummary = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #060606;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #eee;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  margin: 0 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #666;
`;

const HighlightedText = styled.span`
  background-color: #fff3cd;
  padding: 0 2px;
  border-radius: 2px;
`;

interface InboxListProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  data: ICallLog[];
  lastItemRef?: (node: HTMLDivElement) => void;
  isLoading?: boolean;
  searchTerm?: string;
}

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
  data,
  lastItemRef,
  isLoading,
  searchTerm = '',
}: InboxListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

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
    <>
      <List>
        {currentItems.map((item, index) => (
          <ListItem
            key={item._id}
            selected={item._id === selectedId}
            onClick={() => item._id && onSelect?.(item._id)}
            ref={index === currentItems.length - 1 ? lastItemRef : undefined}
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
        ))}
      </List>
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PageButton
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationContainer>
      )}
    </>
  );
}
