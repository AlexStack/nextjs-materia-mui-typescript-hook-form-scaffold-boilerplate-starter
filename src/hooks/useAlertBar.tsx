'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertColor,
  IconButton,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from '@mui/material';
import React, { useState } from 'react';

export interface AlertBarProps {
  message: React.ReactNode;
  onClose?: () => void;
  severity?: AlertColor;
  vertical?: SnackbarOrigin['vertical'];
  horizontal?: SnackbarOrigin['horizontal'];
  autoHideSeconds?: number;
  transitionSeconds?: number;
}

// my personal alert bar, feel free to use it, examples are in ReactHookForm.tsx
export const useAlertBar = () => {
  const [alertBarProps, setAlertBarProps] = useState<AlertBarProps>({
    message: '',
    severity: 'info',
  });
  const onAlertClose = () => {
    setAlertBarProps({ message: '' });
    alertBarProps.onClose?.();
  };

  const renderAlertBar = () => {
    const {
      message,
      severity,
      vertical = 'bottom',
      horizontal = 'center',
      autoHideSeconds = 5,
      transitionSeconds = 0.5,
    } = alertBarProps;

    return message ? (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={!!message}
        onClose={onAlertClose}
        autoHideDuration={autoHideSeconds * 1000}
        TransitionComponent={(props) => <Slide {...props} direction='up' />}
        transitionDuration={transitionSeconds * 1000}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={onAlertClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <Alert
          onClose={onAlertClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    ) : null;
  };

  return {
    setAlertBarProps,
    renderAlertBar,
  };
};
