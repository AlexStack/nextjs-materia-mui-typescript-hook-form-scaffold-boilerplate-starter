import { ReactNode } from 'react';

export interface FetchApiContext {
  topError: ReactNode;
  fetchCount: number;
}

export const FETCH_API_CTX_VALUE: FetchApiContext = {
  topError: null,
  fetchCount: 0,
};

// You can add more context interface & values here and use them in different places
export interface AnotherContext {
  someValue: string;
  secondValue?: number;
}

export const ANOTHER_CTX_VALUE: AnotherContext = {
  someValue: 'default value',
  secondValue: 0,
};
