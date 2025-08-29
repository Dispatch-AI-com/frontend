// BookingModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import type { SelectChangeEvent } from '@mui/material';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

import type { TaskStatus } from '@/features/service/serviceApi';
import { type Service } from '@/features/service/serviceApi';
import { useCreateServiceBookingMutation } from '@/features/service/serviceBookingApi';
import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useGetServiceFormFieldsQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
interface Props {
  onClose: () => void;
  onCreate: (service: Service) => void;
  serviceManagementServices: ServiceManagement[];
}

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 0,
  outline: 'none',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    width: '90vw',
    maxWidth: 450,
  },
  [theme.breakpoints.down('sm')]: {
    width: '95vw',
    maxHeight: '90vh',
    borderRadius: 12,
  },
}));

const ModalHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  marginBottom: '24px',
});

const ModalTitle = styled(Typography)({
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

const ModalContent = styled(Box)({
  padding: '0 24px',
  maxHeight: '60vh', // Limit content area max height
  overflowY: 'auto', // Scrollable when content overflows
});

const FormField = styled(Box)({
  marginBottom: '20px',
});

const FieldLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: '8px',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '420px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
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
    height: '16px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const CreatedByContainer = styled(Box)({
  width: '123px',
  height: '40px',
  margin: '6px 0 0',
  padding: '6px 10px',
  borderRadius: '20px',
  border: 'solid 1px #d5d5d5',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
});

const UserAvatar = styled(Avatar)({
  width: 24,
  height: 24,
  fontSize: '12px',
  backgroundColor: '#1976d2',
  marginRight: '8px',
});

const UserName = styled(Typography)({
  fontSize: '14px',
  color: '#060606',
});

