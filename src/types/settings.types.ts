export interface AddressSettings {
  unitAptPOBox?: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

// Update greeting type to match backend:
export interface GreetingSettings {
  message: string;
  isCustom: boolean;
}
