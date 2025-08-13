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

const HighlightText = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderLeft: `4px solid ${theme.palette.text.primary}`,
  paddingLeft: theme.spacing(2),
  fontStyle: 'italic',
  backgroundColor: 'transparent',
}));

export default function PrivacyPage() {
  return (
    <PageContainer>
      <ContentContainer>
        <PageTitle>Privacy Policy</PageTitle>
        <IntroText>
          Dispatch AI respects your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our Service.
        </IntroText>

        <SectionTitle>Information We Collect</SectionTitle>
        <List>
          <ListItem>
            <strong>Personal Information:</strong> such as name, email, phone
            number, and payment details.
          </ListItem>
          <ListItem>
            <strong>Call Data:</strong> including call recordings, transcripts,
            AI responses, and call metadata.
          </ListItem>
          <ListItem>
            <strong>Usage Data:</strong> including pages visited, time spent,
            and actions taken in the dashboard.
          </ListItem>
        </List>

        <SectionTitle>How We Use Your Information</SectionTitle>
        <List>
          <ListItem>To deliver and improve our Service.</ListItem>
          <ListItem>To provide customer support.</ListItem>
          <ListItem>
            To communicate important updates or promotional materials (with your
            consent).
          </ListItem>
          <ListItem>To comply with legal obligations.</ListItem>
        </List>

        <SectionTitle>Data Storage and Security</SectionTitle>
        <HighlightText>
          Data is stored securely in Australia using trusted cloud providers
        </HighlightText>
        <List>
          <ListItem>
            We use encryption, access control, and regular audits to protect
            your data.
          </ListItem>
          <ListItem>
            Your information is processed and stored in compliance with
            Australian privacy laws.
          </ListItem>
        </List>

        <SectionTitle>Sharing of Information</SectionTitle>
        <HighlightText>We do not sell your data</HighlightText>
        <List>
          <ListItem>
            Data may be shared with third-party processors (e.g., email, payment
            gateways) only as necessary to deliver the Service.
          </ListItem>
          <ListItem>
            We may disclose data when required by law or to protect our legal
            rights.
          </ListItem>
        </List>

        <SectionTitle>Your Rights</SectionTitle>
        <List>
          <ListItem>
            You can access, update, or delete your personal information from
            your account settings.
          </ListItem>
          <ListItem>
            You may request a copy of your data or ask us to delete it by
            contacting us.
          </ListItem>
          <ListItem>
            You have the right to withdraw consent for marketing communications
            at any time.
          </ListItem>
        </List>

        <SectionTitle>Cookies</SectionTitle>
        <SectionText>
          Our site uses cookies to enhance user experience and analytics. You
          may control cookie settings through your browser preferences.
        </SectionText>

        <SectionTitle>Data Retention</SectionTitle>
        <SectionText>
          We retain data only as long as necessary to provide the Service or
          comply with legal obligations. You may request deletion of your data
          at any time.
        </SectionText>

        <SectionTitle>Children's Privacy</SectionTitle>
        <SectionText>
          Our Service is not intended for children under 18 years of age. We do
          not knowingly collect personal information from children under 18.
        </SectionText>

        <SectionTitle>Changes to This Policy</SectionTitle>
        <SectionText>
          We may update this policy from time to time. Changes will be notified
          via email or dashboard notification. Continued use of our Service
          after changes constitutes acceptance of the updated policy.
        </SectionText>

        <ContactInfo>
          <SectionTitle style={{ marginTop: 0 }}>Contact Us</SectionTitle>
          <SectionText style={{ marginBottom: 0 }}>
            If you have any questions about this Privacy Policy, please contact
            us at <strong>privacy@dispatchai.com.au</strong>
          </SectionText>
        </ContactInfo>
      </ContentContainer>
    </PageContainer>
  );
}
