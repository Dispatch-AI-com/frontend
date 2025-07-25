import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import {
  useChangePlanMutation,
  useCreateSubscriptionMutation,
  useDowngradeToFreeMutation,
  useGenerateBillingPortalUrlMutation,
  useGetSubscriptionByUserQuery,
} from './subscriptionApi';

export const useSubscription = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const {
    data: subscription,
    isLoading,
    isError,
    refetch,
  } = useGetSubscriptionByUserQuery(userId!, { skip: !userId });

  const isSubscribed = subscription?.status === 'active';
  const isCancelled = subscription?.status === 'cancelled' || !subscription;
  const isFailed = subscription?.status === 'failed';
  const currentPlanId = subscription?.planId._id ?? '';

  return {
    subscription,
    isSubscribed,
    isCancelled,
    isFailed,
    currentPlanId,
    isLoading,
    isError,
    refetch,
  };
};

export const useCreateSubscription = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [createSubscription, { isLoading, error }] =
    useCreateSubscriptionMutation();

  const create = async (planId: string) => {
    if (!user?._id) throw new Error('User not logged in');
    const res = await createSubscription({ userId: user._id, planId }).unwrap();
    window.location.href = res.checkoutUrl;
  };

  return { create, isLoading, error };
};

export const useChangePlan = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [changePlan, { isLoading, error }] = useChangePlanMutation();

  const change = async (planId: string) => {
    if (!user?._id) throw new Error('User not logged in');
    await changePlan({ userId: user._id, planId }).unwrap();
    window.location.reload();
  };

  return { change, isLoading, error };
};

export const useDowngradeToFree = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [downgradeToFree, { isLoading, error }] = useDowngradeToFreeMutation();

  const downgrade = async () => {
    if (!user?._id) throw new Error('User not logged in');
    await downgradeToFree(user._id).unwrap();
    window.location.reload();
  };

  return { downgrade, isLoading, error };
};

export const useRetryPayment = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [getUrl, { isLoading, error }] = useGenerateBillingPortalUrlMutation();

  const retryPayment = async () => {
    if (!user?._id) throw new Error('User not logged in');
    const res = await getUrl(user._id).unwrap();
    window.location.href = res.url;
  };

  return { retryPayment, isLoading, error };
};
