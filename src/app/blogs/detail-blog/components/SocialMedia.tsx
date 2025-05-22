"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

// Styled components
const SocialContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}));

const StyledLabelWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

const StyledIconRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

const SocialLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const SocialMedia = () => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title =
      "New Lucy Features Update: Enhanced FAQs & Get Call Notifications Your Way";

    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <SocialContainer>
      <StyledLabelWrapper>
        <SocialLabel variant="subtitle2">Social Sharing</SocialLabel>
      </StyledLabelWrapper>
      <StyledIconRow>
        <StyledIconButton
          onClick={() => {
            handleShare("linkedin");
          }}
        >
          <LinkedInIcon />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => {
            handleShare("facebook");
          }}
        >
          <FacebookIcon />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => {
            handleShare("twitter");
          }}
        >
          <Image src="/icons/xlogo.svg" alt="X" width={24} height={24} />
        </StyledIconButton>
      </StyledIconRow>
    </SocialContainer>
  );
};

export default SocialMedia;
