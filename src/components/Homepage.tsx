import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import BottomLinks from '@/components/homepage/BottomLinks';
import DisplayRandomPicture from '@/components/homepage/DisplayRandomPicture';
import PageFooter from '@/components/homepage/PageFooter';
import ReactActionForm from '@/components/homepage/ReactActionForm';
import ReactHookForm from '@/components/homepage/ReactHookForm';
import ClientSideWrapper from '@/components/shared/ClientSideWrapper';

import { FETCH_API_CTX_VALUE, SITE_CONFIG } from '@/constants';

export default function Homepage({
  reactVersion = 'unknown',
  nextJsVersion = 'unknown',
}) {
  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <AutoAwesome
            className='page-title'
            sx={{ width: '3rem', height: '3rem' }}
          />
          <Typography
            variant='h5'
            component='h1'
            gutterBottom
            className='page-title'
          >
            {SITE_CONFIG.title}
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            className='page-subtitle'
          >
            {SITE_CONFIG.description}
          </Typography>

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'green', mt: 3 }}
          >
            Fetch & cache data from 2 remote APIs test: <br />
            The React RC version is {reactVersion}, and the NextJs RC version is{' '}
            {nextJsVersion}
            <Box sx={{ color: 'grey', fontSize: 10 }}>
              On dev environment, you can see how long it takes on console, e.g.
              getApiResponse: 0.05s
            </Box>
          </Typography>

          <Box sx={{ m: 5, a: { color: 'blue' } }}>
            <Link
              href='/api/test?from=github&nextjs=yes&mui=yes&tailwind=no'
              target='_blank'
            >
              Test local NextJs API /api/test method GET with parameters
            </Link>
          </Box>

          <Box sx={{ m: 5 }}>
            <h4>
              Test local NextJs API /api/test POST method (client-side
              component)
            </h4>
            <ClientSideWrapper defaultContextValue={FETCH_API_CTX_VALUE}>
              <ReactActionForm />
              <ReactHookForm />
              <DisplayRandomPicture />
              <BottomLinks />
            </ClientSideWrapper>
          </Box>
        </Box>
      </section>
      <PageFooter />
    </main>
  );
}
