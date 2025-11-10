/**
 * Extract numeric minutes from callMinutes string
 * Handles various formats like "100 Min/Month", "Unlimited", "100", etc.
 */
export function extractMinutesFromCallMinutes(
  callMinutes: string | number,
): number {
  // If it's already a number, return it
  if (typeof callMinutes === 'number') {
    return callMinutes;
  }

  // Handle string formats
  const str = callMinutes.toString().toLowerCase();

  // Check for unlimited
  if (str.includes('unlimited') || str.includes('∞')) {
    return Number.MAX_SAFE_INTEGER; // Use a very large number for unlimited
  }

  // Extract number from string using regex
  const match = /(\d+)/.exec(str);
  if (match) {
    return parseInt(match[1], 10);
  }

  // Default fallback
  return 0;
}

/**
 * Convert seconds to minutes
 */
export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}

/**
 * Get remaining minutes from subscription
 */
export function getRemainingMinutes(
  subscription: { secondsLeft: number } | null | undefined,
): number {
  if (!subscription) return 0;
  return secondsToMinutes(subscription.secondsLeft);
}

/**
 * Get total minutes from plan
 */
export function getTotalMinutes(
  plan: { features: { callMinutes: string | number } } | null | undefined,
): number {
  if (!plan) return 0;
  return extractMinutesFromCallMinutes(plan.features.callMinutes);
}

/**
 * Get usage percentage (used minutes / total minutes)
 */
export function getUsagePercentage(
  subscription: { secondsLeft: number } | null | undefined,
  plan: { features: { callMinutes: string | number } } | null | undefined,
): number {
  if (!subscription || !plan) return 0;

  const totalMinutes = getTotalMinutes(plan);
  const remainingMinutes = getRemainingMinutes(subscription);
  const usedMinutes = totalMinutes - remainingMinutes;

  if (totalMinutes === 0) return 0;
  if (totalMinutes === Number.MAX_SAFE_INTEGER) return 0; // Unlimited plan

  return Math.max(0, Math.min(100, (usedMinutes / totalMinutes) * 100));
}








