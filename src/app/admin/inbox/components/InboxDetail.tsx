import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import EditBookingModal from '@/app/admin/booking/components/TaskManager/EditBookingModal';
import type { Service } from '@/features/service/serviceApi';
import {
  type ServiceBooking,
  useDeleteServiceBookingMutation,
  useGetBookingsQuery,
  useUpdateServiceBookingMutation,
} from '@/features/service/serviceBookingApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

import DeleteCallLogModal from './DeleteCallLogModal';
import TranscriptSection from './TranscriptSection';

const DetailContainer = styled.div`
  padding: 24px 0 0 0;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  position: relative;
`;

const DeleteButton = styled(IconButton)`
  && {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      color: #d32f2f;
      background-color: #ffebee;
    }
  }
`;

const AvatarImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled(Typography)`
  && {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #222;
  }
`;

const UserPhone = styled(Typography)`
  color: #888;
  font-size: 14px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 24px 0 0 0;
`;

const MainContent = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateText = styled(Typography)`
  && {
    font-size: 15px;
    font-weight: 700;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: #222;
  }
`;

const ThreeColRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  margin-top: 16px;
`;

const ColIcon = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 0 0 32px;
`;

const ColMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

const SummaryStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TranscriptContainer = styled.div`
  padding: 0 32px 0 32px;
`;

const ServiceBookingSection = styled.div`
  margin-top: 24px;
  padding: 0 32px 16px 32px;
`;

const ServiceBookingCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
`;

const ServiceBookingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ServiceBookingTitle = styled(Typography)`
  && {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #222;
  }
`;

const ServiceBookingStatus = styled.div<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'Confirmed':
        return '#e8f5e8';
      case 'Done':
        return '#e3f2fd';
      case 'Cancelled':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Confirmed':
        return '#2e7d32';
      case 'Done':
        return '#1976d2';
      case 'Cancelled':
        return '#d32f2f';
      default:
        return '#666';
    }
  }};
`;

const ServiceBookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #666;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 14px;
    color: #222;
    font-weight: 500;
  }
`;

const ViewServiceButton = styled(Button)`
  && {
    min-width: 160px;
    margin-top: 16px;
    margin-bottom: 4px;
    width: auto;
    align-self: flex-start;
  }
`;

const NoBookingMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-top: 16px;
`;

interface InboxDetailProps {
  item?: ICallLog;
  onCallLogDeleted?: () => void;
}

