import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

import StatusChip from '@/components/ui/StatusChip';
import { useInvoiceHistory } from '@/features/subscription/useInvoiceHistory';
import { useRefundHistory } from '@/features/subscription/useRefundHistory';

interface BillingEntry {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'unpaid' | 'refunded';
  invoiceUrl: string;
  timestamp: number;
}

const headerCellStyle = {
  width: '20%',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: 'normal',
  color: '#6d6d6d',
};

const tableCellStyle = {
  width: '20%',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: 'normal',
  color: '#060606',
  borderBottom: 'none',
};

const BillingHistorySection = () => {
  const {
    invoices,
    isLoading: isLoadingInvoices,
    isError: isInvoiceError,
  } = useInvoiceHistory();

  const {
    refunds,
    isLoading: isLoadingRefunds,
    isError: isRefundError,
  } = useRefundHistory();

  const isLoading = isLoadingInvoices || isLoadingRefunds;
  const isError = isInvoiceError || isRefundError;

  const invoiceEntries: BillingEntry[] = invoices.map(inv => ({
    id: inv.invoiceId,
    date: inv.date,
    amount: inv.amount,
    status: inv.status as 'paid' | 'unpaid',
    invoiceUrl: inv.invoiceUrl,
    timestamp: new Date(inv.date).getTime(),
  }));

  const refundEntries: BillingEntry[] = refunds.map(ref => ({
    id: ref.refundId,
    date: ref.date,
    amount: ref.amount,
    status: 'refunded',
    invoiceUrl: '/',
    timestamp: new Date(ref.date).getTime(),
  }));

  const combined: BillingEntry[] = [...invoiceEntries, ...refundEntries].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error"></Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={1}
          sx={{
            maxWidth: {
              xs: 350,
              sm: 600,
              md: 750,
              lg: 1100,
            },
            overflowX: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>
                  <strong>Invoice ID</strong>
                </TableCell>
                <TableCell sx={headerCellStyle}>
                  <strong>Date</strong>
                </TableCell>
                <TableCell sx={headerCellStyle}>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell sx={headerCellStyle}>
                  <strong>Status</strong>
                </TableCell>
                <TableCell sx={headerCellStyle}>
                  <strong>View History</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ backgroundColor: '#fff' }}>
              {combined.length > 0 ? (
                combined.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell sx={tableCellStyle}>{entry.id}</TableCell>
                    <TableCell sx={tableCellStyle}>{entry.date}</TableCell>
                    <TableCell sx={tableCellStyle}>{entry.amount}</TableCell>
                    <TableCell sx={tableCellStyle}>
                      <StatusChip status={entry.status} />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      {entry.invoiceUrl !== '/' ? (
                        <Link
                          href={entry.invoiceUrl}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                        >
                          Download PDF
                        </Link>
                      ) : (
                        '/'
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No billing records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BillingHistorySection;
