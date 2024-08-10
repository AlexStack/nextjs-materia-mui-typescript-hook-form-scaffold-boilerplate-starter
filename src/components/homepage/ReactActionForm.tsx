'use client';

import styled from '@emotion/styled';
import { Save } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useActionState, useOptimistic } from 'react';
import { z, ZodError } from 'zod';

import { useClientContext } from '@/hooks/useClientContext';
import { useSharedUtilContext } from '@/hooks/useSharedUtilContext';

import SubmitButton from '@/components/shared/SubmitButton';

import { FetchApiContext } from '@/constants';
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

const ReactActionForm: React.FC = () => {
  const apiEndpoint = '/api/test';
  const [apiResult, setApiResult] = React.useState<FormValues>();
  const [optimisticApiResult, setOptimisticApiResult] = useOptimistic<
    FormValues | undefined
  >(undefined);

  const { setAlertBarProps } = useSharedUtilContext();

  const { fetchCount, updateClientCtx } = useClientContext<FetchApiContext>();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );

  const resolveZodError = (error: ZodError): Record<string, string> => {
    const errors: Record<string, string> = {};
    error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        const field = err.path[0];
        errors[field as string] = err.message;
      }
    });
    return errors;
  };

  const submitFormFn = async (
    previousState: FormValues | undefined,
    formData: FormData
  ) => {
    const formFieldValues = Object.fromEntries(formData) as FormValues;

    try {
      const zodResult = zodSchema.safeParse(formFieldValues);
      if (!zodResult.success) {
        if (zodResult.error instanceof ZodError) {
          const newErrors = resolveZodError(zodResult.error);
          setFormErrors(newErrors);
        }
        setAlertBarProps({
          message: 'Please fix the form errors',
          severity: 'warning',
          autoHideSeconds: 4,
        });
        throw new Error('Invalid zodSchema form data');
      }
      setOptimisticApiResult(formFieldValues);
      setFormErrors({});
      const result = await getApiResponse<{
        reqData: FormValues;
      }>({
        apiEndpoint,
        method: 'POST',
        requestData: JSON.stringify(Object.fromEntries(formData)),
      });
      setApiResult(result?.reqData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAlertBarProps({
        message: 'Form submitted successfully',
        severity: 'success',
      });
      updateClientCtx({ fetchCount: fetchCount + 1 });
    } catch (error) {
      consoleLog('submitFormFn ERROR', error, formData);
      setAlertBarProps({
        message: 'Form submission failed',
        severity: 'error',
      });
    }

    return formFieldValues;
  };

  const [actionState, submitAction, isSubmitting] = useActionState(
    submitFormFn,
    {
      name: 'John Doe',
      email: 'john@react19.org',
    }
  );

  return (
    <StyledForm action={submitAction}>
      <Box sx={{ m: 2 }}>
        <TextField
          label='Name'
          name='name'
          size='small'
          defaultValue={actionState?.name || ''}
        />
        {!isSubmitting && formErrors.name && (
          <FormHelperText sx={{ textAlign: 'center' }}>
            {formErrors.name}
          </FormHelperText>
        )}
      </Box>

      <Box sx={{ m: 2 }}>
        <TextField
          label='Email'
          name='email'
          size='small'
          defaultValue={actionState?.email || ''}
        />
        {!isSubmitting && formErrors.email && (
          <FormHelperText sx={{ textAlign: 'center' }}>
            {formErrors.email}
          </FormHelperText>
        )}
      </Box>
      {optimisticApiResult && (
        <Box sx={{ m: 2, color: 'gray' }}>
          React19 useOptimistic() API result: {optimisticApiResult.name} &{' '}
          {optimisticApiResult.email}
        </Box>
      )}
      {apiResult && !isSubmitting && (
        <Box sx={{ m: 2, color: 'green' }}>
          React19 action-form API result from {apiEndpoint}: {apiResult.name} &{' '}
          {apiResult.email}
        </Box>
      )}

      <SubmitButton
        isSubmitting={isSubmitting}
        submittingText='Submitting, mock wait 5 seconds ...'
      >
        <Button variant='contained' type='submit' startIcon={<Save />}>
          Test react19 form action
        </Button>
      </SubmitButton>

      <Box sx={{ m: 5 }}>
        <Stack
          sx={{ mb: 3 }}
          direction='row'
          spacing={1}
          justifyContent='center'
          alignItems='center'
        >
          <div>Total fetch count from ReactActionForm.tsx:</div>
          <Avatar
            sx={{
              bgcolor: purple[500],
              width: 22,
              height: 22,
              fontSize: '0.8rem',
            }}
            variant='circular'
          >
            {fetchCount}
          </Avatar>
        </Stack>
      </Box>
    </StyledForm>
  );
};

export default ReactActionForm;
