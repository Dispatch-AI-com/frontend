'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 16px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 32px 0;
`;

const LogoContainer = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #060606;
  margin: 0 0 16px 0;

  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 32px 0;
  max-width: 500px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #060606;
  color: #fff;
  padding: 12px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #060606;
  color: #060606;
  background-color: transparent;
  padding: 12px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: #333;
    color: #333;
    background-color: rgba(6, 6, 6, 0.04);
  }
`;

const SupportContainer = styled.div`
  margin-top: 48px;
  text-align: center;
`;

const SupportText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

const SupportLink = styled(Link)`
  color: #060606;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <MainContainer>
        <LogoContainer>
          <Image
            src="/logo.svg"
            alt="DispatchAI"
            width={150}
            height={36}
            priority
          />
        </LogoContainer>

        <Title>404</Title>

        <Subtitle>Page Not Found</Subtitle>

        <Description>
          Sorry, we couldn't find the page you're looking for. The page may have
          been moved, deleted, or the URL might be incorrect.
        </Description>

        <ButtonContainer>
          <PrimaryButton href="/">Go Home</PrimaryButton>

          <SecondaryButton href="/admin/overview">
            Go to Dashboard
          </SecondaryButton>
        </ButtonContainer>

        <SupportContainer>
          <SupportText>
            Need help?{' '}
            <SupportLink href="mailto:support@dispatchai.com">
              Contact Support
            </SupportLink>
          </SupportText>
        </SupportContainer>
      </MainContainer>
    </Container>
  );
}
