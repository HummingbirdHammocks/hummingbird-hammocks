import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import { navigate } from "gatsby"
import * as yup from 'yup';
import { useMutation, gql, useQuery } from "@apollo/client"
import { LoadingButton } from '@mui/lab';
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  useMediaQuery
} from "@mui/material"

import { UserContext } from "contexts"
import {
  AccountLayout,
  MiddleSpinner,
  Link
} from "components"

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your first name'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your last name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Please specify your email address'),
});

const AccountInfoPage = () => {
  const matches = useMediaQuery("(max-width:900px)")
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const onSubmit = async ({
    firstName,
    lastName,
    email,
  }) => {

    console.log(firstName, lastName, email)

    customerUpdate({
      variables: {
        customerAccessToken,
        customer: {
          email,
          firstName,
          lastName,
        },
      },
    })
      .then(result => {
        refetch()
        formik.resetForm({})
        toast.success("Account Updated")
      })
      .catch(error => {
        console.log(error)
        toast.error("Oops! Something went wrong. Please try again.")
      })
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleChangePassword = async () => {
    setChangePasswordLoading(true)

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      setChangePasswordLoading(false)
      return
    }

    passwordUpdate({
      variables: {
        customerAccessToken,
        customer: {
          password: newPassword,
        },
      },
    })
      .then(result => {
        console.log(result)
        refetch()
        toast.success("Password Updated Successfully! You'll be redirected to the login page automatically in 3s...", {
          autoClose: 3000,
          hideProgressBar: false,
        })

        logout()
        navigate("/login")
      })
      .catch(error => {
        console.log(error)
        toast.error("Oops! Something went wrong. Please try again.")
      })

    setChangePasswordLoading(false)
  }

  //Query & Mutation
  const { data, loading, error, refetch } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })
  const [customerUpdate, { }] = useMutation(CUSTOMER_UPDATE)
  const [passwordUpdate, { }] = useMutation(CUSTOMER_CHANGE_PASSWORD)

  useEffect(() => {
    if (data?.customer) {
      formik.setValues({
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        phone: data.customer.phone,
      })
    }
  }, [data])

  return (
    <AccountLayout title="Account Info" currentPage="info">
      {customerAccessToken ? (
        <Box>
          <Typography sx={{ marginBottom: 7 }} variant="h4">
            Account Info
          </Typography>
          <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
            {error && "Error"}
            {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
            {data && (
              <>
                <Grid item xs={12} md={4} sx={{ padding: 2, borderRight: matches ? "0" : "1px solid rgba(0,0,0,0.12)" }}>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        variant="outlined"
                        name={'newPassword'}
                        fullWidth
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name={'confirmPassword'}
                        fullWidth
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton size={'large'} variant={'contained'} onClick={() => handleChangePassword()} loading={changePasswordLoading}>
                        Change Password
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Account Info
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          name={'firstName'}
                          fullWidth
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.firstName && Boolean(formik.errors.firstName)
                          }
                          helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          name={'lastName'}
                          fullWidth
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.lastName && Boolean(formik.errors.lastName)
                          }
                          helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          name={'email'}
                          fullWidth
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item container xs={12}>
                        <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                          Update Account Info
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      ) : (
        <Box
          minHeight="450px"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography variant="h1">You need to log in first!</Typography>
          <Button>
            <Link to="/login">Go to Log In</Link>
          </Button>
        </Box>
      )}
    </AccountLayout >
  )
}

export default AccountInfoPage

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
    }
  }
`

const CUSTOMER_UPDATE = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const CUSTOMER_CHANGE_PASSWORD = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`