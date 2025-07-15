// ServiceManager.tsx
'use client';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Chip,
  InputBase,
  Pagination,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import type { Service, TaskStatus } from '@/features/service/serviceApi';
import type { ServiceBooking } from '@/features/service/serviceBookingApi';
import {
  useGetBookingsQuery,
  useUpdateServiceBookingMutation,
} from '@/features/service/serviceBookingApi';
import { useAppSelector } from '@/redux/hooks';

import DeleteConfirmModal from './DeleteConfirmModal';
import EditServiceModal from './EditServiceModal';
import FilterModal from './FilterModal';
import ServiceList from './ServiceList';
import ServiceModal from './ServiceModal';

const TASKS_PER_PAGE = 10;

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  marginBottom: '15px',
  paddingTop: '0px',
  paddingBottom: '0px',
  '@media (min-width: 1920px)': {
    height: '60px',
    marginBottom: '16px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    height: '58px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.down('md')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}));

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
  margin: '0 12px 0 0',
  padding: '12px',
  borderRadius: '12px',
  border: 'solid 1px #d5d5d5',
  backgroundColor: '#fff',
  minWidth: '40px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Divider = styled(Box)(({ theme }) => ({
  width: 'calc(100% + 48px)',
  height: '1px',
  backgroundColor: '#eaeaea',
  flexShrink: 0,
  margin: '15px -24px 24px -24px',
  '@media (min-width: 1920px)': {
    width: 'calc(100% + 64px)',
    margin: '16px -32px 24px -32px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    width: 'calc(100% + 56px)',
    margin: '15px -28px 24px -28px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    width: 'calc(100% + 48px)',
    margin: '15px -24px 24px -24px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: 'calc(100% + 40px)',
    margin: '15px -20px 24px -20px',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100% + 36px)',
    margin: '15px -18px 24px -18px',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% + 24px)',
    margin: '15px -12px 24px -12px',
  },
}));

const ActiveFiltersContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '12px',
  width: '100%',
}));

// Status mapping table
const statusMap: Record<string, string> = {
  Completed: 'done',
  Missed: 'pending',
  'Follow-up': 'confirmed',
};

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '884px',
  margin: '0',
  borderRadius: '20px',
  backgroundColor: '#ffffff',
  position: 'relative',
  boxShadow: 'none',
  border: '1px solid rgba(234, 234, 234, 0.2)',
  borderLeft: 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  '@media (min-width: 1920px)': {
    padding: '28px 32px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    padding: '26px 28px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    padding: '24px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    height: 'auto',
    minHeight: '884px',
    padding: '20px',
    borderRadius: '20px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '18px',
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0',
    borderRadius: '12px',
  },
}));

