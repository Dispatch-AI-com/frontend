'use client';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, CardContent, IconButton, Typography } from '@mui/material';

import {
  SectionText,
  SectionTitle,
  SectionWrapper,
} from '@/app/(public)/about/components/InfoBody';
import {
  TeamCardContainer,
  TeamMemberCard,
  TeamMemberImage,
} from '@/app/(public)/about/components/TeamCard';
import teamMembers from '@/data/teamMembers.json';

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <SectionTitle>Our Mission</SectionTitle>
        <SectionText>
          We&apos;re on a mission to help businesses reimagine customer
          engagement with scalable voice AI.
        </SectionText>
        <SectionTitle>Our Values</SectionTitle>
        <SectionText>
          We are bold, courageous explorers, plotting the course that others
          follow. We act fast without sacrificing quality. Lastly, we&apos;re
          customer-obsessed and hooked on solving customer problems!
        </SectionText>
        <SectionTitle>Our Story</SectionTitle>
        <SectionText>
          Curious Thing started in July 2018 after our three founders asked each
          other, “What if we can make an AI curious?”
          <br />
          Seeing the limitations of today&apos;s intent-matching AI framework,
          they sought to build an AI that is designed to ask open-content
          questions and derive insights from people.
          <br />
          Today, our platform allows businesses to redefine how they communicate
          with their customers through proactive engagement. We have processed
          over 3 million minutes of AI-human conversations and have grown the
          core team to over 30 members.
        </SectionText>
        <SectionTitle>Meet the Team</SectionTitle>
        <SectionText>
          We are a tight-knit, agile team of data scientists, engineers,
          designers, business development and product-growth experts, with
          extensive experience in machine learning, natural language processing
          and product development.
        </SectionText>
      </SectionWrapper>

      <TeamCardContainer>
        {teamMembers.map(member => (
          <Box key={member.linkedin}>
            <TeamMemberCard>
              <TeamMemberImage backgroundImage={member.image} />
              <CardContent>
                <Typography variant="h3">{member.name}</Typography>
                <Typography variant="body2" color="text.primary">
                  {member.role}
                </Typography>
              </CardContent>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <IconButton>
                  <LinkedInIcon sx={{ color: 'black' }} />
                </IconButton>
              </a>
            </TeamMemberCard>
          </Box>
        ))}
      </TeamCardContainer>
    </>
  );
}
