'use client'

import { Box } from '@mui/material';
import React from 'react';

import { AboutHeader, HeaderImage, HeaderText, HeaderTitle } from '@/app/about/components/AboutBanner';

const AboutBannerSection = () => {
    return (
        <AboutHeader>
            <HeaderImage src="/voice-ai.png" alt="Voice AI" />
            <Box>
                <HeaderTitle>
                    Building the future of <br /> Voice AI
                </HeaderTitle>
                <HeaderText>
                    Transforming human-machine interaction through advanced voice technology.
                </HeaderText>
            </Box>
        </AboutHeader>
    );
};

export default AboutBannerSection;