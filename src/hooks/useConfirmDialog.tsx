import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { cloneElement, ReactNode, useState } from 'react';

export interface ConfirmationDialogProps {
  title: string;
  content: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: ReactNode;
  confirmText?: ReactNode;
  cancelButton?: React.ReactElement<ButtonProps>;
  confirmButton?: React.ReactElement<ButtonProps>;
  dialogPaperProps?: DialogProps['PaperProps'];
  autoClose?: boolean; // auto close dialog after confirm
  hideCancelButton?: boolean;
  hideCloseButton?: boolean;
}

const StyledContentDiv = styled.div`
  min-width: 19rem; // 19x16 = 304px
  .MuiDialogTitle-root {
    padding: 1rem;
  }
  .MuiDialogContent-root {
    padding: 0 1rem 1rem 1rem;
  }
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.2rem;
    color: gray;
    :hover {
      color: black;
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

// my personal confirmation dialog, feel free to use it, examples are in ReactHookForm.tsx
const useConfirmationDialog = () => {
  const defaultDialogProps: ConfirmationDialogProps = {
    title: '',
    content: '',
    autoClose: true,
    hideCancelButton: false,
    hideCloseButton: false,
  };
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] =
    useState<ConfirmationDialogProps>(defaultDialogProps);

  const handleOpen = (config: ConfirmationDialogProps) => {
    setDialogProps({
      ...defaultDialogProps,
      ...config,
      confirmButton: config.confirmButton || (
        <Button color='primary' variant='contained'>
          {config.confirmText || 'OK'}
        </Button>
      ),
      cancelButton: config.cancelButton || (
        <Button color='primary'>{config.cancelText || 'Cancel'}</Button>
      ),
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogProps({
      ...defaultDialogProps,
      title: '',
      content: '',
    });
  };

  const handleConfirm = () => {
    dialogProps.onConfirm?.();
    dialogProps.autoClose && handleClose();
  };

  const handleCancel = () => {
    dialogProps.onCancel?.();
    dialogProps.autoClose && handleClose();
  };

  const renderConfirmationDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={dialogProps.dialogPaperProps}
      >
        {dialogProps.title && (
          <StyledContentDiv>
            <DialogTitle>{dialogProps.title}</DialogTitle>
            {!dialogProps.hideCloseButton && (
              <IconButton
                className='close-button'
                color='inherit'
                onClick={handleCancel}
                aria-label='close'
              >
                <Close />
              </IconButton>
            )}
            <DialogContent>{dialogProps.content}</DialogContent>
            <DialogActions>
              {dialogProps.cancelButton &&
                !dialogProps.hideCancelButton &&
                cloneElement(dialogProps.cancelButton, {
                  onClick: handleCancel,
                })}
              {dialogProps.confirmButton &&
                cloneElement(dialogProps.confirmButton, {
                  onClick: handleConfirm,
                })}
            </DialogActions>
          </StyledContentDiv>
        )}
      </Dialog>
    );
  };

  return {
    renderConfirmationDialog,
    openConfirmDialog: handleOpen,
    closeConfirmDialog: handleClose,
  };
};

export default useConfirmationDialog;
