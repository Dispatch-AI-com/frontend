import { Box, Typography, TextField, Checkbox, FormControlLabel, Alert } from '@mui/material'
import React, { useState } from 'react'

interface SignUpFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Made optional
    formData: {
        name: string;
        email: string;
        password: string;
    };
    error?: string | null;
    success?: string | null;
}

export default function SignUpForm({ onSubmit, onChange, formData: initialFormData, error, success }: SignUpFormProps): React.ReactElement {
    // Add local state to handle form data when no onChange is provided
    const [localFormData, setLocalFormData] = useState(initialFormData);

    // Use either parent-controlled data or local data
    const formData = onChange ? initialFormData : localFormData;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
            onChange(e);
        } else {
            // Update local state when no parent handler exists
            const { name, value } = e.target;
            setLocalFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    <Typography variant="subtitle1" component="label" htmlFor="name" sx={{ fontWeight: 'bold' }}>
                        Name
                    </Typography>
                    <TextField
                        id='name'
                        label="Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Typography variant="subtitle1" component="label" htmlFor="email" sx={{ fontWeight: 'bold' }}>
                        Email Address
                    </Typography>
                    <TextField
                        id='email'
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Typography variant="subtitle1" component="label" htmlFor="password" sx={{ fontWeight: 'bold' }}>
                        Password
                    </Typography>
                    <TextField
                        id='password'
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox required />}
                        label="I agree to the Terms of Service and Privacy Policy."
                    />
                </Box>
            </form>
        </>
    )
}