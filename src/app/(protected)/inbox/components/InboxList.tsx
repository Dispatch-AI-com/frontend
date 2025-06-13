import styled from 'styled-components';

import InboxListItem from '@/app/(protected)/inbox/components/InboxListItem';
import type { ICallLog } from '@/types/calllog.d';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InboxList({
  selectedId,
  onSelect,
  data,
}: {
  selectedId?: string;
  onSelect?: (id: string) => void;
  data: ICallLog[];
}) {
  return (
    <ListContainer>
      {data.map((item: ICallLog) => {
        const handleClick = () => {
          if (onSelect && item._id) {
            onSelect(item._id);
          }
        };
        return (
          <InboxListItem
            key={item._id}
            item={item}
            selected={item._id === selectedId}
            onClick={handleClick}
          />
        );
      })}
    </ListContainer>
  );
}
