import React from "react"
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Typography, useMediaQuery } from "@mui/material"

export const ProductDetailsGrid = ({
  title,
  body1Title,
  body2Title,
  body1,
  body2,
  children,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  return (
    <Box sx={{
      padding: "10px",

      [theme.breakpoints.down("md")]: {
        padding: "0",
      },
    }}>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",

          "& p": {
            ...theme.typography.body1,
          },

          p: matches ? "40px 0" : "40px 10px",

          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
          },
        }}>
        <Typography mb={matches && "30px"} variant="h4">
          {title}
        </Typography>
        {body1 && (
          <Box mb={matches && "30px"}>
            {body1Title && <Typography variant="h5">{body1Title}</Typography>}

            <div dangerouslySetInnerHTML={{ __html: body1 }} />
          </Box>
        )}
        {children}

        {body2Title && (
          <Box mb={matches && "30px"}>
            <Typography variant="h5">{body2Title}</Typography>
            <div dangerouslySetInnerHTML={{ __html: body2 }} />
          </Box>
        )}
      </Box>
    </Box >
  )
}
