import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';
import type { RawInvoice } from '@/types/subscription';

import { useGetInvoicesByUserQuery } from './subscriptionApi';

interface InvoiceViewModel {
  invoiceId: string;
  date: string;
  amount: string;
  status: string;
  invoiceUrl: string;
}

export const useInvoiceHistory = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const {
    data: rawInvoices = [],
    isLoading,
    isError,
    refetch,
  } = useGetInvoicesByUserQuery(userId!, {
    skip: !userId,
  });

  const [invoices, setInvoices] = useState<InvoiceViewModel[]>([]);

  useEffect(() => {
    if (!Array.isArray(rawInvoices) || rawInvoices.length === 0) return;

    const formatted = rawInvoices.map((invoice: RawInvoice) => ({
      invoiceId: invoice.id,
      date: new Date(invoice.created * 1000).toLocaleString(),
      amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
      status: invoice.status,
      invoiceUrl: invoice.hosted_invoice_url,
    }));

    setInvoices(formatted);
  }, [rawInvoices]);

  return {
    invoices,
    isLoading,
    isError,
    refetch,
  };
};
