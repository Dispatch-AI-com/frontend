import { Box, Typography } from '@mui/material';
import React from 'react';

export const TermsOfServiceContent = () => (
  <Box>
    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      1. Acceptance of Terms
    </Typography>
    <Typography variant="body1" paragraph>
      By accessing and using DispatchAI, you accept and agree to be bound by the
      terms and provision of this agreement. If you do not agree to abide by the
      above, please do not use this service.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      2. Description of Service
    </Typography>
    <Typography variant="body1" paragraph>
      DispatchAI provides intelligent call handling and customer service
      automation solutions. Our platform includes AI-powered call routing,
      automated responses, and customer interaction management tools.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      3. User Accounts
    </Typography>
    <Typography variant="body1" paragraph>
      You are responsible for maintaining the confidentiality of your account
      and password. You agree to accept responsibility for all activities that
      occur under your account or password.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      4. Acceptable Use
    </Typography>
    <Typography variant="body1" paragraph>
      You agree not to use the service for any unlawful purpose or in any way
      that could damage, disable, overburden, or impair the service or interfere
      with any other party's use of the service.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      5. Privacy and Data Protection
    </Typography>
    <Typography variant="body1" paragraph>
      Your privacy is important to us. Please review our Privacy Policy, which
      also governs your use of the service, to understand our practices
      regarding the collection and use of your information.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      6. Intellectual Property
    </Typography>
    <Typography variant="body1" paragraph>
      The service and its original content, features, and functionality are and
      will remain the exclusive property of DispatchAI and its licensors. The
      service is protected by copyright, trademark, and other laws.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      7. Termination
    </Typography>
    <Typography variant="body1" paragraph>
      We may terminate or suspend your account and bar access to the service
      immediately, without prior notice or liability, under our sole discretion,
      for any reason whatsoever and without limitation.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      8. Limitation of Liability
    </Typography>
    <Typography variant="body1" paragraph>
      In no event shall DispatchAI, nor its directors, employees, partners,
      agents, suppliers, or affiliates, be liable for any indirect, incidental,
      special, consequential, or punitive damages.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      9. Changes to Terms
    </Typography>
    <Typography variant="body1" paragraph>
      We reserve the right to modify or replace these terms at any time. If a
      revision is material, we will provide at least 30 days notice prior to any
      new terms taking effect.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      10. Contact Information
    </Typography>
    <Typography variant="body1" paragraph>
      If you have any questions about these Terms of Service, please contact us
      at support@dispatchai.com.
    </Typography>

    <Typography
      variant="body2"
      sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', color: '#666' }}
    >
      <strong>Last updated:</strong> {new Date().toLocaleDateString()}
    </Typography>
  </Box>
);

export const PrivacyPolicyContent = () => (
  <Box>
    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      1. Information We Collect
    </Typography>
    <Typography variant="body1" paragraph>
      We collect information you provide directly to us, such as when you create
      an account, use our services, or contact us for support. This may include:
    </Typography>
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      <Typography component="li" variant="body1">
        Name and contact information
      </Typography>
      <Typography component="li" variant="body1">
        Account credentials
      </Typography>
      <Typography component="li" variant="body1">
        Usage data and analytics
      </Typography>
      <Typography component="li" variant="body1">
        Communication records
      </Typography>
    </Box>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      2. How We Use Your Information
    </Typography>
    <Typography variant="body1" paragraph>
      We use the information we collect to:
    </Typography>
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      <Typography component="li" variant="body1">
        Provide and maintain our services
      </Typography>
      <Typography component="li" variant="body1">
        Process transactions and send related information
      </Typography>
      <Typography component="li" variant="body1">
        Send technical notices and support messages
      </Typography>
      <Typography component="li" variant="body1">
        Improve our services and develop new features
      </Typography>
    </Box>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      3. Information Sharing
    </Typography>
    <Typography variant="body1" paragraph>
      We do not sell, trade, or otherwise transfer your personal information to
      third parties without your consent, except as described in this policy or
      as required by law.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      4. Data Security
    </Typography>
    <Typography variant="body1" paragraph>
      We implement appropriate security measures to protect your personal
      information against unauthorized access, alteration, disclosure, or
      destruction. However, no method of transmission over the internet is 100%
      secure.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      5. Data Retention
    </Typography>
    <Typography variant="body1" paragraph>
      We retain your personal information for as long as necessary to provide
      our services and comply with legal obligations. You may request deletion
      of your data at any time.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      6. Your Rights
    </Typography>
    <Typography variant="body1" paragraph>
      You have the right to:
    </Typography>
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      <Typography component="li" variant="body1">
        Access your personal information
      </Typography>
      <Typography component="li" variant="body1">
        Correct inaccurate information
      </Typography>
      <Typography component="li" variant="body1">
        Request deletion of your data
      </Typography>
      <Typography component="li" variant="body1">
        Opt out of marketing communications
      </Typography>
    </Box>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      7. Cookies and Tracking
    </Typography>
    <Typography variant="body1" paragraph>
      We use cookies and similar tracking technologies to enhance your
      experience and analyze usage patterns. You can control cookie settings
      through your browser preferences.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      8. Third-Party Services
    </Typography>
    <Typography variant="body1" paragraph>
      Our service may contain links to third-party websites or services. We are
      not responsible for the privacy practices of these third parties. We
      encourage you to review their privacy policies.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      9. Children's Privacy
    </Typography>
    <Typography variant="body1" paragraph>
      Our service is not intended for children under 13 years of age. We do not
      knowingly collect personal information from children under 13.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      10. Changes to This Policy
    </Typography>
    <Typography variant="body1" paragraph>
      We may update this privacy policy from time to time. We will notify you of
      any changes by posting the new policy on this page and updating the "Last
      updated" date.
    </Typography>

    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      11. Contact Us
    </Typography>
    <Typography variant="body1" paragraph>
      If you have any questions about this Privacy Policy, please contact us at
      privacy@dispatchai.com.
    </Typography>

    <Typography
      variant="body2"
      sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', color: '#666' }}
    >
      <strong>Last updated:</strong> {new Date().toLocaleDateString()}
    </Typography>
  </Box>
);
