'use client';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import type { Category } from './FAQData';
import { CATEGORIES } from './FAQData';

/* ----------------------------- styled parts ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 2),
  backgroundColor: theme.palette.background.default,
}));

const TocTitle = styled(Typography)({ fontWeight: 700, marginLeft: 16 });

const TocItem = styled(ListItemButton)(() => ({
  borderRadius: 4,
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: '#58c112',
    fontWeight: 700,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none',
  borderRadius: 0,
  backgroundColor: 'transparent',
  '&:before': { display: 'none' },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '&.Mui-expanded': {
    backgroundColor: theme.palette.grey[50],
  },
}));

const ICON_GAP = 2;
const ICON_SPACE = ICON_GAP + 6;

const StyledSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  minHeight: 0,
  flexDirection: 'row-reverse',
  columnGap: theme.spacing(ICON_GAP),
  '& .MuiAccordionSummary-expandIconWrapper': {
    margin: 0,
    transform: 'rotate(90deg)',
    transition: 'transform 0.2s',
  },
  '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': { margin: 0 },
}));

const StyledDetails = styled(AccordionDetails)(({ theme }) => ({
  paddingTop: 0,
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(ICON_SPACE),
}));

/* ------------------------------- component ------------------------------ */
export default function QASection({
  data = CATEGORIES,
}: {
  data?: Category[];
}) {
  const [catIndex, setCatIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const active = data[catIndex];

  return (
    <Section>
      <Typography
        textAlign="center"
        fontSize={24}
        fontWeight={700}
        gutterBottom
      >
        FAQ Section
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        maxWidth={560}
        mx="auto"
        mb={8}
      >
        We've gathered the most frequently asked questions from our users.
      </Typography>

      <Grid container spacing={8} justifyContent="center" alignItems="stretch">
        {/* Table of contents */}
        <Grid item xs={12} md={4} lg={3}>
          <TocTitle fontSize={18} gutterBottom>
            Table of Contents
          </TocTitle>
          <List disablePadding sx={{ flex: 1 }}>
            {data.map((cat, idx) => (
              <TocItem
                key={cat.key}
                selected={idx === catIndex}
                onClick={() => {
                  setCatIndex(idx);
                  setOpenIndex(0);
                }}
              >
                <ListItemText primary={cat.title} />
              </TocItem>
            ))}
          </List>
        </Grid>

        {/* FAQ list */}
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {active.faqs.length === 0 && (
            <Typography variant="body2">No questions yet.</Typography>
          )}

          {active.faqs.map((faq, i) => (
            <StyledAccordion
              key={i}
              disableGutters
              expanded={openIndex === i}
              onChange={() => setOpenIndex(openIndex === i ? -1 : i)}
            >
              <StyledSummary
                expandIcon={
                  openIndex === i ? <RemoveRoundedIcon /> : <AddRoundedIcon />
                }
              >
                <Typography fontWeight={700} fontSize={18}>
                  {faq.q}
                </Typography>
              </StyledSummary>
              <StyledDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.a}
                </Typography>
              </StyledDetails>
            </StyledAccordion>
          ))}
        </Grid>
      </Grid>
    </Section>
  );
}
