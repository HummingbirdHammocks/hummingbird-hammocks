import React, { useState, useEffect } from "react"
import {
  Paper,
  Box,
  Container
} from "@mui/material"

import { productBackgrounds } from "utils/productBackgrounds"

export function ProductHero({ children, handle, backgroundColor, accentColor }) {
  const [background, setBackground] = useState(null)


  useEffect(() => {
    if (handle) {
      setBackground(productBackgrounds(handle))
    }
  }, [handle])

  return (
    <>
      <Box display={{ xs: "none", md: "block" }}>
        <Box
          sx={{
            display: { lg: "grid" },
            height: "100%",
            width: "auto",
            backgroundColor: backgroundColor ? backgroundColor : "#FDFDF5",
            backgroundImage: background,
            backgroundSize: "cover",
          }}>
          <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 2, paddingRight: 2 }}>
            <Paper
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderColor: accentColor ? accentColor : "rgba(0, 0, 0, 0.12)",
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "20px",
                padding: 4,
              }}
            >

              {children}

            </Paper>
          </Container >
        </Box>
      </Box>
      <Box display={{ xs: "block", md: "none" }}>
        <Box
          sx={{
            padding: 2,
          }}>
          {children}
        </Box>
      </Box>
    </>
  )
}
