'use client';

import styled from 'styled-components';

import TestimonialCard from '@/app/landing/components/TestimonialCard';

const testimonials = [
  {
    quote: 'SmartAgent cut our missed calls by 80%. Lifesaver for my plumbing business!',
    name: 'Josn',
    title: 'CEO of ABC Company',
  },
  {
    quote: 'Automated follow-ups saved me 10+ hours a week managing rentals.',
    name: 'Jena',
    title: 'Rental Manager',
  },
];

const Wrapper = styled.section`
  padding: 120px 16px 80px;
  background-color: white;
`;

const Title = styled.h2`
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-weight: 900;
  line-height: normal;
  text-align: center;
  color: #060606;
  margin: 0 auto 64px;
  max-width: 864px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 48px;
  flex-wrap: nowrap;
  padding: 0 16px;

  @media (min-width: 1920px) {
    justify-content: flex-start;
    padding: 0 240px;
  }

  @media (max-width: 899px) {
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export default function TestimonialsSection() {
  return (
    <Wrapper>
      <Title>Trusted by Small Businesses Like Yours</Title>
      <CardContainer>
        {testimonials.map((item, idx) => (
          <TestimonialCard key={idx} {...item} />
        ))}
      </CardContainer>
    </Wrapper>
  );
}