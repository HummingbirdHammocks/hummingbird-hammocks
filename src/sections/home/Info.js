import React from "react"
import { styled, Typography, Divider, Box } from "@mui/material"

import { MainWrapper } from "../../components"

const InfoSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

export function Info() {
  return (
    <InfoSection>
      <MainWrapper>
        <Typography
          textTransform="uppercase"
          textAlign="center"
          sx={{ mb: "30px" }}
          variant="h2"
        >
          ULTRALIGHT HAMMOCKS FOR EVERY ADVENTURE
        </Typography>
        <Divider light />
        <Box display={"flex"} justifyContent="center">
          <Typography
            textAlign="center"
            sx={{ mt: "30px", maxWidth: "1200px" }}
            variant="body1"
          >
            Our gear weighs about 30% less than anything else on the market, but
            weight isn’t the only thing we care about. We also demand that the
            hammock packs small and travels well. We believe the volume in your
            pack deserves as much love as its weight.
            <br /> <br />
            You'll find no bulky metal parts or thick webbing here. Using actual
            reserve parachute nylon and our button link system, we compress the
            hammock into a very small stuff sack, keeping it as unnoticed in
            your pack as it is on the scale.
          </Typography>
        </Box>
      </MainWrapper>
    </InfoSection>
  )
}
