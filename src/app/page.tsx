import Homepage from '@/components/Homepage';

import { getApiResponse } from '@/utils/shared/get-api-response';

import { NpmData, PageParams } from '@/types';

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is mock a ssr 500 test error');
  }

  // Fetch & cache data from 2 remote APIs test
  const [reactNpmData, nextJsNpmData] = await Promise.all([
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/react/rc',
      revalidate: 60 * 60 * 24, // 24 hours cache
      timeout: 5000, // 5 seconds
    }),
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/next/rc',
      revalidate: 0, // no cache
      timeout: 5000, // 5 seconds
    }),
  ]);

  return {
    reactNpmData,
    nextJsNpmData,
  };
};

const AppHome = async ({ searchParams }: PageParams) => {
  const slug = searchParams?.slug;
  const { reactNpmData, nextJsNpmData } = await loadDataFromApi(slug);

  return (
    <Homepage
      reactVersion={reactNpmData?.version}
      nextJsVersion={nextJsNpmData?.version}
    />
  );
};

export default AppHome;
