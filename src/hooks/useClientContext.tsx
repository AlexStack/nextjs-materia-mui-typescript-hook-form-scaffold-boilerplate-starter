'use client';

import React, { ReactNode, useCallback, useState } from 'react';

export interface ClientContextData {
  topError: ReactNode;
  fetchCount: number;
  updateClientCtx: (props: Partial<ClientContextData>) => void;
}

const CLIENT_CTX_VALUE: ClientContextData = {
  topError: null,
  fetchCount: 0,
  updateClientCtx: () => {
    // console.error('Cannot be used outside ClientProvider');
    throw new Error('Cannot be used outside ClientProvider');
  },
};

/**
 * You should change the above interface and default value as per your requirement
 * No need to change the below code
 * Client-side component usage example:
 * const clientContext = useClientContext();
 * clientContext.updateClientCtx({ topError: 'Error message' });
 * clientContext.updateClientCtx({ totalRenderCount: 10 });
 * The total render count is: clientContext.totalRenderCount
 */
export const ClientContext =
  React.createContext<ClientContextData>(CLIENT_CTX_VALUE);

export const useClientContext = (): ClientContextData => {
  const context = React.useContext(ClientContext);
  if (!context) throw new Error('Cannot be used outside ClientProvider');

  return context;
};

export const ClientProvider = ({
  children,
  value = CLIENT_CTX_VALUE,
}: {
  children: ReactNode;
  value?: Partial<ClientContextData>;
}) => {
  const [contextValue, setContextValue] = useState(value);

  const updateContext = useCallback(
    (newCtxValue: Partial<ClientContextData>) => {
      setContextValue((prevContextValue) => ({
        ...prevContextValue,
        ...newCtxValue,
      }));
    },
    [setContextValue]
  );

  return (
    <ClientContext.Provider
      value={{
        ...CLIENT_CTX_VALUE,
        ...contextValue,
        updateClientCtx: updateContext,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
