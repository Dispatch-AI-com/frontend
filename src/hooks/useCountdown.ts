import { useState, useEffect, useCallback } from 'react';

interface UseCountdownReturn {
  countdown: number;
  isActive: boolean;
  startCountdown: (seconds: number) => void;
  stopCountdown: () => void;
}

export const useCountdown = (): UseCountdownReturn => {
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, countdown]);

  const startCountdown = useCallback((seconds: number) => {
    setCountdown(seconds);
    setIsActive(true);
  }, []);

  const stopCountdown = useCallback(() => {
    setIsActive(false);
    setCountdown(0);
  }, []);

  return {
    countdown,
    isActive,
    startCountdown,
    stopCountdown,
  };
};

