import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import PageFooter from '@/components/PageFooter';

import { SITE_CONFIG } from '@/constant';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is a ssr 500 test error');
  }
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  await loadDataFromApi(searchParams['slug']);
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
              href='https://vercel.com/new/git/external?repository-url=https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter'
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
