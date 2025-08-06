'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

const IconWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
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

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#fafafa',
          visibility: 'hidden',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <PageContainer>
      <FormContainer as={RelativeContainer}>
        <LogoContainer>
          <IconWrapper>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h20v20H0z" />
                  <path
                    d="M12.47 3.47a.75.75 0 0 1 1.06 1.06L8.061 10l5.47 5.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6z"
                    fill="#060606"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            </button>
          </IconWrapper>
          <LogoImageWrapper>
            <Image src="/logo.svg" alt="Logo" width={200} height={100} />
          </LogoImageWrapper>
        </LogoContainer>
        <SignupForm />
      </FormContainer>
    </PageContainer>
  );
}
