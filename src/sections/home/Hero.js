import React from "react"
import { Box, Typography, styled } from "@mui/material"
import { LinkButton } from "components"

const Wrapper = styled("section")(() => ({
  display: "grid",
  minHeight: "500px",
}))

const Middle = styled("section")(({ position }) => ({
  position: "absolute",
  display: "flex",
  left: position === "left" ? "30%" : position === "right" ? "67%" : "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}))

export function Hero({ children, data }) {
  const { subtitle1, mainText, subtitle2, button, position } = data

  return (
    <Wrapper sx={{ position: "relative" }}>
      {children}
      <Middle position={position}>
        <Box
          borderRadius={4}
          sx={{
            p: "20px 40px",
            backgroundColor: "titleBackground",
          }}
        >
          <Typography
            sx={{ margin: "20px 10px;" }}
            textAlign={
              position === "left"
                ? "left"
                : position === "right"
                ? "right"
                : "center"
            }
            variant="subtitle1"
          >
            {subtitle1}
          </Typography>
          <Typography
            textTransform="uppercase"
            textAlign={
              position === "left"
                ? "left"
                : position === "right"
                ? "right"
                : "center"
            }
            sx={{ maxWidth: "550px", mb: "17px" }}
            color="white"
            variant="h1"
          >
            {mainText}
          </Typography>
          <Typography
            textAlign={
              position === "left"
                ? "left"
                : position === "right"
                ? "right"
                : "center"
            }
            variant="subtitle1"
          >
            {subtitle2}
          </Typography>
          {button && (
            <Box
              display={"flex"}
              justifyContent={
                position === "left"
                  ? "left"
                  : position === "right"
                  ? "right"
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
