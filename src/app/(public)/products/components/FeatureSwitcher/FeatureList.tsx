'use client';

import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { List, ListItemButton, ListItemText, styled } from '@mui/material';

export interface FeatureItem {
  key: string;
  title: string;
  description: string;
  image: string;
  bg: string;
}

interface FeatureListProps {
  items: FeatureItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  alignItems: 'flex-start',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  /*  ✅ 选中行的自定义样式 */
  '&.Mui-selected': {
    backgroundColor: theme.palette.grey[100],
  },
  /*  ✅ 选中行在 hover 时保持同色，不要再变深 */
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

export default function FeatureList({
  items,
  activeIndex,
  onChange,
}: FeatureListProps) {
  return (
    <List disablePadding>
      {items.map((item, idx) => (
        <StyledListItem
          key={item.key}
          selected={idx === activeIndex}
          onClick={() => onChange(idx)}
        >
          <ListItemText
            primary={item.title}
            secondary={item.description}
            primaryTypographyProps={{
              fontWeight: 700,
              variant: 'h3',
              sx: { mb: 1 },
            }}
            secondaryTypographyProps={{ variant: 'body2' }}
          />
          {idx === activeIndex && (
            <EastRoundedIcon fontSize="small" sx={{ mt: 0.5 }} />
          )}
        </StyledListItem>
      ))}
    </List>
  );
}
