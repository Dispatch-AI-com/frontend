
import { Typography } from '@mui/material'
import React from 'react'

export default function FormTitle({ title }: { title: string }) {
  return (
    <Typography variant="h4" component='h1' align="center" gutterBottom sx={{ fontWeight: 'bold', letterSpacing:'0.1em', color: '#716a68',textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', mb: 3 }}>
        {title}
    </Typography>
  )
}
