// InboxFilterModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Popover,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface FilterState {
  callerName: string;
  dateFrom: string;
  dateTo: string;
}

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (filters: Record<string, unknown>) => void;
  onClear: () => void;
  currentFilters: {
    callerName: string;
    dateFrom?: string;
    dateTo?: string;
  };
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

const InboxFilterModal: React.FC<Props> = ({
  anchorEl,
  onClose,
  onApply,
  onClear,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    callerName: currentFilters.callerName ?? '',
    dateFrom: currentFilters.dateFrom ?? '',
    dateTo: currentFilters.dateTo ?? '',
  });

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    const appliedFilters = {
      callerName: filters.callerName,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    };

    onApply(appliedFilters);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClear = () => {
    setFilters({
      callerName: '',
      dateFrom: '',
      dateTo: '',
    });
    onClear();
    onClose();
  };

  const hasActiveFilters =
    filters.callerName || filters.dateFrom || filters.dateTo;

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
          <FieldLabel>Caller Name</FieldLabel>
          <StyledTextField
            fullWidth
            placeholder="Enter caller name"
            value={filters.callerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterChange('callerName', e.target.value)
            }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange('dateFrom', e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange('dateTo', e.target.value)
              }
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
          {hasActiveFilters && (
            <Button
              onClick={handleClear}
              sx={{
                padding: '8px 24px',
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '14px',
                color: '#d32f2f',
                border: '1px solid #d32f2f',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#ffebee',
                },
              }}
            >
              Clear All
            </Button>
          )}
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ApplyButton onClick={handleApply}>Apply now</ApplyButton>
        </FilterFooter>
      </FilterContainer>
    </Popover>
  );
};

export default InboxFilterModal;
