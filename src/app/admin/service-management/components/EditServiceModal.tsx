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
import { useEffect, useState } from 'react';

import type {
  CreateServiceManagementDto,
  ServiceManagement,
  UpdateServiceManagementDto,
} from '@/features/service-management/serviceManagementApi';

import CustomFormModal from './CustomFormModal';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
}
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

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
  [theme.breakpoints.down('sm')]: {
    width: '95vw',
    height: '90vh',
    borderRadius: 12,
    margin: '5vh 2.5vw',
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
  const [formData, setFormData] = useState<CreateServiceManagementDto>({
    name: '',
    description: '',
    price: 0,
    isAvailable: true,
    userId: '',
  });
  const [priceInput, setPriceInput] = useState('0');
  const [isCustomFormModalOpen, setIsCustomFormModalOpen] = useState(false);

  useMediaQuery(theme.breakpoints.down('sm'));
  useMediaQuery(theme.breakpoints.down('xs'));
  const user = useAppSelector(state => state.auth.user);

  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

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
      setFormData({
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
        userId: user?._id ?? '',
      });
      setPriceInput('0');
    }
  }, [service, user?._id]);

  // Reset form when modal opens for create mode
  useEffect(() => {
    if (open && !service) {
      setFormData({
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
        userId: user?._id ?? '',
      });
      setPriceInput('0');
    }
  }, [open, service, user?._id]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (service) {
        // Update service
        const updateData: UpdateServiceManagementDto = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          isAvailable: formData.isAvailable,
        };
        await updateService({ id: service._id, data: updateData }).unwrap();
      } else {
        // Create new service
        await createService(formData).unwrap();
      }
      onClose();
    } catch {
      // Error handling can be added here
    }
  };

  const handleCustomFormSetup = () => {
    setIsCustomFormModalOpen(true);
  };

  const handleCloseCustomFormModal = () => {
    setIsCustomFormModalOpen(false);
  };

  const handleSaveCustomForm = (_fields: FormField[]) => {
    // Handle saving custom form fields
    // Here you can save the form fields to your backend
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
        onSave={handleSaveCustomForm}
      />
    </>
  );
}
