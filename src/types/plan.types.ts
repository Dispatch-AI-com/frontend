export type PlanTier = 'FREE' | 'BASIC' | 'PRO';
export type ButtonVariant = 'primary' | 'secondary' | 'disabled' | 'cancel';

export interface PlanButton {
  label: string;
  variant: ButtonVariant;
}

export interface Plan {
  _id: string;
  name: string;
  tier: PlanTier;
  features: {
    callMinutes: string;
    support: string;
  };
  pricing: {
    rrule: string;
    price: number;
    stripePriceId: string;
  }[];
  isActive: boolean;
}
