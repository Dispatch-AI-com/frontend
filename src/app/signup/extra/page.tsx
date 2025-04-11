'use client';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SignupExtraPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    jobTitle: '',
    callVolume: '',
    projectDesc: '',
    phone: '',
    country: 'Australia',
    location: '',
    receiveExtra: false,
    agree: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const firstName = sessionStorage.getItem('firstName') || '';
    const lastName = sessionStorage.getItem('lastName') || '';
    const email = sessionStorage.getItem('email') || '';
    const password = sessionStorage.getItem('password') || '';
    setForm((prev) => ({ ...prev, firstName, lastName, email, password }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: SelectChangeEvent, field: string) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleCountryChange = (country: string) => {
    const dialMap: { [key: string]: string } = {
      Australia: '+61',
      'United States': '+1',
      China: '+86',
    };
    setForm((prev) => ({
      ...prev,
      country,
      phone: dialMap[country] || '',
    }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.company) newErrors.company = 'Company name is required';
    if (!form.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!form.callVolume) newErrors.callVolume = 'Call volume is required';
    if (!form.phone) newErrors.phone = 'Phone number is required';
    if (!form.location) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
    };

    console.log('Sending signup body:', body);

    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const error = await res.json();
        alert(error.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server');
    }
  };

  return (
    <Box bgcolor="#fafafa" minHeight="100vh" py={6} display="flex" justifyContent="center">
      <Box maxWidth={500} width="100%" px={3} py={4} boxShadow={3} borderRadius={3} bgcolor="#fff">
        <Box display="flex" justifyContent="center" mb={3}>
          <Image src="/logo.svg" alt="DispatchAI Logo" width={100} height={40} />
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={2}>
            <Box flex={1}>
              <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
                First Name
              </Typography>
              <TextField
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
                Last Name
              </Typography>
              <TextField
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
          </Box>

          {[['Work email address', 'email'], ['Company name', 'company'], ['Job title', 'jobTitle']].map(([label, name]) => (
            <Box key={name} mb={2}>
              <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
                {label}
              </Typography>
              <TextField
                name={name}
                value={form[name as keyof typeof form] as string}
                onChange={handleChange}
                placeholder={label === 'Work email address' ? 'Email address' : label}
                fullWidth
                error={!!errors[name]}
                helperText={errors[name]}
              />
            </Box>
          ))}

          <Box mb={2}>
            <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
              What is your call volume per year?
            </Typography>
            <FormControl fullWidth>
              <Select
                value={form.callVolume}
                onChange={(e) => handleSelect(e, 'callVolume')}
                displayEmpty
              >
                <MenuItem value="">Please Select</MenuItem>
                <MenuItem value="<1000">Less than 1,000</MenuItem>
                <MenuItem value="1000-5000">1,000 - 5,000</MenuItem>
                <MenuItem value=">5000">More than 5,000</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
              What else can you tell us about your project?
            </Typography>
            <TextField
              name="projectDesc"
              value={form.projectDesc}
              onChange={handleChange}
              placeholder="Fill in"
              fullWidth
              multiline
              minRows={3}
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
              What’s your phone number?
            </Typography>
            <Box display="flex" gap={1}>
              <FormControl sx={{ width: '40%' }}>
                <Select
                  value={form.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ width: '60%' }}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+61"
              />
            </Box>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" fontWeight="medium" color="text.primary" mb={0.5}>
              Where are you located?
            </Typography>
            <FormControl fullWidth>
              <Select
                value={form.location}
                onChange={(e) => handleSelect(e, 'location')}
                displayEmpty
              >
                <MenuItem value="">Please Select</MenuItem>
                <MenuItem value="Australia / Sydney">Australia / Sydney</MenuItem>
                <MenuItem value="USA / New York">USA / New York</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={form.receiveExtra}
                onChange={handleCheckbox}
                name="receiveExtra"
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: '#74D35D',
                  },
                }}
              />
            }
            label={<Typography color="text.primary">I agree to receive other communications from SmartAgent</Typography>}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.agree}
                onChange={handleCheckbox}
                name="agree"
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: '#74D35D',
                  },
                }}
              />
            }
            label={<Typography color="text.primary">By submitting this form, you agree to SmartAgent storing and processing your data.</Typography>}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: 'black', borderRadius: 2, fontWeight: 600 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
