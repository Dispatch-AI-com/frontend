'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

const rows = [
  {
    diy: 'Busy or phone off at night',
    ai: '24/7 automatic answering',
  },
  {
    diy: 'Paper notes can get lost',
    ai: 'Automatic archiving',
  },
  {
    diy: 'Personally texting/calling for payment',
    ai: 'Automatic reminders',
  },
  {
    diy: 'Might miss urgent calls',
    ai: 'Red alert for high priority',
  },
];

const OuterBox = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  background: '#fff',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(32),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(16),
  },
  '&.mb6': {
    marginBottom: theme.spacing(6),
  },
}));

const TableRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  borderBottom: '1px solid #a8f574',
  minHeight: 72,
  gridTemplateColumns: 'repeat(2, 400px)',
  background: '#ffffff',
  [theme.breakpoints.down(800)]: {
    gridTemplateColumns: '1fr',
  },
  '&.header': {
    background: '#ffffff',
    borderBottom: '1px solid #a8f574',
    gridTemplateColumns: 'repeat(2, 400px)',
    [theme.breakpoints.down(800)]: {
      gridTemplateColumns: '1fr',
    },
  },
  '&.diy, &.ai': {
    background: '#ffffff',
    borderBottom: '1px solid #a8f574',
    gridTemplateColumns: '1fr',
  },
  '&.even': {
    background: '#e5fcd6',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const TableCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: 16,
  color: '#222',
  width: '100%',
  wordBreak: 'break-word',
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  '&.center': {
    justifyContent: 'center',
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1.5),
    width: '100%',
  },
}));

const IconText = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export default function FeaturersComparison() {
  const isSmall = useMediaQuery('(max-width:800px)');

  return (
    <OuterBox>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, mt: 24 }}>
        DIY vs AI Assistant
      </Typography>
      {isSmall ? (
        <Box>
          {/* DIY 单独表格 */}
          <TableContainer className="mb6">
            <TableRow className="diy">
              <TableCell className="center">
                <Typography variant="h3">DIY</Typography>
              </TableCell>
            </TableRow>
            {rows.map((row, idx) => (
              <TableRow
                className={`diy${idx % 2 === 1 ? ' even' : ''}`}
                key={idx}
              >
                <TableCell>
                  <IconText>
                    <Image
                      src="/features/arrow.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      style={{ marginRight: 16 }}
                    />
                    <Typography variant="body1">{row.diy}</Typography>
                  </IconText>
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
          {/* AI Assistant 单独表格 */}
          <TableContainer>
            <TableRow className="ai">
              <TableCell className="center">
                <Typography variant="h3">AI Assistant</Typography>
              </TableCell>
            </TableRow>
            {rows.map((row, idx) => (
              <TableRow
                className={`ai${idx % 2 === 1 ? ' even' : ''}`}
                key={idx}
              >
                <TableCell>
                  <IconText>
                    <Image
                      src="/features/tick.svg"
                      alt="tick"
                      width={20}
                      height={20}
                      style={{ marginRight: 16 }}
                    />
                    <Typography variant="body1">{row.ai}</Typography>
                  </IconText>
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        </Box>
      ) : (
        <TableContainer>
          <TableRow className="header">
            <TableCell className="center">
              <Typography variant="h3">DIY</Typography>
            </TableCell>
            <TableCell className="center">
              <Typography variant="h3">AI Assistant</Typography>
            </TableCell>
          </TableRow>
          {rows.map((row, idx) => (
            <TableRow className={idx % 2 === 1 ? 'even' : ''} key={idx}>
              <TableCell>
                <IconText>
                  <Image
                    src="/features/arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    style={{ marginRight: 16 }}
                  />
                  <Typography variant="body1">{row.diy}</Typography>
                </IconText>
              </TableCell>
              <TableCell>
                <IconText>
                  <Image
                    src="/features/tick.svg"
                    alt=""
                    width={20}
                    height={20}
                    style={{ marginRight: 16 }}
                  />
                  <Typography variant="body1">{row.ai}</Typography>
                </IconText>
              </TableCell>
            </TableRow>
          ))}
        </TableContainer>
      )}
    </OuterBox>
  );
}
