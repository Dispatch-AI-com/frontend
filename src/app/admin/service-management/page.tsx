'use client';

import styled from 'styled-components';

import ServiceManagementContent from '@/features/service-management/components/ServiceManagementContent';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f8faf7;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

export default function ServiceManagementPage() {
  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          <ServiceManagementContent />
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}
