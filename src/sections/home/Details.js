import React from "react"
import { styled, Box, Typography } from "@mui/material"

import { MainWrapper, LinkButton } from "components"

const DetailsSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const MainGridWrapper = styled("div")(({ theme, orderkey }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  margin: "auto",

  "& .order": {
    order: orderkey,
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const TextContent = styled("div")(({ theme }) => ({
  padding: "0 60px",
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
  maxWidth: "500px",

  [theme.breakpoints.down("sm")]: {
    padding: "0",
  },
}))

export function Details({ data, children, order }) {
  const { title, subText, buttonText, buttonLink } = data

  return (
    <DetailsSection>
      <MainWrapper>
        <MainGridWrapper orderkey={order}>
          <Box className="order" display="flex" justifyContent="center">
            {children}
          </Box>

          <Box>
            <TextContent>
              <Typography
                textTransform="uppercase"
                sx={{ mb: "30px" }}
                variant="h2"
              >
                {title}
              </Typography>
              <Typography
                sx={{ mt: "30px", maxWidth: "1200px" }}
                variant="body1"
              >
                {subText}
              </Typography>
              <Box margin="40px 0 0 0">
                <LinkButton color="black" background="white" to={buttonLink}>
                  {buttonText}
                </LinkButton>
              </Box>
            </TextContent>
          </Box>
        </MainGridWrapper>
      </MainWrapper>
    </DetailsSection>
  )
}
