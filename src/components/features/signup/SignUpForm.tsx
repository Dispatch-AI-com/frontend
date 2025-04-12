'use client'

import { useState } from 'react'
import { Box, TextField, Button, Alert } from '@mui/material'
import axios from 'axios'

const SignUpForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const res = await axios.post('/auth/signup', form)
        console.log('✅ Success response:', res)
        setMessage(res.data.message)
        setError('')
      } catch (err: any) {
        console.error('❌ Error submitting sign up form:', err)
    
        // 如果是 axios 错误，尝试读取 response.message
        if (axios.isAxiosError(err)) {
          console.error('📦 Axios error response:', err.response)
          console.error('📦 Axios error message:', err.message)
        }
    
        setError(err.response?.data?.message || err.message || 'Sign up failed')
        setMessage('')
      }
    }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Register
      </Button>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  )
}

export default SignUpForm;
