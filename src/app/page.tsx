import Homepage from '@/component/Homepage';
import { getApiResponse } from '@/util/shared/get-api-response';

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is a ssr 500 test error');
  }

  return await getApiResponse<{ version: string }>({
    apiEndpoint: 'https://registry.npmjs.org/react/latest',
  });
};

interface AppHomeProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function AppHome({ searchParams }: AppHomeProps) {
  const apiResult = await loadDataFromApi(searchParams['slug']);

  return <Homepage reactVersion={apiResult?.version} />;
}
