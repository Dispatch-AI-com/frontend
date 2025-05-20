'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const StyledCard = styled.div`
  width: 696px;
  min-height: 306px;
  padding: 60px;
  border-radius: 24px;
  border: 1px solid #d5d5d5;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 40px;
  word-break: break-word;

  @media (max-width: 767px) {
    width: 100%;
    padding: 40px 24px;
    min-height: auto;
  }
`;

const QuoteRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const QuoteIconBox = styled.div`
  width: 22px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 4px;
`;

const QuoteText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  color: #060606;
  margin: 0;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`;

const NameText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.25;
  color: #060606;
  margin: 0 0 12px;
`;

const TitleText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: normal;
  color: #6d6d6d;
  margin: 0;
`;

export default function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <StyledCard>
      <QuoteRow>
        <QuoteIconBox>
          <Image src="/invalid-name.svg" alt="Quote Icon" width={22} height={20} />
        </QuoteIconBox>
        <QuoteText>{quote}</QuoteText>
      </QuoteRow>
      <div>
        <NameText>{name}</NameText>
        <TitleText>{title}</TitleText>
      </div>
    </StyledCard>
  );
}