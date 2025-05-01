'use client';

import { Box, Stack, IconButton, CardContent, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
    AboutHeader,
    HeaderImage,
    HeaderTitle,
    BodyText,
    SectionWrapper,
    SectionTitle,
    SectionText,
    TeamCardContainer,
    TeamMemberCard,
    TeamMemberImage,
    CallToActionWrapper,
    CallToActionTitle,
    CallToActionText,
    SocialMediaButton
} from '@/app/about/components';


export default function AboutPage() {

const teamMembers = [
    { name: 'Alan', role: 'Technology Lead', linkedin: '/' },
    { name: 'Leo', role: 'Business Analyst', linkedin: '/' },
    { name: 'Yulia', role: 'UI Designer', linkedin: '/' },
    { name: 'Paco', role: 'Developer Lead', linkedin: '/' },
    { name: 'Chloe', role: 'Developer', linkedin: 'https://www.linkedin.com/in/mengying-xiao' },
    { name: 'Coco', role: 'Developer', linkedin: '/' },
    { name: 'Ethan', role: 'Developer', linkedin: '/' },
    { name: 'Ewan', role: 'Developer', linkedin: '/' },
    { name: 'Freya', role: 'Developer', linkedin: '/' },
    { name: 'Leo', role: 'Developer', linkedin: '/' },
    { name: 'Mark', role: 'Developer', linkedin: '/' },
    { name: 'Tim', role: 'Developer', linkedin: '/' },
    { name: 'David', role: 'Developer', linkedin: '/' },
];

<TeamCardContainer>
    {teamMembers.map((member, index) => (
        <Box key={index}>
            <TeamMemberCard>
                <TeamMemberImage />
                <CardContent>
                    <Typography variant="h3">{member.name}</Typography>
                    <Typography variant="body2" color="text.primary">
                        {member.role}
                    </Typography>
                </CardContent>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <IconButton>
                        <LinkedInIcon sx={{ color: 'black' }} />
                    </IconButton>
                </a>
            </TeamMemberCard>
        </Box>
    ))}
</TeamCardContainer>

    return (
        <>
            <AboutHeader>
                <HeaderImage src="/voice-ai.png" alt="Voice AI" />
                <Box>
                    <HeaderTitle>
                        Building the future of <br></br> Voice AI
                    </HeaderTitle>
                    <BodyText>
                        Transforming human-machine interaction through advanced voice technology.
                    </BodyText>
                </Box>
            </AboutHeader>
            <SectionWrapper>
                <SectionTitle>
                    Our Mission
                </SectionTitle>
                <SectionText>
                    We&apos;re on a mission to help businesses reimagine customer engagement with scalable voice AI.
                </SectionText>
                <SectionTitle>
                    Our Values
                </SectionTitle>
                <SectionText>
                    We are bold, courageous explorers, plotting the course that others follow. We act fast without sacrificing quality. Lastly, we&apos;re customer-obsessed and hooked on solving customer problems!
                </SectionText>
                <SectionTitle>
                    Our Story
                </SectionTitle>
                <SectionText>
                Curious Thing started in July 2018 after our three founders asked each other, “What if we can make an AI curious?”

                <br />Seeing the limitations of today&apos;s intent-matching AI framework, they sought to build an AI that is designed to ask open-content questions and derive insights from people.

                <br />Today, our platform allows businesses to redefine how they communicate with their customers through proactive engagement. We have processed over 3 million minutes of AI-human conversations and have grown the core team to over 30 members.
                </SectionText>
                <SectionTitle>
                    Meet the Team
                </SectionTitle>
                <SectionText>
                We are a tight-knit, agile team of data scientists, engineers, designers, business development and product-growth experts, with extensive experience in machine learning, natural language processing and product development.
                </SectionText>
            </SectionWrapper>

            <TeamCardContainer>
                {teamMembers.map((member, index) => (
                    <Box
                        key={index}
                    >
                        <TeamMemberCard>
                            <TeamMemberImage />
                            <CardContent>
                                <Typography variant="h3">{member.name}</Typography>
                                <Typography variant="body2" color="text.primary">
                                    {member.role}
                                </Typography>
                            </CardContent>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <IconButton>
                                <LinkedInIcon sx={{ color: 'black' }} />
                            </IconButton>
                            </a>
                        </TeamMemberCard>
                    </Box>
                ))}
            </TeamCardContainer>

            <CallToActionWrapper>
                <CallToActionTitle>
                    Want to work with us?
                </CallToActionTitle>
                <BodyText>
                    Email us at <a href="mailto:hello@jiangren.com.au" style={{ color: '#a8f574', textDecoration: 'underline' }}>hello@jiangren.com.au</a> with your resume and tell us why you&apos;re a great fit!
                </BodyText>
                <BodyText>
                    Address
                </BodyText>
                <CallToActionText>
                    Address
                </CallToActionText>
                <BodyText>
                    Phone
                </BodyText>
                <CallToActionText>
                    +63 4233365542
                </CallToActionText>
                <BodyText>
                    Find us on social media
                </BodyText>
                <Stack direction="row" spacing={0}>
                    <SocialMediaButton color="inherit"><LinkedInIcon /></SocialMediaButton>
                    <SocialMediaButton color="inherit"><FacebookIcon /></SocialMediaButton>
                    <SocialMediaButton color="inherit"><InstagramIcon /></SocialMediaButton>
                    <SocialMediaButton color="inherit"><XIcon /></SocialMediaButton>
                    <SocialMediaButton color="inherit"><YouTubeIcon /></SocialMediaButton>
                </Stack>
            </CallToActionWrapper>
        </>
    );
}