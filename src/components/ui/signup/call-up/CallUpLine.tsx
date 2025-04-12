import { Typography } from '@mui/material'
import React from 'react'

export default function CallUpLine(): React.ReactElement {
return (
    <>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontStyle: 'italic'}}>
            Dispatch AI
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Get Started With Smart Agent!
        </Typography>
        <Typography component="p" gutterBottom sx={{ textAlign: 'center'}}>
            Enter your credintials to access your account.
        </Typography>
    </>
)
}

