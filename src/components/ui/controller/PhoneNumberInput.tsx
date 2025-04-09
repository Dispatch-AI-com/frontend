import { Controller, Control } from "react-hook-form";
import { InputAdornment, Select, MenuItem, TextField } from "@mui/material";
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

interface PhoneNumberInputProps {
  control: Control<any>;
  name: string;
  error?: boolean;
}

const COUNTRY_CODES = getCountries().map(country => ({
  code: country,
  label: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
  dialCode: `+${getCountryCallingCode(country)}`
})).sort((a, b) => {
  if (a.code === 'AU') return -1;
  if (b.code === 'AU') return 1;
  return a.label.localeCompare(b.label);
});

const DEFAULT_COUNTRY = 'AU';

export default function PhoneNumberInput({ control, name, error }: PhoneNumberInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ countryCode: DEFAULT_COUNTRY, number: "" }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          placeholder="Phone number"
          error={error}
          value={field.value.number}
          onChange={(e) => field.onChange({ 
            countryCode: field.value.countryCode, 
            number: e.target.value 
          })}
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment 
                  position="start" 
                  sx={{ 
                    mr: 0,
                    borderRight: '1px solid',
                    borderColor: 'grey.300',
                    pr: 1,
                  }}
                >
                  <Select
                    value={field.value.countryCode}
                    onChange={(e) => field.onChange({ 
                      countryCode: e.target.value, 
                      number: field.value.number 
                    })}
                    sx={{
                      width: '120px',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '& .MuiSelect-select': { 
                        paddingY: '0',
                        color: error ? 'error.main' : 'text.primary',
                      },
                    }}
                  >
                    {COUNTRY_CODES.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
                <InputAdornment position="start" sx={{ 
                  mr: 0,
                  ml: 1,
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {COUNTRY_CODES.find(c => c.code === field.value.countryCode)?.dialCode}
                </InputAdornment>
              </>
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
              borderColor: error ? "error.main" : "grey.300",
            },
          }}
        />
      )}
    />
  );
} 