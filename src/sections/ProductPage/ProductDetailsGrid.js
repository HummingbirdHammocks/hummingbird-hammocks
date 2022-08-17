import React from "react"
import { styled, Box, Divider, Typography, useMediaQuery } from "@mui/material"

const Wrapper = styled("section")(({ theme }) => ({
  padding: "10px",

  [theme.breakpoints.down("md")]: {
    padding: "0",
  },
}))

const DetailsWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",

  "& p": {
    ...theme.typography.body1,
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

export const ProductDetailsGrid = ({
  title,
  body1Title,
  body2Title,
  body1,
  body2,
  children,
}) => {
  const matches = useMediaQuery("(max-width:900px)")
  return (
    <Wrapper>
      <Divider />
      <DetailsWrap p={matches ? "40px 0" : "40px 10px"}>
        <Typography mb={matches && "30px"} variant="h5">
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
      </DetailsWrap>
    </Wrapper>
  )
}
