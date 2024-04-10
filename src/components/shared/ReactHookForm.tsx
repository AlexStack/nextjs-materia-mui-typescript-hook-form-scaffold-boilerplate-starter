'use client';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPlan, Save } from '@mui/icons-material';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import useConfirmationDialog from '@/hooks/useConfirmDialog';

import { AlertBar, AlertBarProps } from '@/components/shared/AlertBar';
import SubmitButton from '@/components/shared/SubmitButton';

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [alertBarProps, setAlertBarProps] = useState<AlertBarProps>({
    message: '',
    severity: 'info',
  });

  const dialog = useConfirmationDialog();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const result = await getApiResponse<{
        reqData: FormValues;
      }>({
        apiEndpoint,
        method: 'POST',
        requestData: JSON.stringify(data),
      });
      setApiResult(result?.reqData);
      consoleLog('getApiResponse result', result, errors);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);

      setAlertBarProps({
        message: 'Form submitted successfully',
        severity: 'success',
      });
    } catch (error) {
      consoleLog('handleSubmit ERROR', error);
      setIsSubmitting(false);
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
      {apiResult && !isSubmitting && (
        <Box sx={{ m: 2, color: 'green' }}>
          API result from {apiEndpoint}: {apiResult.name} & {apiResult.email}
        </Box>
      )}

      <SubmitButton
        isSubmitting={isSubmitting}
        submittingText='Fetching API ...'
      >
        <Button variant='contained' type='submit' startIcon={<Save />}>
          Test react hook form with zod
        </Button>
      </SubmitButton>

      <Box sx={{ m: 5 }}>
        <Button
          variant='outlined'
          onClick={() => {
            const randomNumber = Math.floor(Math.random() * 90) + 10;
            dialog.openConfirmDialog({
              title: 'Change form name',
              content: `Are you sure to change above form name to Alex ${randomNumber} and submit?`,
              onConfirm: () => {
                setValue('name', `Alex ${randomNumber}`);
                setValue('email', 'alex@test.com');
                handleSubmit(onSubmit)();
              },
            });
          }}
          endIcon={<NextPlan />}
        >
          Test MUI confirmation dialog
        </Button>
      </Box>

      <AlertBar
        onClose={() => setAlertBarProps({ message: '' })}
        {...alertBarProps}
      />

      {dialog.renderConfirmationDialog()}
    </StyledForm>
  );
};

export default ReactHookForm;
