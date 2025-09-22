import type { PlanTier } from '@/types/plan.types';

/**
 * Check if the user has a PRO plan
 * @param planTier - The plan tier to check
 * @returns true if the plan is PRO, false otherwise
 */
export const isProPlan = (planTier?: PlanTier): boolean => {
  return planTier === 'PRO';
};

/**
 * Check if the user has a FREE or BASIC plan
 * @param planTier - The plan tier to check
 * @returns true if the plan is FREE or BASIC, false otherwise
 */
export const isFreeOrBasicPlan = (planTier?: PlanTier): boolean => {
  // If no plan tier is found, treat as FREE plan
  return !planTier || planTier === 'FREE' || planTier === 'BASIC';
};

/**
 * Get the plan tier from subscription data
 * @param subscription - The subscription object
 * @returns The plan tier, defaults to 'FREE' if not available
 */
export const getPlanTier = (subscription?: {
  planId?: { tier?: PlanTier };
}): PlanTier => {
  return subscription?.planId?.tier ?? 'FREE';
};
