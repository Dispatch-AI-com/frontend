import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

interface SwitchProps {
  value: 'weekly' | 'monthly';
  onChange: (val: 'weekly' | 'monthly') => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  const isMobile = useMediaQuery('(max-width:660px)');

  const mobileButtonSx = {
    width: 40,
    height: 40,
    color: '#222',
    border: 'none',
    outline: 'none',
    fontSize: 18,
    fontWeight: 700,
    borderRadius: '50% !important',
    cursor: 'pointer',
    transition: 'background 0.2s',
    padding: 0,
    backgroundColor: '#fff',
    textTransform: 'none',
    minWidth: 0,
    '&.Mui-selected': {
      backgroundColor: '#a8f574 !important',
      color: '#222',
    },
    '&:not(:first-of-type)': {
      marginLeft: '8px',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const pcButtonSx = {
    width: 84,
    height: 40,
    color: '#222',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontWeight: 500,
    borderRadius: '12px !important',
    cursor: 'pointer',
    transition: 'background 0.2s',
    padding: '10px 20px 10px 19px',
    backgroundColor: '#fff',
    textTransform: 'none',
    minWidth: 0,
    '&.Mui-selected': {
      backgroundColor: '#a8f574 !important',
      color: '#222',
    },
    '&:not(:first-of-type)': {
      marginLeft: '8px',
    },
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, val) => {
        if (val) onChange(val as 'weekly' | 'monthly');
      }}
      sx={{
        height: 40,
        borderRadius: 0,
        overflow: 'visible',
        alignItems: 'center',
        background: 'none',
      }}
    >
      <ToggleButton
        value="weekly"
        sx={isMobile ? mobileButtonSx : pcButtonSx}
        disableRipple
      >
        {isMobile ? 'W' : 'Weekly'}
      </ToggleButton>
      <ToggleButton
        value="monthly"
        sx={isMobile ? mobileButtonSx : { ...pcButtonSx, padding: '10px 16px' }}
        disableRipple
      >
        {isMobile ? 'M' : 'Monthly'}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Switch;
