"use client";

import { Box, Container } from "@mui/material";
import React from "react";

import FaqSection from "./components/FaqSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import SocialMedia from "./components/SocialMedia";
import VideoSection from "./components/VideoSection";

const BlogDetailPage = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", py: 4, gap: 10 }}>
      <Box>
        <Header />
        <HeroSection />
        <IntroSection />
        <FaqSection />
        <VideoSection />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <SocialMedia />
      </Box>
    </Container>
  );
};

export default BlogDetailPage;
