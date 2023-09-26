import Homepage from '@/components/Homepage';

import { getApiResponse } from '@/utils/shared/get-api-response';

import { PageParams } from '@/types';

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is a ssr 500 test error');
  }

  // Fetch & cache data from 2 remote APIs test
  const [reactNpmData, nextJsNpmData] = await Promise.all([
    getApiResponse<{ version: string }>({
      apiEndpoint: 'https://registry.npmjs.org/react/latest',
      revalidate: 60 * 60 * 24, // 24 hours cache
    }),
    getApiResponse<{ version: string }>({
      apiEndpoint: 'https://registry.npmjs.org/next/latest',
      revalidate: 0, // no cache
    }),
  ]);

  return {
    reactVersion: reactNpmData?.version,
    nextJsVersion: nextJsNpmData?.version,
  };
};

const AppHome = async ({ searchParams }: PageParams) => {
  const apiResult = await loadDataFromApi(searchParams?.['slug']);

  return (
    <Homepage
      reactVersion={apiResult?.reactVersion}
      nextJsVersion={apiResult?.nextJsVersion}
    />
  );
};

export default AppHome;
