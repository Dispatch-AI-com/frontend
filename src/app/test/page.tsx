'use client';

import { useEffect, useState } from 'react';

import api from '@/lib/api';

interface HealthResponse {
  message: string;
}

export default function TestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get<HealthResponse>('/health/niubi')
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.error('❌ Request failed:', error);
        setMessage('connection failed');
      });
  }, []);

  return <div>{message}</div>;
}