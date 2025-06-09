import { Box } from '@mui/material';

import InboxListItem from '@/app/(protected)/dashboard/inbox/components/InboxListItem';
import type { ICallLog } from '@/app/(protected)/dashboard/inbox/types';

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
    <Box>
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
    </Box>
  );
}
