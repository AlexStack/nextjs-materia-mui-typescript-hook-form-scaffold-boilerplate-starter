import { renderHook } from '@testing-library/react';
import React, { act } from 'react';

import { ClientProvider, useClientContext } from './useClientContext';

describe('useClientContext', () => {
  it('should not be used outside ClientProvider', () => {
    const { result } = renderHook(() => useClientContext());
    expect(() => {
      result.current.updateClientCtx({ fetchCount: 66 });
    }).toThrow('Cannot be used outside ClientProvider');
  });

  it('should provide the correct initial context values', () => {
    const ctxValue = {
      topError: 'SWW Error',
      bmStatus: 'Live',
      fetchCount: 85,
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ClientProvider value={ctxValue}>{children}</ClientProvider>
    );

    const { result } = renderHook(() => useClientContext(), {
      wrapper,
    });

    expect(result.current.topError).toBe(ctxValue.topError);
    expect(result.current.fetchCount).toBe(ctxValue.fetchCount);
  });

  it('should update the context values', () => {
    const ctxValue = {
      topError: 'SWW Error',
      fetchCount: 85,
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ClientProvider value={ctxValue}>{children}</ClientProvider>
    );

    const { result } = renderHook(() => useClientContext(), {
      wrapper,
    });

    const newCtxValue = {
      topError: '',
    };

    act(() => {
      result.current.updateClientCtx(newCtxValue);
    });

    expect(result.current.topError).toBe(newCtxValue.topError);
    expect(result.current.fetchCount).toBe(ctxValue.fetchCount);
  });
});
