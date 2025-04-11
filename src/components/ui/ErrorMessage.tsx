import { Alert } from '@mui/material';
import React from 'react';


export default function ErrorMessage({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}