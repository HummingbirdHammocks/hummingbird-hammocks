import React, { useState } from "react"
import { graphql } from "gatsby"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Stack,
  Button,
  Grid,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

import { Layout, MainWrapper, Link } from "components"
import { ArticlesHeader, ArticlesSection } from "sections"
import KnowledgebaseArticlesSearch from "utils/algolia/knowledgebaseArticlesSearch"

const KnowledgebaseArticlesPage = ({ data: { allKnowledgebaseArticles, knowledgebaseArticles } }) => {
  const [collapse, setCollapse] = useState(true)

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
          <Grid item xs={12} md={9}>
            <Stack>
              {allKnowledgebaseArticles.group.map((group) => {
                if (!group.nodes[0].tags || group.nodes[0].tags === "") return null;
                return (
                  <ArticlesSection group={group} type="articles" key={group.nodes[0].tags} />
                )
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3} mt={2}>
            <Stack
              spacing={2}
              sx={{
                borderLeft: { xs: "0", md: "1px solid #cccc" },
                paddingLeft: 2,
                paddingRight: 2,
              }}>
              <Box className="articles">
                <KnowledgebaseArticlesSearch />
              </Box>
              <Button
                variant="outlined"
                component={Link}
                to={`/knowledgebase/manuals`}
              >
                MANUALS / GUIDES
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to={`/account/create-ticket`}
              >
                Create Ticket
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to={`/account/tickets`}
              >
                Your Tickets
              </Button>
              <Box>
                <ListItemButton onClick={() => setCollapse(!collapse)}>
                  <ListItemText
                    secondaryTypographyProps={{
                      fontSize: 20,
                      letterSpacing: 1.2,
                      fontWeight: 400,
                      textTransform: "uppercase",
                      color: "#000",
                    }}
                    secondary="RECENT ARTICLES"
                  />
                  {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Box>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                  {knowledgebaseArticles.nodes.map(article => (
                    <ListItem m="20px" key={article.id}>
                      <Link to={`/knowledgebase/articles/${article.handle}`}>
                        <Typography>{article.title}</Typography>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Stack>
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
      limit: 10
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
