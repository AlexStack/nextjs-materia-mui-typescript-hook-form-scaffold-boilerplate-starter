import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import PageFooter from '@/component/PageFooter';
import { SITE_CONFIG } from '@/constant';
import { getApiResponse } from '@/util/shared/get-api-response';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is a ssr 500 test error');
  }

  return await getApiResponse<{ version: string }>({
    apiEndpoint: 'https://registry.npmjs.org/react/latest',
  });
};

interface HomePageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const apiResult = await loadDataFromApi(searchParams['slug']);

  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <PinDropIcon />
          <Typography variant='h5' component='h1' gutterBottom>
            {SITE_CONFIG.title}
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            {SITE_CONFIG.description}
          </Typography>

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'green', mt: 3 }}
          >
            Get data from api test: The latest React version is{' '}
            {apiResult?.version}
          </Typography>

          <Box sx={{ m: 5 }}>
            <Link
              href='https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter'
              target='_blank'
            >
              See the Github repository page
            </Link>
          </Box>
          <Box sx={{ m: 5 }}>
            <Link
              href='https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FAlexStack%2Fnextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter&showOptionalTeamCreation=false'
              target='_blank'
            >
              Click here to deploy a demo site to your Vercel in 1 minute
            </Link>
          </Box>
          <Box sx={{ m: 5 }}>
            <Link href='/test-page-not-exists'>Test 404 page not found</Link>
          </Box>
          <Box sx={{ m: 5 }}>
            <Link href='/?slug=testError500'>Test 500 error page</Link>
          </Box>
        </Box>
      </section>
      <PageFooter />
    </main>
  );
}
