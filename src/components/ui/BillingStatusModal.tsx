'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CommonButton from '@/components/ui/CommonButton';

const ModalWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const SuccessCard = styled('div')({
  width: 400,
  height: 296,
  padding: 24,
  borderRadius: 24,
  backgroundColor: '#fff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
});

const IconWrapper = styled(Box)({
  width: 60,
  height: 60,
  marginTop: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
});

const BtnContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 48,
});

interface BillingStatusModalProps {
  open: boolean;
  onClose: () => void;
  status: 'success' | 'failure';
  title?: string;
  message?: string;
  buttonText?: string;
  redirectUrl?: string;
}

const BillingStatusModal: React.FC<BillingStatusModalProps> = ({
  open,
  onClose,
  status,
  title,
  message,
  buttonText = 'Back to Billing',
  redirectUrl = '/admin/billing',
}) => {
  const router = useRouter();

  const iconSrc =
    status === 'success'
      ? '/plan/billingsuccess.svg'
      : '/plan/billingfailed.svg';

  const defaultTitle =
    status === 'success' ? 'Payment successful!' : 'Payment failed!';
  const defaultMessage =
    status === 'success'
      ? 'Thank you for your payment. Your subscription is now active.'
      : 'Please try again.';

  const handleClose = () => {
    onClose();
    router.push(redirectUrl);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      disableEnforceFocus
      disableAutoFocus
      sx={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    >
      <ModalWrapper>
        <SuccessCard>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 12, right: 12 }}
          >
            <CloseIcon />
          </IconButton>

          <IconWrapper>
            <Image src={iconSrc} alt={status} width={60} height={60} />
          </IconWrapper>

          <Typography variant="h6" mt={2}>
            {title ?? defaultTitle}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {message ?? defaultMessage}
          </Typography>

          <BtnContainer>
            <CommonButton onClick={handleClose} sx={{ width: 200, height: 40 }}>
              {buttonText}
            </CommonButton>
          </BtnContainer>
        </SuccessCard>
      </ModalWrapper>
    </Modal>
  );
};

export default BillingStatusModal;
