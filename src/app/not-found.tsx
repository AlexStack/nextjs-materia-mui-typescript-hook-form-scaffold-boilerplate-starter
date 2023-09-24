import { Box } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <Box sx={{ textAlign: 'center' }}>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1>Page Not Found</h1>
          <h5>change this in app/not-found.tsx</h5>
          <Link href='/'>Back to home</Link>
        </div>
      </Box>
    </main>
  );
}
