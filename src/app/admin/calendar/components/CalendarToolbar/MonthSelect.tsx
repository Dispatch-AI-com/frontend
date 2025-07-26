import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MonthSelectProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const containerStyle: React.CSSProperties = {
  width: 260,
  height: 40,
  margin: '0 0 0 24px',
  padding: '0 12px',
  borderRadius: 12,
  border: '1px solid #eaeaea',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  position: 'relative',
};

const dividerStyle: React.CSSProperties = {
  width: 1,
  height: 40,
  background: '#e0e0e0',
};

const MonthSelect: React.FC<MonthSelectProps> = ({ value, onChange }) => {
  const [date, setDate] = useState<Dayjs>(value ? dayjs(value) : dayjs());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (value) setDate(dayjs(value));
  }, [value]);

  const changeMonth = (delta: number) => {
    const newDate = date.add(delta, 'month');
    setDate(newDate);
    onChange?.(newDate.toDate());
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newMonth = newValue.startOf('month');
      setDate(newMonth);
      onChange?.(newMonth.toDate());
    }
    setShowPicker(false);
  };

  return (
    <div style={containerStyle}>
      <Image
        src="/dashboard/calendar/left.svg"
        alt="left"
        width={16}
        height={16}
        style={{ cursor: 'pointer', zIndex: 1 }}
        onClick={() => changeMonth(-1)}
      />
      <div
        style={{
          ...dividerStyle,
          marginLeft: 12,
          marginRight: 16,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            margin: '0 8px 0 0',
            cursor: 'pointer',
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/dashboard/calendar/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
            style={{ display: 'block' }}
            onClick={() => setShowPicker(true)}
          />
          {showPicker && (
            <div style={{ position: 'absolute', zIndex: 20, top: 40, left: 0 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  open
                  value={date}
                  onChange={handleDateChange}
                  onClose={() => setShowPicker(false)}
                  views={['year', 'month']}
                  slotProps={{
                    textField: { size: 'small', style: { display: 'none' } },
                  }}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
        <span
          style={{
            flex: 1,
            fontSize: 16,
            color: '#222',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {date.format('MMMM YYYY')}
        </span>
      </div>
      <div
        style={{
          ...dividerStyle,
          marginLeft: 16,
          marginRight: 12,
        }}
      />
      <Image
        src="/dashboard/calendar/right.svg"
        alt="right"
        width={16}
        height={16}
        style={{ cursor: 'pointer', zIndex: 1 }}
        onClick={() => changeMonth(1)}
      />
    </div>
  );
};

export default MonthSelect;
