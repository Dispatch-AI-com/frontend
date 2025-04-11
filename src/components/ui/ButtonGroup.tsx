import { Box, Button } from '@mui/material'
import React from 'react'

export default function ButtonGroup({onReset}:{onReset: () => void}) {
  return (
    <Box sx={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      <Button type='submit' variant='outlined' size='small'>Submit</Button>
      <Button variant='outlined' href='#contained-buttons' size='small' onClick={onReset}>Reset</Button>
    </Box>
  )
}
