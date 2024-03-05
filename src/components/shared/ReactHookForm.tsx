'use client';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from '@mui/icons-material';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { AlertBar, AlertBarProps } from '@/components/shared/AlertBar';

import { consoleLog } from '@/utils/shared/console-log';
import { getApiResponse } from '@/utils/shared/get-api-response';

const zodSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain at least 3 characters' })
    .nonempty({ message: 'Name is required' }),
  email: z
    .string()
    .min(10, { message: 'Email must contain at least 10 characters' })
    .email({ message: 'Invalid email address' }),
});

const StyledForm = styled.form`
  .MuiFormHelperText-root {
    text-align: center;
    color: darkred;
    margin-bottom: 1rem;
  }
`;

type FormValues = z.infer<typeof zodSchema>;

const ReactHookForm: React.FC = () => {
  const apiEndpoint = '/api/test';
  const [apiResult, setApiResult] = React.useState<FormValues>();

  const [alertBarProps, setAlertBarProps] = useState<AlertBarProps>({
    message: '',
    severity: 'info',
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await getApiResponse<{
        reqData: FormValues;
      }>({
        apiEndpoint,
        method: 'POST',
        requestData: JSON.stringify(data),
      });
      setApiResult(result?.reqData);
      consoleLog('getApiResponse result', result, errors);

      setAlertBarProps({
        message: 'Form submitted successfully',
        severity: 'success',
      });
    } catch (error) {
      consoleLog('handleSubmit ERROR', error);

      setAlertBarProps({
        message: 'Form submission failed',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (!isValid && Object.keys(errors).length > 0) {
      setAlertBarProps({
        message: 'Please fix the form errors',
        severity: 'warning',
        autoHideSeconds: 4,
      });
    }
  }, [isValid, errors]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ m: 2 }}>
        {/* <label>Name:</label> */}
        <Controller
          name='name'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField label='Name' {...field} size='small' />
          )}
        />
        {errors.name && (
          <FormHelperText sx={{ textAlign: 'center' }}>
            {errors.name.message}
          </FormHelperText>
        )}
      </Box>

      <Box sx={{ m: 2 }}>
        {/* <label>Email:</label> */}
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField label='Email' {...field} size='small' />
          )}
        />
        {errors.email && (
          <FormHelperText sx={{ textAlign: 'center' }}>
            {errors.email.message}
          </FormHelperText>
        )}
      </Box>
      {apiResult && (
        <Box sx={{ m: 2, color: 'green' }}>
          API result from {apiEndpoint}: {apiResult.name} & {apiResult.email}
        </Box>
      )}
      <Button variant='contained' type='submit' startIcon={<Save />}>
        Test react hook form with zod
      </Button>

      <AlertBar
        onClose={() => setAlertBarProps({ message: '' })}
        {...alertBarProps}
      />
    </StyledForm>
  );
};

export default ReactHookForm;
