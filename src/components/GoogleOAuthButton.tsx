'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import styled from 'styled-components';

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    height: 40px;
    border-radius: 12px;
    border: solid 1px #d5d5d5;
    background-color: #fff;
  }
`;

const GoogleIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #e5e7eb;
  }

  span {
    margin: 0 16px;
    color: #6b7280;
    font-size: 14px;
  }
`;

const GoogleButtonText = styled.span`
  height: 20px;
  margin-left: 12px;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #060606;
  display: inline-block;
`;

interface GoogleOAuthButtonProps {
  disabled?: boolean;
  text?: string;
}

export default function GoogleOAuthButton({
  disabled = false,
  text = 'Sign in with Google',
}: GoogleOAuthButtonProps) {
  const handleGoogleLogin = useCallback(() => {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
    window.location.href = `${backendUrl}/auth/google`;
  }, []);

  return (
    <>
      <GoogleButton
        type="button"
        onClick={handleGoogleLogin}
        disabled={disabled}
      >
        <GoogleIcon>
          <Image src="/google.svg" alt="Google" width={20} height={20} />
        </GoogleIcon>
        <GoogleButtonText>{text}</GoogleButtonText>
      </GoogleButton>
      <Divider>
        <span>OR</span>
      </Divider>
    </>
  );
}
