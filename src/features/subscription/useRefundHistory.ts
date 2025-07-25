import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';
import type { RawRefund } from '@/types/subscription';

import { useGetRefundsByUserQuery } from './subscriptionApi';

interface RefundViewModel {
  refundId: string;
  date: string;
  amount: string;
  invoiceId?: string;
}

export const useRefundHistory = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const {
    data: rawRefunds = [],
    isLoading,
    isError,
    refetch,
  } = useGetRefundsByUserQuery(userId!, {
    skip: !userId,
  });

  const [refunds, setRefunds] = useState<RefundViewModel[]>([]);

  useEffect(() => {
    if (!Array.isArray(rawRefunds) || rawRefunds.length === 0) return;

    const formatted = rawRefunds.map((refund: RawRefund) => ({
      refundId: refund.id,
      date: new Date(refund.created * 1000).toLocaleString(),
      amount: `$${(refund.amount / 100).toFixed(2)}`,
      invoiceId: refund.charge?.invoice ?? undefined,
    }));

    setRefunds(formatted);
  }, [rawRefunds]);

  return {
    refunds,
    isLoading,
    isError,
    refetch,
  };
};
