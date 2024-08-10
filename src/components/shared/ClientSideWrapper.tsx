'use client';

import { ClientProvider } from '@/hooks/useClientContext';
import { SharedUtilProvider } from '@/hooks/useSharedUtilContext';

const ClientSideWrapper = ({
  defaultContextValue,
  children,
}: {
  defaultContextValue: unknown;
  children: React.ReactNode;
}) => {
  return (
    <ClientProvider defaultValue={defaultContextValue}>
      <SharedUtilProvider>{children}</SharedUtilProvider>
    </ClientProvider>
  );
};

export default ClientSideWrapper;
