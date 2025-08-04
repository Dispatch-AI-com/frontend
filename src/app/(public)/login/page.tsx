'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoginForm from '@/app/(public)/login/component/LoginForm';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 100px;
  border-radius: 24px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.03);
  background-color: white;

  @media (max-width: 600px) {
    padding: 20px;
    padding-bottom: 60px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const LogoImageWrapper = styled.div`
  width: 200px;
  height: 100px;

  @media (max-width: 600px) {
    margin-top: 32px;
    width: 105px;
    height: 25px;
  }

  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }
`;

export default function SigninPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          visibility: 'hidden',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <PageContainer>
      <FormContainer>
        <LogoContainer>
          <LogoImageWrapper>
            <Image src="/logo.svg" alt="Logo" width={200} height={100} />
          </LogoImageWrapper>
        </LogoContainer>
        <LoginForm />
      </FormContainer>
    </PageContainer>
  );
}
