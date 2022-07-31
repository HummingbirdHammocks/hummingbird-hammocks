import React from "react"
import { styled, Box, Typography, useMediaQuery, Divider } from "@mui/material"

import { MainWrapper, LinkButton } from "components"

const DetailsSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "80px 15px",
}))

const MainGridWrapper = styled("div")(({ theme, orderkey }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  margin: "0 200px",

  "& .order": {
    order: orderkey,
  },

  [theme.breakpoints.down("md")]: {
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

export function Details({ data, children, order, divider }) {
  const { title, subText, buttonText, buttonLink } = data
  const matches = useMediaQuery("(max-width:900px)")

  return (
    <DetailsSection>
      <MainWrapper>
        <MainGridWrapper orderkey={order}>
          <Box className="order" display="flex" justifyContent="center">
            {children}
          </Box>

          <Box marginBottom={matches ? "50px" : "0"}>
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
                <LinkButton
                  borderColor="#34542a"
                  color="black"
                  background="white"
                  to={buttonLink}
                >
                  {buttonText}
                </LinkButton>
              </Box>
            </TextContent>
          </Box>
        </MainGridWrapper>
        {matches === divider && <Divider />}
      </MainWrapper>
    </DetailsSection>
  )
}
