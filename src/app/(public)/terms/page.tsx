'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(7),
  color: theme.palette.text.primary,
  minHeight: '100vh',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  width: '100%',
  padding: theme.spacing(0, 3),
  textAlign: 'left',
}));

const PageTitle = styled('h1')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontSize: theme.typography.h1.fontSize,
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h1.fontWeight,
  marginBottom: theme.spacing(6),
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h3.fontSize,
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.h3.fontWeight,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const SectionText = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
}));

const IntroText = styled('p')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
  fontStyle: 'italic',
}));

const List = styled('ul')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
}));

const ListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  textAlign: 'center',
}));

export default function TermsPage() {
  return (
    <PageContainer>
      <ContentContainer>
        <PageTitle>Terms of Service</PageTitle>
        <IntroText>
          Welcome to Dispatch AI! These Terms of Service govern your access to
          and use of our services. By using Dispatch AI, you agree to be bound
          by these Terms.
        </IntroText>

        <SectionTitle>Use of the Service</SectionTitle>
        <List>
          <ListItem>
            You must be at least 18 years old to use the Service.
          </ListItem>
          <ListItem>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms.
          </ListItem>
          <ListItem>
            Dispatch AI grants you a limited, non-exclusive, non-transferable
            license to use the Service.
          </ListItem>
        </List>

        <SectionTitle>User Accounts</SectionTitle>
        <List>
          <ListItem>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </ListItem>
          <ListItem>
            You agree to provide accurate and up-to-date information.
          </ListItem>
          <ListItem>
            You are responsible for all activities under your account.
          </ListItem>
        </List>

        <SectionTitle>AI Call Handling and Automation</SectionTitle>
        <List>
          <ListItem>
            Our AI assistant handles calls, creates tasks, and communicates on
            your behalf based on predefined logic and user settings.
          </ListItem>
          <ListItem>
            You acknowledge that while we strive for accuracy, AI interactions
            may not always be perfect and should be monitored regularly.
          </ListItem>
        </List>

        <SectionTitle>Subscription Plans and Billing</SectionTitle>
        <List>
          <ListItem>
            Dispatch AI offers Free, Basic, and Pro plans. Details of each plan
            are available on our website.
          </ListItem>
          <ListItem>
            By subscribing to a paid plan, you agree to pay the applicable fees.
          </ListItem>
          <ListItem>
            You may cancel, upgrade, or downgrade your plan at any time, with
            changes taking effect based on our billing cycle.
          </ListItem>
        </List>

        <SectionTitle>Prohibited Activities</SectionTitle>
        <List>
          <ListItem>
            You may not use the Service for illegal activities, spamming, or to
            infringe on the rights of others.
          </ListItem>
          <ListItem>
            You may not reverse engineer, copy, or distribute the Service or its
            components.
          </ListItem>
        </List>

        <SectionTitle>Termination</SectionTitle>
        <List>
          <ListItem>
            We reserve the right to suspend or terminate your access if you
            violate these Terms.
          </ListItem>
          <ListItem>
            You may cancel your account at any time from your settings.
          </ListItem>
        </List>

        <SectionTitle>Limitation of Liability</SectionTitle>
        <SectionText>
          Dispatch AI is provided on an "as-is" and "as-available" basis. We are
          not liable for indirect, incidental, or consequential damages arising
          from your use of the Service.
        </SectionText>

        <SectionTitle>Governing Law</SectionTitle>
        <SectionText>
          These Terms are governed by the laws of New South Wales, Australia.
        </SectionText>

        <ContactInfo>
          <SectionTitle style={{ marginTop: 0 }}>Contact Us</SectionTitle>
          <SectionText style={{ marginBottom: 0 }}>
            If you have any questions about these Terms, please contact us at{' '}
            <strong>support@dispatchai.com.au</strong>
          </SectionText>
        </ContactInfo>
      </ContentContainer>
    </PageContainer>
  );
}
