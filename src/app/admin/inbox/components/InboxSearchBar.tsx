import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

type TagOption = 'all' | 'Cancelled' | 'Done' | 'Confirmed';
type SortOption = 'newest' | 'oldest';

interface InboxSearchBarProps {
  tag: TagOption;
  onTagChange: (value: TagOption) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  margin-right: auto;
  @media (max-width: 600px) {
    margin: 0 auto;
    text-align: center;
  }
`;

const HideOnMobile = styled.div`
  @media (max-width: 600px) {
    display: none !important;
  }
`;

const FilterButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1.5px solid #d5d5d5;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  cursor: pointer;
  padding: 0;
`;

export default function InboxSearchBar({
  tag,
  onTagChange,
  sort,
  onSortChange,
}: InboxSearchBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SearchBarContainer>
      <Title>Inbox</Title>
      <HideOnMobile>
        <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
          <Select
            value={tag}
            onChange={e => onTagChange(e.target.value as TagOption)}
            displayEmpty
            input={<OutlinedInput />}
            sx={{ fontSize: 14 }}
          >
            <MenuItem value="all">All tags</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
          </Select>
        </FormControl>
      </HideOnMobile>
      <HideOnMobile>
        <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
          <Select
            value={sort}
            onChange={e => onSortChange(e.target.value as SortOption)}
            input={<OutlinedInput />}
            sx={{ fontSize: 14 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </HideOnMobile>
      <HideOnMobile>
        <TextField
          size="small"
          placeholder="Search"
          value={''}
          sx={{ width: 220, background: '#fafafa', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="small" style={{ cursor: 'pointer' }} />
              </InputAdornment>
            ),
          }}
          disabled
        />
      </HideOnMobile>
      <HideOnMobile>
        <FilterButton onClick={handleFilterClick}>
          <FilterAltIcon sx={{ color: '#060606', fontSize: 24 }} />
        </FilterButton>
      </HideOnMobile>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { zIndex: 2000 } }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <FilterAltIcon sx={{ color: '#1976d2', fontSize: 48, mb: 1 }} />
          <Box fontSize={16} color="#666">
            Date range filter
          </Box>
        </Box>
      </Popover>
    </SearchBarContainer>
  );
}
