'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background: linear-gradient(to bottom, #effbf5, #fff 100%);
  padding: 0 24px;
`;

const ContentBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 48px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #060606;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
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

const InfoContainer = styled.div`
  margin-top: 32px;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

export default function AdminNotFound() {
  return (
    <Container>
      <ContentBox>
        <Title>404</Title>

        <Subtitle>Admin Page Not Found</Subtitle>

        <Description>
          The admin page you're looking for doesn't exist or may have been
          moved.
        </Description>

        <ButtonContainer>
          <PrimaryButton href="/admin/overview">Go to Overview</PrimaryButton>

          <SecondaryButton href="/admin/inbox">Go to Inbox</SecondaryButton>
        </ButtonContainer>

        <InfoContainer>
          <InfoText>
            Available pages: Overview, Inbox, Service, Billing, Settings
          </InfoText>
        </InfoContainer>
      </ContentBox>
    </Container>
  );
}
