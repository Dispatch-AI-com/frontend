'use client';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import type { Theme } from '@mui/material';
import {
  Button,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';

import theme from '@/theme';

/* -------------------------- styled components -------------------------- */

const Wrapper = styled('section')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(12),
  marginBottom: theme.spacing(18),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(17),
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(10),
    marginBottom: theme.spacing(4),
  },
  backgroundImage: `
    linear-gradient(
      180deg,
      #f8fff3 0%,
      #f8fff3 10%,
      rgba(248,255,243,0.4) 40%,
      rgba(248,255,243,0) 60%,
      #ffffff 100%
    )
  `,
}));

const BulletIcon = () => (
  <Stack
    alignItems="center"
    justifyContent="center"
    sx={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: '#060606',
      mr: { xs: 1, sm: 0 },
    }}
  >
    <CheckRoundedIcon sx={{ fontSize: 14, color: '#a8f574' }} />
  </Stack>
);

const BulletItem = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const BulletsRow = styled(Stack)({
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: 40,
});

const CtaButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 700,
  fontSize: 16,
  backgroundColor: '#a8f574',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#9be45e',
    boxShadow: 'none',
  },
}));

/* -------------------------------- component --------------------------- */

export default function HeroSection() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Wrapper>
      <Stack alignItems="center">
        <Typography
          sx={{
            fontSize: isMobile ? 28 : 38,
            fontWeight: 900,
            WebkitTextStroke: { xs: '0.8px black', sm: '0px' },
          }}
        >
          Your 24/7 Phone Assistant
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? 28 : 38,
            fontWeight: 900,
            WebkitTextStroke: { xs: '0.8px black', sm: '0px' },
            mx: 6,
          }}
        >
          Let AI handle your business calls while you focus on growth
        </Typography>

        {/* bullets */}
        <BulletsRow
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 4 }}
        >
          {[
            'Never Miss a Call',
            'Auto‑Handle Paperwork',
            'Works While You Sleep',
          ].map(label => (
            <BulletItem key={label}>
              <BulletIcon />
              <Typography variant="subtitle1">{label}</Typography>
            </BulletItem>
          ))}
        </BulletsRow>

        {/* CTA */}
        <CtaButton
          endIcon={<ArrowForwardRoundedIcon />}
          size="large"
          fullWidth={isMobile}
        >
          Try for Free
        </CtaButton>
      </Stack>
    </Wrapper>
  );
}
