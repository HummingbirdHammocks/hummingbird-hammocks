import React, { useState, useEffect, useContext } from "react"
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Checkbox,
  Grid,
  Stack,
  Paper,
  useMediaQuery,
} from "@mui/material"

import { CartContext } from "contexts"
import { OnButton } from "components"

export const Fbt = ({ currentVariant, product, fbtData }) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const [data, setData] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)

  const { getProductById, updateLineItem } = useContext(CartContext)

  useEffect(() => {
    let items = JSON.parse(fbtData)
    let variants = []
    let procedd = 0

    items.forEach((item, index, arr) => {
      getProductById(item).then(result => {
        arr[index] = result

        let getAvailable = result.variants.filter(i => i.available === true)

        if (getAvailable.length >= 1) {
          variants[index + 1] = { ...getAvailable[0], selected: true }
        }

        procedd++

        if (procedd === arr.length) {
          setAllData()
        }
      })
    }, [fbtData, getProductById, product]);

    function setAllData() {
      items = [product].concat(items)

      for (let i = 0; i < items.length; i++) {
        items[i] = {
          ...items[i],
          variants: items[i].variants.filter(i => i.available === true),
        }
      }

      let firstVariant = product.variants.filter(
        ({ id }) => id === currentVariant.id
      )

      variants[0] = firstVariant[0].available
        ? {
          ...firstVariant[0],
          selected: true,
        }
        : items[0].variants.length >= 1
          ? {
            ...items[0].variants[0],
            selected: true,
          }
          : { ...product.variants[0], selected: false }

      setData(items)
      setSelectedVariant(variants)
    }
  }, [currentVariant, setSelectedVariant])

  const handleSubmit = async () => {
    for (let i = 0; i < selectedVariant.length; i++) {
      if (selectedVariant[i].selected) {
        await updateLineItem({ variantId: selectedVariant[i].id, quantity: 1 })
      }
    }
  }

  const handleCheckChange = itemIndex => {
    setSelectedVariant(prevState => {
      const newState = prevState.map((obj, index) => {
        if (index === itemIndex) {
          return { ...obj, selected: obj.available ? !obj.selected : false }
        }

        return obj
      })

      return newState
    })
  }

  const handleSelectChange = (itemIndex, value) => {
    let allVariants = selectedVariant
    let findVariant = data[itemIndex].variants.filter(({ id }) => id === value)

    allVariants[itemIndex] = findVariant[0]

    setSelectedVariant(allVariants)
    handleCheckChange(itemIndex)
  }

  return (
    <Paper
      sx={{
        background: theme.palette.white,
        marginTop: "100px",
        padding: 4,

        [theme.breakpoints.down("md")]: {
          padding: "0",
          marginTop: "40px",
        },
      }}>
      <Typography pb="20px" variant="h5">
        FREQUENTLY BOUGHT TOGETHER
      </Typography>
      <Divider />
      <Box mt="50px">
        {selectedVariant && (
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box mb="70px" display={matches ? "block" : "flex"}>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  mb={matches && "30px"}
                >
                  {selectedVariant.map((item, index) => {
                    if (item.selected) {
                      return (
                        <>
                          <Box p={matches ? "0 10px" : "0 40px"} key={item.id}>
                            <img
                              src={item.image.src}
                              height="120px"
                              alt={item.image.altText}
                            />
                          </Box>
                          {index !== selectedVariant.length - 1 ? (
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              +
                            </Box>
                          ) : (
                            ""
                          )}
                        </>
                      )
                    }
                    return null;
                  })}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <>
                {selectedVariant.map((item, index) => (
                  <Box key={item.id} display="flex">
                    <Checkbox
                      onChange={() => handleCheckChange(index)}
                      checked={item.selected}
                    />
                    <Box
                      sx={{
                        ...theme.typography.footerMenu,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      {index === 0 ? (
                        <b>This Item: {data[index].title} </b>
                      ) : (
                        <> {data[index].title} </>
                      )}{" "}
                      {data[index].variants.length >= 1 &&
                        data[index].variants[0]?.title !== "Default Title" && (
                          <select
                            style={{ margin: "0 10px" }}
                            value={selectedVariant[index].id}
                            onChange={e =>
                              handleSelectChange(index, e.target.value)
                            }
                          >
                            {data[index].variants.map(i => {
                              return (
                                <option
                                  // selected={currentVariant.id === i.id}
                                  key={i.id}
                                  value={i.id}
                                >
                                  {i.title}
                                </option>
                              )
                            })}
                          </select>
                        )}{" "}
                      <b>
                        ${selectedVariant[index]?.priceV2.amount}{" "}
                        {selectedVariant[index]?.priceV2.currencyCode}
                      </b>
                    </Box>
                  </Box>
                ))}
                {/* <Divider /> */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="subtitle2">
                    Total price: $
                    {Number(
                      selectedVariant
                        .map(item => item.selected && Number(item.priceV2.amount))
                        .reduce((prev, curr) => prev + curr, 0)
                    ).toFixed(2)}
                  </Typography>
                  <OnButton onClick={handleSubmit}>Add to Cart</OnButton>
                </Stack>
              </>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper >
  )
}