function ServiceManager() {
  const userId = useAppSelector(state => state.auth.user?._id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null,
  );
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [updateServiceBooking] = useUpdateServiceBookingMutation();
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  // Get booking list
  const { data: bookings = [], refetch } = useGetBookingsQuery({ userId });

  // Search, filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.serviceFormValues?.[0]?.answer
        ?.toLowerCase()
        .includes(search.toLowerCase()) ?? '';
    const matchesStatus =
      !statusFilter ||
      booking.status === statusMap[statusFilter] ||
      statusFilter === '';
    const matchesCreator =
      !creatorFilter ||
      booking.client?.name?.toLowerCase().includes(creatorFilter.toLowerCase());
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const bookingDate = new Date(booking.bookingTime);
      if (dateFrom) {
        const fromDate = new Date(dateFrom + 'T00:00:00');
        matchesDate = matchesDate && bookingDate >= fromDate;
      }
      if (dateTo) {
        const toDate = new Date(dateTo + 'T23:59:59');
        matchesDate = matchesDate && bookingDate <= toDate;
      }
    }
    return matchesSearch && matchesStatus && matchesCreator && matchesDate;
  });

  // Sort by bookingTime descending
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    return (
      new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime()
    );
  });

  // 分页
  const totalPages = Math.ceil(sortedBookings.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const currentBookings = sortedBookings.slice(startIndex, endIndex);

  // 事件处理
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };
  const handleEditService = (service: Service) => setEditingService(service);
  const handleCreateService = () => setIsModalOpen(false);
  const handleSaveService = async (updatedService: Service): Promise<void> => {
    try {
      if (!updatedService._id) throw new Error('Booking ID is missing');
      let bookingStatus: 'pending' | 'confirmed' | 'done' | undefined =
        undefined;
      if (updatedService.status === 'Completed') bookingStatus = 'done';
      else if (updatedService.status === 'Missed') bookingStatus = 'pending';
      else if (updatedService.status === 'Follow-up')
        bookingStatus = 'confirmed';

      // 只传实际可编辑字段
      const payload: Partial<ServiceBooking> = {
        status: bookingStatus,
      };
      // Service Name -> serviceFormValues[0].answer
      if (updatedService.name) {
        payload.serviceFormValues = [
          {
            serviceFieldId: 'dummy', // 这里建议用真实的 fieldId
            answer: updatedService.name,
          },
        ];
      }
      // Date & Time -> bookingTime（转为 ISO/UTC，兼容 datetime-local 格式）
      if (updatedService.dateTime) {
        let dateStr = updatedService.dateTime;
        if (!dateStr.endsWith('Z')) {
          // 如果没有秒，补全
          if (dateStr.length === 16) dateStr += ':00';
          dateStr += 'Z';
        }
        const isoString = new Date(dateStr).toISOString();
        payload.bookingTime = isoString;
      }
      // Description -> note
      if (updatedService.description !== undefined) {
        payload.note = updatedService.description;
      }
      await updateServiceBooking({
        id: updatedService._id,
        data: payload,
      }).unwrap();
      await refetch();
      setEditingService(null);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Failed to update booking:', error, JSON.stringify(error));
      let message = 'Failed to update booking.';
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errData = (error as { data?: { message?: string } }).data;
        if (errData && typeof errData.message === 'string') {
          message =
            'Failed to update booking: ' +
            (errData.message ?? JSON.stringify(error));
        } else {
          message = 'Failed to update booking: ' + JSON.stringify(error);
        }
      } else {
        message = 'Failed to update booking: ' + JSON.stringify(error);
      }
      alert(message);
    }
  };
  const handleDeleteFromEdit = (serviceId: string) =>
    setDeletingServiceId(serviceId);
  const handleConfirmDelete = () => {
    setDeletingServiceId(null);
    setEditingService(null);
  };
  const handleCancelDelete = () => setDeletingServiceId(null);

  // 搜索、筛选、活跃标签等 UI 逻辑
  const handleSearch = (filters?: unknown) => {
    if (filters && typeof filters === 'object' && filters !== null) {
      const f = filters as Partial<{
        status: string;
        createdBy: string;
        serviceName: string;
        dateFrom: string;
        dateTo: string;
      }>;
      if (f.status !== undefined) setStatusFilter(f.status);
      if (f.createdBy !== undefined) setCreatorFilter(f.createdBy);
      if (f.serviceName !== undefined) setSearch(f.serviceName);
      if (f.dateFrom !== undefined) setDateFrom(f.dateFrom);
      if (f.dateTo !== undefined) setDateTo(f.dateTo);
    }
    setCurrentPage(1);
  };
  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch();
  };
  const handleClearSearch = () => {
    setSearch('');
    setCurrentPage(1);
  };
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setFilterAnchor(event.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);
  const handleClearFilter = (
    field: 'status' | 'createdBy' | 'serviceName' | 'dateFrom' | 'dateTo',
  ) => {
    if (field === 'status') setStatusFilter('');
    if (field === 'createdBy') setCreatorFilter('');
    if (field === 'serviceName') setSearch('');
    if (field === 'dateFrom') setDateFrom('');
    if (field === 'dateTo') setDateTo('');
    setCurrentPage(1);
  };

  // Map booking to Service type (only keep display fields)
  const bookingsAsServices = currentBookings.map(booking => ({
    _id: booking._id,
    name: booking.serviceFormValues?.[0]?.answer || '',
    companyId: booking.companyId,
    description: booking.note ?? '',
    price: 0,
    notifications: { preferNotificationType: '', phoneNumber: '', email: '' },
    isAvailable: true,
    status: (() => {
      if (booking.status === 'done') return 'Completed';
      if (booking.status === 'pending') return 'Missed';
      if (booking.status === 'confirmed') return 'Follow-up';
      return 'Follow-up';
    })() as TaskStatus,
    dateTime: booking.bookingTime,
    userId: '',
    createdBy: { name: booking.client?.name || 'Unknown', avatar: '' },
  }));

  // Unique status dropdown
  const uniqueStatuses = [
    ...new Set(
      bookingsAsServices
        .map(service => service.status)
        .filter((status): status is TaskStatus => !!status),
    ),
  ];

  return (
    <Container>
      <HeaderContainer>
        <Typography
          className="Service"
          sx={{
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontWeight: 'bold',
            lineHeight: 1.22,
            color: '#060606',
          }}
        >
          Service
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchWrapper>
            <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
            <StyledInput
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyPress={handleSearchKeyPress}
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
          <Box
            component="button"
            sx={{
              width: '178px',
              height: '40px',
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: '#060606',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              transition: 'background 0.2s',
              '&:hover': { backgroundColor: '#333' },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon sx={{ width: 16, height: 16, color: '#fff' }} />
            <Typography
              className="Create-New-Service"
              sx={{
                width: '122px',
                height: '20px',
                margin: '0 0 0 8px',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 'bold',
                lineHeight: 1.43,
                color: '#fff',
              }}
            >
              Create New Service
            </Typography>
          </Box>
        </Box>
      </HeaderContainer>

      {(statusFilter || creatorFilter || search || dateFrom || dateTo) && (
        <ActiveFiltersContainer>
          {statusFilter && (
            <Chip
              label={`Status: ${String(statusFilter)}`}
              onDelete={() => handleClearFilter('status')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {creatorFilter && (
            <Chip
              label={`Created By: ${String(creatorFilter)}`}
              onDelete={() => handleClearFilter('createdBy')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {search && (
            <Chip
              label={`Service Name: ${String(search)}`}
              onDelete={() => handleClearFilter('serviceName')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {dateFrom && (
            <Chip
              label={`From: ${String(dateFrom)}`}
              onDelete={() => handleClearFilter('dateFrom')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {dateTo && (
            <Chip
              label={`To: ${String(dateTo)}`}
              onDelete={() => handleClearFilter('dateTo')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
        </ActiveFiltersContainer>
      )}

      <Divider />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          border: '1px solid #eaeaea',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'none',
          background: '#fff',
        }}
      >
        <ServiceList
          services={bookingsAsServices}
          onServiceClick={handleEditService}
        />
      </Box>

      {bookings.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
          sx={{ flexShrink: 0 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}

      {isModalOpen && (
        <ServiceModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateService}
        />
      )}
      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={(service: Service) => void handleSaveService(service)}
          onDelete={handleDeleteFromEdit}
        />
      )}
      {deletingServiceId && (
        <DeleteConfirmModal
          serviceId={deletingServiceId}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        anchorEl={filterAnchor}
        onClose={handleFilterClose}
        onApply={handleSearch}
        currentFilters={{
          serviceName: search,
          createdBy: creatorFilter,
          status: statusFilter,
          dateTime: '',
          description: '',
          dateFrom: dateFrom,
          dateTo: dateTo,
        }}
        uniqueStatuses={uniqueStatuses}
      />
    </Container>
  );
}

export default ServiceManager;
