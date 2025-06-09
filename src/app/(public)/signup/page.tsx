'use client';

import Image from 'next/image';
import styled from 'styled-components';

import SignupForm from '@/app/(public)/signup/component/SignupForm';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 32px 16px;

  @media (max-width: 768px) {
    padding: 16px 8px;
  }

  @media (min-width: 1024px) {
    padding: 132px 16px 32px;
  }
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 40px 100px;
  border-radius: 24px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.03);
  background-color: white;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

export default function SignupPage() {
  return (
    <PageContainer>
      <FormContainer>
        <LogoContainer>
          <Image src="/logo.svg" alt="Logo" width={200} height={100} />
        </LogoContainer>
        <SignupForm />
      </FormContainer>
    </PageContainer>
  );
}
