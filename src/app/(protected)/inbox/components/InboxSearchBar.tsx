import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import styled from 'styled-components';

interface InboxSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tag: string;
  onTagChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  flex: 1;
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
  outline: none;
  padding: 0;
`;

export default function InboxSearchBar({
  search,
  onSearchChange,
  tag,
  onTagChange,
  sort,
  onSortChange,
}: InboxSearchBarProps) {
  return (
    <SearchBarContainer>
      <Title>Inbox</Title>
      <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
        <Select
          value={tag}
          onChange={e => {
            onTagChange(e.target.value);
          }}
          displayEmpty
          input={<OutlinedInput />}
          sx={{ fontSize: 14 }}
        >
          <MenuItem value="all">All tags</MenuItem>
          <MenuItem value="missed">Missed</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="followup">Follow-up</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
        <Select
          value={sort}
          onChange={e => {
            onSortChange(e.target.value);
          }}
          input={<OutlinedInput />}
          sx={{ fontSize: 14 }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
      <TextField
        size="small"
        placeholder="Search"
        value={search}
        onChange={e => {
          onSearchChange(e.target.value);
        }}
        sx={{ width: 220 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <FilterButton>
        <FilterListIcon sx={{ color: '#060606', fontSize: 24 }} />
      </FilterButton>
    </SearchBarContainer>
  );
}
