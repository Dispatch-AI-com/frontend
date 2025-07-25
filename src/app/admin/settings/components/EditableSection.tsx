'use client';
import { Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import EditModal from '@/app/admin/settings/components/EditModal';
import LabeledTextField from '@/app/admin/settings/components/LabeledTextField';
import LabelValue from '@/app/admin/settings/components/LabelValue';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import theme from '@/theme';
import type { ValidationResult } from '@/utils/validationSettings';

const InfoRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
});

const InfoCol = styled(Box)({
  flex: 1,
});

interface Field {
  label: string;
  key: string;
  placeholder?: string;
  validate?: (value: string) => ValidationResult;
  component?: (props: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label: string;
    name: string;
  }) => React.ReactNode;
}

interface EditableSectionProps {
  title: string;
  fields: Field[] | ((values: Record<string, string>) => Field[]);
  initialValues?: Record<string, string>;
  columns?: number;
  validation?: (values: Record<string, string>) => ValidationResult;
  data?: Record<string, string>;
  isLoading?: boolean;
  onSave?: (values: Record<string, string>) => Promise<void>;
}

function splitFields(fields: Field[], columns: number) {
  // Split fields into N columns as evenly as possible
  const result: Field[][] = Array.from({ length: columns }, () => []);
  fields.forEach((field, idx) => {
    result[idx % columns].push(field);
  });
  return result;
}

export default function EditableSection({
  title,
  fields,
  initialValues = {},
  columns = 2,
  validation,
  data,
  isLoading = false,
  onSave,
}: EditableSectionProps) {
  const [open, setOpen] = React.useState(false);

  const actualValues = data ?? initialValues;

  const [values, setValues] =
    React.useState<Record<string, string>>(actualValues);
  const [formValues, setFormValues] =
    React.useState<Record<string, string>>(actualValues);
  const [error, setError] = React.useState<string>('');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setValues(data);
      setFormValues(data);
    }
  }, [data]);

  const handleEdit = () => {
    setFormValues(values);
    setError('');
    setOpen(true);
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);

    try {
      // Get current fields array
      const fieldsArray =
        typeof fields === 'function' ? fields(formValues) : fields;

      // Run field-level validation first
      for (const field of fieldsArray) {
        if (field.validate) {
          const fieldValue = formValues[field.key] ?? '';
          const validationResult = field.validate(fieldValue);
          if (!validationResult.isValid) {
            setError(validationResult.error ?? 'Validation failed');
            setSaving(false);
            return;
          }
        }
      }

      // Run section-level validation if provided
      if (validation) {
        const validationResult = validation(formValues);
        if (!validationResult.isValid) {
          setError(validationResult.error ?? 'Validation failed');
          setSaving(false);
          return;
        }
      }

      if (onSave) {
        await onSave(formValues);
      }

      setValues(formValues);
      setOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to save settings',
      );
    } finally {
      setSaving(false);
    }
  };
  const fieldsArray =
    typeof fields === 'function' ? fields(open ? formValues : values) : fields;
  const fieldColumns = splitFields(fieldsArray, columns);

  return (
    <>
      <SectionDivider />
      <SectionHeader
        title={title}
        onEdit={isLoading ? undefined : handleEdit}
      />
      <InfoRow>
        {fieldColumns.map((colFields, colIdx) => (
          <InfoCol key={colIdx}>
            {colFields.map(field => (
              <LabelValue
                key={field.key}
                label={field.label}
                value={isLoading ? 'Loading...' : (values[field.key] ?? '')}
              />
            ))}
          </InfoCol>
        ))}
      </InfoRow>
      <EditModal
        open={open}
        title={title}
        onClose={() => {
          setFormValues(values);
          setOpen(false);
          setError('');
        }}
        onSave={() => void handleSave()}
      >
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {saving && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Saving...
            </Alert>
          )}
          {fieldsArray.map(field =>
            field.component ? (
              <React.Fragment key={field.key}>
                {field.component({
                  value: formValues[field.key] || '',
                  onChange: (value: string) => {
                    if (!saving) {
                      setFormValues(f => ({ ...f, [field.key]: value }));
                      if (error) setError('');
                    }
                  },
                  placeholder: field.placeholder ?? field.label,
                  label: field.label,
                  name: field.key,
                })}
              </React.Fragment>
            ) : (
              <LabeledTextField
                key={field.key}
                label={field.label}
                value={formValues[field.key] || ''}
                onChange={e => {
                  if (!saving) {
                    setFormValues(f => ({ ...f, [field.key]: e.target.value }));
                    if (error) setError('');
                  }
                }}
                placeholder={field.placeholder ?? field.label}
              />
            ),
          )}
        </Box>
      </EditModal>
    </>
  );
}
