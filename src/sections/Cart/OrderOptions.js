import React, { useContext, useState } from "react"
import { Box, FormGroup, FormControlLabel, Stack, Checkbox, Typography } from "@mui/material"
import { CardGiftcard, Receipt, CheckBoxOutlineBlank } from "@mui/icons-material"

import { CartContext } from "contexts"

export function OrderOptions() {
  const [packingSlip, setPackingSlip] = useState(false)
  const [gift, setGift] = useState(false)

  const { updateAttributes } = useContext(CartContext)

  const handlePackingSlip = async (value) => {
    console.log("Packing Slip", value)
    await updateAttributes({ attributeKey: "Packing Slip", attributeValue: value ? "Yes" : "No" })
    setPackingSlip(value)
  }

  const handleGift = async (value) => {
    console.log("Gift", value)
    await updateAttributes({ attributeKey: "Gift", attributeValue: value ? "Yes" : "No" })
    setGift(value)
  }

  return (
    <Box>
      <Typography pb="20px" variant="h6">
        ORDER OPTIONS
      </Typography>
      <Stack spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={packingSlip}
                onClick={() => handlePackingSlip(!packingSlip)}
                icon={<CheckBoxOutlineBlank />}
                checkedIcon={<Receipt />}
              />
            }
            label="Include Paper Packing Slip"
          />
        </FormGroup>
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          To reduce waste, we don't print a paper packing slip. If you would like a packing slip please check this box.
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={gift}
                onClick={() => handleGift(!gift)}
                icon={<CheckBoxOutlineBlank />}
                checkedIcon={<CardGiftcard />}
              />
            }
            label="Gift Order"
          />
        </FormGroup>
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          Gift orders will include a paper packing slip with no prices.
        </Typography>
      </Stack>
    </Box>
  )
}
