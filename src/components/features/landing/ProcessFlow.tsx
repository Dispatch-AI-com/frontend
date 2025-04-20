'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    imageUrl: "/images/signup-illustration.svg",
  },
  {
    id: 2,
    title: "Select Plan",
    description: "Select the plan you want to get.",
    imageUrl: "/images/plan-illustration.svg",
  },
  {
    id: 3,
    title: "Set Up",
    description: "Set up info and call workflows for your business.",
    imageUrl: "/images/setup-illustration.svg",
  },
  {
    id: 4,
    title: "Go Live",
    description: "Connect your phone number and let SmartAgent handle the rest.",
    imageUrl: "/images/live-illustration.svg",
  },
];

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  
  const minSwipeDistance = 50;

  const handleStepChange = (stepId: number) => {
    setActiveStep(stepId);
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

  return (
    <div className="w-full py-16">
      <h2 className="text-4xl font-bold text-center mb-20">How SmartAgent Works for You</h2>
      
      <div className="max-w-5xl mx-auto bg-black rounded-3xl p-4 shadow-xl overflow-hidden">
        <div 
          className="w-full bg-white rounded-2xl h-96 mb-4 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          <div className="text-gray-300 text-2xl">
            
            Step {activeStep} Illustration
          </div>
        </div>
        
        
        <div className="grid grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              className={`p-4 ${step.id === activeStep ? 'bg-green-400 rounded-lg' : ''}`}
            >
              <p className={`font-bold text-lg ${step.id === activeStep ? 'text-white' : 'text-white'}`}>
                {step.id}.{step.title}
              </p>
              <p className={`text-sm mt-1 ${step.id === activeStep ? 'text-white' : 'text-gray-400'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}