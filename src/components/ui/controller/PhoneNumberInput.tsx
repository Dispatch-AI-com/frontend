import { useMemo } from 'react';
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import { InputAdornment, Select, MenuItem, TextField, FormControl } from "@mui/material";
import { getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js';

interface PhoneNumberInputProps<T extends FieldValues> extends Omit<React.ComponentProps<typeof TextField>, "name"> {
  name: Path<T>;
  control: Control<T>;
}

const DEFAULT_COUNTRY: CountryCode = 'AU';

interface PhoneNumberValue {
  country: string;
  number: string;
}

export default function PhoneNumberInput<T extends FieldValues>({
  name,
  control,
  ...props
}: PhoneNumberInputProps<T>) {
  const countryOptions = useMemo(() => {
    return getCountries()
      .map(country => ({
        code: country,
        label: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
        dialCode: `+${getCountryCallingCode(country)}`
      }))
      .sort((a, b) => {
        if (a.code === DEFAULT_COUNTRY) return -1;
        if (b.code === DEFAULT_COUNTRY) return 1;
        return a.label.localeCompare(b.label);
      });
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ country: DEFAULT_COUNTRY, number: "" } as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        const value = field.value as PhoneNumberValue || { country: DEFAULT_COUNTRY, number: "" };
        const { country, number } = value;
        const selectedCountryOption = countryOptions.find(option => option.code === country);
        const displayValue = selectedCountryOption ? `${selectedCountryOption.dialCode} ${number}` : number;

        const hasError = !!fieldState.error;

        return (
          <FormControl fullWidth error={hasError}>
            <TextField
              error={hasError}
              {...props}
              fullWidth
              placeholder="Phone number"
              value={displayValue}
              onChange={(e) => {
                const newValue = e.target.value;
                const selectedCountryOption = countryOptions.find(option => option.code === country);
                const dialCode = selectedCountryOption?.dialCode || '';
                const phoneNumber = newValue.replace(dialCode, '').trim();
                
                const newFieldValue: PhoneNumberValue = {
                  country: country || DEFAULT_COUNTRY,
                  number: phoneNumber
                };
                field.onChange(newFieldValue as PathValue<T, Path<T>>);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Select
                      value={country || DEFAULT_COUNTRY}
                      error={hasError}
                      onChange={(e) => {
                        const newCountry = e.target.value;
                        const newFieldValue: PhoneNumberValue = {
                          country: newCountry || DEFAULT_COUNTRY,
                          number: number || ""
                        };
                        field.onChange(newFieldValue as PathValue<T, Path<T>>);
                      }}
                      sx={{
                        width: '120px',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-select': { 
                          paddingY: '0',
                          color: hasError ? 'error.main' : 'text.primary',
                        },
                      }}
                    >
                      {countryOptions.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "white",
                  "& input": {
                    paddingLeft: 0.5,
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: hasError ? "error.main" : "grey.300",
                },
                ...props.sx
              }}
            />
          </FormControl>
        );
      }}
    />
  );
} 