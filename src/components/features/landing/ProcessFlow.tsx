'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
    imageUrl: "landing/undraw_set_up.svg",
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
    imageUrl: "landing/undraw_set_up.svg",
  },
];

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
      
      // Scroll to the active step card
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

  // 自动轮播
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextStep = activeStep < steps.length ? activeStep + 1 : 1;
      handleStepChange(nextStep);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <Box component="section" 
      sx={{ 
        width:'100%', 
        }}
    >
      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          fontFamily: 'Roboto, sans-serif',  
          fontWeight: 900,  
          lineHeight: 1.17,        
          letterSpacing: 'normal',  
          color: '#060606', 
          fontSize: {
            xs: '2rem',  
            md: '40px',   
          },
          width: {
            xs: '100%',    
            sm: '684px', 
          },
          mx: 'auto',

          height: {
            xs: 'auto',   
            sm: '56px',    
          },

          mb: {
            xs: 'auto',         
            sm: '72px',   
          },

        }}
          
        >
        How SmartAgent Works for You
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '1260px',
          mx: 'auto',
          minHeight: {
            xs: 'auto',
            md: '911px',
          },
          backgroundColor: '#060606',
          borderRadius: '24px',
          p: '30px',
          boxShadow: 4,
          overflow: 'hidden'
        }}
      >
        {/* 图片展示区 */}
        <Box
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            width: '100%',
            minHeight: {
              xs: 'auto',
              md: '675px',
            },
            bgcolor: 'common.white',
            borderRadius: 3,
            mb:2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
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
        </Box>

        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(4, 1fr)' 
            },
            gap: 2,
          }}>
          {steps.map(step => {
            const isActive = step.id === activeStep;
            return (
              <Box
                key={step.id}
                id={`step-${step.id}`}
                onClick={() => handleStepChange(step.id)}
                sx={{ cursor:'pointer' }}
              >
                <Paper
                  elevation={isActive ? 8 : 1}
                  sx={{
                    width: '100%',
                    maxWidth: '300px',
                    mx: 'auto',
                    minHeight: {
                      xs: 'auto',
                      md: '146px',
                    },
                    p:2,
                    bgcolor: isActive ? '#a8f574' : 'transparent',
                    color:    isActive ? 'common.dark' : '#fff',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight:'bold' }}>
                    {step.id}. {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt:1 , color: '#bbb',}}>
                    {step.description}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}