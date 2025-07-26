import { Box, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Search: React.FC<{ onSearch: (keyword: string) => void }> = ({
  onSearch,
}) => (
  <Box
    sx={{
      width: { xs: '100%', sm: 232 },
      height: 40,
      margin: { xs: '8px 0', md: '15px 0px 15px 24px' },
      minWidth: 0,
    }}
  >
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search"
      onChange={e => onSearch(e.target.value)}
      fullWidth
      sx={{
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        fontSize: 14,
        color: '#333',
        height: 40,
        paddingRight: 1,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Image
              src="/dashboard/calendar/search.svg"
              alt="search"
              width={16}
              height={16}
              style={{ marginRight: 4 }}
            />
          </InputAdornment>
        ),
      }}
      inputProps={{
        style: {
          padding: '10px 0',
        },
      }}
    />
  </Box>
);

export default Search;
