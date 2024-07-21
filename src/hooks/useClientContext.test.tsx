import { renderHook } from '@testing-library/react';
import React, { act } from 'react';

import {
  ClientProvider,
  OUTSIDE_CLIENT_PROVIDER_ERROR,
  useClientContext,
} from './useClientContext';

describe('useClientContext', () => {
  it('should not be used outside ClientProvider', () => {
    try {
      renderHook(() => useClientContext());
    } catch (error) {
      expect(error).toEqual(new Error(OUTSIDE_CLIENT_PROVIDER_ERROR));
    }
  });

  it('should provide the correct initial context values', () => {
    const defaultCtxValue = {
      status: 'Pending',
      topError: '',
      fetchCount: 0,
    };
    const ctxValue = {
      topError: 'SWW Error',
      status: 'Live',
      fetchCount: 85,
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ClientProvider value={ctxValue} defaultValue={defaultCtxValue}>
        {children}
      </ClientProvider>
    );

    const { result } = renderHook(
      () => useClientContext<typeof defaultCtxValue>(),
      {
        wrapper,
      }
    );

    expect(result.current.topError).toBe(ctxValue.topError);
    expect(result.current.fetchCount).toBe(ctxValue.fetchCount);
  });

  it('should update the context values', () => {
    const defaultCtxValue = {
      picUrl: '',
      loading: false,
      total: 0,
    };
    const ctxValue = {
      picUrl: 'https://picsum.photos/300/160',
      loading: true,
      total: 3,
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ClientProvider value={ctxValue} defaultValue={defaultCtxValue}>
        {children}
      </ClientProvider>
    );

    const { result } = renderHook(
      () => useClientContext<typeof defaultCtxValue>(),
      {
        wrapper,
      }
    );

    const newCtxValue = {
      picUrl: 'https://picsum.photos/200/150',
      loading: false,
    };

    act(() => {
      result.current.updateClientCtx(newCtxValue);
    });

    expect(result.current.picUrl).toBe(newCtxValue.picUrl);
    expect(result.current.total).toBe(ctxValue.total); // not updated
    expect(result.current.loading).toBe(newCtxValue.loading);
  });
});
