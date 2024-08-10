/* eslint-disable @next/next/no-img-element */

'use client';
import styled from '@emotion/styled';
import { Autorenew, Send } from '@mui/icons-material';
import { css, keyframes } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState, useTransition } from 'react';

import { useClientContext } from '@/hooks/useClientContext';
import { useSharedUtilContext } from '@/hooks/useSharedUtilContext';

import SubmitButton from '@/components/shared/SubmitButton';

import { FetchApiContext } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';
import { getApiResponse } from '@/utils/shared/get-api-response';

const DisplayRandomPicture = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { fetchCount, updateClientCtx } = useClientContext<FetchApiContext>();
  const { setAlertBarProps } = useSharedUtilContext();
  const renderCountRef = React.useRef(0);
  const [isPending, startTransition] = useTransition();

  const fetchRandomPicture = async () => {
    startTransition(async () => {
      if (isPending) {
        setAlertBarProps({
          message: 'Please wait for the current fetch to complete',
          severity: 'warning',
        });
        return;
      }
      setError('');

      try {
        const response = await getApiResponse<Response & { url: string }>({
          apiEndpoint: 'https://picsum.photos/300/160',
          timeout: 5001,
        });

        if (!response?.url) {
          throw new Error('Error fetching the image, no response url');
        }

        setImageUrl(response.url);
        updateClientCtx({ fetchCount: fetchCount + 1 });
        setAlertBarProps({
          message: 'A random picture fetched successfully',
          severity: 'info',
          onClose: () => {
            consoleLog('Alert bar closed');
          },
        });
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Error fetching the image';

        setError(errorMsg);
        setAlertBarProps({
          message: errorMsg,
          severity: 'error',
        });
      } finally {
        // setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (renderCountRef.current === 0 && !isPending) {
      fetchRandomPicture();
    }
    renderCountRef.current += 1;
  });

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ position: 'relative', width: '300px', margin: '0 auto' }}
    >
      {imageUrl && (
        <Avatar
          alt='DisplayRandomPicture'
          src={imageUrl}
          variant='square'
          sx={{ width: 300, height: 150, borderRadius: '10px' }}
        />
      )}
      {error && <p>{error}</p>}
      <div>
        {isPending && <span>Loading...</span>} Component Render Count:{' '}
        {renderCountRef.current + 1}
      </div>

      <SubmitButton
        isSubmitting={isPending}
        submittingText='Fetching Picture ...'
      >
        <Button
          variant='contained'
          endIcon={<Send />}
          onClick={fetchRandomPicture}
          disabled={isPending}
          color='secondary'
        >
          Get Another Picture
        </Button>
      </SubmitButton>
      {imageUrl && (
        <StyledRefreshButton
          onClick={fetchRandomPicture}
          loading={isPending ? 1 : 0}
        >
          <Avatar sx={{ width: 24, height: 24 }}>
            <Autorenew />
          </Avatar>
        </StyledRefreshButton>
      )}
    </Stack>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledRefreshButton = styled.div<{ loading: number }>`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.5rem !important;
  pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
  opacity: ${({ loading }) => (loading ? '0.6' : '1')};
  cursor: ${({ loading }) => (loading ? 'not-allowed' : 'pointer')};
  svg {
    width: 20px;
    height: 20px;
    animation: ${({ loading }) =>
      loading
        ? css`
            ${spin} 2s linear infinite
          `
        : 'none'};
  }
  :hover {
    svg {
      path {
        fill: ${purple[500]};
      }
    }
    .MuiAvatar-circular {
      background-color: ${purple[50]};
    }
  }
`;

export default DisplayRandomPicture;
