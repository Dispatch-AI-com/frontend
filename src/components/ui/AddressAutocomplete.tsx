'use client';

import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

import googleMapsLoader from '@/utils/googleMapsLoader';

interface AddressSuggestion {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

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
  placeholder = 'Enter your address...',
  disabled = false,
  error = false,
  helperText,
  onKeyDown,
}) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps JavaScript API using the loader
    const loadAPI = async () => {
      try {
        await googleMapsLoader.load({
          libraries: ['places'],
        });
        initializeServices();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load Google Maps API:', error);
      }
    };

    if (googleMapsLoader.isAPILoaded()) {
      initializeServices();
    } else {
      void loadAPI();
    }
  }, []);

  const initializeServices = () => {
    if (window.google?.maps && autocompleteRef.current) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      placesService.current = new window.google.maps.places.PlacesService(
        autocompleteRef.current,
      );
    }
  };

  const fetchSuggestions = (input: string) => {
    if (!autocompleteService.current || !input.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: input.trim(),
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        types: ['address'],
      };

      void autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const formattedSuggestions = predictions.map(prediction => ({
              place_id: prediction.place_id,
              description: prediction.description,
              structured_formatting: {
                main_text: prediction.structured_formatting?.main_text ?? '',
                secondary_text:
                  prediction.structured_formatting?.secondary_text ?? '',
              },
            }));
            setSuggestions(formattedSuggestions);
          } else {
            setSuggestions([]);
          }
          setLoading(false);
        },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string,
  ) => {
    setInputValue(newInputValue);
    onChange(newInputValue);

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchSuggestions(newInputValue);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  // change google maps component into address components we defined
  const parseAddressComponents = (
    components: google.maps.GeocoderAddressComponent[],
  ): AddressComponents => {
    const parsed: AddressComponents = {};

    components.forEach(component => {
      const types = component.types;

      if (types.includes('street_number')) {
        parsed.streetNumber = component.long_name;
      } else if (types.includes('route')) {
        parsed.route = component.long_name;
      } else if (types.includes('locality')) {
        parsed.locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        parsed.administrativeAreaLevel1 = component.short_name;
      } else if (types.includes('postal_code')) {
        parsed.postalCode = component.long_name;
      } else if (types.includes('country')) {
        parsed.country = component.long_name;
      }
    });

    return parsed;
  };

  //change address components into address string
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
    if (components.administrativeAreaLevel1) {
      statePostcode.push(components.administrativeAreaLevel1);
    }
    if (components.postalCode) {
      statePostcode.push(components.postalCode);
    }

    if (statePostcode.length > 0) {
      parts.push(statePostcode.join(' '));
    }

    return parts.join(', ');
  };

  const handleOptionSelect = (
    event: React.SyntheticEvent,
    option: AddressSuggestion | null,
  ) => {
    if (option && placesService.current) {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: option.place_id,
        fields: ['formatted_address', 'address_components'],
      };

      placesService.current.getDetails(request, (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          let addressToUse = place.formatted_address ?? option.description;
          let components: AddressComponents | undefined;

          if (place.address_components && place.address_components.length > 0) {
            components = parseAddressComponents(place.address_components);
            const structuredAddress = formatStructuredAddress(components);
            if (structuredAddress) {
              addressToUse = structuredAddress;
            }
          }

          onAddressSelect(addressToUse, option.place_id, components);
          setInputValue(addressToUse);
          onChange(addressToUse);
        }
      });
    }
  };

  const formatAddressForDisplay = (suggestion: AddressSuggestion) => {
    return (
      <SuggestionItem>
        <MainText variant="body1">
          {suggestion.structured_formatting?.main_text ??
            suggestion.description}
        </MainText>
        <SecondaryText variant="body2">
          {suggestion.structured_formatting?.secondary_text ?? ''}
        </SecondaryText>
      </SuggestionItem>
    );
  };

  return (
    <Box>
      <StyledAutocomplete
        ref={autocompleteRef}
        options={suggestions}
        getOptionLabel={option =>
          typeof option === 'string'
            ? option
            : (option as AddressSuggestion).description
        }
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(event, value) =>
          handleOptionSelect(event, value as AddressSuggestion | null)
        }
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
              {formatAddressForDisplay(option as AddressSuggestion)}
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

      {/* Hidden div for PlacesService */}
      <div ref={autocompleteRef} style={{ display: 'none' }} />
    </Box>
  );
};

export default AddressAutocomplete;