export default function InboxDetail({
  item,
  onCallLogDeleted,
}: InboxDetailProps) {
  const user = useAppSelector(state => state.auth.user);
  const userId = user?._id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Service booking mutations
  const [updateServiceBooking] = useUpdateServiceBookingMutation();
  const [deleteServiceBooking] = useDeleteServiceBookingMutation();

  // Fetch service bookings for this call log
  const { data: bookings = [] } = useGetBookingsQuery(
    { userId: userId ?? '' },
    { skip: !userId },
  );

  // Fetch services for service information
  const { data: services = [] } = useGetServicesQuery(
    { userId: userId ?? '' },
    { skip: !userId },
  );

  // Find the service booking associated with this call log
  const serviceBooking = item?.serviceBookedId
    ? bookings.find(booking => booking._id === item.serviceBookedId)
    : null;

  // Find the service information
  const service =
    serviceBooking && services
      ? services.find(
          (service: { _id?: string }) =>
            service._id === serviceBooking.serviceId,
        )
      : null;

  if (!item) {
    return (
      <DetailContainer style={{ color: '#666', padding: 32 }}>
        Select a message to view details.
      </DetailContainer>
    );
  }

  // Date format: Apr 15, 2025 at 07:16 PM
  let formattedDate = '';
  if (item.startAt) {
    try {
      formattedDate = format(
        new Date(item.startAt),
        "MMM dd, yyyy 'at' hh:mm a",
      );
    } catch {
      formattedDate = '';
    }
  }

  function formatPhoneNumber(phone?: string) {
    if (!phone) return '';
    if (phone.startsWith('+61')) {
      return '+61 ' + phone.slice(3);
    }
    return phone;
  }

  const handleViewService = () => {
    if (serviceBooking && service) {
      // Create a service object for editing
      const serviceForEdit = {
        _id: serviceBooking._id,
        name: service.name,
        description: serviceBooking.note ?? '', // Use booking note, not service description
        status: serviceBooking.status ?? 'Confirmed',
        dateTime: serviceBooking.bookingTime,
        client: {
          name: serviceBooking.client.name,
          phoneNumber: serviceBooking.client.phoneNumber,
          address: serviceBooking.client.address,
        },
        createdBy: { name: 'User', avatar: '' },
        companyId: '',
        price: 0,
        notifications: {
          preferNotificationType: 'email',
          phoneNumber: '',
          email: '',
        },
        isAvailable: true,
      };
      setEditingService(serviceForEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingService(null);
  };

  const handleSaveService = async (updatedService: Service): Promise<void> => {
    try {
      // Find the corresponding booking
      const booking = bookings.find(b => b._id === updatedService._id);
      if (booking) {
        // Find the corresponding service ID by service name
        const selectedService = services.find(
          service => service.name === updatedService.name,
        );

        // Prepare the update data
        const updateData: Partial<ServiceBooking> = {
          status: updatedService.status,
          note: updatedService.description,
          bookingTime: updatedService.dateTime,
          client: {
            name: updatedService.client?.name ?? booking.client?.name ?? '',
            phoneNumber:
              updatedService.client?.phoneNumber ??
              booking.client?.phoneNumber ??
              '',
            address:
              updatedService.client?.address ?? booking.client?.address ?? '',
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
      handleCloseEditModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update booking:', error);
    }
  };

  const handleDeleteService = async (serviceId: string): Promise<void> => {
    try {
      await deleteServiceBooking(serviceId).unwrap();
      handleCloseEditModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete booking:', error);
    }
  };

  const handleDeleteCallLog = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    onCallLogDeleted?.();
  };

  return (
    <DetailContainer>
      <AvatarSection>
        <AvatarImg>
          <AvatarImage
            src="/avatars/user-avatar.jpg"
            alt="avatar"
            width={40}
            height={40}
          />
        </AvatarImg>
        <UserInfo>
          <UserName>{item.callerName}</UserName>
          <UserPhone>{formatPhoneNumber(item.callerNumber)}</UserPhone>
        </UserInfo>
        <DeleteButton onClick={handleDeleteCallLog} title="Delete call log">
          <DeleteIcon fontSize="small" />
        </DeleteButton>
      </AvatarSection>
      <Divider />
      <MainContent>
        <ThreeColRow>
          <ColIcon>
            <PhoneIcon sx={{ fontSize: 20, color: '#222' }} />
          </ColIcon>
          <ColMain>
            <SummaryStatusRow>
              <DateText>{formattedDate}</DateText>
            </SummaryStatusRow>
          </ColMain>
        </ThreeColRow>
      </MainContent>
      <TranscriptContainer>
        <TranscriptSection calllogId={item._id ?? ''} />
      </TranscriptContainer>

      <ServiceBookingSection>
        {serviceBooking ? (
          <ServiceBookingCard>
            <ServiceBookingHeader>
              <ServiceBookingTitle>
                {service?.name ?? 'Service'}
              </ServiceBookingTitle>
              <ServiceBookingStatus
                status={serviceBooking.status ?? 'Confirmed'}
              >
                {serviceBooking.status ?? 'Confirmed'}
              </ServiceBookingStatus>
            </ServiceBookingHeader>

            <ServiceBookingInfo>
              <InfoRow>
                <InfoIcon>
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Booking Time</InfoLabel>
                  <InfoValue>
                    {serviceBooking.bookingTime
                      ? format(
                          new Date(serviceBooking.bookingTime),
                          "MMM dd, yyyy 'at' hh:mm a",
                        )
                      : 'Not specified'}
                  </InfoValue>
                </InfoContent>
              </InfoRow>

              <InfoRow>
                <InfoIcon>
                  <PersonIcon sx={{ fontSize: 16 }} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Client Name</InfoLabel>
                  <InfoValue>{serviceBooking.client.name}</InfoValue>
                </InfoContent>
              </InfoRow>

              <InfoRow>
                <InfoIcon>
                  <PhoneIcon sx={{ fontSize: 16 }} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Client Phone</InfoLabel>
                  <InfoValue>
                    {formatPhoneNumber(serviceBooking.client.phoneNumber)}
                  </InfoValue>
                </InfoContent>
              </InfoRow>

              <InfoRow>
                <InfoIcon>
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Service Address</InfoLabel>
                  <InfoValue>{serviceBooking.client.address}</InfoValue>
                </InfoContent>
              </InfoRow>

              {serviceBooking.note && (
                <InfoRow>
                  <InfoContent>
                    <InfoLabel>Notes</InfoLabel>
                    <InfoValue>{serviceBooking.note}</InfoValue>
                  </InfoContent>
                </InfoRow>
              )}
            </ServiceBookingInfo>

            <ViewServiceButton
              variant="contained"
              onClick={handleViewService}
              fullWidth
              sx={{
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontSize: 14,
                color: '#fff',
                backgroundColor: '#000',
                borderColor: '#000',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 700,
                '&:hover': {
                  borderColor: '#000',
                  background: '#333',
                  color: '#fff',
                },
              }}
            >
              Edit Service
            </ViewServiceButton>
          </ServiceBookingCard>
        ) : (
          <NoBookingMessage>
            No service booking found for this call.
          </NoBookingMessage>
        )}
      </ServiceBookingSection>

      {isEditModalOpen && editingService && (
        <EditBookingModal
          service={editingService}
          onClose={handleCloseEditModal}
          onSave={(updatedService: Service) => {
            void handleSaveService(updatedService);
          }}
          onDelete={(serviceId: string) => {
            void handleDeleteService(serviceId);
          }}
        />
      )}

      <DeleteCallLogModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        callLog={item}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </DetailContainer>
  );
}
