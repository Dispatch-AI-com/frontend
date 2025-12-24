import { getApiBaseUrl } from '@/utils/api-config';

const API_BASE = getApiBaseUrl();

// Autocomplete prediction structure
export interface AutocompletePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface AutocompleteResult {
  predictions: AutocompletePrediction[];
  status: string;
}

// Address component structure
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

// Place details structure
export interface PlaceDetails {
  formatted_address: string;
  address_components: AddressComponent[];
  place_id: string;
}

export interface PlaceDetailsResult {
  result: PlaceDetails;
  status: string;
}

// Typed autocomplete fetch
export async function fetchPlaceAutocomplete(
  input: string,
  opts: { sessiontoken?: string; country?: string; types?: string } = {},
): Promise<AutocompleteResult> {
  const params = new URLSearchParams({ input });
  if (opts.sessiontoken) params.set('sessiontoken', opts.sessiontoken);
  if (opts.country) params.set('country', opts.country);
  if (opts.types) params.set('types', opts.types);
  const res = await fetch(
    `${API_BASE}/places/autocomplete?${params.toString()}`,
  );
  if (!res.ok) throw new Error('Failed to fetch autocomplete');
  return (await res.json()) as AutocompleteResult;
}

// Typed place details fetch
export async function fetchPlaceDetails(
  place_id: string,
  fields?: string,
): Promise<PlaceDetailsResult> {
  const params = new URLSearchParams({ place_id });
  if (fields) params.set('fields', fields);
  const res = await fetch(`${API_BASE}/places/details?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch place details');
  return (await res.json()) as PlaceDetailsResult;
}
