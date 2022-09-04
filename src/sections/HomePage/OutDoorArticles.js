import React from "react"
import { styled, Typography, Box } from "@mui/material"
import { useStaticQuery, graphql } from "gatsby"

import { MainWrapper } from "components"
import { BlogItem } from "sections"

const ArticleSection = styled("section")(({ theme }) => ({
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
}))

const BlogGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  position: "relative",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "40px",
  margin: "90px 100px 50px 100px",

  [theme.breakpoints.down("lg")]: {
    margin: "60px 0 50px 0",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

export function OutDoorArticles() {
  const data = useStaticQuery(graphql`
    {
      allArticles(limit: 3, sort: { order: DESC, fields: published_at }) {
        nodes {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          summary_html
          published_at
          title
          handle
          id
        }
      }
    }
  `)

  return (
    <ArticleSection>
      <MainWrapper>
        <Typography
          sx={{
            textDecoration: "underline",
            textUnderlineOffset: "10px",
            textDecorationColor: "#cccc",
            mb: "30px",
          }}
          textTransform="uppercase"
          textAlign="center"
          variant="h2"
        >
          Outdoor Articles
        </Typography>

        <BlogGrid>
          {data.allArticles.nodes.map(item => (
            <BlogItem item={item} />
          ))}
        </BlogGrid>
      </MainWrapper>
    </ArticleSection>
  )
}
