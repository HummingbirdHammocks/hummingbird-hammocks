import React from "react"
import { useTheme, Box, Typography, Button, Stack, useMediaQuery } from "@mui/material"

import { Link } from "components"

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
            left: "50%",
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
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
              {button.map(item =>
                item.type === "href" ? (
                  <Button
                    variant="contained"
                    href={item.url}
                    key={item.id}
                    compoent="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      padding: matches ? "11px 22px" : "12px 40px",
                      margin: matches ? "2px" : "10px",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="subtitle2"
                    >
                      {item.text}
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    key={item.id}
                    component={Link}
                    to={item.url}
                    sx={{
                      padding: matches ? "11px 22px" : "12px 40px",
                      margin: matches ? "2px" : "10px",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="subtitle2"
                    >
                      {item.text}
                    </Typography>
                  </Button>
                )
              )}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  )
}
