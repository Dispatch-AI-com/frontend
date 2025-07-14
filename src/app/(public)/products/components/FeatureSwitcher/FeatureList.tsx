'use client';

import { List, ListItemButton, ListItemText, styled } from '@mui/material';

export interface FeatureItem {
  key: string;
  title: string;
  description: string;
  image: string;
}

interface FeatureListProps {
  items: FeatureItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

/* ------------------------- styled components ------------------------- */

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  alignItems: 'flex-start',
  borderRadius: theme.shape.borderRadius,
}));

/* ------------------------------ component ---------------------------- */

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
            primaryTypographyProps={{ fontWeight: 700, variant: 'h3' }}
            secondaryTypographyProps={{ variant: 'body2' }}
          />
        </StyledListItem>
      ))}
    </List>
  );
}
