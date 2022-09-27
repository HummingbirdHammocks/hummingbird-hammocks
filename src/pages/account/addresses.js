import React, { useContext, useState } from "react"
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql, useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import { LoadingButton } from '@mui/lab';
import {
  useTheme,
  Typography,
  Divider,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Box,
  useMediaQuery
} from "@mui/material"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
  MiddleSpinner,
} from "components"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object({
  id: yup
    .string(),
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
    .required('Please specify your phone number'),
});

const AddressPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const [formType, setFormType] = useState("Add")
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false)

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zip: '',
    phone: '',
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
    zip }) => {

    try {
      if (formType === "Add") {
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
              zip,
            },
          },
        })
          .then(result => {
            checkDefaultAddress &&
              customerDefaultAddressUpdate({
                variables: {
                  customerAccessToken,
                  addressId:
                    result.data.customerAddressCreate.customerAddress.id,
                },
              })
                .then(result => {
                  setCheckDefaultAddress(false)
                  refetch()
                })
                .catch(error => {
                  console.log(error)
                  toast.error("Oops! Something went wrong. Please try again.")
                })

            refetch()
            formik.resetForm({})
            toast.success("Address Added Successfully!")
          })
          .catch(error => {
            console.log(error)
            toast.error("Oops! Something went wrong. Please try again.")
          })
      }

      if (formType === "Edit") {
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
              zip,
            },
          },
        })
          .then(result => {
            checkDefaultAddress &&
              customerDefaultAddressUpdate({
                variables: {
                  customerAccessToken,
                  addressId: id,
                },
              })
                .then(result => {
                  setCheckDefaultAddress(false)
                  refetch()
                })
                .catch(error => {
                  console.log(error)
                  toast.error("Oops! Something went wrong. Please try again.")
                })

            refetch()
            formik.resetForm({})
            toast.success("Address Updated Successfully!")
          })
          .catch(error => {
            console.log(error)
            toast.error("Oops! Something went wrong. Please try again.")
          })
      }
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const variables = {
    variables: {
      customerAccessToken,
    },
  }

  //Query & Mutation
  const { data, loading, error, refetch } = useQuery(
    CUSTOMER_ADDRESS,
    variables
  )
  const [deleteAddress, { }] = useMutation(CUSTOMER_DELETE_ADDRESS)
  const [customerAddressCreate, { }] = useMutation(CUSTOMER_CREATE_ADDRESS)
  const [customerAddressUpdate, { }] = useMutation(CUSTOMER_EDIT_ADDRESS)
  const [customerDefaultAddressUpdate, { }] = useMutation(
    CUSTOMER_EDIT_DEFAULT_ADDRESS
  )

  const userLogout = () => {
    logout()
    navigate("/")
  }

  const addAddress = () => {
    formik.setValues({
      address1: "",
      address2: "",
      city: "",
      country: "",
      firstName: "",
      lastName: "",
      id: "",
      phone: "",
      zip: "",
    })
    setFormType("Add")
  }

  const editAddress = data => {
    formik.setValues(data)
    setFormType("Edit")
  }

  // Handle Delete Address
  const handleDeleteAddress = id => {
    deleteAddress({
      variables: {
        customerAccessToken,
        id,
      },
    })
      .then(result => {
        refetch()
        toast.success("Address Deleted Successfully!")
      })
      .catch(error => {
        console.log(error)
        toast.error("Oops! Something went wrong. Please try again.")
      })
  }

  return (
    <Layout>
      <Seo title="Account" />
      <Box
        sx={{
          background: theme.palette.white,
          padding: "60px 15px",

          [theme.breakpoints.down("md")]: {
            padding: "30px 0 50px 0",
          },
        }}>
        <MainWrapper>
          <Box
            pb="20px"
            justifyContent="space-between"
            display={matches ? "inline-block" : "flex"}
          >
            <Typography m={matches && "10px 0"} variant="h2">
              Account Details
            </Typography>
            <Box>
              <OnButton
                hovercolor="black"
                hoverback="white"
                padding="0"
                border="0"
                onClick={() => navigate("/account")}
              >
                Return to Account
              </OnButton>{" "}
              /{" "}
              <OnButton
                hovercolor="#d2cbcb"
                background="#34542a"
                padding="0 10px"
                color="white"
                border="0"
                borderRadius="10px"
                onClick={() => userLogout()}
              >
                Logout
              </OnButton>
            </Box>
          </Box>

          <Divider />

          <Box padding={!matches ? "0 200px" : "0"}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                padding: "30px 0",

                [theme.breakpoints.down("md")]: {
                  gridTemplateColumns: "1fr",
                  padding: "0",
                },
              }}>
              {error && "Error"}
              {loading && <MiddleSpinner divMinHeight="460px" size={20} />}

              {data && (
                <>
                  <Box
                    p={matches ? "0" : "20px 30px"}
                    borderRight={matches ? "0" : "1px solid #ead5d5"}
                  >
                    <Typography m="20px 0" variant="h5">
                      Customer Addresses
                    </Typography>
                    {data != null &&
                      data?.customer.addresses.edges.map(item => {
                        const {
                          address1,
                          address2,
                          city,
                          country,
                          firstName,
                          lastName,
                          id,
                          phone,
                          zip,
                        } = item.node

                        return (
                          <Box key={id}>
                            <Typography mb="20px" variant="body1">
                              <b>
                                {firstName.toLocaleUpperCase()}{" "}
                                {lastName.toLocaleUpperCase()}{" "}
                                {data?.customer.defaultAddress.id === id && (
                                  <i>(DEFAULT)</i>
                                )}
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
                            <OnButton
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
                                  zip,
                                })
                              }
                            >
                              Edit
                            </OnButton>

                            <OnButton
                              sx={{ marginLeft: "10px" }}
                              onClick={() => handleDeleteAddress(id)}
                            >
                              Remove
                            </OnButton>

                            <Divider sx={{ m: "20px 20px 20px 0" }} />
                          </Box>
                        )
                      })}

                    <Box
                      m={matches && "40px 0"}
                      display={matches && "flex"}
                      justifyContent="center"
                    >
                      <OnButton onClick={() => addAddress()}>
                        Add new address
                      </OnButton>
                    </Box>
                  </Box>
                </>
              )}

              <Box p={matches ? "0" : "20px"}>
                <Typography mb="20px" variant="h5">
                  {formType === "Add" ? "Add New Address" : "Update Address"}
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
                        error={
                          formik.touched.address1 && Boolean(formik.errors.address1)
                        }
                        helperText={formik.touched.address1 && formik.errors.address1}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Street Address 2"
                        variant="outlined"
                        name={'address'}
                        fullWidth
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.address2 && Boolean(formik.errors.address2)
                        }
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
                        onChange={formik.handleChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                      >
                        <MenuItem key={""} value={""}></MenuItem>
                        <MenuItem value="United States">United States</MenuItem >
                        <MenuItem value="Afghanistan">Afghanistan</MenuItem >
                        <MenuItem value="Albania">Albania</MenuItem >
                        <MenuItem value="Algeria">Algeria</MenuItem >
                        <MenuItem value="American Samoa">American Samoa</MenuItem >
                        <MenuItem value="Andorra">Andorra</MenuItem >
                        <MenuItem value="Angola">Angola</MenuItem >
                        <MenuItem value="Anguilla">Anguilla</MenuItem >
                        <MenuItem value="Antarctica">Antarctica</MenuItem >
                        <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem >
                        <MenuItem value="Argentina">Argentina</MenuItem >
                        <MenuItem value="Armenia">Armenia</MenuItem >
                        <MenuItem value="Aruba">Aruba</MenuItem >
                        <MenuItem value="Australia">Australia</MenuItem >
                        <MenuItem value="Austria">Austria</MenuItem >
                        <MenuItem value="Azerbaijan">Azerbaijan</MenuItem >
                        <MenuItem value="Bahamas (the)">Bahamas (the)</MenuItem >
                        <MenuItem value="Bahrain">Bahrain</MenuItem >
                        <MenuItem value="Bangladesh">Bangladesh</MenuItem >
                        <MenuItem value="Barbados">Barbados</MenuItem >
                        <MenuItem value="Belarus">Belarus</MenuItem >
                        <MenuItem value="Belgium">Belgium</MenuItem >
                        <MenuItem value="Belize">Belize</MenuItem >
                        <MenuItem value="Benin">Benin</MenuItem >
                        <MenuItem value="Bermuda">Bermuda</MenuItem >
                        <MenuItem value="Bhutan">Bhutan</MenuItem >
                        <MenuItem value="Bolivia (Plurinational State of)">
                          Bolivia (Plurinational State of)
                        </MenuItem >
                        <MenuItem value="Bonaire, Sint Eustatius and Saba">
                          Bonaire, Sint Eustatius and Saba
                        </MenuItem >
                        <MenuItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</MenuItem >
                        <MenuItem value="Botswana">Botswana</MenuItem >
                        <MenuItem value="Bouvet Island">Bouvet Island</MenuItem >
                        <MenuItem value="Brazil">Brazil</MenuItem >
                        <MenuItem value="British Indian Ocean Territory (the)">
                          British Indian Ocean Territory (the)
                        </MenuItem >
                        <MenuItem value="Brunei Darussalam">Brunei Darussalam</MenuItem >
                        <MenuItem value="Bulgaria">Bulgaria</MenuItem >
                        <MenuItem value="Burkina Faso">Burkina Faso</MenuItem >
                        <MenuItem value="Burundi">Burundi</MenuItem >
                        <MenuItem value="Cabo Verde">Cabo Verde</MenuItem >
                        <MenuItem value="Cambodia">Cambodia</MenuItem >
                        <MenuItem value="Cameroon">Cameroon</MenuItem >
                        <MenuItem value="Canada">Canada</MenuItem >
                        <MenuItem value="Cayman Islands (the)">Cayman Islands (the)</MenuItem >
                        <MenuItem value="Central African Republic (the)">
                          Central African Republic (the)
                        </MenuItem >
                        <MenuItem value="Chad">Chad</MenuItem >
                        <MenuItem value="Chile">Chile</MenuItem >
                        <MenuItem value="China">China</MenuItem >
                        <MenuItem value="Christmas Island">Christmas Island</MenuItem >
                        <MenuItem value="Cocos (Keeling) Islands (the)">
                          Cocos (Keeling) Islands (the)
                        </MenuItem >
                        <MenuItem value="Colombia">Colombia</MenuItem >
                        <MenuItem value="Comoros (the)">Comoros (the)</MenuItem >
                        <MenuItem value="Congo (the Democratic Republic of the)">
                          Congo (the Democratic Republic of the)
                        </MenuItem >
                        <MenuItem value="Congo (the)">Congo (the)</MenuItem >
                        <MenuItem value="Cook Islands (the)">Cook Islands (the)</MenuItem >
                        <MenuItem value="Costa Rica">Costa Rica</MenuItem >
                        <MenuItem value="Croatia">Croatia</MenuItem >
                        <MenuItem value="Cuba">Cuba</MenuItem >
                        <MenuItem value="Curaçao">Curaçao</MenuItem >
                        <MenuItem value="Cyprus">Cyprus</MenuItem >
                        <MenuItem value="Czechia">Czechia</MenuItem >
                        <MenuItem value="Côte d'Ivoire">Côte d'Ivoire</MenuItem >
                        <MenuItem value="Denmark">Denmark</MenuItem >
                        <MenuItem value="Djibouti">Djibouti</MenuItem >
                        <MenuItem value="Dominica">Dominica</MenuItem >
                        <MenuItem value="Dominican Republic (the)">Dominican Republic (the)</MenuItem >
                        <MenuItem value="Ecuador">Ecuador</MenuItem >
                        <MenuItem value="Egypt">Egypt</MenuItem >
                        <MenuItem value="El Salvador">El Salvador</MenuItem >
                        <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem >
                        <MenuItem value="Eritrea">Eritrea</MenuItem >
                        <MenuItem value="Estonia">Estonia</MenuItem >
                        <MenuItem value="Eswatini">Eswatini</MenuItem >
                        <MenuItem value="Ethiopia">Ethiopia</MenuItem >
                        <MenuItem value="Falkland Islands (the) [Malvinas]">
                          Falkland Islands (the) [Malvinas]
                        </MenuItem >
                        <MenuItem value="Faroe Islands (the)">Faroe Islands (the)</MenuItem >
                        <MenuItem value="Fiji">Fiji</MenuItem >
                        <MenuItem value="Finland">Finland</MenuItem >
                        <MenuItem value="France">France</MenuItem >
                        <MenuItem value="French Guiana">French Guiana</MenuItem >
                        <MenuItem value="French Polynesia">French Polynesia</MenuItem >
                        <MenuItem value="French Southern Territories (the)">
                          French Southern Territories (the)
                        </MenuItem >
                        <MenuItem value="Gabon">Gabon</MenuItem >
                        <MenuItem value="Gambia (the)">Gambia (the)</MenuItem >
                        <MenuItem value="Georgia">Georgia</MenuItem >
                        <MenuItem value="Germany">Germany</MenuItem >
                        <MenuItem value="Ghana">Ghana</MenuItem >
                        <MenuItem value="Gibraltar">Gibraltar</MenuItem >
                        <MenuItem value="Greece">Greece</MenuItem >
                        <MenuItem value="Greenland">Greenland</MenuItem >
                        <MenuItem value="Grenada">Grenada</MenuItem >
                        <MenuItem value="Guadeloupe">Guadeloupe</MenuItem >
                        <MenuItem value="Guam">Guam</MenuItem >
                        <MenuItem value="Guatemala">Guatemala</MenuItem >
                        <MenuItem value="Guernsey">Guernsey</MenuItem >
                        <MenuItem value="Guinea">Guinea</MenuItem >
                        <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem >
                        <MenuItem value="Guyana">Guyana</MenuItem >
                        <MenuItem value="Haiti">Haiti</MenuItem >
                        <MenuItem value="Heard Island and McDonald Islands">
                          Heard Island and McDonald Islands
                        </MenuItem >
                        <MenuItem value="Holy See (the)">Holy See (the)</MenuItem >
                        <MenuItem value="Honduras">Honduras</MenuItem >
                        <MenuItem value="Hong Kong">Hong Kong</MenuItem >
                        <MenuItem value="Hungary">Hungary</MenuItem >
                        <MenuItem value="Iceland">Iceland</MenuItem >
                        <MenuItem value="India">India</MenuItem >
                        <MenuItem value="Indonesia">Indonesia</MenuItem >
                        <MenuItem value="Iran (Islamic Republic of)">
                          Iran (Islamic Republic of)
                        </MenuItem >
                        <MenuItem value="Iraq">Iraq</MenuItem >
                        <MenuItem value="Ireland">Ireland</MenuItem >
                        <MenuItem value="Isle of Man">Isle of Man</MenuItem >
                        <MenuItem value="Israel">Israel</MenuItem >
                        <MenuItem value="Italy">Italy</MenuItem >
                        <MenuItem value="Jamaica">Jamaica</MenuItem >
                        <MenuItem value="Japan">Japan</MenuItem >
                        <MenuItem value="Jersey">Jersey</MenuItem >
                        <MenuItem value="Jordan">Jordan</MenuItem >
                        <MenuItem value="Kazakhstan">Kazakhstan</MenuItem >
                        <MenuItem value="Kenya">Kenya</MenuItem >
                        <MenuItem value="Kiribati">Kiribati</MenuItem >
                        <MenuItem value="Korea (the Democratic People's Republic of)">
                          Korea (the Democratic People's Republic of)
                        </MenuItem >
                        <MenuItem value="Korea (the Republic of)">Korea (the Republic of)</MenuItem >
                        <MenuItem value="Kuwait">Kuwait</MenuItem >
                        <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem >
                        <MenuItem value="Lao People's Democratic Republic (the)">
                          Lao People's Democratic Republic (the)
                        </MenuItem >
                        <MenuItem value="Latvia">Latvia</MenuItem >
                        <MenuItem value="Lebanon">Lebanon</MenuItem >
                        <MenuItem value="Lesotho">Lesotho</MenuItem >
                        <MenuItem value="Liberia">Liberia</MenuItem >
                        <MenuItem value="Libya">Libya</MenuItem >
                        <MenuItem value="Liechtenstein">Liechtenstein</MenuItem >
                        <MenuItem value="Lithuania">Lithuania</MenuItem >
                        <MenuItem value="Luxembourg">Luxembourg</MenuItem >
                        <MenuItem value="Macao">Macao</MenuItem >
                        <MenuItem value="Madagascar">Madagascar</MenuItem >
                        <MenuItem value="Malawi">Malawi</MenuItem >
                        <MenuItem value="Malaysia">Malaysia</MenuItem >
                        <MenuItem value="Maldives">Maldives</MenuItem >
                        <MenuItem value="Mali">Mali</MenuItem >
                        <MenuItem value="Malta">Malta</MenuItem >
                        <MenuItem value="Marshall Islands (the)">Marshall Islands (the)</MenuItem >
                        <MenuItem value="Martinique">Martinique</MenuItem >
                        <MenuItem value="Mauritania">Mauritania</MenuItem >
                        <MenuItem value="Mauritius">Mauritius</MenuItem >
                        <MenuItem value="Mayotte">Mayotte</MenuItem >
                        <MenuItem value="Mexico">Mexico</MenuItem >
                        <MenuItem value="Micronesia (Federated States of)">
                          Micronesia (Federated States of)
                        </MenuItem >
                        <MenuItem value="Moldova (the Republic of)">
                          Moldova (the Republic of)
                        </MenuItem >
                        <MenuItem value="Monaco">Monaco</MenuItem >
                        <MenuItem value="Mongolia">Mongolia</MenuItem >
                        <MenuItem value="Montenegro">Montenegro</MenuItem >
                        <MenuItem value="Montserrat">Montserrat</MenuItem >
                        <MenuItem value="Morocco">Morocco</MenuItem >
                        <MenuItem value="Mozambique">Mozambique</MenuItem >
                        <MenuItem value="Myanmar">Myanmar</MenuItem >
                        <MenuItem value="Namibia">Namibia</MenuItem >
                        <MenuItem value="Nauru">Nauru</MenuItem >
                        <MenuItem value="Nepal">Nepal</MenuItem >
                        <MenuItem value="Netherlands (the)">Netherlands (the)</MenuItem >
                        <MenuItem value="New Caledonia">New Caledonia</MenuItem >
                        <MenuItem value="New Zealand">New Zealand</MenuItem >
                        <MenuItem value="Nicaragua">Nicaragua</MenuItem >
                        <MenuItem value="Niger (the)">Niger (the)</MenuItem >
                        <MenuItem value="Nigeria">Nigeria</MenuItem >
                        <MenuItem value="Niue">Niue</MenuItem >
                        <MenuItem value="Norfolk Island">Norfolk Island</MenuItem >
                        <MenuItem value="Northern Mariana Islands (the)">
                          Northern Mariana Islands (the)
                        </MenuItem >
                        <MenuItem value="Norway">Norway</MenuItem >
                        <MenuItem value="Oman">Oman</MenuItem >
                        <MenuItem value="Pakistan">Pakistan</MenuItem >
                        <MenuItem value="Palau">Palau</MenuItem >
                        <MenuItem value="Palestine, State of">Palestine, State of</MenuItem >
                        <MenuItem value="Panama">Panama</MenuItem >
                        <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem >
                        <MenuItem value="Paraguay">Paraguay</MenuItem >
                        <MenuItem value="Peru">Peru</MenuItem >
                        <MenuItem value="Philippines (the)">Philippines (the)</MenuItem >
                        <MenuItem value="Pitcairn">Pitcairn</MenuItem >
                        <MenuItem value="Poland">Poland</MenuItem >
                        <MenuItem value="Portugal">Portugal</MenuItem >
                        <MenuItem value="Puerto Rico">Puerto Rico</MenuItem >
                        <MenuItem value="Qatar">Qatar</MenuItem >
                        <MenuItem value="Republic of North Macedonia">
                          Republic of North Macedonia
                        </MenuItem >
                        <MenuItem value="Romania">Romania</MenuItem >
                        <MenuItem value="Russian Federation (the)">Russian Federation (the)</MenuItem >
                        <MenuItem value="Rwanda">Rwanda</MenuItem >
                        <MenuItem value="Réunion">Réunion</MenuItem >
                        <MenuItem value="Saint Barthélemy">Saint Barthélemy</MenuItem >
                        <MenuItem value="Saint Helena, Ascension and Tristan da Cunha">
                          Saint Helena, Ascension and Tristan da Cunha
                        </MenuItem >
                        <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem >
                        <MenuItem value="Saint Lucia">Saint Lucia</MenuItem >
                        <MenuItem value="Saint Martin (French part)">
                          Saint Martin (French part)
                        </MenuItem >
                        <MenuItem value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </MenuItem >
                        <MenuItem value="Saint Vincent and the Grenadines">
                          Saint Vincent and the Grenadines
                        </MenuItem >
                        <MenuItem value="Samoa">Samoa</MenuItem >
                        <MenuItem value="San Marino">San Marino</MenuItem >
                        <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem >
                        <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem >
                        <MenuItem value="Senegal">Senegal</MenuItem >
                        <MenuItem value="Serbia">Serbia</MenuItem >
                        <MenuItem value="Seychelles">Seychelles</MenuItem >
                        <MenuItem value="Sierra Leone">Sierra Leone</MenuItem >
                        <MenuItem value="Singapore">Singapore</MenuItem >
                        <MenuItem value="Sint Maarten (Dutch part)">
                          Sint Maarten (Dutch part)
                        </MenuItem >
                        <MenuItem value="Slovakia">Slovakia</MenuItem >
                        <MenuItem value="Slovenia">Slovenia</MenuItem >
                        <MenuItem value="Solomon Islands">Solomon Islands</MenuItem >
                        <MenuItem value="Somalia">Somalia</MenuItem >
                        <MenuItem value="South Africa">South Africa</MenuItem >
                        <MenuItem value="South Georgia and the South Sandwich Islands">
                          South Georgia and the South Sandwich Islands
                        </MenuItem >
                        <MenuItem value="South Sudan">South Sudan</MenuItem >
                        <MenuItem value="Spain">Spain</MenuItem >
                        <MenuItem value="Sri Lanka">Sri Lanka</MenuItem >
                        <MenuItem value="Sudan (the)">Sudan (the)</MenuItem >
                        <MenuItem value="Suriname">Suriname</MenuItem >
                        <MenuItem value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</MenuItem >
                        <MenuItem value="Sweden">Sweden</MenuItem >
                        <MenuItem value="Switzerland">Switzerland</MenuItem >
                        <MenuItem value="Syrian Arab Republic">Syrian Arab Republic</MenuItem >
                        <MenuItem value="Taiwan">Taiwan</MenuItem >
                        <MenuItem value="Tajikistan">Tajikistan</MenuItem >
                        <MenuItem value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </MenuItem >
                        <MenuItem value="Thailand">Thailand</MenuItem >
                        <MenuItem value="Timor-Leste">Timor-Leste</MenuItem >
                        <MenuItem value="Togo">Togo</MenuItem >
                        <MenuItem value="Tokelau">Tokelau</MenuItem >
                        <MenuItem value="Tonga">Tonga</MenuItem >
                        <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem >
                        <MenuItem value="Tunisia">Tunisia</MenuItem >
                        <MenuItem value="Turkey">Turkey</MenuItem >
                        <MenuItem value="Turkmenistan">Turkmenistan</MenuItem >
                        <MenuItem value="Turks and Caicos Islands (the)">
                          Turks and Caicos Islands (the)
                        </MenuItem >
                        <MenuItem value="Tuvalu">Tuvalu</MenuItem >
                        <MenuItem value="Uganda">Uganda</MenuItem >
                        <MenuItem value="Ukraine">Ukraine</MenuItem >
                        <MenuItem value="United Arab Emirates (the)">
                          United Arab Emirates (the)
                        </MenuItem >
                        <MenuItem value="United Kingdom of Great Britain and Northern Ireland (the)">
                          United Kingdom of Great Britain and Northern Ireland (the)
                        </MenuItem >
                        <MenuItem value="United States Minor Outlying Islands (the)">
                          United States Minor Outlying Islands (the)
                        </MenuItem >
                        <MenuItem value="Uruguay">Uruguay</MenuItem >
                        <MenuItem value="Uzbekistan">Uzbekistan</MenuItem >
                        <MenuItem value="Vanuatu">Vanuatu</MenuItem >
                        <MenuItem value="Venezuela (Bolivarian Republic of)">
                          Venezuela (Bolivarian Republic of)
                        </MenuItem >
                        <MenuItem value="Viet Nam">Viet Nam</MenuItem >
                        <MenuItem value="Virgin Islands (British)">Virgin Islands (British)</MenuItem >
                        <MenuItem value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</MenuItem >
                        <MenuItem value="Wallis and Futuna">Wallis and Futuna</MenuItem >
                        <MenuItem value="Western Sahara">Western Sahara</MenuItem >
                        <MenuItem value="Yemen">Yemen</MenuItem >
                        <MenuItem value="Zambia">Zambia</MenuItem >
                        <MenuItem value="Zimbabwe">Zimbabwe</MenuItem >
                        <MenuItem value="Åland Islands">Åland Islands</MenuItem >
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
                        margin={'0 auto'}
                      >
                        <Box marginBottom={{ xs: 1, sm: 0 }}>
                          <FormControlLabel
                            control={<Checkbox checked={checkDefaultAddress} />}
                            label="Set as default address"
                            onChange={() => setCheckDefaultAddress(!checkDefaultAddress)}
                          />
                        </Box>
                        <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                          {formType === "Add" ? "Add New Address" : "Update Address"}
                        </LoadingButton>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Box>
        </MainWrapper>
      </Box >
    </Layout >
  )
}

export default AddressPage

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
`

const CUSTOMER_EDIT_ADDRESS = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
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
`

const CUSTOMER_EDIT_DEFAULT_ADDRESS = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
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
`

const CUSTOMER_CREATE_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
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
`
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
`
