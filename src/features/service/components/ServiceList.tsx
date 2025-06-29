'use client';

import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { formatCurrency } from '@/lib/utils';

import type { PaginationParams, Service } from '../serviceApi';
import { useGetServicesQuery } from '../serviceApi';

function ServiceListSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="rectangular" height={40} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <TableRow key={i}>
                  {Array(5)
                    .fill(null)
                    .map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function ServiceList() {
  const [mounted, setMounted] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useGetServicesQuery(pagination, {
    skip: !mounted,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination(prev => ({
      ...prev,
      page: 1,
      search: e.target.value,
    }));
  };

  const handleSort = (field: string) => {
    setPagination(prev => ({
      ...prev,
      page: 1,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleLimitChange = (e: SelectChangeEvent<number>) => {
    setPagination(prev => ({
      ...prev,
      limit: Number(e.target.value),
      page: 1,
    }));
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setPagination(prev => ({
      ...prev,
      page:
        direction === 'prev'
          ? Math.max(1, (prev.page ?? 1) - 1)
          : (prev.page ?? 1) + 1,
    }));
  };

  if (!mounted || isLoading) return <ServiceListSkeleton />;

  if (error) {
    return <Typography color="error">Failed to load services.</Typography>;
  }

  if (!data?.data?.length) {
    return <Typography>No services found.</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          size="small"
          placeholder="Search..."
          value={pagination.search ?? ''}
          onChange={handleSearch}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Items per page</InputLabel>
          <Select
            value={pagination.limit}
            label="Items per page"
            onChange={handleLimitChange}
          >
            {[10, 20, 50].map(limit => (
              <MenuItem key={limit} value={limit}>
                {limit} per page
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort('name')}
                sx={{ cursor: 'pointer' }}
              >
                Name{' '}
                {pagination.sortBy === 'name' &&
                  (pagination.sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                onClick={() => handleSort('price')}
                sx={{ cursor: 'pointer' }}
              >
                Price{' '}
                {pagination.sortBy === 'price' &&
                  (pagination.sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map(service => (
              <TableRow key={service._id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{formatCurrency(service.price)}</TableCell>
                <TableCell>
                  <Chip
                    label={service.isAvailable ? 'Available' : 'Unavailable'}
                    color={service.isAvailable ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          Page {pagination.page} of {data.totalPages}
        </Typography>
        <Box>
          <Button
            onClick={() => handlePageChange('prev')}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange('next')}
            disabled={pagination.page === data.totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
