'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import ResetPasswordForm from './components/ResetPasswordForm';

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

const TopRightWrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 80px;
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
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

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <TopRightWrapper>
        <BackButton onClick={() => router.back()}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h16v16H0z" />
              <path
                d="M6.424 3.576a.6.6 0 0 1 0 .848L3.448 7.4H14a.6.6 0 0 1 0 1.2H3.448l2.976 2.976a.6.6 0 0 1 .07.765l-.07.083a.6.6 0 0 1-.848 0l-4-4-.06-.07a.602.602 0 0 1-.006-.008l.066.078A.602.602 0 0 1 1.4 8v-.027l.004-.042L1.4 8a.602.602 0 0 1 .176-.424l4-4a.6.6 0 0 1 .848 0z"
                fill="#5A5A5A"
                fillRule="nonzero"
              />
            </g>
          </svg>
          Back
        </BackButton>
      </TopRightWrapper>
      <FormContainer>
        <LogoContainer>
          <LogoImageWrapper>
            <Image src="/logo.svg" alt="Logo" width={200} height={100} />
          </LogoImageWrapper>
        </LogoContainer>
        <Title>Reset Your Password</Title>
        <ResetPasswordForm />
      </FormContainer>
    </PageContainer>
  );
}
