import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

//components
import DragAndDrop from './dragAndDrop';

const validationSchema = yup.object({
  message: yup.string().required('Message is required'),
  attachments: yup.mixed()
});

export function SupportMessageReplyForm({ email, customerId, conversationId }) {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      message: '',
      attachments: []
    },
    resolver: yupResolver(validationSchema)
  });

  const handleAddAttachment = (file) => {
    console.log(file);

    if (!file) return null;

    let newAttachments = getValues('attachments');

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      const fileFormatted = {
        fileName: file.name,
        mimeType: file.type,
        data: String(reader.result).split(',')[1]
      };
      newAttachments = [...newAttachments, fileFormatted];

      setValue('attachments', newAttachments);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      toast.error('Error converting image for upload, please try again');
    };
  };

  const onSubmit = async ({ message, attachments }) => {
    const payload = {
      type: 'customer',
      text: message,
      customer: {
        id: customerId,
        email: email
      },
      imported: true,
      attachments: attachments
    };

    console.log(payload);

    const url =
      process.env.GATSBY_FIREBASE_FUNCTIONS_URL +
      '/api/v1/freescout/create_thread/' +
      conversationId;

    await toast
      .promise(axios.post(url, payload), {
        loading: 'Sending message...',
        success: 'Message sent successfully',
        error:
          'Error creating message, please try again or email us at help@hummingbirdhammocks.com'
      })
      .then((response) => {
        if (response) {
          queryClient.invalidateQueries({ queryKey: ['tickets'] }), reset({});
        }
      })
      .catch((error) => {
        console.log('contactForm_error', error);
      });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Add Message"
                variant="outlined"
                {...register('message')}
                fullWidth
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}>
                <DragAndDrop handleSave={handleAddAttachment} />
                <LoadingButton
                  size={'large'}
                  variant={'outlined'}
                  type={'submit'}
                  loading={isSubmitting}>
                  Send Message
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
