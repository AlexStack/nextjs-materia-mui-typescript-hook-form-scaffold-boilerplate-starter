'use client'; // Error components must be Client Components

import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button } from '@mui/material';
import * as React from 'react';

import { consoleLog } from '@/utils/shared/console-log';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    consoleLog('error.tsx', error);
  }, [error]);

  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <WarningIcon />
          <h1>Oops, something went wrong!</h1>
          <h5>change this in app/error.tsx</h5>
          <Box sx={{ m: 5 }}>
            <Button onClick={reset}>Try again</Button>
          </Box>
          <a href='/?slug=homepage'>Back to home</a>
        </Box>
      </section>
    </main>
  );
}
