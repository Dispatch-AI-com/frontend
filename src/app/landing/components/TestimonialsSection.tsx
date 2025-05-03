"use client";

import styled from 'styled-components';
import TestimonialCard from '@/app/landing/components/TestimonialCard';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  margin: React.CSSProperties;
}

const testimonials: Testimonial[] = [
  {
    quote: 'SmartAgent cut our missed calls by 80%. Lifesaver for my plumbing business!',
    name: 'Josn',
    title: 'CEO of ABC Company',
    margin: { margin: '32px 16px' },
  },
  {
    quote: 'Automated follow-ups saved me 10+ hours a week managing rentals.',
    name: 'Jena',
    title: 'Rental Manager',
    margin: { margin: '32px 16px' },
  },
];

// Section wrapper
const Wrapper = styled.section`
  padding: 80px 16px;
  background-color: white;
`;

// Section title
const Title = styled.h2`
  font-family: Roboto, sans-serif;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.25;
  text-align: center;
  color: #060606;
  max-width: 864px;
  margin: 120px auto 48px;

  @media (min-width: 768px) {
    font-size: 48px;
    margin: 200px auto 72px;
  }
`;

// Card layout container
const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  & > * {
    flex: 0 0 auto;
    min-width: 80vw;
    scroll-snap-align: center;
    margin-right: 16px;
  }

  @media (min-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
    padding: 0;
    & > * {
      min-width: 0;
      margin-right: 0;
    }
  }
`;

export default function TestimonialsSection() {
  return (
    <Wrapper>
      <Title>Trusted by Small Businesses Like Yours</Title>
      <CardContainer>
        {testimonials.map((item, idx) => (
          <TestimonialCard
            key={idx}
            quote={item.quote}
            name={item.name}
            title={item.title}
            sx={item.margin}
          />
        ))}
      </CardContainer>
    </Wrapper>
  );
}
