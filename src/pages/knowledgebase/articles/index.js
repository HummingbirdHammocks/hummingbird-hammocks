import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material"

import { Layout, MainWrapper, Link } from "components"
import { ArticlesHeader, ArticlesSection, ArticlesSidebar } from "sections"

const KnowledgebaseArticlesPage = ({ data: { allKnowledgebaseArticles, knowledgebaseArticles } }) => {

  const type = "page"

  return (
    <Layout>
      <ArticlesHeader title="FAQs & Articles" backpath="/knowledgebase" />

      <MainWrapper>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="collectionName">
            <Link to="/">HOME</Link> /{" "}
            <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> / MANUALS
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12} lg={9}>
            <Stack>
              {allKnowledgebaseArticles.group.map((group) => {
                if (!group.nodes[0].tags || group.nodes[0].tags === "") return null;
                return (
                  <ArticlesSection group={group} type={type} key={group.nodes[0].tags} />
                )
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} lg={3} mt={2}>
            <ArticlesSidebar recentArticles={knowledgebaseArticles} type={type} />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout >
  )
}

export default KnowledgebaseArticlesPage

export const query = graphql`
  query knowlegebaseArticlesTemplate {
    allKnowledgebaseArticles(
      sort: { fields: published_at, order: DESC }
    ) {
      totalCount
      group(field: tags) {
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
          tags
        }
      }
    }

    knowledgebaseArticles: allKnowledgebaseArticles(
      limit: 5
      sort: { fields: published_at, order: DESC }
    ) {
      nodes {
        title
        handle
        id
      }
    }
  }
`
