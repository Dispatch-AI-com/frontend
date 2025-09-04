import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useCheckAuthStatusQuery } from '@/features/auth/authApi';
import type {
  CreateServiceManagementDto,
  FormField,
  ServiceManagement,
  UpdateServiceManagementDto,
} from '@/features/service-management/serviceManagementApi';
import {
  useCreateServiceMutation,
  useGetServiceFormFieldsQuery,
  useSaveServiceFormFieldsMutation,
  useUpdateServiceMutation,
} from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

import CustomFormModal from './CustomFormModal';

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

const ModalHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  marginBottom: '24px',
}));

const ModalTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
}));

const CloseButton = styled(IconButton)(() => ({
  padding: 4,
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const ModalContent = styled(Box)(() => ({
  padding: '0 24px',
  maxHeight: '60vh',
  overflowY: 'auto',
}));

const ModalFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '24px',
  borderTop: '1px solid #f0f0f0',
  marginTop: '24px',
}));

const FormField = styled(Box)(() => ({
  marginBottom: '20px',
}));

const FieldLabel = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: '8px',
}));

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    minHeight: '40px',
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
    '&.MuiInputBase-multiline': {
      height: 'auto',
      minHeight: '60px',
      padding: 0,
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
    height: '16px',
    '&.MuiInputBase-inputMultiline': {
      height: 'auto',
      minHeight: '24px',
      resize: 'none',
    },
  },
}));

