import { Box, Button } from '@mui/material'
import React from 'react'
import { useSignup } from '../../../../hooks/signup/useSignup' // Import the signup hook

export default function SignupButton(): React.ReactElement {
    const { handleSubmit } = useSignup() // Get the submit function from the hook

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
            <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' }, padding: '12px 24px', borderRadius: '12px' }}
            >
                Signup
            </Button>
        </Box>
    )
}