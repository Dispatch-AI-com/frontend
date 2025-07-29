'use client';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputBase, styled } from '@mui/material';
import { useState } from 'react';

import ServiceManager from '@/app/admin/service/components/TaskManager/ServiceManager';
import { AdminPageLayout } from '@/components/layout/admin-layout';

const SearchWrapper = styled(Box)({
  width: '232px',
  height: '40px',
  margin: '0 12px 0 0',
  padding: '12px 144px 12px 16px',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

const StyledInput = styled(InputBase)(() => ({
  flex: 1,
  fontSize: '14px',
}));

const FilterButton = styled(Button)({
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
});

const CreateButton = styled(Box)({
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
});

export default function ServicePage() {
  const [search, setSearch] = useState('');
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] =
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

  const handleCreateServiceClick = () => {
    setIsCreateServiceModalOpen(true);
  };

  const handleCloseCreateServiceModal = () => {
    setIsCreateServiceModalOpen(false);
  };

  const headerActions = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      <CreateButton onClick={handleCreateServiceClick}>
        <AddIcon sx={{ width: 16, height: 16, color: '#fff' }} />
        Create New Service
      </CreateButton>
    </Box>
  );

  return (
    <AdminPageLayout
      title="Service"
      headerActions={headerActions}
      padding="normal"
      background="solid"
    >
      <ServiceManager
        search={search}
        filterAnchor={filterAnchor}
        onFilterClose={handleFilterClose}
        isCreateServiceModalOpen={isCreateServiceModalOpen}
        onCloseCreateServiceModal={handleCloseCreateServiceModal}
      />
    </AdminPageLayout>
  );
}
