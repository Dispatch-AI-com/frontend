'use client';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  InputBase,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import BookingManager from '@/app/admin/booking/components/TaskManager/BookingManager';
import { AdminPageLayout } from '@/components/layout/admin-layout';

const SearchWrapper = styled(Box)(({ theme }) => ({
  width: '232px',
  height: '40px',
  margin: '0 12px 0 0',
  padding: '12px 144px 12px 16px',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '180px',
    margin: '0 8px 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    margin: '0 4px 0 0',
    padding: '12px 8px',
  },
}));

const StyledInput = styled(InputBase)(() => ({
  flex: 1,
  fontSize: '14px',
}));

const FilterButton = styled(Button)(({ theme }) => ({
  width: '40px',
  height: '40px',
  minWidth: '40px',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
  border: 'none',
  margin: '0 12px 0 0',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '&.active': {
    backgroundColor: '#e0e0e0',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 4px 0 0',
  },
}));

const CreateButton = styled(Box)(({ theme }) => ({
  height: '40px',
  padding: '10px 16px',
  borderRadius: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: '#333',
  },
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    padding: '8px 12px',
    fontSize: '13px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    minWidth: '40px',
    '& span': {
      display: 'none',
    },
  },
}));

export default function BookingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useMediaQuery(theme.breakpoints.down('md'));

  const [search, setSearch] = useState('');
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleCreateBookingClick = () => {
    setIsCreateBookingModalOpen(true);
  };

  const handleCloseCreateBookingModal = () => {
    setIsCreateBookingModalOpen(false);
  };

  const headerActions = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 1 : 0,
        width: '100%',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
      }}
    >
      <SearchWrapper>
        <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
        <StyledInput
          placeholder="Search"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
        {search && (
          <ClearIcon
            sx={{ color: '#ccc', fontSize: 18, cursor: 'pointer' }}
            onClick={handleClearSearch}
          />
        )}
      </SearchWrapper>
      <FilterButton
        onClick={handleFilterClick}
        className={filterAnchor ? 'active' : ''}
      >
        <FilterListIcon sx={{ color: '#666' }} />
      </FilterButton>
      <CreateButton onClick={handleCreateBookingClick}>
        <AddIcon sx={{ width: 16, height: 16, color: '#fff' }} />
        {!isMobile && <span>Create New Booking</span>}
        {isMobile && <span style={{ display: 'none' }}>Create</span>}
      </CreateButton>
    </Box>
  );

  return (
    <AdminPageLayout
      title="Booking"
      headerActions={headerActions}
      padding="normal"
      background="solid"
    >
      <BookingManager
        search={search}
        filterAnchor={filterAnchor}
        onFilterClose={handleFilterClose}
        onClearSearch={handleClearSearch}
        isCreateBookingModalOpen={isCreateBookingModalOpen}
        onCloseCreateBookingModal={handleCloseCreateBookingModal}
      />
    </AdminPageLayout>
  );
}
