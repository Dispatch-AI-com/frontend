import { Box, Button, Container, Typography, TextField, Alert } from '@mui/material'
import axios, { AxiosError } from 'axios'
import React from 'react'

export default function SignUp() {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')
    const [status, setStatus] = React.useState<boolean>(true)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log('Form submit triggered')
      e.preventDefault()

      const userData = {
       name,
       password,
       email,
      }
      interface NestErrorResponse {
        statusCode: number;
        message: string | string[];
        error: string;
      }
      try{
          const response = await axios.post('http://localhost:3000/auth/signup', userData, {
            withCredentials: true,
          })
        console.log(response.data);
        alert('User Created Successfully')

      } catch (error) {
        const axiosError = error as AxiosError<NestErrorResponse>;
        console.error('User Created Failure:', axiosError.response?.data.statusCode, axiosError.response?.data.message);
        setError(axiosError.response?.data.message as string)
        setStatus(false)
        setName('')
        setEmail('')
        setPassword('')
      }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Container maxWidth="xs" sx={{ my: 4, textAlign: 'center', display:'flex' , flexDirection:'column', gap:2 }}>
                <Typography variant="h4" component='h1' align="center" gutterBottom sx={{ fontWeight: 'bold', letterSpacing:'0.1em', color: '#716a68',textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', mb: 3 }}>
                  Sign Up
                </Typography>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                fullWidth
              />
              {status ||<Alert severity="error">{error}</Alert>}
              <Box sx={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
               <Button type='submit' variant='outlined' size='small'>Submit</Button>
               <Button variant='outlined' href='#contained-buttons' size='small' onClick={() => {
                  setName('')
                  setEmail('')
                  setPassword('')
               }}>Reset</Button>
              </Box>
            </Container>
        </form>
    </div>
  )
}
