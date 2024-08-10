'use client';

import { Box } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import { useSharedUtilContext } from '@/hooks/useSharedUtilContext';

const BottomLinks = () => {
  const { openConfirmDialog } = useSharedUtilContext();

  return (
    <section>
      <Box sx={{ m: 5 }}>
        <Link
          href='https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter'
          target='_blank'
        >
          See the Github repository page
        </Link>
      </Box>
      <Box sx={{ m: 5, a: { color: 'red' } }}>
        <Link
          href='https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FAlexStack%2Fnextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter&showOptionalTeamCreation=false'
          target='_blank'
          onClick={(e) => {
            e.preventDefault();
            openConfirmDialog({
              title: 'Copy this repository to your Vercel',
              content:
                'Please make sure you have a Vercel account and login first',
              onConfirm: () => {
                window.open((e.target as HTMLAnchorElement).href, '_blank');
              },
              hideCancelButton: true,
            });
          }}
        >
          Click here to deploy a demo site to your Vercel in 1 minute
        </Link>
      </Box>

      <Box sx={{ m: 5 }}>
        <Link
          href='/test-page-not-exists'
          onClick={(e) => {
            e.preventDefault();
            openConfirmDialog({
              title: 'Mock a page not found',
              content:
                'This is an URL not exists, click OK you will see a custom 404 error page. You can also test the 404 page by typing a random URL in the browser address bar.',
              onConfirm: () => {
                window.open((e.target as HTMLAnchorElement).href, '_blank');
              },
              hideCancelButton: true,
            });
          }}
        >
          Test 404 page not found (mock file not exists)
        </Link>
      </Box>
      <Box sx={{ m: 5 }}>
        <a
          href='/?slug=testError500'
          onClick={(e) => {
            e.preventDefault();
            openConfirmDialog({
              title: 'Mock a server side error',
              content:
                'This is mock throw a server side error, click OK you will see a custom 500 error page. ',
              onConfirm: () => {
                window.open((e.target as HTMLAnchorElement).href, '_blank');
              },
            });
          }}
        >
          Test 500 error page (mock server side throw error)
        </a>
      </Box>
    </section>
  );
};

export default BottomLinks;
