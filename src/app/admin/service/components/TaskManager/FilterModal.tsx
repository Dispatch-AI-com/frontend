// FilterModal.tsx
'use client';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Popover,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import type { TaskStatus } from '@/features/service/serviceApi';

interface FilterState {
  status: string;
  user: string;
  dateFrom: string;
  dateTo: string;
}

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (filters: Record<string, unknown>) => void;
  currentFilters: {
    serviceName: string;
    createdBy: string;
    status: string;
    dateTime: string;
    description: string;
    dateFrom?: string;
    dateTo?: string;
  };
  uniqueStatuses: TaskStatus[];
}

const FilterContainer = styled(Box)({
  width: 460,
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: 16,
  boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.16)',
});

const FilterHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

const FilterTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
});

const CloseButton = styled(IconButton)({
  padding: 4,
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const FormField = styled(Box)({
  marginBottom: '20px',
});

const FieldLabel = styled(Typography)({
  fontSize: '13px',
  fontWeight: 'normal',
  color: '#060606',
  marginBottom: '6px',
  fontFamily: 'Roboto',
  lineHeight: 1.23,
});

const StyledSelect = styled(Select)({
  width: '420px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#d5d5d5',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bdbdbd',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
  '& .MuiSelect-select': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
  },
});

const StyledTextField = styled(TextField)({
  width: '420px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#d5d5d5',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
  },
});

const DateRangeContainer = styled(Box)({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
});

const DateField = styled(TextField)({
  width: '200px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#d5d5d5',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
  },
});

const DateSeparator = styled(Typography)({
  fontSize: '14px',
  color: '#999',
});

const FilterFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '32px',
});

const CancelButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  color: '#666',
  border: '1px solid #e0e0e0',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const ApplyButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  backgroundColor: '#1a1a1a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const FilterModal: React.FC<Props> = ({
  anchorEl,
  onClose,
  onApply,
  currentFilters,
  uniqueStatuses,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    status: currentFilters.status || '',
    user: currentFilters.createdBy || '',
    dateFrom: '',
    dateTo: '',
  });

  // Parse date range from currentFilters.dateTime if it exists
  useEffect(() => {
    if (currentFilters.dateTime) {
      // Assuming dateTime contains a single date or date range
      setFilters(prev => ({
        ...prev,
        dateFrom: currentFilters.dateTime,
        dateTo: '',
      }));
    }
  }, [currentFilters.dateTime]);

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    // 将筛选器状态传递给 ServiceManager，使用正确的字段名
    const appliedFilters = {
      status: filters.status,
      createdBy: filters.user,
      serviceName: currentFilters.serviceName, // 保留现有筛选
      description: currentFilters.description, // 保留现有筛选
      dateFrom: filters.dateFrom, // 传递 dateFrom
      dateTo: filters.dateTo, // 传递 dateTo
      dateTime: '', // 清空旧的 dateTime 字段
    };

    onApply(appliedFilters);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.16)',
          mt: 1,
        },
      }}
    >
      <FilterContainer>
        <FilterHeader>
          <FilterTitle>Filter</FilterTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </FilterHeader>

        <FormField>
          <FieldLabel>Status</FieldLabel>
          <FormControl fullWidth>
            <StyledSelect
              value={filters.status}
              onChange={e =>
                handleFilterChange('status', String(e.target.value))
              }
              displayEmpty
              renderValue={(selected: unknown) => {
                if (!selected || typeof selected !== 'string') {
                  return <span style={{ color: '#999' }}>Please Select</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">
                <span style={{ color: '#999' }}>All</span>
              </MenuItem>
              {uniqueStatuses.map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </FormField>

        <FormField>
          <FieldLabel>User</FieldLabel>
          <StyledTextField
            fullWidth
            placeholder="User"
            value={filters.user}
            onChange={e => handleFilterChange('user', e.target.value)}
            variant="outlined"
          />
        </FormField>

        <FormField>
          <FieldLabel>Date Range</FieldLabel>
          <DateRangeContainer>
            <DateField
              type="date"
              placeholder="From"
              value={filters.dateFrom}
              onChange={e => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                style: {
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                },
              }}
            />
            <DateSeparator>-</DateSeparator>
            <DateField
              type="date"
              placeholder="To"
              value={filters.dateTo}
              onChange={e => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                style: {
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                },
              }}
            />
          </DateRangeContainer>
        </FormField>

        <FilterFooter>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ApplyButton onClick={handleApply}>Apply now</ApplyButton>
        </FilterFooter>
      </FilterContainer>
    </Popover>
  );
};

export default FilterModal;
