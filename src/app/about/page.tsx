'use client';

import { styled } from '@mui/material/styles';
import { Box, Stack, IconButton, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(10, 50),
    color: theme.palette.text.primary,
    gap: theme.spacing(5),
}));

const StyledImage = styled('img')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: '40%',
    height: 'auto',
    objectFit: 'cover',
}));

const StyledHeader = styled('h1')(({ theme }) => ({
    color: 'white',
    fontSize: theme.typography.h1.fontSize,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: theme.typography.h1.fontWeight,
    margin: 0,
    lineHeight: 1.2,
}));

const StyledTypographyBody = styled('p')(({ theme }) => ({
    color: 'white',
    marginTop: theme.spacing(2),
    marginBottom: 0,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
}));

const SectionContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    color: theme.palette.text.primary,
}));

const SectionHeader = styled('h2')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.text.primary,
    fontSize: theme.typography.h2.fontSize, // Adjusted for better scaling
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
    margin: theme.spacing(4, 0, 2),
}));

const SectionContent = styled('p')(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.spacing(3),
    maxWidth: '60%',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.body2.fontSize,
    },
}));

const TeamCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '324px',
    height: '464px',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    textAlign: 'center',
}));

const ProfileImage = styled('div')(({ theme }) => ({
    width: '300px',
    height: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
    marginBottom: theme.spacing(1),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const CTAWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(10, 50),
    color: theme.palette.text.primary,
    gap: theme.spacing(5),
}));

const CTAHeader = styled('h2')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h2.fontSize,
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
}));

const SectionCTAContent = styled('h4')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.h4.fontFamily,
    fontWeight: theme.typography.h4.fontWeight,
    margin: theme.spacing(1, 0, 5),
}));


const SocialIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    '& svg': {
        width: '30px',
        height: '30px',
        color: 'white',
    }
}));

export default function AboutPage() {

    const teamMembers = [
        { name: 'Alan', role: 'Technology Lead' },
        { name: 'Leo', role: 'Business Analytic' },
        { name: 'Yulia', role: 'UI Designer' },
        { name: 'Paco', role: 'Developer Lead' },
        { name: 'Chloe', role: 'Developer' },
        { name: 'Coco', role: 'Developer' },
        { name: 'Ethan', role: 'Developer' },
        { name: 'Ewan', role: 'Developer' },
        { name: 'Freya', role: 'Developer' },
        { name: 'Leo', role: 'Developer' },
        { name: 'Mark', role: 'Developer' },
        { name: 'Tim', role: 'Developer' },
        { name: 'David', role: 'Developer' },
    ];

    return (
        <>
            <HeaderWrapper>
                <StyledImage src="/voice-ai.png" alt="Voice AI" />
                <Box>
                    <StyledHeader>
                        Building the future of <br></br> Voice AI
                    </StyledHeader>
                    <StyledTypographyBody>
                        Transforming human-machine interaction through advanced voice technology.
                    </StyledTypographyBody>
                </Box>
            </HeaderWrapper>
            <SectionContainer>
                <SectionHeader>
                    Our Mission
                </SectionHeader>
                <SectionContent>
                    We&apos;re on a mission to help businesses reimagine customer engagement with scalable voice AI.
                </SectionContent>
                <SectionHeader>
                    Our Values
                </SectionHeader>
                <SectionContent>
                    We are bold, courageous explorers, plotting the course that others follow. We act fast without sacrificing quality. Lastly, we&apos;re customer-obsessed and hooked on solving customer problems!
                </SectionContent>
                <SectionHeader>
                    Our Story
                </SectionHeader>
                <SectionContent>
                Curious Thing started in July 2018 after our three founders asked each other, “What if we can make an AI curious?”

                <br />Seeing the limitations of today&apos;s intent-matching AI framework, they sought to build an AI that is designed to ask open-content questions and derive insights from people.

                <br />Today, our platform allows businesses to redefine how they communicate with their customers through proactive engagement. We have processed over 3 million minutes of AI-human conversations and have grown the core team to over 30 members.
                </SectionContent>
                <SectionHeader>
                    Meet the Team
                </SectionHeader>
                <SectionContent>
                We are a tight-knit, agile team of data scientists, engineers, designers, business development and product-growth experts, with extensive experience in machine learning, natural language processing and product development.
                </SectionContent>
            </SectionContainer>
            <Grid container spacing={1} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <TeamCard>
                            <ProfileImage />
                            <CardContent>
                                <Typography variant="h3">{member.name}</Typography>
                                <Typography variant="body2" color="text.primary">
                                    {member.role}
                                </Typography>
                            </CardContent>
                            <IconButton>
                                <LinkedInIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </TeamCard>
                    </Grid>
                ))}
            </Grid>
            <CTAWrapper>
                <CTAHeader>
                    Want to work with us?
                </CTAHeader>
                <StyledTypographyBody>
                    Email us at <a href="mailto:hello@jiangren.com.au" style={{ color: '#a8f574', textDecoration: 'underline' }}>hello@jiangren.com.au</a> with your resume and tell us why you&apos;re a great fit!
                </StyledTypographyBody>
                <StyledTypographyBody>
                    Address
                </StyledTypographyBody>
                <SectionCTAContent>
                    Address
                </SectionCTAContent>
                <StyledTypographyBody>
                    Phone
                </StyledTypographyBody>
                <SectionCTAContent>
                    +63 4233365542
                </SectionCTAContent>
                <StyledTypographyBody>
                    Find us on social media
                </StyledTypographyBody>
                <Stack direction="row" spacing={0}>
                    <SocialIconButton color="inherit"><LinkedInIcon /></SocialIconButton>
                    <SocialIconButton color="inherit"><FacebookIcon /></SocialIconButton>
                    <SocialIconButton color="inherit"><InstagramIcon /></SocialIconButton>
                    <SocialIconButton color="inherit"><XIcon /></SocialIconButton>
                    <SocialIconButton color="inherit"><YouTubeIcon /></SocialIconButton>
            </Stack>
            </CTAWrapper>
        </>
    );
}