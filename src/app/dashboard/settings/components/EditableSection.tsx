'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import EditModal from '@/app/dashboard/settings/components/EditModal';
import LabeledTextField from '@/app/dashboard/settings/components/LabeledTextField';
import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';
import theme from '@/theme';

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
  initialValues: Record<string, string>;
  columns?: number;
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
  initialValues,
  columns = 2,
}: EditableSectionProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] =
    React.useState<Record<string, string>>(initialValues);
  const [formValues, setFormValues] =
    React.useState<Record<string, string>>(initialValues);

  const handleEdit = () => {
    setFormValues(values);
    setOpen(true);
  };

  const handleSave = () => {
    setValues(formValues);
    setOpen(false);
  };
  const fieldsArray =
    typeof fields === 'function' ? fields(open ? formValues : values) : fields;
  const fieldColumns = splitFields(fieldsArray, columns);

  return (
    <>
      <SectionDivider />
      <SectionHeader title={title} onEdit={handleEdit} />
      <InfoRow>
        {fieldColumns.map((colFields, colIdx) => (
          <InfoCol key={colIdx}>
            {colFields.map(field => (
              <LabelValue
                key={field.key}
                label={field.label}
                value={values[field.key] || ''}
              />
            ))}
          </InfoCol>
        ))}
      </InfoRow>
      <EditModal
        open={open}
        title={title}
        onClose={() => {
          setOpen(false);
        }}
        onSave={handleSave}
      >
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          {fieldsArray.map(field =>
            field.component ? (
              <React.Fragment key={field.key}>
                {field.component({
                  value: formValues[field.key] || '',
                  onChange: (value: string) => {
                    setFormValues(f => ({ ...f, [field.key]: value }));
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
                  setFormValues(f => ({ ...f, [field.key]: e.target.value }));
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
