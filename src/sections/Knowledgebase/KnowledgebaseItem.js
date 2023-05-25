import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Typography, Button } from "@mui/material"

import { Link } from "components"

import { fShopify } from '../../utils/formatTime'

export const KnowledgebaseItem = ({ item, description }) => {
  return (
    <Box key={item.id}>
      <Box>
        <Link to={`/knowledgebase/articles/${item.handle}`}>
          {item.localFile && (
            <GatsbyImage
              imgStyle={{
                borderRadius: "20px",
              }}
              alt={item.title}
              image={item.localFile.childImageSharp.gatsbyImageData}
            />
          )}
          <Typography mt="40px" variant="h5" color="black">
            {item.title}
          </Typography>
          <Typography variant="collectionName">{fShopify(item.published_at)}</Typography>
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
        <Button
          variant="outlined"
          component={Link}
          to={`/knowledgebase/articles/${item.handle}`}
        >
          Read More
        </Button>
      </Box>
    </Box>
  )
}
