import React from "react"
import { Box, Typography, styled, useMediaQuery } from "@mui/material"

import { LinkButton, ButtonAnotherLink } from "components"

const Wrapper = styled("section")(({ theme }) => ({
  display: "grid",
  minHeight: "600px",
  position: "relative",

  [theme.breakpoints.down("md")]: {
    minHeight: "inherit",
  },
}))

const Middle = styled("div")(({ position, theme }) => ({
  position: "absolute",
  display: "flex",
  left: position === "left" ? "30%" : position === "right" ? "67%" : "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  [theme.breakpoints.down("md")]: {
    position: "inherit",
    display: "block",
  },
}))

export function Hero({ children, data }) {
  const matches = useMediaQuery("(max-width:900px)")
  const { subtitle1, mainText, subtitle2, button, position } = data

  return (
    <Wrapper>
      {children}
      <Middle position={!matches ? position : "center"}>
        <Box
          borderRadius={matches ? "0" : "20px"}
          sx={{
            p: "20px 40px",
            backgroundColor: matches ? "blackBackground" : "titleBackground",
          }}
        >
          <Typography
            sx={{ margin: "20px 10px;" }}
            textAlign={
              !matches
                ? position === "left"
                  ? "left"
                  : position === "right"
                  ? "right"
                  : "center"
                : "center"
            }
            variant="subtitle1"
          >
            {subtitle1}
          </Typography>
          <Typography
            textTransform="uppercase"
            textAlign={
              !matches
                ? position === "left"
                  ? "left"
                  : position === "right"
                  ? "right"
                  : "center"
                : "center"
            }
            maxWidth={matches ? "100%" : "550px"}
            sx={{ mb: "17px", color: "#fff" }}
            variant="h1"
          >
            {mainText}
          </Typography>
          <Typography
            textAlign={
              !matches
                ? position === "left"
                  ? "left"
                  : position === "right"
                  ? "right"
                  : "center"
                : "center"
            }
            mb={matches && "40px"}
            variant="subtitle1"
          >
            {subtitle2}
          </Typography>
          {button && (
            <Box
              display={!matches ? "flex" : "grid"}
              justifyContent={
                !matches
                  ? position === "left"
                    ? "left"
                    : position === "right"
                    ? "right"
                    : "center"
                  : "center"
              }
              alignItems="center"
            >
              {button.map(item =>
                item.type === "href" ? (
                  <ButtonAnotherLink
                    href={item.url}
                    key={item.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    margin="10px"
                    color={item.color}
                    background={item.background}
                    hoverback={item.hoverBack}
                    hovercolor={item.hoverColor}
                    hoverborder={item.hoverBorder}
                  >
                    <Typography textAlign="center" variant="subtitle2">
                      {item.text}
                    </Typography>
                  </ButtonAnotherLink>
                ) : (
                  <LinkButton
                    key={item.id}
                    margin="10px"
                    color={item.color ? item.color : "black"}
                    background={item.background ? item.background : "white"}
                    to={item.url}
                  >
                    <Typography textAlign="center" variant="subtitle2">
                      {item.text}
                    </Typography>
                  </LinkButton>
                )
              )}
            </Box>
          )}
        </Box>
      </Middle>
    </Wrapper>
  )
}
