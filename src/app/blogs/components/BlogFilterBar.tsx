"use client"
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, MenuItem, Select, styled, TextField, Typography } from '@mui/material';

const FilterBarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  margin: '32px 0',
  justifyContent: 'flex-start',
}));

const SearchBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  border: '1px solid #E0E0E0',
  borderRadius: 12,
  padding: '0 8px 0 16px',
  height: 44,
  minWidth: 380,
  flex: 1,
  maxWidth: 480,
}));

const StyledInput = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    border: 'none',
    paddingRight: 0,
    background: 'transparent',
  },
  '& fieldset': {
    border: 'none',
  },
  flex: 1,
}));

const SearchButton = styled(Button)(() => ({
  background: '#111',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 8,
  boxShadow: 'none',
  minWidth: 80,
  height: 36,
  marginLeft: 12,
  textTransform: 'none',
  '&:hover': {
    background: '#222',
    boxShadow: 'none',
  },
}));

const TopicBox = styled(Box)(() => ({
  background: '#fff',
  border: '1px solid #E0E0E0',
  borderRadius: 12,
  height: 44,
  minWidth: 320,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
}));

const TopicLabel = styled(Typography)(() => ({
  color: '#222',
  fontWeight: 700,
  marginRight: 8,
  fontSize: 16,
  minWidth: 64,
}));

export default function BlogFilterBar() {
  return (
    <FilterBarWrapper>
      <SearchBox>
        <SearchIcon sx={{ color: '#BDBDBD', mr: 1 }} />
        <StyledInput
          variant="outlined"
          placeholder="Keywords"
          size="small"
          InputProps={{
            sx: { fontSize: 16, background: 'transparent' },
          }}
        />
        <SearchButton disableElevation>Search</SearchButton>
      </SearchBox>
      <TopicBox>
        <TopicLabel>Topic:</TopicLabel>
        <Select
          variant="standard"
          disableUnderline
          defaultValue=""
          displayEmpty
          sx={{ flex: 1, fontSize: 16 }}
        >
          <MenuItem value="" disabled>
            Please Select
          </MenuItem>
          <MenuItem value="ai">AI</MenuItem>
          <MenuItem value="dispatch">Dispatch</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </TopicBox>
    </FilterBarWrapper>
  );
}
