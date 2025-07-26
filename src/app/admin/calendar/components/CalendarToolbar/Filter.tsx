import {
  Badge,
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  Popover,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  color: string;
  selected: boolean;
}

interface FilterProps {
  onFilterChange?: (selectedFilters: string[]) => void;
}

const initialFilters: FilterOption[] = [
  { id: 'pending', label: 'Pending', color: '#ff7206', selected: true },
  { id: 'confirmed', label: 'Confirmed', color: '#0687ff', selected: true },
  { id: 'done', label: 'Done', color: '#58c112', selected: true },
];

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<FilterOption[]>(initialFilters);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterToggle = (filterId: string) => {
    const updatedFilters = filters.map(filter =>
      filter.id === filterId
        ? { ...filter, selected: !filter.selected }
        : filter,
    );
    setFilters(updatedFilters);
    const selectedFilterIds = updatedFilters
      .filter(filter => filter.selected)
      .map(filter => filter.id);
    onFilterChange?.(selectedFilterIds);
  };

  const selectedCount = filters.filter(f => f.selected).length;

  const handleSelectAll = () => {
    const allSelected = filters.every(f => f.selected);
    const updatedFilters = filters.map(f => ({ ...f, selected: !allSelected }));
    setFilters(updatedFilters);
    onFilterChange?.(!allSelected ? updatedFilters.map(f => f.id) : []);
  };

  return (
    <>
      <Badge
        badgeContent={selectedCount}
        color="error"
        invisible={selectedCount === 0}
      >
        <IconButton
          onClick={handleOpen}
          size="large"
          sx={{ ml: { xs: 1, md: 2 } }}
        >
          <Image
            src="/dashboard/calendar/filter.svg"
            alt="filter"
            width={16}
            height={16}
          />
        </IconButton>
      </Badge>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 220, p: 1 } }}
      >
        <Box sx={{ px: 2, pb: 1, borderBottom: '1px solid #eee' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Task Types
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Selected {selectedCount}/{filters.length}
          </Typography>
        </Box>
        <List dense disablePadding>
          {filters.map(filter => (
            <ListItemButton
              key={filter.id}
              onClick={() => handleFilterToggle(filter.id)}
              sx={{
                gap: 1.5,
                '&:hover': { backgroundColor: '#f8f9fa' },
                transition: 'background-color 0.2s',
              }}
            >
              <Checkbox
                checked={filter.selected}
                tabIndex={-1}
                sx={{
                  color: filter.color,
                  '&.Mui-checked': {
                    color: filter.color,
                  },
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: filter.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2">{filter.label}</Typography>
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2, pt: 1, borderTop: '1px solid #eee', mt: 1 }}>
          <Button
            onClick={handleSelectAll}
            variant="text"
            size="small"
            sx={{ color: '#007BFF', textTransform: 'none', p: 0 }}
            fullWidth
          >
            {filters.every(f => f.selected) ? 'Deselect All' : 'Select All'}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Filter;
