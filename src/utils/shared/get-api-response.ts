import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

/**
 * Makes an API request and returns the response data.
 *
 * @param apiEndpoint - The API endpoint URL.
 * @param requestData - The request data to be sent in the request body.
 * @param method - The HTTP method for the request (default: 'GET').
 * @param revalidate - The time in seconds to cache the data (default: 3600 seconds in production, 120 seconds otherwise).
 * @param headers - The headers to be included in the request.
 * @param timeout - The timeout in milliseconds for the request (default: 100000 = 100 seconds).
 * @returns The response data from the API.
 * @throws An error if the API request fails or times out.
 */
export const getApiResponse = async <T>({
  apiEndpoint,
  requestData,
  method = 'GET',
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
  headers,
  timeout = 100000, // 100 seconds
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  revalidate?: number;
  headers?: HeadersInit;
  timeout?: number;
}) => {
  try {
    const startTime = Date.now();
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(apiEndpoint, {
      method,
      body: requestData,
      headers,
      next: {
        revalidate,
      },
      signal,
    });
    if (!response.ok) {
      consoleLog('🚀 Debug getApiResponse requestData:', requestData);

      throw new Error(
        `😢 getApiResponse failed: ${response.status}/${response.statusText} - ${apiEndpoint}`
      );
    }
    const duration = Date.now() - startTime;

    consoleLog(
      `getApiResponse: ${(duration / 1000).toFixed(2)}s ${
        duration > 2000 ? '💔' : '-'
      } ${apiEndpoint}`
    );
    clearTimeout(timeoutId);
    // if is not valid JSON, return response
    if (!response.headers.get('content-type')?.includes('application/json')) {
      return response as T;
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Fetch request timed out: ' + (timeout / 1000).toFixed(1) + ' s'
      );
    }
    consoleLog('getApiResponse error:', error);
  }

  return null;
};
