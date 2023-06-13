import { gql, useMutation, useQuery } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
// components
import { AccountLayout, MiddleSpinner } from 'components';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// stores
import { useAuthStore } from '../../stores';
import shopify_countries from '../../utils/shopify/shopify_countries.json';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  id: yup.string(),
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
  address1: yup
    .string()
    .required('Please specify your address')
    .min(2, 'Please enter a valid address')
    .max(200, 'Please enter a valid address'),
  address2: yup
    .string()
    .min(2, 'Please enter a valid address')
    .max(200, 'Please enter a valid address'),
  city: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(80, 'Please enter a valid name')
    .required('Please specify your city name'),
  country: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(80, 'Please enter a valid name')
    .required('Please specify your country name'),
  zip: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid zip code')
    .max(80, 'Please enter a valid zip code')
    .required('Please specify your zip code'),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please specify your phone number')
});

const AccountAddressPage = () => {
  const [formType, setFormType] = useState('Add');
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);

  const { customerAccessToken } = useAuthStore();

  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zip: '',
    phone: ''
  };

  const onSubmit = async ({
    id,
    address1,
    address2,
    city,
    country,
    firstName,
    lastName,
    phone,
    zip
  }) => {
    try {
      if (formType === 'Add') {
        customerAddressCreate({
          variables: {
            customerAccessToken,
            address: {
              address1,
              address2,
              city,
              country,
              firstName,
              lastName,
              phone,
              zip
            }
          }
        })
          .then((result) => {
            checkDefaultAddress &&
              customerDefaultAddressUpdate({
                variables: {
                  customerAccessToken,
                  addressId: result.data.customerAddressCreate.customerAddress.id
                }
              })
                .then(() => {
                  setCheckDefaultAddress(false);
                  refetch();
                })
                .catch((error) => {
                  console.log(error);
                  toast.error('Oops! Something went wrong. Please try again.');
                });

            refetch();
            formik.resetForm({});
            toast.success('Address Added Successfully!');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Oops! Something went wrong. Please try again.');
          });
      }

      if (formType === 'Edit') {
        customerAddressUpdate({
          variables: {
            customerAccessToken,
            id,
            address: {
              address1,
              address2,
              city,
              country,
              firstName,
              lastName,
              phone,
              zip
            }
          }
        })
          .then(() => {
            checkDefaultAddress &&
              customerDefaultAddressUpdate({
                variables: {
                  customerAccessToken,
                  addressId: id
                }
              })
                .then(() => {
                  setCheckDefaultAddress(false);
                  refetch();
                })
                .catch((error) => {
                  console.log(error);
                  toast.error('Oops! Something went wrong. Please try again.');
                });

            refetch();
            formik.resetForm({});
            toast.success('Address Updated Successfully!');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Oops! Something went wrong. Please try again.');
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit
  });

  const variables = {
    variables: {
      customerAccessToken
    }
  };

  //Query & Mutation
  const { data, loading, error, refetch } = useQuery(CUSTOMER_ADDRESS, variables);
  const [deleteAddress] = useMutation(CUSTOMER_DELETE_ADDRESS);
  const [customerAddressCreate] = useMutation(CUSTOMER_CREATE_ADDRESS);
  const [customerAddressUpdate] = useMutation(CUSTOMER_EDIT_ADDRESS);
  const [customerDefaultAddressUpdate] = useMutation(CUSTOMER_EDIT_DEFAULT_ADDRESS);

  const addAddress = () => {
    formik.setValues({
      address1: '',
      address2: '',
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      id: '',
      phone: '',
      zip: ''
    });
    setFormType('Add');
  };

  const editAddress = (data) => {
    formik.setValues(data);
    setFormType('Edit');
  };

  // Handle Delete Address
  const handleDeleteAddress = (id) => {
    deleteAddress({
      variables: {
        customerAccessToken,
        id
      }
    })
      .then(() => {
        refetch();
        toast.success('Address Deleted Successfully!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops! Something went wrong. Please try again.');
      });
  };

  return (
    <AccountLayout title="Addresses" currentPage="addresses">
      <Box>
        <Typography sx={{ marginBottom: 7 }} variant="h4">
          Addresses
        </Typography>
        <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
          {error && 'Error'}
          {loading && <MiddleSpinner divminheight="460px" size={20} />}

          {data && (
            <>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ padding: 2, borderRight: { xs: '0', md: '1px solid rgba(0,0,0,0.12)' } }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Saved
                </Typography>
                {data != null &&
                  data?.customer.addresses.edges.map((item) => {
                    const {
                      address1,
                      address2,
                      city,
                      country,
                      firstName,
                      lastName,
                      id,
                      phone,
                      zip
                    } = item.node;

                    return (
                      <Box key={id}>
                        <Typography mb="20px" variant="body1">
                          <b>
                            {firstName.toLocaleUpperCase()} {lastName.toLocaleUpperCase()}{' '}
                            {data?.customer.defaultAddress.id === id && <i>(DEFAULT)</i>}
                          </b>
                          <br />
                          {address1}
                          <br />
                          {address2 && (
                            <>
                              {address2} <br />
                            </>
                          )}
                          {city}, {zip}
                          <br />
                          {country}
                          <br />
                          {phone}
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}>
                          <Button
                            onClick={() =>
                              editAddress({
                                address1,
                                address2,
                                city,
                                country,
                                firstName,
                                lastName,
                                id,
                                phone,
                                zip
                              })
                            }>
                            Edit
                          </Button>

                          <Button color="error" onClick={() => handleDeleteAddress(id)}>
                            Remove
                          </Button>
                        </Stack>

                        <Divider variant="middle" sx={{ marginTop: 2, marginBottom: 2 }} />
                      </Box>
                    );
                  })}

                <Box display={{ xs: 'block', md: 'flex' }} justifyContent="center">
                  <Button fullWidth variant="contained" onClick={() => addAddress()}>
                    Add new address
                  </Button>
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {formType === 'Add' ? 'Add New Address' : 'Update Address'}
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
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    name={'phone'}
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address 1"
                    variant="outlined"
                    name={'address1'}
                    fullWidth
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    error={formik.touched.address1 && Boolean(formik.errors.address1)}
                    helperText={formik.touched.address1 && formik.errors.address1}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address 2"
                    variant="outlined"
                    name={'address2'}
                    fullWidth
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    error={formik.touched.address2 && Boolean(formik.errors.address2)}
                    helperText={formik.touched.address2 && formik.errors.address2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    variant="outlined"
                    name={'city'}
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="Country"
                    id="country"
                    select
                    label="Country"
                    fullWidth
                    value={formik.values.country}
                    onChange={formik.handleChange('country')}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}>
                    <MenuItem key={''} value={''}></MenuItem>
                    {Object.keys(shopify_countries).map((country) => (
                      <MenuItem value={country}>{country}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Zip Code"
                    variant="outlined"
                    name={'zip'}
                    fullWidth
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
                </Grid>
                <Grid item container xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretched', sm: 'center' }}
                    justifyContent={'space-between'}
                    width={1}
                    margin={'0 auto'}>
                    <Box marginBottom={{ xs: 1, sm: 0 }}>
                      <FormControlLabel
                        control={<Checkbox checked={checkDefaultAddress} />}
                        label="Set as default address"
                        onChange={() => setCheckDefaultAddress(!checkDefaultAddress)}
                      />
                    </Box>
                    <LoadingButton
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                      loading={formik.isSubmitting}>
                      {formType === 'Add' ? 'Save New Address' : 'Update Address'}
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </AccountLayout>
  );
};

export default AccountAddressPage;

const CUSTOMER_ADDRESS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        id
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            phone
            lastName
            firstName
            country
            name
            zip
          }
        }
      }
    }
  }
`;

const CUSTOMER_EDIT_ADDRESS = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_EDIT_DEFAULT_ADDRESS = gql`
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE_ADDRESS = gql`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
const CUSTOMER_DELETE_ADDRESS = gql`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;
