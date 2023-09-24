import { Box } from '@mui/material';
import * as React from 'react';

const PageFooter = () => {
  return (
    <section>
      <Box component='footer' sx={{ m: 5, textAlign: 'center' }}>
        PageFooter.tsx © {new Date().getFullYear()} Boilerplate live example:
        <a href='https://hihb.com' target='_blank'>
          HiHB
        </a>
      </Box>
    </section>
  );
};

export default PageFooter;
