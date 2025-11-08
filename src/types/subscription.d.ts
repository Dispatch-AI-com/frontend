import type { Plan } from './plan.types';
export interface CreateSubscriptionDto {
  userId: string;
  planId: string;
}

export interface ChangePlanDto {
  userId: string;
  planId: string;
}

export interface Subscription {
  _id: string;
  userId: string;
  planId: Plan;
  subscriptionId?: string | null; // Optional for FREE plan users
  stripeCustomerId?: string | null; // Optional for FREE plan users
  chargeId?: string | null; // Optional for FREE plan users
  status: 'active' | 'cancelled' | 'failed';
  startAt: string;
  endAt: string;
  createdAt: string;
}

export interface RawInvoice {
  id: string;
  created: number;
  amount_paid: number;
  status: string;
  hosted_invoice_url: string;
}

export interface RawRefund {
  id: string;
  created: number;
  amount: number;
  charge: {
    invoice: string | null;
  };
}
