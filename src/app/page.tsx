import Homepage from '@/component/Homepage';
import { getApiResponse } from '@/util/shared/get-api-response';

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

interface AppHomeProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function AppHome({ searchParams }: AppHomeProps) {
  const apiResult = await loadDataFromApi(searchParams['slug']);

  return (
    <Homepage
      reactVersion={apiResult?.reactVersion}
      nextJsVersion={apiResult?.nextJsVersion}
    />
  );
}
