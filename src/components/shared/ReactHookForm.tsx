'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormHelperText } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { consoleLog } from '@/utils/shared/console-log';
import { getApiResponse } from '@/utils/shared/get-api-response';

const zodSchema = z.object({
  name: z.string().min(5).nonempty({ message: 'Name is required' }),
  email: z.string().min(10).email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof zodSchema>;

const ReactHookForm: React.FC = () => {
  const apiEndpoint = '/api/test';
  const [apiResult, setApiResult] = React.useState<FormValues>();

  const {
    handleSubmit,
    control,
    formState: { errors },
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
    } catch (error) {
      consoleLog('handleSubmit ERROR', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ m: 2 }}>
        <label>Name:</label>
        <Controller
          name='name'
          control={control}
          defaultValue=''
          render={({ field }) => <input {...field} />}
        />
        {errors.name && (
          <FormHelperText sx={{ textAlign: 'center' }}>
            {errors.name.message}
          </FormHelperText>
        )}
      </Box>

      <Box sx={{ m: 2 }}>
        <label>Email:</label>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => <input {...field} />}
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
      <Button variant='contained' type='submit'>
        Test react hook form with zod
      </Button>
    </form>
  );
};

export default ReactHookForm;
