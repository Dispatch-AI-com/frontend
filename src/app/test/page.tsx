'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface HealthResponse {
  message: string;
}

export default function TestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get<HealthResponse>('http://uat.dispatchai.click/api/health/niubi')
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
