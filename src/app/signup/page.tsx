import SignupForm from '@/app/signup/components/SignupForm';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <Box maxWidth="700px" minHeight="1318px" mx="auto" mt={2} px={5} py={2} borderRadius="24px" boxShadow="0 0 24px 0 rgba(0, 0, 0, 0.03)">
      <Box display="flex" justifyContent="center" mb={4}>
        <Image src="/logo.svg" alt="Logo" width={200} height={100} />
      </Box>
      <SignupForm />
    </Box>
  );
}
