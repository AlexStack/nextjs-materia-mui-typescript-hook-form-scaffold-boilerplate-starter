import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertColor,
  IconButton,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from '@mui/material';

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
export const AlertBar = ({
  message,
  severity = 'info',
  vertical = 'bottom',
  horizontal = 'center',
  onClose,
  autoHideSeconds = 5,
  transitionSeconds = 0.5,
}: AlertBarProps) => {
  return message ? (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={!!message}
      onClose={onClose}
      autoHideDuration={autoHideSeconds * 1000}
      TransitionComponent={(props) => <Slide {...props} direction='up' />}
      transitionDuration={transitionSeconds * 1000}
      action={
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={onClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  ) : null;
};
