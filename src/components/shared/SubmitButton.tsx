import { ButtonProps, CircularProgress } from '@mui/material';
import * as React from 'react';

export interface SubmitButtonProps {
  children: React.ReactElement<ButtonProps>;
  isSubmitting?: boolean;
  submittingColor?: string;
  submittingSize?: string | number;
  submittingText?: string;
}

const SubmitButton = ({
  children,
  isSubmitting,
  submittingColor,
  submittingSize = '1rem',
  submittingText = 'Submitting...',
}: SubmitButtonProps) => {
  const submittingIconColor = submittingColor || children.props.color;
  return (
    <>
      {React.cloneElement(children, {
        startIcon: !isSubmitting ? (
          children.props.startIcon
        ) : (
          <CircularProgress
            style={{ color: submittingIconColor }}
            size={submittingSize}
          />
        ),
        disabled: children.props.disabled ?? isSubmitting,
        children:
          isSubmitting && submittingText
            ? submittingText
            : children.props.children,
      })}
    </>
  );
};

export default SubmitButton;
