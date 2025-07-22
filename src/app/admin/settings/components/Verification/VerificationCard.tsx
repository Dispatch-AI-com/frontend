import { Box, Button, Checkbox, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import theme from '@/theme';

const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafafa',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const ValueContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

const VerificationBadge = styled(Box)({
  backgroundColor: '#e7f8dc',
  color: 'black',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
});

const ColorDot = styled(Box)(({ color }: { color: string }) => ({
  width: theme.spacing(0.5),
  height: theme.spacing(0.5),
  borderRadius: '50%',
  backgroundColor: color,
}));

const VerifyButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  minWidth: 'auto',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
  marginRight: theme.spacing(1),
  alignSelf: 'flex-start',
  '&.Mui-checked': {
    color: '#58c112',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
  '&:not(.Mui-checked) .MuiSvgIcon-root': {
    color: '#e0e0e0',
    border: '1px solid #e0e0e0',
    borderRadius: 3,
  },
});

interface VerificationCardProps {
  type: string;
  mobile?: string;
  email?: string;
  showMarketingPromotions?: boolean;
  onVerifyMobile?: () => void;
  onVerifyEmail?: () => void;
  isLastCard?: boolean;
}

export default function VerificationCard({
  type,
  mobile,
  email,
  showMarketingPromotions = false,
  onVerifyMobile,
  onVerifyEmail,
  isLastCard = false,
}: VerificationCardProps) {
  const [isMobileVerifiedState, setIsMobileVerifiedState] = useState(false);
  const [isEmailVerifiedState, setIsEmailVerifiedState] = useState(false);

  const handleVerifyMobile = () => {
    setIsMobileVerifiedState(true);
    if (onVerifyMobile) {
      onVerifyMobile();
    }
  };
  const handleVerifyEmail = () => {
    setIsEmailVerifiedState(true);
    if (onVerifyEmail) {
      onVerifyEmail();
    }
  };

  return (
    <StyledCard sx={{ mb: isLastCard ? 0 : 2 }}>
      {/* Verification Type Row */}
      <InfoRow>
        <Typography variant="body2" color="text.secondary">
          Verification type:
        </Typography>
        <Typography variant="body1">{type}</Typography>
      </InfoRow>

      {/* Mobile Number Row */}
      {mobile && (
        <InfoRow sx={{ mb: email ? 2 : 0 }}>
          <Typography variant="body2" color="text.secondary">
            Mobile number:
          </Typography>
          <ValueContainer>
            <Typography variant="body1">{mobile}</Typography>
            {!isMobileVerifiedState && onVerifyMobile && (
              <VerifyButton
                variant="contained"
                size="small"
                onClick={handleVerifyMobile}
              >
                Verify
              </VerifyButton>
            )}
            {isMobileVerifiedState && (
              <VerificationBadge>
                <ColorDot color={'#58c112'} /> Verified
              </VerificationBadge>
            )}
          </ValueContainer>
        </InfoRow>
      )}

      {/* Email Address Row */}
      {email && (
        <InfoRow sx={{ mb: showMarketingPromotions ? 2 : 0 }}>
          <Typography variant="body2" color="text.secondary">
            Email address:
          </Typography>
          <ValueContainer>
            <Typography variant="body1">{email}</Typography>
            {!isEmailVerifiedState && onVerifyEmail && (
              <VerifyButton
                variant="contained"
                size="small"
                onClick={handleVerifyEmail}
              >
                Verify
              </VerifyButton>
            )}
            {isEmailVerifiedState && (
              <VerificationBadge>
                <ColorDot color={'#58c112'} /> Verified
              </VerificationBadge>
            )}
          </ValueContainer>
        </InfoRow>
      )}

      {/* Marketing Promotions Section */}
      {showMarketingPromotions && email && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StyledCheckbox style={{ margin: 0 }} size="small" />
            <Typography variant="body2">
              Receive Marketing Promotions?
            </Typography>
          </Box>
        </Box>
      )}
    </StyledCard>
  );
}
