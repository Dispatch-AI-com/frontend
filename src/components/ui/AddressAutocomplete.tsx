'use client';

import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';

import type {
  AddressComponent,
  AutocompletePrediction,
  PlaceDetailsResult,
} from '@/services/places';
import { fetchPlaceAutocomplete, fetchPlaceDetails } from '@/services/places';

interface AddressComponents {
  streetNumber?: string;
  route?: string;
  locality?: string;
  administrativeAreaLevel1?: string;
  postalCode?: string;
  country?: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (
    address: string,
    placeId: string,
    components?: AddressComponents,
  ) => void;
  displayFullAddress?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SuggestionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(1, 0),
}));

const MainText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onAddressSelect,
  displayFullAddress = false,
  placeholder = 'Enter your address...',
  disabled = false,
  error = false,
  helperText,
  onKeyDown,
}) => {
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Debounced fetch for autocomplete
  const debouncedFetch = useMemo(
    () =>
      debounce(async (input: string) => {
        if (!input || input.trim().length < 2) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const data = await fetchPlaceAutocomplete(input, {
            country: 'au',
            types: 'address',
          });
          setSuggestions(data?.predictions ?? []);
        } catch {
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 300),
    [],
  );

  useEffect(() => {
    void debouncedFetch(inputValue);
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, debouncedFetch]);

  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string,
  ) => {
    setInputValue(newInputValue);
    onChange(newInputValue);
  };

  // Parse backend address components to your format
  const parseAddressComponents = (
    components: AddressComponent[],
  ): AddressComponents => {
    const parsed: AddressComponents = {};
    components.forEach(component => {
      const types = component.types;
      if (types.includes('street_number'))
        parsed.streetNumber = component.long_name;
      if (types.includes('route')) parsed.route = component.long_name;
      if (types.includes('locality')) parsed.locality = component.long_name;
      if (types.includes('administrative_area_level_1'))
        parsed.administrativeAreaLevel1 = component.short_name;
      if (types.includes('postal_code'))
        parsed.postalCode = component.long_name;
      if (types.includes('country')) parsed.country = component.long_name;
    });
    return parsed;
  };

  // Format address for display
  const formatStructuredAddress = (components: AddressComponents): string => {
    const parts = [];
    if (components.streetNumber && components.route) {
      parts.push(`${components.streetNumber} ${components.route}`);
    } else if (components.route) {
      parts.push(components.route);
    }
    if (components.locality) {
      parts.push(components.locality);
    }
    const statePostcode = [];
    if (components.administrativeAreaLevel1)
      statePostcode.push(components.administrativeAreaLevel1);
    if (components.postalCode) statePostcode.push(components.postalCode);
    if (statePostcode.length > 0) parts.push(statePostcode.join(' '));
    return parts.join(', ');
  };

  const handleOptionSelect = async (
    event: React.SyntheticEvent,
    option: AutocompletePrediction | null,
  ) => {
    if (option) {
      setLoading(true);
      try {
        const detailsResp: PlaceDetailsResult = await fetchPlaceDetails(
          option.place_id,
          'formatted_address,address_component',
        );
        const details = detailsResp?.result;
        let components: AddressComponents | undefined;
        let streetOnly = '';
        let addressToUse = option.description; // default
        if (
          details?.address_components &&
          details.address_components.length > 0
        ) {
          components = parseAddressComponents(details.address_components);
          streetOnly =
            `${components.streetNumber ?? ''} ${components.route ?? ''}`.trim();
          if (components) {
            addressToUse = formatStructuredAddress(components);
          }
        }
        const inputValueToSet = displayFullAddress ? addressToUse : streetOnly;
        onAddressSelect(inputValueToSet, option.place_id, components);
        setInputValue(inputValueToSet);
        onChange(inputValueToSet);
      } catch {
        onAddressSelect(option.description, option.place_id);
        setInputValue(option.description);
        onChange(option.description);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatAddressForDisplay = (suggestion: AutocompletePrediction) => (
    <SuggestionItem>
      <MainText variant="body1">
        {suggestion.structured_formatting?.main_text ?? suggestion.description}
      </MainText>
      <SecondaryText variant="body2">
        {suggestion.structured_formatting?.secondary_text ?? ''}
      </SecondaryText>
    </SuggestionItem>
  );

  return (
    <Box>
      <StyledAutocomplete
        options={suggestions}
        getOptionLabel={option =>
          typeof option === 'string'
            ? option
            : (option as AutocompletePrediction).description
        }
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(event, value) => {
          void handleOptionSelect(
            event,
            value as AutocompletePrediction | null,
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            helperText={helperText}
            onKeyDown={onKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...otherProps } =
            props as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
          return (
            <li key={key} {...otherProps}>
              {formatAddressForDisplay(option as AutocompletePrediction)}
            </li>
          );
        }}
        filterOptions={x => x} // Disable built-in filtering
        noOptionsText="No addresses found"
        loading={loading}
        freeSolo
        autoComplete
        includeInputInList
        filterSelectedOptions
      />
    </Box>
  );
};

export default AddressAutocomplete;
