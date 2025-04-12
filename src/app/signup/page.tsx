import { Container, Typography, Box } from '@mui/material'
import SignUpForm from '../../components/features/signup/SignUpForm'

export default function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  )
}
