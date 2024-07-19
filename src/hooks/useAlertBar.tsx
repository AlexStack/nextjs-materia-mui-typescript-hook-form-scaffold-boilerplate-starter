'use client';

import React, { useState } from 'react';

import { AlertBar, AlertBarProps } from '@/components/shared/AlertBar';

export const useAlertBar = () => {
  const [alertBarProps, setAlertBarProps] = useState<AlertBarProps>({
    message: '',
    severity: 'info',
  });

  const renderAlertBar = () => (
    <AlertBar
      onClose={() => setAlertBarProps({ message: '' })}
      {...alertBarProps}
    />
  );

  return {
    setAlertBarProps,
    renderAlertBar,
  };
};
