import { blue, grey } from '@mui/material/colors';

export const SITE_CONFIG = {
  title: 'NextJs 13.x + MUI 5.x + TypeScript Starter',
  description:
    'The scaffold for NextJs 13.x (App Router), React Hook Form, Material UI(MUI 5.x),Typescript and ESLint, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  /** Without additional '/' on the end, e.g. https://hihb.com */
  url: 'https://hihb.com',
};

export const HIDE_DEBUG_ARY = [
  // 'getApiResponse',
  'getMongoDbApiData',
];

export const GLOBAL_STYLES = {
  body: { margin: 4 },
  '.page-title': { color: 'darkblue' },
  '.page-subtitle': { color: grey[600] },
  a: {
    textDecoration: 'underline',
    textDecorationColor: blue[800],
    color: blue['700'],
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.8',
    letterSpacing: '0.00938em',
  },
};
