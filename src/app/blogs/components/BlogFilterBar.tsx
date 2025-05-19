"use client"
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, MenuItem, Select, styled, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilterBarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  marginTop: '32px',
  justifyContent: 'flex-start',
}));

const SearchBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#fff',
  border: '1px solid #E0E0E0',
  borderRadius: 12,
  height: '36px',
  width: '360px',
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
  fontSize: 13,
  borderRadius: 8,
  boxShadow: 'none',
  marginRight: 4,
  minWidth: 80,
  height: 30,
  textTransform: 'none',
  '&:hover': {
    background: '#222',
    boxShadow: 'none',
  },
}));

const TopicBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  border: '1px solid #E0E0E0',
  borderRadius: 12,
  height: '36px',
  width: '360px',
}));

const TopicLabel = styled(Typography)(() => ({
  color: '#222',
  fontWeight: 700,
  marginLeft: 8,
  fontSize: 13,
  minWidth: 64,
}));

export default function BlogFilterBar() {
  const [keyword, setKeyword] = useState('');
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.set('keyword', keyword.trim());
    if (topic) params.set('topic', topic);

    router.push(`/blogs?${params.toString()}`, { scroll: false });
  }

  useEffect(
    handleSearch
  , [topic, keyword, router]);

  return (
    <FilterBarWrapper>
      <SearchBox>
        <SearchIcon sx={{ color: '#BDBDBD', mr: 1 }} />
        <StyledInput
          variant="outlined"
          placeholder="Keywords"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            sx: { fontSize: 16, background: 'transparent' },
          }}
        />
        <SearchButton disableElevation onClick={handleSearch}>
          Search
        </SearchButton>
      </SearchBox>
      <TopicBox>
        <TopicLabel>Topic:</TopicLabel>
        <Select
          variant="standard"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          disableUnderline
          displayEmpty
          sx={{ flex: 1, fontSize: 13 }}
        >
          <MenuItem value="" disabled >
            Please Select
          </MenuItem>
          <MenuItem value="Small And Medium Businesses">Small And Medium Businesses</MenuItem>
          <MenuItem value="Small Businesses">Small Businesses</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </TopicBox>
    </FilterBarWrapper>
  );
}
