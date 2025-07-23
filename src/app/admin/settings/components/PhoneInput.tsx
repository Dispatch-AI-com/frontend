import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SelectField from '@/app/admin/settings/components/SelectField';

interface Country {
  name: { common: string };
  idd?: { root?: string; suffixes?: string[] };
}

interface PhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Phone number',
}) => {
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,idd')
      .then(res => res.json())
      .then((data: Country[]) => {
        const optionsMap = new Map<string, { label: string; value: string }>();
        // Define preferred countries for common country codes
        const preferredCountries = new Set([
          'Australia',
          'United States',
          'United Kingdom',
          'Canada',
          'Germany',
          'France',
          'Japan',
          'China',
          'India',
          'Brazil',
        ]);
        data.forEach((country: Country) => {
          const root = country.idd?.root ?? '';
          const suffix = country.idd?.suffixes?.[0] ?? '';
          if (!root || !suffix) return;

          const countryCode = `${root}${suffix}`;
          const countryName = country.name.common;
          // Only keep the first country for each country code, or prefer certain countries
          if (
            !optionsMap.has(countryCode) ||
            preferredCountries.has(countryName)
          ) {
            optionsMap.set(countryCode, {
              label: countryName,
              value: countryCode,
            });
          }
        });
        const options = Array.from(optionsMap.values()).sort((a, b) =>
          a.label.localeCompare(b.label),
        );
        setCountryOptions(options);
      })
      .catch(() => {
        setCountryOptions([]);
      });
  }, []);

  const match = /^(\+\d+)?\s*(.*)$/.exec(value);
  const prefix = match?.[1] ?? '';
  const number = match?.[2] ?? '';

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ minWidth: 120 }}>
        <SelectField
          value={prefix}
          options={countryOptions}
          onChange={newPrefix => {
            onChange(`${newPrefix} ${number}`.trim());
          }}
        />
      </div>
      <TextField
        value={number}
        onChange={e => {
          onChange(`${prefix} ${e.target.value}`.trim());
        }}
        placeholder={placeholder}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : undefined,
        }}
      />
    </div>
  );
};

export default PhoneInput;
