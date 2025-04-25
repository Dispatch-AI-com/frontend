'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type Step = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create your account in 30 seconds.",
    imageUrl: "landing/undraw_sign_up.svg",
  },
  {
    id: 2,
    title: "Select Plan",
    description: "Select the plan you want to get.",
    imageUrl: "landing/undraw_plans.svg",
  },
  {
    id: 3,
    title: "Set Up",
    description: "Set up info and call workflows for your business.",
    imageUrl: "landing/undraw_set_up.svg",
  },
  {
    id: 4,
    title: "Go Live",
    description: "Connect your phone number and let SmartAgent handle the rest.",
    imageUrl: "landing/undraw_Go_Live.svg",
  },
];

// Styled Components
const SectionBox = styled(Box)({
  width: '100%',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 900,
  lineHeight: 1.17,
  letterSpacing: 'normal',
  color: '#060606',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('xs')]: {
    fontSize: '2rem',
    width: '100%',
    height: 'auto',
    marginBottom: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    width: '684px',
    height: '56px',
    marginBottom: '72px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1260px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#060606',
  borderRadius: '24px',
  padding: '30px',
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    minHeight: '911px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 3,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    minHeight: '675px',
  },
}));

const StepsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  [theme.breakpoints.up('xs')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const StepBox = styled(Box)({
  cursor: 'pointer',
});

const StepPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  width: '100%',
  maxWidth: '300px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(2),
  backgroundColor: isActive ? '#a8f574' : 'transparent',
  color: isActive ? theme.palette.common.black : '#fff',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  [theme.breakpoints.up('md')]: {
    minHeight: '146px',
  },
}));

const StepTitle = styled(Typography)({
  fontWeight: 'bold',
});

const StepDescription = styled(Typography)({
  marginTop: 8,
  color: '#bbb',
});

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = steps.find((s) => s.id === activeStep);
  
  const minSwipeDistance = 50;

  const handleStepChange = (stepId: number) => {
    if (stepId >= 1 && stepId <= steps.length) {
      setActiveStep(stepId);
      
      const stepElement = document.getElementById(`step-${stepId}`);
      if (stepElement && containerRef.current) {
        const container = containerRef.current;
        const scrollLeft = stepElement.offsetLeft - container.offsetLeft - 
                           (container.offsetWidth / 2) + (stepElement.offsetWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && activeStep < steps.length) {
      handleStepChange(activeStep + 1);
    }
    
    if (isRightSwipe && activeStep > 1) {
      handleStepChange(activeStep - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextStep = activeStep < steps.length ? activeStep + 1 : 1;
      handleStepChange(nextStep);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <SectionBox>
      <SectionTitle variant="h2" align="center">
        How SmartAgent Works for You
      </SectionTitle>

      <ContentContainer>
        <ImageContainer
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {current && (
            <Image
              src={current.imageUrl}
              alt={current.title}
              width={400}
              height={300}
              className="object-contain"
            />
          )}
        </ImageContainer>

        <StepsGrid>
          {steps.map(step => {
            const isActive = step.id === activeStep;
            return (
              <StepBox
                key={step.id}
                id={`step-${step.id}`}
                onClick={() => handleStepChange(step.id)}
              >
                <StepPaper
                  elevation={isActive ? 8 : 1}
                  isActive={isActive}
                >
                  <StepTitle variant="h6">
                    {step.id}. {step.title}
                  </StepTitle>
                  <StepDescription variant="body2">
                    {step.description}
                  </StepDescription>
                </StepPaper>
              </StepBox>
            );
          })}
        </StepsGrid>
      </ContentContainer>
    </SectionBox>
  );
}