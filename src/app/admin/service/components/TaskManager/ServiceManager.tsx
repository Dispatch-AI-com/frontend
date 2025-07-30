// ServiceManager.tsx
'use client';

import { Box, Chip, Pagination, styled } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import type { Service, TaskStatus } from '@/features/service/serviceApi';
import {
  useGetBookingsQuery,
  useUpdateServiceBookingMutation,
} from '@/features/service/serviceBookingApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';

import DeleteConfirmModal from './DeleteConfirmModal';
import EditServiceModal from './EditServiceModal';
import FilterModal from './FilterModal';
import ServiceList from './ServiceList';
import ServiceModal from './ServiceModal';

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
  onCreateService,
  isCreateServiceModalOpen,
  onCloseCreateServiceModal,
}: {
  search: string;
  filterAnchor: HTMLElement | null;
  onFilterClose: () => void;
  onCreateService: () => void;
  isCreateServiceModalOpen: boolean;
  onCloseCreateServiceModal: () => void;
}): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
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

  const { data: serviceManagementServices = [] } = useGetServicesQuery(
    { userId: userId ?? '' },
    { skip: !userId },
  );

  const [updateServiceBooking] = useUpdateServiceBookingMutation();

  // Convert bookings to services format
  const bookingsAsServices: Service[] = bookings.map(booking => {
    // Find the corresponding service name from serviceManagementServices
    const correspondingService = serviceManagementServices.find(
      service => service._id === booking.serviceId,
    );

    return {
      _id: booking._id ?? '',
      companyId: '',
      name: correspondingService?.name ?? 'Unknown Service',
      description: booking.note ?? '',
      price: correspondingService?.price ?? 0,
      notifications: {
        preferNotificationType: 'email',
        phoneNumber: booking.client?.phoneNumber ?? '',
        email: '',
      },
      isAvailable: true,
      status: booking.status ?? 'Confirmed',
      dateTime: booking.bookingTime,
      userId: '',
      createdBy: { name: 'Test User', avatar: '' },
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

  const handleEditService = (service: Service) => setEditingService(service);

  const handleSaveService = async (updatedService: Service): Promise<void> => {
    try {
      // Find the corresponding booking
      const booking = bookings.find(b => b._id === updatedService._id);
      if (booking) {
        await updateServiceBooking({
          id: booking._id!,
          data: {
            status: updatedService.status,
            note: updatedService.description,
          },
        }).unwrap();
      }
      setEditingService(null);
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const handleCancelEdit = () => setEditingService(null);

  const handleDeleteFromEdit = (serviceId: string) =>
    setDeletingServiceId(serviceId);

  const handleConfirmDelete = () => {
    // Handle delete logic
    setDeletingServiceId(null);
  };

  const handleCancelDelete = () => setDeletingServiceId(null);

  const handleSearch = (filters?: Record<string, unknown> | string) => {
    if (typeof filters === 'string') {
      // Handle search clear
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

    return matchesSearch && matchesStatus && matchesCreator;
  });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

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

      <ServiceList
        services={paginatedServices}
        onServiceClick={handleEditService}
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
      {isCreateServiceModalOpen && (
        <ServiceModal
          onClose={onCloseCreateServiceModal}
          onCreate={onCreateService}
          serviceManagementServices={serviceManagementServices}
        />
      )}

      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={handleCancelEdit}
          onSave={(updatedService: Service) => {
            void handleSaveService(updatedService);
          }}
          onDelete={handleDeleteFromEdit}
        />
      )}

      {deletingServiceId && (
        <DeleteConfirmModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          serviceId={deletingServiceId}
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
export default function ServiceManager({
  search = '',
  filterAnchor = null,
  onFilterClose = () => {
    // Default empty function
  },
  isCreateServiceModalOpen = false,
  onCloseCreateServiceModal = () => {
    // Default empty function
  },
}: {
  search?: string;
  filterAnchor?: HTMLElement | null;
  onFilterClose?: () => void;
  isCreateServiceModalOpen?: boolean;
  onCloseCreateServiceModal?: () => void;
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
        onCreateService={() => {
          // This will be handled by the Content component
        }}
        isCreateServiceModalOpen={isCreateServiceModalOpen}
        onCloseCreateServiceModal={onCloseCreateServiceModal}
      />
    </Container>
  );
}
