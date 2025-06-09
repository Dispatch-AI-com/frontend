import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

interface InboxSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tag: string;
  onTagChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export default function InboxSearchBar({
  search,
  onSearchChange,
  tag,
  onTagChange,
  sort,
  onSortChange,
}: InboxSearchBarProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      px={4}
      py={2}
      bgcolor="#fff"
      borderBottom={1}
      borderColor="#F0F0F0"
    >
      <Box fontWeight={700} fontSize={22} flex={1}>
        Inbox
      </Box>
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
    </Box>
  );
}
