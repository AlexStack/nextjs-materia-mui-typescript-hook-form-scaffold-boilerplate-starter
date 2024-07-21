/* eslint-disable @next/next/no-img-element */

'use client';
import styled from '@emotion/styled';
import { Autorenew, Send } from '@mui/icons-material';
import { css, keyframes } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import { useAlertBar } from '@/hooks/useAlertBar';
import { useClientContext } from '@/hooks/useClientContext';

import SubmitButton from '@/components/shared/SubmitButton';

import { getApiResponse } from '@/utils/shared/get-api-response';

const DisplayRandomPicture = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { fetchCount, updateClientCtx } = useClientContext();
  const { setAlertBarProps, renderAlertBar } = useAlertBar();
  const renderCountRef = React.useRef(0);

  const fetchRandomPicture = async () => {
    if (loading) {
      setAlertBarProps({
        message: 'Please wait for the current fetch to complete',
        severity: 'warning',
      });
      return;
    }
    setLoading(true);
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
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Error fetching the image';

      setError(errorMsg);
      setAlertBarProps({
        message: errorMsg,
        severity: 'error',
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (renderCountRef.current === 0 && !loading) {
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
      {error && <p>{error}</p>}
      {imageUrl && (
        <Avatar
          alt='DisplayRandomPicture'
          src={imageUrl}
          variant='square'
          sx={{ width: 300, height: 150, borderRadius: '10px' }}
        />
      )}
      <div>
        {loading && <span>Loading...</span>} Component Render Count:{' '}
        {renderCountRef.current + 1}
      </div>

      <SubmitButton
        isSubmitting={loading}
        submittingText='Fetching Picture ...'
      >
        <Button
          variant='contained'
          endIcon={<Send />}
          onClick={fetchRandomPicture}
          disabled={loading}
          color='secondary'
        >
          Get Another Picture
        </Button>
      </SubmitButton>
      {imageUrl && (
        <StyledRefreshButton onClick={fetchRandomPicture} loading={loading}>
          <Avatar sx={{ width: 24, height: 24 }}>
            <Autorenew />
          </Avatar>
        </StyledRefreshButton>
      )}
      {renderAlertBar()}
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
const StyledRefreshButton = styled.div<{ loading?: boolean }>`
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
