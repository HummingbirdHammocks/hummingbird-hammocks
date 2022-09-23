import React from "react"
import { useTheme, Typography, Box } from "@mui/material"

import { MainWrapper } from "../../components"

export function Info({ title, titleAlign, children, subTextAlign }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.white,
        padding: "60px 15px",

        [theme.breakpoints.down("md")]: {
          padding: "50px 0",
          wordBreak: "break-word",
        },

        "& a": {
          color: "#34542a",
          wordBreak: "break-all",
        },
      }}>
      <MainWrapper>
        {title && (
          <>
            <Typography
              sx={{
                textDecoration: "underline",
                textUnderlineOffset: "10px",
                textDecorationColor: "#cccc",
                mb: "30px",
              }}
              textTransform="uppercase"
              textAlign={titleAlign ? titleAlign : "center"}
              variant="h2"
            >
              {title}
            </Typography>
          </>
        )}

        <Box display="flex" justifyContent="center">
          <Typography
            textAlign={subTextAlign ? subTextAlign : "center"}
            sx={{ mt: "30px", maxWidth: "1200px" }}
            variant="body1"
          >
            {children}
          </Typography>
        </Box>
      </MainWrapper>
    </Box>
  )
}
