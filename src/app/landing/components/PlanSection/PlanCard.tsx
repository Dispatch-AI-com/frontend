'use client';

import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';
import { PlanButton } from '@/types/plan.types';

interface PlanCardProps {
  name: string;
  description: string;
  buttons: PlanButton[];
}

const CardContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '448px',
  minWidth: '280px',
  minHeight: '508px',
  height: 'auto',
  padding: '30px',
  borderRadius: '24px',
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
}));

const CardContent = styled('div')(() => ({
  flexGrow: 1,
}));

const DemoBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: 0,
  paddingTop: '67%', 
  borderRadius: '24px',
  border: '1px solid #d5d5d5',
  backgroundColor: '#e5e5e5',
  position: 'relative',
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    paddingTop: '56.25%', 
  },
}));

const CardTitle = styled('h3')(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: '#060606',
  margin: '0 0 20px',
  textAlign: 'left',

}));

const CardDescription = styled('p')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: '#060606',
  textAlign: 'left',
  margin: '0',
}));

const BtnContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(2, 1.5), 

  [theme.breakpoints.up('sm')]: {
    flexWrap: 'nowrap', 
  },
}));

export default function PlanCard({ name, description, buttons }: PlanCardProps) {
  return (
    <CardContainer>
      <CardContent>
        <DemoBox></DemoBox>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <BtnContainer>
        {buttons.map((btn, i) => (
          <CommonButton
            key={i}
            buttonVariant={btn.variant === 'primary' ? 'black' : 'green'}
            sx={{
              width: buttons.length === 1
                ? '388px'
                : btn.variant === 'primary'
                ? '216px'
                : '160px',
            }}
          >
            {btn.label}
          </CommonButton>
        ))}
      </BtnContainer>
    </CardContainer>
  );
}
