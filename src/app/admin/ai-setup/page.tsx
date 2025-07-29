'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';

import AndroidInstantSetup from './components/Android/InstantSetup';
import AndroidManualSetup from './components/Android/ManualSetup';
import DisableLiveVoicemail from './components/Apple/DisableLiveVoicemail';
import InstantSetup from './components/Apple/InstantSetup';
import ManualSetup from './components/Apple/ManualSetup';
import CarrierSelect from './components/CarrierSelect';
import DeviceSelect from './components/DeviceSelect';
import TestCall from './components/TestCall';
import Troubleshooting from './components/Troubleshooting';

const STEPS = {
  DEVICE_SELECT: 0,
  CARRIER_SELECT: 1,
  DISABLE_LIVE_VOICEMAIL: 2,
  INSTANT_SETUP: 3,
  MANUAL_SETUP: 4,
  TEST_CALL: 5,
  TROUBLESHOOTING: 6,
  ANDROID_INSTANT_SETUP: 7,
  ANDROID_MANUAL_SETUP: 8,
} as const;

type StepType = (typeof STEPS)[keyof typeof STEPS];

export default function AISetupPage() {
  const [step, setStep] = useState<StepType>(STEPS.DEVICE_SELECT);
  const [prevStep, setPrevStep] = useState<StepType | null>(null);
  const [device, setDevice] = useState<'iphone' | 'android' | null>(null);
  const router = useRouter();

  const stepComponents: Record<StepType, React.ReactNode> = {
    [STEPS.DEVICE_SELECT]: (
      <DeviceSelect
        onNext={selectedDevice => {
          setDevice(selectedDevice);
          setStep(STEPS.CARRIER_SELECT);
        }}
      />
    ),
    [STEPS.CARRIER_SELECT]: (
      <CarrierSelect
        onNext={() => {
          if (device === 'iphone') {
            setStep(STEPS.DISABLE_LIVE_VOICEMAIL);
          } else {
            setStep(STEPS.ANDROID_INSTANT_SETUP);
          }
        }}
        onBack={() => {
          setStep(STEPS.DEVICE_SELECT);
        }}
      />
    ),
    [STEPS.DISABLE_LIVE_VOICEMAIL]: (
      <DisableLiveVoicemail
        onNext={() => {
          setStep(STEPS.INSTANT_SETUP);
        }}
        onBack={() => {
          setStep(STEPS.CARRIER_SELECT);
        }}
      />
    ),
    [STEPS.INSTANT_SETUP]: (
      <InstantSetup
        onNext={() => {
          setPrevStep(STEPS.INSTANT_SETUP);
          setStep(STEPS.TEST_CALL);
        }}
        onBack={() => {
          setStep(STEPS.DISABLE_LIVE_VOICEMAIL);
        }}
        onManualSetup={() => {
          setPrevStep(STEPS.INSTANT_SETUP);
          setStep(STEPS.MANUAL_SETUP);
        }}
      />
    ),
    [STEPS.MANUAL_SETUP]: (
      <ManualSetup
        onSuccess={() => {
          setPrevStep(STEPS.MANUAL_SETUP);
          setStep(STEPS.TEST_CALL);
        }}
        onBack={() => {
          setStep(STEPS.INSTANT_SETUP);
        }}
        onFailure={() => {
          setPrevStep(STEPS.MANUAL_SETUP);
          setStep(STEPS.TROUBLESHOOTING);
        }}
      />
    ),
    [STEPS.TEST_CALL]: (
      <TestCall
        onBack={() => {
          if (prevStep !== null) setStep(prevStep);
        }}
        onGoToDashboard={() => {
          router.push('/admin/overview');
        }}
      />
    ),
    [STEPS.TROUBLESHOOTING]: (
      <Troubleshooting
        onBack={() => {
          if (prevStep !== null) setStep(prevStep);
        }}
        onGoToGuide={() => {
          router.push('/admin/overview');
        }}
      />
    ),
    [STEPS.ANDROID_INSTANT_SETUP]: (
      <AndroidInstantSetup
        onNext={() => {
          setPrevStep(STEPS.ANDROID_INSTANT_SETUP);
          setStep(STEPS.TEST_CALL);
        }}
        onBack={() => {
          setStep(STEPS.CARRIER_SELECT);
        }}
        onManualSetup={() => {
          setPrevStep(STEPS.ANDROID_INSTANT_SETUP);
          setStep(STEPS.ANDROID_MANUAL_SETUP);
        }}
      />
    ),
    [STEPS.ANDROID_MANUAL_SETUP]: (
      <AndroidManualSetup
        onSuccess={() => {
          setPrevStep(STEPS.ANDROID_MANUAL_SETUP);
          setStep(STEPS.TEST_CALL);
        }}
        onBack={() => {
          setStep(STEPS.ANDROID_INSTANT_SETUP);
        }}
        onFailure={() => {
          setPrevStep(STEPS.ANDROID_MANUAL_SETUP);
          setStep(STEPS.TROUBLESHOOTING);
        }}
      />
    ),
  };

  return (
    <AdminPageLayout title="AI Setup" padding="normal" background="solid">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {stepComponents[step]}
      </Box>
    </AdminPageLayout>
  );
}
