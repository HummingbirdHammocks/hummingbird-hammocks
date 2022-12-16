import React, { useEffect, useState, useCallback } from "react"
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { ExpandMore } from '@mui/icons-material';

export function ProductFeatures({ details, backgroundColor, accentColor }) {
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(0)
  const [imageAlt, setImageAlt] = useState("")

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
    handleImage(index, isExpanded ? index : false)
  };

  const handleImage = useCallback((expanded) => {
    if (expanded !== false) {
      setImage(details[expanded].image_url)
      setImageAlt(details[expanded].title)
    } else {
      setImage(details[0].image_url)
      setImageAlt(details[0].title)
    }
  }, [details])

  useEffect(() => {
    if (details) {
      handleImage(expanded)
    }
  }, [details, expanded, handleImage])

  /* console.log(details) */
  /* console.log(expanded) */

  if (!details) return null

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "#FDFDF5",
        borderColor: accentColor ? accentColor : 'divider',
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
      }}
    >
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: { xs: 1, sm: 2 } }}>
            <img
              src={image}
              alt={imageAlt}
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: { xs: 2, sm: 4 } }}>
            {details.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{
                  padding: 2,
                  borderColor: accentColor ? accentColor : 'divider',
                  borderStyle: "solid",
                  borderTopWidth: expanded === index ? "1px" : "0px",
                  borderLeftWidth: "1px",
                  borderRightWidth: "1px",
                  borderBottomWidth: "1px",

                  '&:first-of-type': {
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderTopWidth: "1px",
                  },
                  '&:last-of-type': {
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomWidth: "1px",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant={"h6"} >{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component={"span"}>
                    {item.html_text && <div dangerouslySetInnerHTML={{ __html: item.html_text }} />}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
