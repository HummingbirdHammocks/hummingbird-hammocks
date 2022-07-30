import React from "react"
import { Box, Typography, styled, useMediaQuery } from "@mui/material"
import { LinkButton } from "components"

const Wrapper = styled("section")(() => ({
  display: "grid",
  minHeight: "600px",
  position: "relative",
}))

const Middle = styled("div")(({ position, theme }) => ({
  position: "absolute",
  display: "flex",
  left: position === "left" ? "30%" : position === "right" ? "67%" : "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  [theme.breakpoints.down("md")]: {
    position: "inherit",
  },
}))

export function Hero({ children, data }) {
  const matches = useMediaQuery("(max-width:768px)")
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
            sx={{ maxWidth: "550px", mb: "17px", color: "#fff" }}
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
            >
              {button.map(item => (
                <LinkButton
                  key={item.id}
                  margin="10px"
                  color={item.color ? item.color : "black"}
                  background={item.background ? item.background : "white"}
                  to={item.url}
                >
                  {item.text}
                </LinkButton>
              ))}
            </Box>
          )}
        </Box>
      </Middle>
    </Wrapper>
  )
}
