'use client';

import 'react-circular-progressbar/dist/styles.css';

import { Box, Typography } from '@mui/material';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

interface HalfCircleProgressProps {
  value: number;
  maxValue: number;
  unitText?: string;
  pathColor?: string;
  trailColor?: string;
}

export default function HalfCircleProgress({
  value,
  maxValue,
  unitText = '/Unlimited',
  pathColor = '#fff',
  trailColor = '#9ae765',
}: HalfCircleProgressProps) {
  return (
    <Box
      sx={{
        maxWidth: 180,
        maxHeight: 90,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CircularProgressbarWithChildren
        value={value}
        maxValue={maxValue}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          pathColor,
          trailColor,
        })}
        circleRatio={0.5}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 20%)',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 28, fontWeight: 'bold', lineHeight: 1.14 }}>
          {value}
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: '#6d6d6d',
              marginLeft: '3px',
            }}
          >
            {unitText}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
