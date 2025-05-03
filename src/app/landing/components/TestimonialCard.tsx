'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  sx?: React.CSSProperties;
}

// Card container
const StyledCard = styled.div`
  width: 100%;
  max-width: 696px;
  height: auto;
  padding: 40px 24px;
  border-radius: 24px;
  border: 1px solid #d5d5d5;
  background-color: #fff;
  box-shadow: none;
  flex-shrink: 0;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 60px;
  }
`;

// Quote icon
const QuoteIconBox = styled.div`
  width: 22px;
  height: 20px;
  margin: 0 auto 24px 0;

  @media (min-width: 768px) {
    margin: 0 554px 24px 0;
  }
`;

// Quote text
const QuoteText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.33;
  color: #060606;
  margin: 24px 0 48px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 24px;
    max-width: 90vw;
  }
`;

// Name text
const NameText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.25;
  color: #060606;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

// Title text
const TitleText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.25;
  color: #6d6d6d;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export default function TestimonialCard({ quote, name, title, sx }: TestimonialCardProps) {
  return (
    <StyledCard style={sx}>
      <QuoteIconBox>
        <Image
          src="/invalid-name.svg"
          alt="Quote Icon"
          width={22}
          height={20}
          style={{
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </QuoteIconBox>
      <QuoteText>{quote}</QuoteText>
      <NameText>{name}</NameText>
      <TitleText>{title}</TitleText>
    </StyledCard>
  );
}