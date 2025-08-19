'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Sign Up',
    description: 'Create your account in 30 seconds.',
    imageUrl: '/landing/step1.png',
  },
  {
    id: 2,
    title: 'Select Plan',
    description: 'Select the plan you want to get.',
    imageUrl: '/landing/step2.png',
  },
  {
    id: 3,
    title: 'Set Up',
    description: 'Set up info and call workflows for your business.',
    imageUrl: '/landing/step3.png',
  },
  {
    id: 4,
    title: 'Go Live',
    description:
      'Connect your phone number and let SmartAgent handle the rest.',
    imageUrl: '/landing/step4.png',
  },
];

// Styled Components
const SectionBox = styled(Box)({
  width: '100%',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  whiteSpace: 'normal',
  [theme.breakpoints.up('md')]: {
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    letterSpacing: '-0.8px',
    marginBottom: theme.spacing(3),
  },
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  width: '100%',
}));

const OuterWrapper = styled(Box)(() => ({
  width: '100%',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  width: '90%',
  maxWidth: '1260px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#060606',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: theme.shadows[4],

  padding: '30px',

  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    width: '100%',
    height: '327px',
  },
  '@media (max-width:400px)': {
    padding: '8px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '16 / 9',
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 1.5,
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '184px',
    aspectRatio: 'auto',
  },
}));

const StepsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  alignItems: 'stretch',
  [theme.breakpoints.up('xs')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@media (max-width:600px)': {
    display: 'flex',
    gap: 0,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    marginTop: '-5px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const StepBox = styled(Box)({
  cursor: 'pointer',
});

const StepPaper = styled(Paper, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  backgroundColor: isActive ? '#a8f574' : 'transparent',
  color: isActive ? theme.palette.common.black : '#fff',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer',
  transition: 'background-color 0.3s',

  '@media (max-width:600px)': {
    width: '246px',
    height: '104px',
    flexShrink: 0,
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
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const current = steps.find(s => s.id === activeStep);

  const minSwipeDistance = 50;

  const handleStepChange = (stepId: number) => {
    if (stepId >= 1 && stepId <= steps.length) {
      setActiveStep(stepId);

      const stepElement = document.getElementById(`step-${String(stepId)}`);
      if (stepElement && stepsContainerRef.current) {
        const container = stepsContainerRef.current;
        const scrollLeft = stepElement.offsetLeft - container.offsetLeft;

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
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

    return () => {
      clearTimeout(timer);
    };
  }, [activeStep]);

  return (
    <SectionBox>
      <SectionTitle variant="h2" align="center">
        How SmartAgent Works for You
      </SectionTitle>

      <OuterWrapper>
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
                fill
                className="object-contain"
              />
            )}
          </ImageContainer>

          <StepsGrid ref={stepsContainerRef}>
            {steps.map(step => {
              const isActive = step.id === activeStep;
              return (
                <StepBox
                  key={String(step.id)}
                  id={`step-${String(step.id)}`}
                  onClick={() => {
                    handleStepChange(step.id);
                  }}
                >
                  <StepPaper elevation={isActive ? 8 : 1} isActive={isActive}>
                    <StepTitle variant="h6">
                      {`${String(step.id)}. ${step.title}`}
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
      </OuterWrapper>
    </SectionBox>
  );
}
