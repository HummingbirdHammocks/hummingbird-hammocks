import React, { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useTheme, Typography, Divider, Box, useMediaQuery } from "@mui/material"
import { useMutation, gql, useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
  MiddleSpinner,
  SimpleForm,
} from "components"
import Select from "../../utils/country"


const AddressPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const [formType, setFormType] = useState("Add")
  const [formAddress, setFormAddress] = useState(null)
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false)

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm()

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
    setFormAddress({
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
    setFormAddress(data)
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

  // Handle Form Submit
  const handleFormSubmit = ({
    address1,
    address2,
    city,
    country,
    firstName,
    lastName,
    id,
    phone,
    zip,
  }) => {
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
  }

  const returnAccount = () => {
    navigate("/account")
  }

  useEffect(() => {
    reset(formAddress)
  }, [formAddress])

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
                onClick={() => returnAccount()}
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

                <SimpleForm onSubmit={handleSubmit(handleFormSubmit)}>
                  <label htmlFor="password">First Name</label>
                  <input
                    {...register("firstName", {
                      required: true,
                      value: `${formAddress?.firstName || ""}`,
                    })}
                  />
                  {errors.firstName?.type === "required" &&
                    "First Name is required!"}

                  <label htmlFor="lastName">Last Name</label>
                  <input
                    {...register("lastName", {
                      value: `${formAddress?.lastName || ""}`,
                    })}
                  />
                  <label htmlFor="company">Company</label>
                  <input
                    {...register("company", {
                      value: `${formAddress?.company || ""}`,
                    })}
                  />
                  <label htmlFor="address1">Address1</label>
                  <input
                    {...register("address1", {
                      required: true,
                      value: `${formAddress?.address1 || ""}`,
                    })}
                  />
                  {errors.address1?.type === "required" &&
                    "Address1 is required!"}
                  <label htmlFor="address2">Address2</label>
                  <input
                    {...register("address2", {
                      value: `${formAddress?.address2 || ""}`,
                    })}
                  />
                  <label htmlFor="city">City</label>
                  <input
                    {...register("city", {
                      required: true,
                      value: `${formAddress?.city || ""}`,
                    })}
                  />
                  {errors.city?.type === "required" && "City is required!"}

                  {/* <label htmlFor="country">
                                                Country
                                              </label> */}
                  <Select label="Country" {...register("country")} />

                  <label htmlFor="zip">Postal/Zip Code</label>
                  <input
                    {...register("zip", {
                      required: true,
                      value: `${formAddress?.zip || ""}`,
                    })}
                  />
                  {errors.country?.type === "required" && "Zip is required!"}

                  <label htmlFor="phone">Phone</label>
                  <input
                    {...register("phone", {
                      value: `${formAddress?.phone || ""}`,
                    })}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      maxHeight: "40px",
                      margin: "20px 0",

                      "& input": {
                        width: "40px!important",
                        marginTop: "-1px",
                      },
                    }}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        setCheckDefaultAddress(!checkDefaultAddress)
                      }
                      value={checkDefaultAddress}
                    />
                    <Typography variant="navUser">
                      Set as default address
                    </Typography>
                  </Box>

                  <OnButton type="submit">
                    {formType === "Add" ? "Add New Address" : "Update Address"}
                  </OnButton>
                </SimpleForm>
              </Box>
            </Box>
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
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
