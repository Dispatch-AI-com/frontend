'use client';

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';
import { useGetCompanyByUserIdQuery } from '@/features/company/companyApi';
import { useAppSelector } from '@/redux/hooks';

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  color: '#060606',
  marginBottom: '32px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    marginBottom: '24px',
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  color: '#060606',
  width: '100%',
  maxWidth: '678px',
  textAlign: 'left',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: '12px',
    padding: '0 16px',
  },
}));

const NumberBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '678px',
  height: '44px',
  margin: '12px 0 20px 0',
  padding: '14px 20px',
  borderRadius: '16px',
  backgroundColor: '#e5fcd5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '40px',
    margin: '8px 16px 16px 16px',
    padding: '12px 16px',
    borderRadius: '12px',
  },
}));

const DispatchNumber = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  color: '#060606',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
  },
}));

const DescText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  color: '#060606',
  maxWidth: '678px',
  margin: '0 auto 48px auto',
  lineHeight: 1.5,
  textAlign: 'left',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    margin: '0 16px 32px 16px',
    lineHeight: 1.4,
  },
}));

const AltLinkBox = styled(Box)(({ theme }) => ({
  marginTop: '24px',
  textAlign: 'center',
  padding: '0 16px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
  },
}));

const AltText = styled('span')(({ theme }) => ({
  color: '#6d6d6d',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
  },
}));

const PortalLink = styled('a')(({ theme }) => ({
  fontWeight: 700,
  color: '#060606',
  textDecoration: 'underline',
  textDecorationThickness: '2px',
  cursor: 'pointer',
  transition: 'color 0.2s',
  marginLeft: 4,
  '&:hover': {
    color: '#1976d2',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '16px',
  marginTop: 0,
  marginBottom: '24px',
  width: '100%',
  maxWidth: '678px',
  padding: '0 16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
}));

const StyledButton = styled(CommonButton)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    maxWidth: '280px',
  },
}));

interface TroubleshootingProps {
  onBack: () => void;
  onGoToGuide: () => void;
}

export default function Troubleshooting({
  onBack,
  onGoToGuide,
}: TroubleshootingProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAppSelector(state => state.auth.user);

  const {
    data: company,
    isLoading,
    error,
  } = useGetCompanyByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  const dispatchNumber = company?.number ?? '*********';
  const handleCopy = () => {
    navigator.clipboard.writeText(dispatchNumber).catch(() => {
      // Silent fail for copy operation
    });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        sx={{
          width: '100%',
          maxWidth: '678px',
          px: isMobile ? 2 : 0,
        }}
      >
        <Text>Loading company information...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        sx={{
          width: '100%',
          maxWidth: '678px',
          px: isMobile ? 2 : 0,
        }}
      >
        <Text>Error: Failed to get company information</Text>
        <Text>Using default Dispatch number: *********</Text>
        <NumberBox>
          <DispatchNumber>*********</DispatchNumber>
          <Box ml={1}>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{ p: 0, ml: '8px' }}
            >
              <Image
                src="/dashboard/ai-setup/copy.svg"
                width={16}
                height={16}
                alt="copy"
              />
            </IconButton>
          </Box>
        </NumberBox>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        maxWidth: '678px',
        px: isMobile ? 2 : 0,
        height: '100%',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <Title>Troubleshooting</Title>

      <Text sx={{ marginBottom: '4px' }}>
        You'll need your "Dispatch number" below.
      </Text>

      <NumberBox>
        <DispatchNumber>{dispatchNumber}</DispatchNumber>
        <Box ml={1}>
          <IconButton
            onClick={handleCopy}
            size="small"
            sx={{ p: 0, ml: '8px' }}
          >
            <Image
              src="/dashboard/ai-setup/copy.svg"
              width={16}
              height={16}
              alt="copy"
            />
          </IconButton>
        </Box>
      </NumberBox>

      <DescText>
        We can help troubleshoot the most common issues with call forwarding.
        Please follow our troubleshooting steps in our troubleshooting guide
        below.
      </DescText>

      <ButtonContainer>
        <StyledButton
          sx={{
            width: isMobile ? '100%' : 88,
            height: 40,
            borderRadius: 1,
            background: '#fff',
            color: '#060606',
            border: '1px solid #bbb',
            boxShadow: 'none',
            padding: '12px 16px',
            '&:hover': { background: '#fafafa' },
          }}
          onClick={onBack}
        >
          ← Back
        </StyledButton>
        <StyledButton
          sx={{
            width: isMobile ? '100%' : 216,
            height: 40,
            borderRadius: 1,
            background: '#060606',
            color: '#ffffff',
            padding: '10px 20px',
            '&:hover': { background: '#202020' },
          }}
          onClick={onGoToGuide}
        >
          Go to troubleshooting guide
        </StyledButton>
      </ButtonContainer>

      <AltLinkBox>
        <AltText>Alternatively, continue </AltText>
        <PortalLink
          href="https://dispatch-portal.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          to the Dispatch Portal
        </PortalLink>
      </AltLinkBox>
    </Box>
  );
}
