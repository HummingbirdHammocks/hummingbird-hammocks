import React from "react"
import { useTheme, Box, Typography, useMediaQuery } from "@mui/material"

import { LinkButton, ButtonAnotherLink } from "components"

export function Hero({ children, data }) {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const { subtitle1, mainText, subtitle2, button, position } = data

  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "600px",
        position: "relative",

        [theme.breakpoints.down("md")]: {
          minHeight: "inherit",
        },
      }}>
      {children}
      <Box
        sx={{
          position: !matches ? "absolute" : "center",
          display: "flex",
          left: position === "left" ? "30%" : position === "right" ? "67%" : "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",

          [theme.breakpoints.down("md")]: {
            position: "inherit",
            display: "block",
          },
        }}>
        <Box
          borderRadius={matches ? "0" : "20px"}
          sx={{
            p: "20px 40px",
            backgroundColor: matches ? "blackBackground" : "titleBackground",
          }}
        >
          <Typography
            sx={{ margin: "20px 10px;" }}
            color={matches ? "black" : "white"}
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
            color={matches ? "black" : "#fff"}
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
            sx={{ mb: "17px" }}
            variant="h1"
          >
            {mainText}
          </Typography>
          {subtitle2 && (
            <Typography
              color={matches ? "black" : "white"}
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
          )}

          {button && (
            <Box
              display="flex"
              justifyContent={
                position === "left"
                  ? "left"
                  : position === "right"
                    ? "right"
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
                    hoverback={item.hoverBack}
                    hovercolor={item.hoverColor}
                    hoverborder={item.hoverBorder}
                    sx={{
                      padding: matches ? "11px 22px" : "12px 40px",
                      margin: matches ? "2px" : "10px",
                    }}
                    color={
                      !matches ? (item.color ? item.color : "black") : "white"
                    }
                    background={
                      !matches
                        ? item.background
                          ? item.background
                          : "white"
                        : "#383839"
                    }
                  >
                    <Typography
                      color={matches && "#fff"}
                      textAlign="center"
                      variant="subtitle2"
                    >
                      {item.text}
                    </Typography>
                  </ButtonAnotherLink>
                ) : (
                  <LinkButton
                    key={item.id}
                    margin="10px"
                    color={
                      !matches ? (item.color ? item.color : "black") : "white"
                    }
                    background={
                      !matches
                        ? item.background
                          ? item.background
                          : "white"
                        : "#383839"
                    }
                    to={item.url}
                    sx={{
                      padding: matches ? "11px 22px" : "12px 40px",
                      margin: matches ? "2px" : "10px",
                    }}
                  >
                    <Typography
                      color={matches && "#fff"}
                      textAlign="center"
                      variant="subtitle2"
                    >
                      {item.text}
                    </Typography>
                  </LinkButton>
                )
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
