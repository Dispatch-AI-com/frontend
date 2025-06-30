'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import QRCode from 'react-qr-code';

import CommonButton from '@/components/ui/CommonButton';
import { useGetCompanyByUserIdQuery } from '@/features/company/companyApi';
import { useAppSelector } from '@/redux/hooks';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 456,
  minHeight: 400,
  backgroundColor: '#fff',
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    minWidth: 0,
    padding: 12,
  },
}));

const Header = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
});

const Title = styled(Typography)({
  fontSize: 18,
  fontWeight: 'bold',
});

const Description = styled(Typography)({
  fontSize: 14,
  color: '#616161',
  marginBottom: 16,
  alignSelf: 'flex-start',
});

const ButtonRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 16,
  marginTop: 'auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
    alignItems: 'stretch',
  },
}));

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onManualSetup: () => void;
}

export default function QrCodeModal({
  open,
  onClose,
  onSuccess,
  onManualSetup,
}: QrCodeModalProps) {
  const user = useAppSelector(state => state.auth.user);
  const { data: company } = useGetCompanyByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  const dispatchNumber = company?.number ?? '*********';
  const qrDispatchNumber = '+61' + dispatchNumber.replace(/^0+/, '');
  const qrValue = `*004*${qrDispatchNumber}#`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="qr-modal-title"
      aria-describedby="qr-modal-description"
    >
      <ModalBox>
        <Header>
          <Title id="qr-modal-title">Start Instant Setup</Title>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Header>

        <Description id="qr-modal-description" sx={{ width: '100%' }}>
          Scan the QR code on the phone you want to connect.
        </Description>

        <Box mt={2} mb={2}>
          <QRCode value={qrValue} size={160} />
        </Box>

        <ButtonRow>
          <CommonButton
            sx={{
              width: '100%',
              height: 40,
              padding: '10px 97px',
              borderRadius: 1,
              background: '#060606',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.43,
              color: '#fff',
              '&:hover': { background: '#060606' },
            }}
            onClick={onSuccess}
          >
            It worked!
          </CommonButton>
          <CommonButton
            sx={{
              width: '100%',
              height: 40,
              padding: '10px 17px',
              borderRadius: 1,
              background: '#d5d5d5',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.43,
              color: '#060606',
              '&:hover': { background: '#bdbdbd' },
            }}
            onClick={onManualSetup}
          >
            Manual setup
          </CommonButton>
        </ButtonRow>
      </ModalBox>
    </Modal>
  );
}