const StatusSelect = styled(Select)(({ theme }) => ({
  width: '420px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
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
    color: '#666',
    '&[aria-expanded="false"]:empty::before': {
      content: '"Please Select"',
      color: '#999',
    },
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const DateTimeInput = styled(TextField)(({ theme }) => ({
  width: '420px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
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
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const DescriptionTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '420px',
  minHeight: '80px',
  padding: '12px 16px',
  border: '1px solid #d5d5d5',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  fontSize: '14px',
  resize: 'none',
  outline: 'none',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const ModalFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '24px',
  borderTop: '1px solid #f0f0f0',
  marginTop: '24px',
});

const CancelButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  color: '#666',
  border: '1px solid #e0e0e0',
});

const CreateButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  backgroundColor: '#1a1a1a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:disabled': {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
});

const BookingModal: React.FC<Props> = ({
  onClose,
  onCreate,
  serviceManagementServices,
}) => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm'));

  // Get current date and time in local format
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [name, setName] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(''); // New: Save selected service _id
  const [status, setStatus] = useState('');
  const [datetime, setDatetime] = useState(() => {
    return getCurrentDateTimeLocal();
  });
  const [description, setDescription] = useState('');
  const [client, setClient] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [customFormValues, setCustomFormValues] = useState<
    Record<string, string>
  >({});
  const [createServiceBooking] = useCreateServiceBookingMutation();
  const user = useAppSelector(state => state.auth.user);

  // Get custom form fields for the selected service
  const { data: customFormFields = [] } = useGetServiceFormFieldsQuery(
    { serviceId: selectedServiceId },
    { skip: !selectedServiceId },
  );

  // Validate if selected datetime is in the past
  const isDateTimeInPast = (dateTimeString: string) => {
    if (!dateTimeString) return false;
    try {
      const selectedDate = new Date(dateTimeString);
      const now = new Date();
      if (isNaN(selectedDate.getTime())) return false;

      // Check if date is valid
      if (selectedDate > now) return false;

      // Use more lenient comparison: compare to minute level, ignore seconds and milliseconds
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();
      const selectedHour = selectedDate.getHours();
      const selectedMinute = selectedDate.getMinutes();

      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      const nowDay = now.getDate();
      const nowHour = now.getHours();
      const nowMinute = now.getMinutes();

      // If year, month, day, hour, minute are all the same, it's considered current time
      if (
        selectedYear === nowYear &&
        selectedMonth === nowMonth &&
        selectedDay === nowDay &&
        selectedHour === nowHour &&
        selectedMinute === nowMinute
      ) {
        return false; // Current time, not past time
      }

      // Compare timestamps (to minute level)
      const selectedMinutes = selectedDate.getTime() / (1000 * 60);
      const nowMinutes = now.getTime() / (1000 * 60);

      // Reduce tolerance to 1 minute
      return selectedMinutes < nowMinutes - 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in isDateTimeInPast:', error);
      return false;
    }
  };

  const userName =
    user?.name ??
    (user && (user.firstName ?? user.lastName)
      ? `${user.firstName ?? ''}${user.lastName ? ' ' + user.lastName : ''}`.trim()
      : (user?.email ?? 'User'));
  const userInitials = user
    ? user.name
      ? user.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : (
          (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')
        ).toUpperCase() ||
        (user.email?.[0]?.toUpperCase() ?? 'U')
    : 'U';

  const isValid =
    name &&
    status &&
    datetime &&
    // If status is Done or Cancelled, time must be past; if status is not Done/Cancelled, do not allow past time
    (status === 'Done' ||
      status === 'Cancelled' ||
      !isDateTimeInPast(datetime)) &&
    client.name &&
    client.phoneNumber &&
    client.address &&
    // Check if all required custom form fields are filled
    customFormFields.every(
      field =>
        !field.isRequired ||
        (customFormValues[field._id!] &&
          customFormValues[field._id!].trim() !== ''),
    );
  // New: Find corresponding service _id based on selected service name
  const handleServiceNameChange = (serviceName: string) => {
    setName(serviceName);
    const selectedService = serviceManagementServices.find(
      s => s.name === serviceName,
    );
    setSelectedServiceId(selectedService?._id ?? '');
    // Reset custom form values when service changes
    setCustomFormValues({});
  };

  // Handle custom form field value changes
  const handleCustomFormFieldChange = (fieldId: string, value: string) => {
    setCustomFormValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // Utility function: Map frontend status to backend booking status
  const mapStatusToBookingStatus = (
    status: string,
  ): 'Cancelled' | 'Confirmed' | 'Done' => {
    switch (status) {
      case 'Done':
        return 'Done';
      case 'Cancelled':
        return 'Cancelled';
      case 'Confirmed':
        return 'Confirmed';
      default:
        return 'Cancelled';
    }
  };

  // Utility function: Convert datetime-local to UTC string format required by backend (standard ISO/UTC, no manual Z addition)
  function toBackendDateString(datetime: string) {
    if (!datetime) return '';
    try {
      let dateStr = datetime;
      if (dateStr.length === 16) {
        dateStr = `${dateStr}:00`;
      }
      const testDate = new Date(dateStr);
      if (isNaN(testDate.getTime())) {
        throw new Error('Invalid date format');
      }
      return testDate.toISOString();
    } catch {
      // console.error(
      //   'Error converting date to backend format:',
      //   datetime,
      //   error,
      // );
      throw new Error('Invalid date format');
    }
  }

  const handleCreate = async (): Promise<void> => {
    try {
      if (!user) {
        throw new Error('User is missing, please login again.');
      }

      if (!selectedServiceId) {
        alert('Please select a service');
        return;
      }

      const bookingStatus = mapStatusToBookingStatus(status);
      const bookingTime = toBackendDateString(datetime);
      if (!bookingTime) {
        alert('Please select a valid date and time');
        return;
      }

      if (
        isDateTimeInPast(datetime) &&
        status !== 'Done' &&
        status !== 'Cancelled'
      ) {
        alert(
          'You cannot book a service for a past date and time unless the status is Done or Cancelled.',
        );
        return;
      }

      // Build serviceFormValues with custom form fields
      const formValues = [
        // Include the service name as a basic field
        { serviceFieldId: 'service_name', answer: name },
      ];

      // Add custom form field values
      customFormFields.forEach(field => {
        if (customFormValues[field._id!]) {
          formValues.push({
            serviceFieldId: field._id!,
            answer: customFormValues[field._id!],
          });
        }
      });

      await createServiceBooking({
        serviceId: selectedServiceId,
        client: {
          name: client.name,
          phoneNumber: client.phoneNumber,
          address: client.address,
        },
        serviceFormValues: formValues,
        bookingTime,
        status: bookingStatus,
        note: description,
        userId: user?._id,
      }).unwrap();

      const statusMap: Record<string, TaskStatus> = {
        Done: 'Done',
        Cancelled: 'Cancelled',
        Confirmed: 'Confirmed',
      };

      onCreate({
        name,
        price: 0,
        notifications: {
          preferNotificationType: 'EMAIL',
          phoneNumber: '',
          email: '',
        },
        isAvailable: true,
        companyId: 'default',
        status: statusMap[bookingStatus],
        description,
      });

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Create New Booking</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <FormField>
            <FieldLabel>Service Name</FieldLabel>
            <FormControl fullWidth>
              <StatusSelect
                value={name}
                onChange={(e: SelectChangeEvent<unknown>) =>
                  handleServiceNameChange(e.target.value as string)
                }
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return <span style={{ color: '#999' }}>Please Select</span>;
                  }
                  return typeof selected === 'string'
                    ? selected
                    : JSON.stringify(selected);
                }}
              >
                {serviceManagementServices.length === 0 ? (
                  <MenuItem disabled value="">
                    No services available for booking
                  </MenuItem>
                ) : (
                  serviceManagementServices.map(service => (
                    <MenuItem key={service._id} value={service.name}>
                      {service.name}
                    </MenuItem>
                  ))
                )}
              </StatusSelect>
            </FormControl>
          </FormField>

          {/* Custom Form Fields */}
          {customFormFields.length > 0 && (
            <>
              {customFormFields.map(field => (
                <FormField key={field._id} style={{ marginBottom: '16px' }}>
                  <FieldLabel style={{ fontSize: '13px', color: '#666' }}>
                    {field.fieldName}
                    {field.isRequired && (
                      <span style={{ color: '#d32f2f' }}> *</span>
                    )}
                  </FieldLabel>
                  {field.fieldType === 'short-answer' && (
                    <StyledTextField
                      fullWidth
                      placeholder={`Enter ${field.fieldName.toLowerCase()}`}
                      value={customFormValues[field._id!] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCustomFormFieldChange(field._id!, e.target.value)
                      }
                      variant="outlined"
                      required={field.isRequired}
                    />
                  )}
                  {field.fieldType === 'paragraph' && (
                    <DescriptionTextarea
                      placeholder={`Enter ${field.fieldName.toLowerCase()}`}
                      value={customFormValues[field._id!] || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleCustomFormFieldChange(field._id!, e.target.value)
                      }
                      required={field.isRequired}
                    />
                  )}
                  {field.fieldType === 'dropdown-list' && field.options && (
                    <StatusSelect
                      value={customFormValues[field._id!] || ''}
                      onChange={(e: SelectChangeEvent<unknown>) =>
                        handleCustomFormFieldChange(
                          field._id!,
                          e.target.value as string,
                        )
                      }
                      displayEmpty
                      required={field.isRequired}
                    >
                      <MenuItem value="">
                        <span style={{ color: '#999' }}>Please Select</span>
                      </MenuItem>
                      {field.options.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </StatusSelect>
                  )}
                  {field.fieldType === 'single-choice' && field.options && (
                    <FormControl fullWidth>
                      {field.options.map(option => (
                        <Box key={option} style={{ marginBottom: '8px' }}>
                          <input
                            type="radio"
                            id={`${field._id}_${option}`}
                            name={field._id}
                            value={option}
                            checked={customFormValues[field._id!] === option}
                            onChange={e =>
                              handleCustomFormFieldChange(
                                field._id!,
                                e.target.value,
                              )
                            }
                            required={field.isRequired}
                          />
                          <label
                            htmlFor={`${field._id}_${option}`}
                            style={{ marginLeft: '8px' }}
                          >
                            {option}
                          </label>
                        </Box>
                      ))}
                    </FormControl>
                  )}
                  {field.fieldType === 'multiple-choice' && field.options && (
                    <FormControl fullWidth>
                      {field.options.map(option => (
                        <Box key={option} style={{ marginBottom: '8px' }}>
                          <input
                            type="checkbox"
                            id={`${field._id}_${option}`}
                            value={option}
                            checked={(() => {
                              const currentValues =
                                customFormValues[field._id!] || '';
                              if (!currentValues) return false;
                              const values = currentValues
                                .split(',')
                                .map(v => v.trim())
                                .filter(v => v);
                              return values.includes(option);
                            })()}
                            onChange={e => {
                              const currentValues =
                                customFormValues[field._id!] || '';
                              const values = currentValues
                                ? currentValues.split(',').filter(v => v.trim())
                                : [];
                              if (e.target.checked) {
                                values.push(option);
                              } else {
                                const index = values.indexOf(option);
                                if (index > -1) values.splice(index, 1);
                              }
                              handleCustomFormFieldChange(
                                field._id!,
                                values.join(', '),
                              );
                            }}
                          />
                          <label
                            htmlFor={`${field._id}_${option}`}
                            style={{ marginLeft: '8px' }}
                          >
                            {option}
                          </label>
                        </Box>
                      ))}
                    </FormControl>
                  )}
                  {field.fieldType === 'date' && (
                    <DateTimeInput
                      fullWidth
                      type="date"
                      value={customFormValues[field._id!] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCustomFormFieldChange(field._id!, e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      required={field.isRequired}
                    />
                  )}
                  {field.fieldType === 'time' && (
                    <DateTimeInput
                      fullWidth
                      type="time"
                      value={customFormValues[field._id!] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCustomFormFieldChange(field._id!, e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      required={field.isRequired}
                    />
                  )}
                </FormField>
              ))}
            </>
          )}

          {/* New client information input fields */}
          <FormField>
            <FieldLabel>Client Name</FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="Client Name"
              value={client.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClient({ ...client, name: e.target.value })
              }
              variant="outlined"
            />
          </FormField>
          <FormField>
            <FieldLabel>Client Phone Number</FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="Phone Number"
              value={client.phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClient({ ...client, phoneNumber: e.target.value })
              }
              variant="outlined"
            />
          </FormField>
          <FormField>
            <FieldLabel>Client Address</FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="Address"
              value={client.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClient({ ...client, address: e.target.value })
              }
              variant="outlined"
            />
          </FormField>

          <FormField>
            <FieldLabel>Created By</FieldLabel>
            <CreatedByContainer>
              <UserAvatar>{userInitials}</UserAvatar>
              <UserName>{userName}</UserName>
            </CreatedByContainer>
          </FormField>

          <FormField>
            <FieldLabel>Status</FieldLabel>
            <FormControl fullWidth>
              <StatusSelect
                value={status}
                onChange={(e: SelectChangeEvent<unknown>) =>
                  setStatus(e.target.value as TaskStatus)
                }
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return <span style={{ color: '#999' }}>Please Select</span>;
                  }
                  return typeof selected === 'string'
                    ? selected
                    : JSON.stringify(selected);
                }}
              >
                {['Done', 'Cancelled', 'Confirmed'].map(option => (
                  <MenuItem
                    key={option}
                    value={option}
                    title={
                      option === 'Done'
                        ? 'Set status to Done to allow past time selection'
                        : ''
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </StatusSelect>
            </FormControl>
          </FormField>

          <FormField>
            <FieldLabel>Date & Time</FieldLabel>
            <DateTimeInput
              fullWidth
              type="datetime-local"
              value={datetime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDatetime(e.target.value)
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min:
                  status === 'Done' || status === 'Cancelled'
                    ? undefined
                    : getCurrentDateTimeLocal(),
              }}
              error={
                isDateTimeInPast(datetime) &&
                status !== 'Done' &&
                status !== 'Cancelled'
              }
              helperText={
                isDateTimeInPast(datetime) &&
                status !== 'Done' &&
                status !== 'Cancelled'
                  ? 'Cannot create booking for past time'
                  : (status === 'Done' || status === 'Cancelled') &&
                      isDateTimeInPast(datetime)
                    ? 'Recording completion time or cancelled time (past time allowed)'
                    : ''
              }
            />
          </FormField>

          <FormField>
            <FieldLabel>Description</FieldLabel>
            <DescriptionTextarea
              placeholder="Fill in"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </FormField>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <CreateButton onClick={() => void handleCreate()} disabled={!isValid}>
            Create Booking
          </CreateButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default BookingModal;
