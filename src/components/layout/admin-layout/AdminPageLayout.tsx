'use client';

import { Box, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import styled from 'styled-components';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import theme from '@/theme';

/**
 * Standardized layout for all admin pages
 * Handles sidebar spacing, consistent styling, and responsive design
 */

interface AdminPageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  padding?: 'normal' | 'compact' | 'none';
  background?: 'gradient' | 'solid' | 'transparent';
  maxWidth?: string | number;
}

// Main page container
const PageContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #effbf5, #fff 100%);
  flex: 1;
  position: relative;
  z-index: 1001;
  margin-left: 0;

  /* Sidebar spacing - consistent across all admin pages */
  ${theme.breakpoints.up('sm')} {
    margin-left: 50px;
  }

  ${theme.breakpoints.up('md')} {
    margin-left: 240px;
  }
`;

// Content wrapper with standardized styling
const ContentWrapper = styled(Box)<{
  $padding: 'normal' | 'compact' | 'none';
  $background: 'gradient' | 'solid' | 'transparent';
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.$background === 'transparent'
      ? 'transparent'
      : props.$background === 'gradient'
        ? 'linear-gradient(135deg, #fff 0%, #f8faf7 100%)'
        : '#ffffff'};
  border-radius: 20px;
  box-shadow: ${props =>
    props.$background === 'transparent'
      ? 'none'
      : '0 1px 3px rgba(0, 0, 0, 0.12)'};
  margin: 8px;
  overflow: hidden;

  /* Responsive margin adjustments */
  ${theme.breakpoints.down('sm')} {
    margin: 4px;
    border-radius: 12px;
  }

  ${theme.breakpoints.up('lg')} {
    margin: 12px;
  }
`;

// Page header with consistent typography
const PageHeader = styled(Box)<{ $padding: 'normal' | 'compact' | 'none' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  padding: ${props =>
    props.$padding === 'compact'
      ? '0 24px'
      : props.$padding === 'none'
        ? '0'
        : '0 32px'};
  border-bottom: 1px solid #eaeaea;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);

  ${theme.breakpoints.down('sm')} {
    padding: ${props =>
      props.$padding === 'compact'
        ? '12px 16px'
        : props.$padding === 'none'
          ? '0'
          : '12px 20px'};
    flex-direction: column;
    align-items: center;
    gap: 12px;
    height: auto;
    min-height: 75px;
  }
`;

const HeaderContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PageTitle = styled(Typography)`
  && {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #060606;
    line-height: 22px;
    margin: 0;

    ${theme.breakpoints.down('sm')} {
      font-size: 18px;
      line-height: 22px;
      padding: 8px;
    }
  }
`;

const HeaderActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;

  ${theme.breakpoints.down('sm')} {
    width: 100%;
    justify-content: center;
  }
`;

// Main content area with consistent padding
const MainContent = styled(Box)<{
  $padding: 'normal' | 'compact' | 'none';
  $maxWidth?: string | number;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  max-width: ${props => props.$maxWidth ?? 'none'};
  margin: ${props => (props.$maxWidth ? '0 auto' : '0')};
  width: 100%;
  box-sizing: border-box;
`;

export default function AdminPageLayout({
  children,
  title,
  subtitle,
  headerActions,
  padding = 'normal',
  background = 'solid',
  maxWidth,
}: AdminPageLayoutProps) {
  const showHeader = Boolean(title ?? subtitle ?? headerActions);

  return (
    <Box display="flex" boxSizing="border-box" overflow-x="auto">
      <Sidebar />
      <PageContainer>
        <ContentWrapper $padding={padding} $background={background}>
          {showHeader && (
            <PageHeader $padding={padding}>
              <HeaderContent>
                {title && <PageTitle>{title}</PageTitle>}
              </HeaderContent>
              {headerActions && <HeaderActions>{headerActions}</HeaderActions>}
            </PageHeader>
          )}
          <MainContent $padding={padding} $maxWidth={maxWidth}>
            {children}
          </MainContent>
        </ContentWrapper>
      </PageContainer>
    </Box>
  );
}

// Export styled components for advanced customization
export { ContentWrapper, MainContent, PageContainer, PageHeader, PageTitle };
