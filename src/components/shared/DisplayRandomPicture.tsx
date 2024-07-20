/* eslint-disable @next/next/no-img-element */

'use client';
import styled from '@emotion/styled';
import { Autorenew, Send } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import { useAlertBar } from '@/hooks/useAlertBar';
import { useClientContext } from '@/hooks/useClientContext';

import SubmitButton from '@/components/shared/SubmitButton';

const StyledRefreshButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.5rem;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
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

const DisplayRandomPicture = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { fetchCount, updateClientCtx } = useClientContext();
  const { setAlertBarProps, renderAlertBar } = useAlertBar();
  const renderCountRef = React.useRef(0);

  const fetchRandomPicture = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://picsum.photos/300/150');
      if (!response.ok) {
        throw new Error('Error fetching the image');
      }
      setImageUrl(response.url);
      updateClientCtx({ fetchCount: fetchCount + 1 });
      setAlertBarProps({
        message: 'A random picture fetched successfully',
        severity: 'info',
      });
    } catch (error) {
      setError('Error fetching the image');
      setAlertBarProps({
        message: 'Error fetching the image',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (renderCountRef.current === 0) {
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
        {renderCountRef.current}
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
      <StyledRefreshButton onClick={fetchRandomPicture}>
        <Avatar sx={{ width: 24, height: 24 }}>
          <Autorenew />
        </Avatar>
      </StyledRefreshButton>
      {renderAlertBar()}
    </Stack>
  );
};

export default DisplayRandomPicture;
