'use client';

import { Suspense } from 'react';

import AuthCallbackContent from './AuthCallbackContent';

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fafafa',
    }}
  >
    <div
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '18px',
          color: '#666',
          margin: 0,
        }}
      >
        Loading...
      </p>
    </div>
  </div>
);

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
