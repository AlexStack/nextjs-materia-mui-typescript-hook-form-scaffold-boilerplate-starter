'use client';

import React, { createContext, ReactNode, useContext } from 'react';

import { useAlertBar } from '@/hooks/useAlertBar';
import useConfirmationDialog, {
  ConfirmationDialogProps,
} from '@/hooks/useConfirmDialog';

import { AlertBarProps } from '@/components/shared/AlertBar';

export const OUTSIDE_CLIENT_PROVIDER_ERROR =
  'Cannot be used outside ClientProvider!';

export interface SharedUtilContextType {
  setAlertBarProps: (props: AlertBarProps) => void;
  openConfirmDialog: (props: ConfirmationDialogProps) => void;
}

export const SharedUtilContext = createContext<
  SharedUtilContextType | undefined
>(undefined);

export const useSharedUtilContext = (): SharedUtilContextType => {
  const context = useContext(SharedUtilContext);
  if (context === undefined) {
    throw new Error(OUTSIDE_CLIENT_PROVIDER_ERROR);
  }

  return context as SharedUtilContextType;
};

/**
 * Provides a shared utility context for components.
 *
 * Add the frequently used utility here to avoid rendering them in every component.
 * They only need to be rendered once in the root component and can be used anywhere.
 */
export const SharedUtilProvider = ({ children }: { children: ReactNode }) => {
  const { renderAlertBar, setAlertBarProps } = useAlertBar();

  const { renderConfirmationDialog, openConfirmDialog } =
    useConfirmationDialog();

  return (
    <SharedUtilContext.Provider
      value={{
        setAlertBarProps,
        openConfirmDialog,
      }}
    >
      {children}
      {renderAlertBar()}
      {renderConfirmationDialog()}
    </SharedUtilContext.Provider>
  );
};
