import React from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Grid,
  Stack,
  TextField
} from "@mui/material"
import { LoadingButton } from '@mui/lab';

import DragAndDrop from "./dragAndDrop";


const validationSchema = yup.object({
  message: yup
    .string()
    .required('Message is required'),
  attachments: yup
    .mixed()
});

export function SupportMessageReplyForm({ email, customerId, conversationId }) {
  const [submitting, setSubmitting] = React.useState(false);

  const initialValues = {
    message: '',
    attachments: [],
  };

  const handleAddAttachment = (file) => {
    console.log(file);

    if (!file) return null;

    let newAttachments = formik.values.attachments;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      const fileFormatted = {
        "fileName": file.name,
        "mimeType": file.type,
        "data": String(reader.result).split(',')[1]
      }
      newAttachments = [...newAttachments, fileFormatted]

      formik.setFieldValue("attachments", newAttachments);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      toast.error("Error converting image for upload, please try again")
    };
  }

  const onSubmit = async ({ message, attachments }) => {
    setSubmitting(true);

    let payload = {
      "type": "customer",
      "text": message,
      "customer": {
        "id": customerId,
        "email": email
      },
      "imported": true,
      "attachments": attachments
    }

    console.log(payload)

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/create_thread/' + conversationId;

    await axios.post(url, payload)
      .then((response) =>
        console.log(response),
        toast.success("Message sent successfully"),
        formik.resetForm({})
      )
      .catch((error) => {
        console.log("contactForm ", error)
        toast.error("Error creating message, please try again or email us at support@hummingbirdhammocks.com")
      });

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Add Message"
                variant="outlined"
                name={'message'}
                fullWidth
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <DragAndDrop handleSave={handleAddAttachment} />
                <LoadingButton size={'large'} variant={'outlined'} type={'submit'} loading={submitting}>
                  Send Message
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box >
  )
}