const StatusSelect = styled(Select)(() => ({
  width: '100%',
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
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: 1.14,
    color: '#060606',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const CancelButton = styled(Button)(() => ({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#666',
  border: '1px solid #e0e0e0',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bdbdbd',
  },
}));

const SaveButton = styled(Button)(() => ({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  backgroundColor: '#1a1a1a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:disabled': {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
}));

export default function EditServiceModal({
  open,
  service,
  onClose,
}: {
  open: boolean;
  service: ServiceManagement | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateServiceManagementDto>({
    name: '',
    description: '',
    price: 0,
    isAvailable: true,
    userId: '',
  });
  const [priceInput, setPriceInput] = useState('0');
  const [isCustomFormModalOpen, setIsCustomFormModalOpen] = useState(false);
  const [customFormFields, setCustomFormFields] = useState<FormField[]>([]);

  useMediaQuery(theme.breakpoints.down('sm'));
  useMediaQuery(theme.breakpoints.down('xs'));
  const user = useAppSelector(state => state.auth.user);

  // Fallback: try to get user from auth check if Redux state is empty
  const { data: authCheckData } = useCheckAuthStatusQuery(undefined, {
    skip: !!user, // Only run if we don't have user in Redux
  });

  // Get user from either Redux or auth check
  const currentUser = user ?? authCheckData?.user;

  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [saveServiceFormFields] = useSaveServiceFormFieldsMutation();

  // 获取现有的表单字段
  const { data: existingFormFields = [] } = useGetServiceFormFieldsQuery(
    { serviceId: service?._id ?? '' },
    { skip: !service?._id },
  );

  // 转换后端字段格式到前端格式
  const convertedFields = useMemo(() => {
    if (!existingFormFields || existingFormFields.length === 0) {
      return [];
    }
    return existingFormFields.map(field => ({
      id: field._id ?? field.serviceId + '_' + Date.now(),
      type: field.fieldType,
      label: field.fieldName,
      required: field.isRequired,
      options: field.options ?? [],
    }));
  }, [existingFormFields]);

  // 当现有字段变化时，更新本地状态
  useEffect(() => {
    const currentFieldsString = JSON.stringify(customFormFields);
    const newFieldsString = JSON.stringify(convertedFields);
    if (currentFieldsString !== newFieldsString) {
      setCustomFormFields(convertedFields);
    }
  }, [convertedFields, customFormFields]);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name ?? '',
        description: service.description ?? '',
        price: service.price ?? 0,
        isAvailable: service.isAvailable ?? true,
        userId: service.userId ?? '',
      });
      setPriceInput(service.price?.toString() ?? '0');
    } else {
      const newFormData = {
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
        userId: currentUser?._id ?? '',
      };
      setFormData(newFormData);
      setPriceInput('0');
    }
  }, [service, currentUser?._id]);

  // Reset form when modal opens for create mode
  useEffect(() => {
    if (open && !service) {
      const resetFormData = {
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
        userId: currentUser?._id ?? '',
      };
      setFormData(resetFormData);
      setPriceInput('0');
    }
  }, [open, service, currentUser?._id]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // Validation before submission
      if (!formData.name.trim()) {
        alert('Please enter a service name');
        return;
      }

      // If formData.userId is missing but we have currentUser._id, update it
      if (!formData.userId && currentUser?._id) {
        setFormData(prev => ({ ...prev, userId: currentUser._id }));
        // Re-submit with updated data
        setTimeout(() => {
          void handleSubmit();
        }, 100);
        return;
      }

      if (!formData.userId) {
        alert('Authentication required. Redirecting to login...');
        router.push('/login');
        return;
      }

      let currentServiceId = service?._id;

      if (service) {
        // Update service
        const updateData: UpdateServiceManagementDto = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          isAvailable: formData.isAvailable,
        };
        await updateService({ id: service._id, data: updateData }).unwrap();
        currentServiceId = service._id;
      } else {
        // Create new service
        const newService = await createService(formData).unwrap();
        currentServiceId = newService._id;
      }

      // 保存表单字段
      if (currentServiceId && customFormFields.length > 0) {
        // 过滤掉空的字段（label为空的字段）
        const validFields = customFormFields.filter(
          field => field.label.trim() !== '',
        );

        if (validFields.length > 0) {
          const backendFields = validFields.map(field => ({
            serviceId: currentServiceId,
            fieldName: field.label,
            fieldType: field.type,
            isRequired: field.required,
            options: field.options ?? [],
          }));

          await saveServiceFormFields({
            serviceId: currentServiceId,
            fields: backendFields,
          }).unwrap();
        }
      }

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save service:', error);
      // 提供更详细的错误信息
      if (error && typeof error === 'object' && 'data' in error) {
        // eslint-disable-next-line no-console
        console.error('Error details:', error.data);
      }
      // Error handling can be added here
    }
  };

  const handleCustomFormSetup = () => {
    setIsCustomFormModalOpen(true);
  };

  const handleCloseCustomFormModal = () => {
    setIsCustomFormModalOpen(false);
  };

  const handleSaveCustomForm = async (fields: FormField[]): Promise<void> => {
    try {
      setCustomFormFields(fields);

      // 如果服务已存在，立即保存到后端
      if (service?._id) {
        // 过滤掉空的字段（label为空的字段）
        const validFields = fields.filter(field => field.label.trim() !== '');

        if (validFields.length > 0) {
          const backendFields = validFields.map(field => ({
            serviceId: service._id,
            fieldName: field.label,
            fieldType: field.type,
            isRequired: field.required,
            options: field.options ?? [],
          }));

          await saveServiceFormFields({
            serviceId: service._id,
            fields: backendFields,
          }).unwrap();
        }
      } else {
        // eslint-disable-next-line no-console
        console.log(
          'No service ID, form fields will be saved when service is created',
        );
      }

      setIsCustomFormModalOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save custom form fields:', error);
      // 提供更详细的错误信息
      if (error && typeof error === 'object' && 'data' in error) {
        // eslint-disable-next-line no-console
        console.error('Error details:', error.data);
      }
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>
              {service ? 'Edit Service' : 'Create Service'}
            </ModalTitle>
            <CloseButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </CloseButton>
          </ModalHeader>

          <ModalContent>
            <FormField>
              <FieldLabel>Service Name</FieldLabel>
              <StyledTextField
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('name', e.target.value)
                }
                placeholder="Enter service name"
                required
              />
            </FormField>

            <FormField>
              <FieldLabel>Description</FieldLabel>
              <StyledTextField
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange('description', e.target.value)
                }
                multiline
                rows={3}
                placeholder="Enter service description"
              />
            </FormField>

            <FormField>
              <FieldLabel>Price</FieldLabel>
              <StyledTextField
                value={priceInput}
                onChange={e => {
                  const value = e.target.value;
                  setPriceInput(value);
                  if (value === '') {
                    handleInputChange('price', 0);
                  } else {
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                      handleInputChange('price', numValue);
                    }
                  }
                }}
                type="number"
                inputProps={{ min: 0, step: 10 }}
                placeholder="Enter price"
                required
              />
            </FormField>

            <FormField>
              <FieldLabel>Status</FieldLabel>
              <FormControl fullWidth>
                <StatusSelect
                  value={formData.isAvailable ? 'active' : 'inactive'}
                  onChange={e =>
                    handleInputChange(
                      'isAvailable',
                      e.target.value === 'active',
                    )
                  }
                  displayEmpty
                  renderValue={selected => {
                    if (!selected) {
                      return (
                        <span style={{ color: '#999' }}>Please Select</span>
                      );
                    }
                    return selected === 'active' ? 'Active' : 'Inactive';
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </StatusSelect>
              </FormControl>
            </FormField>

            <FormField>
              <FieldLabel>Custom Form</FieldLabel>
              <Button
                variant="outlined"
                onClick={handleCustomFormSetup}
                sx={{
                  borderColor: '#000',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                Set it up
              </Button>
            </FormField>
          </ModalContent>

          <ModalFooter>
            <CancelButton onClick={onClose} disabled={isLoading}>
              Cancel
            </CancelButton>
            {!currentUser && (
              <Button
                onClick={() => {
                  router.push('/login');
                }}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Login Required
              </Button>
            )}
            <SaveButton
              onClick={() => {
                void handleSubmit();
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : service ? 'Update' : 'Create'}
            </SaveButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>

      <CustomFormModal
        open={isCustomFormModalOpen}
        onClose={handleCloseCustomFormModal}
        onSave={(fields: FormField[]) => {
          void handleSaveCustomForm(fields);
        }}
        initialFields={customFormFields}
      />
    </>
  );
}
