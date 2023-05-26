import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Paper, Typography, Button, Stack } from "@mui/material"

import { Link } from "components"

import { fShopify } from '../../utils/formatTime'

export const KnowledgebaseItem = ({ item, description, linkType }) => {
  return (
    <Paper key={item.id} sx={{ padding: 2 }}>
      <Box>
        <Link to={`/knowledgebase/${linkType}/${item.handle}`}>
          {item.localFile && (
            <GatsbyImage
              imgStyle={{
                borderRadius: "20px",
              }}
              alt={item.title}
              image={item.localFile.childImageSharp.gatsbyImageData}
            />
          )}
          <Typography variant="body1" color="black" sx={{ fontSize: 16 }}>
            {item.title}
          </Typography>
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack>
          <Typography variant="caption" sx={{ fontSize: 12 }}>{fShopify(item.published_at)}</Typography>
        </Stack>
        <Button
          component={Link}
          to={`/knowledgebase/${linkType}/${item.handle}`}
        >
          Read More
        </Button>
      </Stack>
    </Paper>
  )
}
