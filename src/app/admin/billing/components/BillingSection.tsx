'use client';

import 'keen-slider/keen-slider.min.css';

import { Box } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

import CancelConfirmModal from '@/components/ui/CancelConfirmModal';
import { useGetPlansQuery } from '@/features/public/publicApiSlice';
import {
  useChangePlan,
  useCreateSubscription,
  useDowngradeToFree,
  useSubscription,
} from '@/features/subscription/useSubscription';
import type { Plan, PlanButton } from '@/types/plan.types';

import PricingCard from './BillingCard';

function parseRRule(rrule: string): string {
  if (rrule.includes('FREQ=MONTHLY;INTERVAL=3')) return 'quarter';
  if (rrule.includes('FREQ=MONTHLY')) return 'month';
  if (rrule.includes('FREQ=YEARLY')) return 'year';
  return '';
}

function getPrice(pricing: { rrule: string; price: number }[]) {
  const matched = pricing[0];
  if (!matched) return { priceDisplay: '--', periodDisplay: '' };
  if (matched.price === 0) return { priceDisplay: 'FREE', periodDisplay: '' };
  return {
    priceDisplay: `$${String(matched.price)}`,
    periodDisplay: ` /${parseRRule(matched.rrule)}`,
  };
}

function getButtonsByPlan(
  plan: Plan,
  currentPlanId: string,
  isSubscribed: boolean,
  isCancelled: boolean,
): PlanButton[] {
  const isCurrent = plan._id === currentPlanId;
  if (isCancelled) {
    if (plan.tier === 'FREE')
      return [{ label: 'Your current plan', variant: 'disabled' }];
    return [{ label: `Go with ${plan.tier}`, variant: 'primary' }];
  }
  if (isSubscribed) {
    if (isCurrent) {
      return [{ label: 'Cancel Subscription', variant: 'cancel' }];
    }
    return [{ label: `Switch to ${plan.tier}`, variant: 'primary' }];
  }
  return [{ label: 'Try for Free', variant: 'primary' }];
}

export default function BillingSection() {
  const {
    data: plans = [],
    isLoading,
    isError,
  } = useGetPlansQuery(undefined) as {
    data: Plan[];
    isLoading: boolean;
    isError: boolean;
  };
  const { create } = useCreateSubscription();
  const { change } = useChangePlan();
  const { downgrade } = useDowngradeToFree();
  const { subscription, isSubscribed, isCancelled, currentPlanId } =
    useSubscription();

  const tierOrder = { FREE: 0, BASIC: 1, PRO: 2 };
  const sortedPlans = [...plans].sort(
    (a, b) => tierOrder[a.tier] - tierOrder[b.tier],
  );

  {
    /* slide */
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      '(min-width: 900px)': {
        slides: { perView: 2, spacing: 0 },
      },
      '(min-width: 1200px)': {
        slides: { perView: 3, spacing: 0 },
      },
    },
    slideChanged(sliderInstance) {
      setCurrentSlide(sliderInstance.track.details.rel);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      slider.current?.update();
    }, 100);
    return () => clearTimeout(timeout);
  }, [slider]);

  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleClick = async (
    label: string,
    tier: 'FREE' | 'BASIC' | 'PRO',
    planId: string,
  ): Promise<void> => {
    if (label.startsWith('Go with')) {
      if (!subscription || subscription.status === 'cancelled') {
        await create(planId);
      } else if (subscription.planId._id !== planId) {
        await change(planId);
      }
    }
    if (label === 'Cancel Subscription') {
      setShowCancelModal(true);
      return;
    }
    if (label.startsWith('Switch to')) {
      if (tier === 'FREE') await downgrade();
      else await change(planId);
      window.location.reload();
    }
  };

  const handleConfirmCancel = async () => {
    try {
      await downgrade();
      setShowCancelModal(false);
      window.location.reload();
    } catch {
      // Handle error silently
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load plans.</p>}

      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          maxWidth: {
            xs: 350,
            sm: 600,
            md: 750,
            lg: 1150,
          },
          overflow: 'hidden',
        }}
      >
        {sortedPlans.map(plan => (
          <Box
            key={plan._id}
            className="keen-slider__slide"
            sx={{
              display: 'flex',
              boxSizing: 'border-box',
              justifyContent: 'center',
            }}
          >
            <PricingCard
              tier={plan.tier}
              features={plan.features}
              pricing={getPrice(plan.pricing)}
              buttons={getButtonsByPlan(
                plan,
                currentPlanId,
                isSubscribed,
                isCancelled,
              )}
              onButtonClick={label =>
                void handleClick(label, plan.tier, plan._id)
              }
              isCurrent={
                plan.tier === 'FREE' &&
                (!currentPlanId || isCancelled || !isSubscribed)
                  ? true
                  : plan._id === currentPlanId
              }
            />
          </Box>
        ))}
      </Box>

      {/* Dots Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          gap: 1.5,
        }}
      >
        {sortedPlans.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => {
              slider.current?.moveToIdx(idx);
            }}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor:
                currentSlide === idx ? 'primary.main' : 'grey.400',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>

      <CancelConfirmModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />
    </Box>
  );
}
