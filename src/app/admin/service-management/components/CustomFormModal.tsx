import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

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

// FieldLabel component removed as it's no longer used

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
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
    height: '16px',
  },
}));

const FieldTypeSelect = styled(Select)(() => ({
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

const FieldOptions = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '12px',
}));

const ActionButtons = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const ActionButton = styled(IconButton)(() => ({
  padding: '8px',
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const RequiredToggle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const RequiredLabel = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#1a1a1a',
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

const CreateButton = styled(Button)(() => ({
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
}));

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface CustomFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (fields: FormField[]) => void;
}

const fieldTypes = [
  { value: 'short-answer', label: 'Short answer', icon: DragIndicatorIcon },
  { value: 'paragraph', label: 'Paragraph', icon: FormatListBulletedIcon },
  {
    value: 'dropdown-list',
    label: 'Drop-down list',
    icon: KeyboardArrowDownIcon,
  },
  {
    value: 'single-choice',
    label: 'Single-choice question',
    icon: RadioButtonCheckedIcon,
  },
  {
    value: 'multiple-choice',
    label: 'Multiple-choice questions',
    icon: CheckBoxIcon,
  },
  { value: 'date', label: 'Date', icon: CalendarTodayIcon },
  { value: 'time', label: 'Time', icon: AccessTimeIcon },
];

export default function CustomFormModal({
  open,
  onClose,
  onSave,
}: CustomFormModalProps) {
  const [fields, setFields] = useState<FormField[]>([
    {
      id: '1',
      type: 'short-answer',
      label: '',
      required: false,
      options: [],
    },
  ]);

  useMediaQuery(theme.breakpoints.down('sm'));

  const handleFieldTypeChange = (fieldId: string, type: string) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, type } : field)),
    );
  };

  const handleLabelChange = (fieldId: string, label: string) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, label } : field)),
    );
  };

  const handleRequiredChange = (fieldId: string, required: boolean) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId ? { ...field, required } : field,
      ),
    );
  };

  const handleDuplicateField = (fieldId: string) => {
    const fieldToDuplicate = fields.find(field => field.id === fieldId);
    if (fieldToDuplicate) {
      const newField: FormField = {
        id: Date.now().toString(),
        type: fieldToDuplicate.type,
        label: fieldToDuplicate.label,
        required: fieldToDuplicate.required,
      };
      setFields(prev => [...prev, newField]);
    }
  };

  const handleDeleteField = (fieldId: string) => {
    if (fields.length > 1) {
      setFields(prev => prev.filter(field => field.id !== fieldId));
    }
  };

  const handleAddOption = (fieldId: string) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
              ...field,
              options: [...(field.options ?? []), ''],
            }
          : field,
      ),
    );
  };

  const handleUpdateOption = (
    fieldId: string,
    optionIndex: number,
    value: string,
  ) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options?.map((option, index) =>
                index === optionIndex ? value : option,
              ),
            }
          : field,
      ),
    );
  };

  const handleDeleteOption = (fieldId: string, optionIndex: number) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options?.filter(
                (_, index) => index !== optionIndex,
              ),
            }
          : field,
      ),
    );
  };

  const needsOptions = (type: string) => {
    return ['dropdown-list', 'single-choice', 'multiple-choice'].includes(type);
  };

  const handleCreate = () => {
    if (onSave) {
      onSave(fields);
    }
    onClose();
  };

  const handleClose = () => {
    setFields([
      {
        id: '1',
        type: 'short-answer',
        label: '',
        required: false,
        options: [],
      },
    ]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Custom Form</ModalTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {fields.map(field => (
            <FormField key={field.id}>
              <FormControl fullWidth>
                <FieldTypeSelect
                  value={field.type}
                  onChange={e =>
                    handleFieldTypeChange(field.id, e.target.value as string)
                  }
                  displayEmpty
                  renderValue={selected => {
                    const selectedType = fieldTypes.find(
                      type => type.value === selected,
                    );
                    if (selectedType) {
                      const IconComponent = selectedType.icon;
                      return (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <IconComponent sx={{ fontSize: 16, color: '#666' }} />
                          {selectedType.label}
                        </Box>
                      );
                    }
                    return selected as React.ReactNode;
                  }}
                >
                  {fieldTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                      <MenuItem key={type.value} value={type.value}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <IconComponent sx={{ fontSize: 16, color: '#666' }} />
                          {type.label}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </FieldTypeSelect>
              </FormControl>

              <StyledTextField
                value={field.label}
                onChange={e => handleLabelChange(field.id, e.target.value)}
                placeholder="label name"
                sx={{ marginTop: 2 }}
              />

              {needsOptions(field.type) && (
                <Box
                  sx={{
                    marginTop: 2,
                    marginLeft: 3,
                    position: 'relative',
                  }}
                >
                  {/* Continuous vertical line - starts from label box bottom, extends to Add Option horizontal connection line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '-12px',
                      top: '-8px', // Adjust position to make vertical line start from label box bottom edge
                      width: '1px',
                      height: 'calc(100% - 8px)', // Adjust height to ensure vertical line ends at Add Option horizontal connection line
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                  {field.options?.map((option, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        marginBottom: 1,
                        position: 'relative',
                      }}
                    >
                      {/* Horizontal connection line */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '-12px',
                          top: '50%',
                          width: '8px',
                          height: '1px',
                          backgroundColor: '#e0e0e0',
                          transform: 'translateY(-50%)',
                        }}
                      />
                      <StyledTextField
                        value={option}
                        onChange={e =>
                          handleUpdateOption(field.id, index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        size="small"
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': {
                            minHeight: '32px',
                            fontSize: '13px',
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => handleDeleteOption(field.id, index)}
                        size="small"
                        sx={{
                          color: '#666',
                          padding: '4px',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      marginBottom: 1,
                      position: 'relative',
                    }}
                  >
                    {/* Horizontal connection line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '-12px',
                        top: '50%',
                        width: '8px',
                        height: '1px',
                        backgroundColor: '#e0e0e0',
                        transform: 'translateY(-50%)',
                      }}
                    />
                    <StyledTextField
                      placeholder="Add Option"
                      size="small"
                      onClick={() => handleAddOption(field.id)}
                      sx={{
                        flex: 1,
                        cursor: 'pointer',
                        '& .MuiOutlinedInput-root': {
                          minHeight: '32px',
                          fontSize: '13px',
                          '&:hover': {
                            borderColor: '#999',
                            backgroundColor: 'rgba(0,0,0,0.02)',
                          },
                          '& fieldset': {
                            borderStyle: 'dashed',
                            borderColor: '#999',
                            borderWidth: '1px',
                            borderDasharray: '4 4',
                          },
                          '&:hover fieldset': {
                            borderColor: '#666',
                          },
                        },
                        '& .MuiInputBase-input': {
                          cursor: 'pointer',
                          color: '#666',
                          '&::placeholder': {
                            color: '#999',
                            opacity: 1,
                          },
                        },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Box sx={{ width: 32 }} />{' '}
                    {/* Placeholder, same width as delete button */}
                  </Box>
                </Box>
              )}

              <FieldOptions>
                <ActionButtons>
                  <ActionButton
                    onClick={() => handleDuplicateField(field.id)}
                    title="Duplicate field"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleDeleteField(field.id)}
                    title="Delete field"
                    disabled={fields.length === 1}
                  >
                    <DeleteIcon fontSize="small" />
                  </ActionButton>
                </ActionButtons>

                <RequiredToggle>
                  <RequiredLabel>Required</RequiredLabel>
                  <Switch
                    checked={field.required}
                    onChange={e =>
                      handleRequiredChange(field.id, e.target.checked)
                    }
                    size="small"
                  />
                </RequiredToggle>
              </FieldOptions>
            </FormField>
          ))}
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <CreateButton onClick={handleCreate}>Create</CreateButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
}
