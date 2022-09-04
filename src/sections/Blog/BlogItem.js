import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Typography, useMediaQuery } from "@mui/material"

import { Link, LinkButton } from "components"

export const BlogItem = ({ item, description }) => {
  const matches = useMediaQuery("(max-width:900px)")
  return (
    <Box key={item.id}>
      <Box>
        <Link to={`/blogs/news/${item.handle}`}>
          <GatsbyImage
            imgStyle={{
              borderRadius: "20px",
            }}
            alt={item.title}
            image={item.localFile.childImageSharp.gatsbyImageData}
          />
          <Typography mt="40px" variant="h5" color="black">
            {item.title}
          </Typography>
          <Typography variant="collectionName">{item.published_at}</Typography>
          {description && (
            <Typography m="20px 0" variant="body1" color="black">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.summary_html,
                }}
              />
            </Typography>
          )}
        </Link>
      </Box>

      <Box mt="20px" display="flex">
        <LinkButton
          color="black"
          background="383839"
          bordercolor="#cccc"
          to={`/blogs/news/${item.handle}`}
          sx={{
            padding: matches ? "11px 22px" : "12px 40px",
          }}
        >
          <Typography textAlign="center" variant="subtitle2">
            Read More
          </Typography>
        </LinkButton>
      </Box>
    </Box>
  )
}
