// BookingManager.tsx
'use client';

import {
  Box,
  Chip,
  Pagination,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

import type { Service, TaskStatus } from '@/features/service/serviceApi';
import {
  type ServiceBooking,
  useGetBookingsQuery,
  useUpdateServiceBookingMutation,
} from '@/features/service/serviceBookingApi';
import { useGetServicesIncludingDeletedQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';

import BookingList from './BookingList';
import BookingModal from './BookingModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditBookingModal from './EditBookingModal';
import FilterModal from './FilterModal';

const TASKS_PER_PAGE = 10;

const ActiveFiltersContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
  flexWrap: 'wrap',
});

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '8px',
  borderRadius: '16px',
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
});

// Content component
export function Content({
  search,
  filterAnchor,
  onFilterClose,
  onClearSearch,
  onCreateBooking,
  isCreateBookingModalOpen,
  onCloseCreateBookingModal,
}: {
  search: string;
  filterAnchor: HTMLElement | null;
  onFilterClose: () => void;
  onClearSearch: () => void;
  onCreateBooking: () => void;
  isCreateBookingModalOpen: boolean;
  onCloseCreateBookingModal: () => void;
}): React.JSX.Element {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm'));

  const [currentPage, setCurrentPage] = useState(1);
  const [editingBooking, setEditingBooking] = useState<Service | null>(null);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);
  const [creatorFilter, setCreatorFilter] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  const user = useAppSelector(state => state.auth.user);
  const userId = user?._id;

  const { data: bookings = [] } = useGetBookingsQuery(
    { userId: userId ?? '' },
    { skip: !userId },
  );

  const { data: serviceManagementServices = [] } =
    useGetServicesIncludingDeletedQuery(
      { userId: userId ?? '' },
      { skip: !userId },
    );

  // Filter out deleted services for the booking modal
  const availableServicesForBooking = serviceManagementServices.filter(
    service => service.isAvailable && !service.isDeleted,
  );

  const [updateServiceBooking] = useUpdateServiceBookingMutation();

  // Convert bookings to display format
  const bookingsAsServices: Service[] = bookings.map(booking => {
    // Find the corresponding service name from serviceManagementServices (including deleted ones)
    const correspondingService = serviceManagementServices.find(
      service => service._id === booking.serviceId,
    );

    // Use the original service name if found, otherwise show "Deleted Service"
    const serviceName = correspondingService?.name ?? 'Deleted Service';
    const servicePrice = correspondingService?.price ?? 0;
    const isServiceDeleted = correspondingService?.isDeleted ?? false;

    return {
      _id: booking._id ?? '',
      companyId: '',
      name: serviceName,
      description: booking.note ?? '',
      price: servicePrice,
      notifications: {
        preferNotificationType: 'email',
        phoneNumber: booking.client?.phoneNumber ?? '',
        email: '',
      },
      isAvailable: !!(correspondingService?.isAvailable && !isServiceDeleted), // Mark as unavailable if service is deleted
      status: booking.status ?? 'Confirmed',
      dateTime: booking.bookingTime,
      userId: '',
      createdBy: {
        name:
          booking.userId === user?._id
            ? (user?.name ??
              (user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`.trim()
                : (user?.firstName ??
                  user?.lastName ??
                  user?.email ??
                  'Current User')))
            : 'Unknown User',
        avatar: '',
      },
      client: {
        name: booking.client?.name ?? '',
        phoneNumber: booking.client?.phoneNumber ?? '',
        address: booking.client?.address ?? '',
      },
    };
  });

  // Unique status dropdown
  const uniqueStatuses = [
    ...new Set(
      bookingsAsServices
        .map(service => service.status)
        .filter((status): status is TaskStatus => !!status),
    ),
  ];

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const handleEditBooking = (booking: Service) => setEditingBooking(booking);

  const handleSaveBooking = async (updatedBooking: Service): Promise<void> => {
    try {
      // Find the corresponding booking
      const booking = bookings.find(b => b._id === updatedBooking._id);
      if (booking) {
        // Find the corresponding service ID by service name
        // Only allow selection of available (non-deleted) services
        const selectedService = serviceManagementServices.find(
          service =>
            service.name === updatedBooking.name &&
            service.isAvailable &&
            !service.isDeleted,
        );

        // Prepare the update data
        const updateData: Partial<ServiceBooking> = {
          status: updatedBooking.status,
          note: updatedBooking.description,
          bookingTime: updatedBooking.dateTime,
          client: {
            name: updatedBooking.client?.name ?? booking.client?.name ?? '',
            phoneNumber:
              updatedBooking.client?.phoneNumber ??
              booking.client?.phoneNumber ??
              '',
            address:
              updatedBooking.client?.address ?? booking.client?.address ?? '',
          },
        };

        // Only update serviceId if a different service was selected
        if (selectedService && selectedService._id !== booking.serviceId) {
          updateData.serviceId = selectedService._id;
        }

        await updateServiceBooking({
          id: booking._id!,
          data: updateData,
        }).unwrap();
      }
      setEditingBooking(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update booking:', error);
    }
  };

  const handleCancelEdit = () => setEditingBooking(null);

  const handleDeleteFromEdit = (bookingId: string) =>
    setDeletingBookingId(bookingId);

  const handleConfirmDelete = () => {
    // Close both delete modal and edit modal after successful deletion
    setDeletingBookingId(null);
    setEditingBooking(null);
  };

  const handleCancelDelete = () => setDeletingBookingId(null);

  const handleSearch = (filters?: Record<string, unknown> | string) => {
    if (typeof filters === 'string') {
      // Handle search clear
      onClearSearch();
      return;
    }

    if (filters) {
      // Handle filter logic from FilterModal
      if (filters.status) {
        setStatusFilter(filters.status as TaskStatus);
      }
      if (filters.createdBy) {
        setCreatorFilter(filters.createdBy as string);
      }
      if (filters.dateFrom) {
        setDateFrom(filters.dateFrom as string);
      }
      if (filters.dateTo) {
        setDateTo(filters.dateTo as string);
      }
    }
  };

  const handleClearFilter = (
    field: 'status' | 'createdBy' | 'serviceName' | 'dateFrom' | 'dateTo',
  ) => {
    switch (field) {
      case 'status':
        setStatusFilter(null);
        break;
      case 'createdBy':
        setCreatorFilter(null);
        break;
      case 'dateFrom':
        setDateFrom(null);
        break;
      case 'dateTo':
        setDateTo(null);
        break;
    }
  };

  // Filter services based on search and filters
  const filteredServices = bookingsAsServices.filter(service => {
    const matchesSearch =
      !search ||
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      Boolean(
        service.description?.toLowerCase().includes(search.toLowerCase()),
      ) ||
      Boolean(
        service.client?.name.toLowerCase().includes(search.toLowerCase()),
      );

    const matchesStatus = !statusFilter || service.status === statusFilter;
    const matchesCreator =
      !creatorFilter || service.createdBy?.name === creatorFilter;

    // Date range filter
    const matchesDateRange = (() => {
      if (!dateFrom && !dateTo) return true;

      if (!service.dateTime) return false;

      const bookingDate = new Date(service.dateTime);

      // Set start of day for fromDate (00:00:00)
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      if (fromDate) {
        fromDate.setHours(0, 0, 0, 0);
      }

      // Set end of day for toDate (23:59:59.999)
      const toDate = dateTo ? new Date(dateTo) : null;
      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
      }

      if (fromDate && bookingDate < fromDate) return false;
      if (toDate && bookingDate > toDate) return false;

      return true;
    })();

    return matchesSearch && matchesStatus && matchesCreator && matchesDateRange;
  });

  // Sort services by creation time (newest first)
  const sortedServices = [...filteredServices].sort((a, b) => {
    // Sort by dateTime (booking time) - newest first
    if (a.dateTime && b.dateTime) {
      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    }
    // If no dateTime, sort by _id (newest first, assuming _id contains timestamp)
    if (a._id && b._id) {
      return b._id.localeCompare(a._id);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedServices.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const paginatedServices = sortedServices.slice(startIndex, endIndex);

  return (
    <Container>
      {(statusFilter ?? creatorFilter ?? search ?? dateFrom ?? dateTo) && (
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
              label={`Search: ${search}`}
              onDelete={() => handleSearch('')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {dateFrom && (
            <Chip
              label={`From: ${dateFrom}`}
              onDelete={() => handleClearFilter('dateFrom')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
          {dateTo && (
            <Chip
              label={`To: ${dateTo}`}
              onDelete={() => handleClearFilter('dateTo')}
              sx={{ fontSize: '13px', background: '#f5f5f5', color: '#333' }}
            />
          )}
        </ActiveFiltersContainer>
      )}

      <BookingList
        services={paginatedServices}
        onServiceClick={handleEditBooking}
      />

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </PaginationContainer>
      )}

      {/* Modals */}
      {isCreateBookingModalOpen && (
        <BookingModal
          onClose={onCloseCreateBookingModal}
          onCreate={onCreateBooking}
          serviceManagementServices={availableServicesForBooking}
        />
      )}

      {editingBooking && (
        <EditBookingModal
          service={editingBooking}
          onClose={handleCancelEdit}
          onSave={(updatedBooking: Service) => {
            void handleSaveBooking(updatedBooking);
          }}
          onDelete={handleDeleteFromEdit}
        />
      )}

      {deletingBookingId && (
        <DeleteConfirmModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          serviceId={deletingBookingId}
        />
      )}

      <FilterModal
        anchorEl={filterAnchor}
        onClose={onFilterClose}
        onApply={handleSearch}
        currentFilters={{
          serviceName: search,
          createdBy: creatorFilter ?? '',
          status: statusFilter ?? '',
          dateTime: '',
          description: '',
          dateFrom: dateFrom ?? '',
          dateTo: dateTo ?? '',
        }}
        uniqueStatuses={uniqueStatuses}
      />
    </Container>
  );
}

// Legacy component for backward compatibility
export default function BookingManager({
  search = '',
  filterAnchor = null,
  onFilterClose = () => {
    // Default empty function
  },
  onClearSearch = () => {
    // Default empty function
  },
  isCreateBookingModalOpen = false,
  onCloseCreateBookingModal = () => {
    // Default empty function
  },
}: {
  search?: string;
  filterAnchor?: HTMLElement | null;
  onFilterClose?: () => void;
  onClearSearch?: () => void;
  isCreateBookingModalOpen?: boolean;
  onCloseCreateBookingModal?: () => void;
}) {
  const handleFilterClose = () => {
    onFilterClose();
  };

  return (
    <Container>
      <Content
        search={search}
        filterAnchor={filterAnchor}
        onFilterClose={handleFilterClose}
        onClearSearch={onClearSearch}
        onCreateBooking={() => {
          // This will be handled by the Content component
        }}
        isCreateBookingModalOpen={isCreateBookingModalOpen}
        onCloseCreateBookingModal={onCloseCreateBookingModal}
      />
    </Container>
  );
}
