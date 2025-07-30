import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
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
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      width: 'calc(100% - 32px)',
      maxWidth: 'none',
    },

    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
      width: 'calc(100% - 16px)',
    },
  },
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 1, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5, 1.5, 0.5, 1.5),
  },
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2, 2, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.5, 1.5, 1.5, 1.5),
  },
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1, 3),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 1, 2),
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5, 1.5, 0.5, 1.5),
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },

  [theme.breakpoints.down('xs')]: {
    gap: theme.spacing(1.5),
  },
}));

const CustomFormSection = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1.5, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
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

  const isLoading = isCreating || isUpdating;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isExtraSmallScreen}
    >
      <DialogTitleStyled>
        {/* 直接用 span 保留样式，避免嵌套 heading */}
        <span
          style={{
            fontWeight: 'bold',
            fontSize: isSmallScreen ? '1.25rem' : '1.5rem',
            lineHeight: 1.2,
          }}
        >
          {service ? 'Edit Service' : 'Create Service'}
        </span>
        <IconButton
          onClick={onClose}
          size={isExtraSmallScreen ? 'small' : 'small'}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitleStyled>

      <DialogContentStyled>
        <FormContainer>
          <TextField
            label="Service Name"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('name', e.target.value)
            }
            fullWidth
            size={isExtraSmallScreen ? 'small' : 'small'}
            required
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange('description', e.target.value)
            }
            fullWidth
            multiline
            rows={isSmallScreen ? 2 : 3}
            size={isExtraSmallScreen ? 'small' : 'small'}
            placeholder="Enter service description"
          />

          <TextField
            label="Price"
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
            fullWidth
            size={isExtraSmallScreen ? 'small' : 'small'}
            type="number"
            inputProps={{ min: 0, step: 10 }}
            required
          />

          <FormControl fullWidth size={isExtraSmallScreen ? 'small' : 'small'}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.isAvailable ? 'active' : 'inactive'}
              label="Status"
              onChange={e =>
                handleInputChange('isAvailable', e.target.value === 'active')
              }
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <CustomFormSection>
            <Typography
              variant={isSmallScreen ? 'body2' : 'body2'}
              sx={{ mb: 1, fontWeight: 'medium' }}
            >
              Custom Form
            </Typography>
            <Button
              variant="outlined"
              size={isExtraSmallScreen ? 'small' : 'small'}
              sx={{
                borderColor: '#000',
                color: '#000',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Set it up
            </Button>
          </CustomFormSection>
        </FormContainer>
      </DialogContentStyled>

      <DialogActionsStyled>
        <ActionButton
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{
            border: '1px solid #000',
            color: '#000',
            '&:hover': {
              borderColor: '#333',
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          Cancel
        </ActionButton>
        <ActionButton
          onClick={() => {
            void handleSubmit();
          }}
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          {isLoading ? 'Saving...' : service ? 'Update' : 'Create'}
        </ActionButton>
      </DialogActionsStyled>
    </StyledDialog>
  );
}
