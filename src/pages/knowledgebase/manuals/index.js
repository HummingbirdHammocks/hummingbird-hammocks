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
import ManualsSearch from "utils/algolia/manualsSearch"

const ManualsPage = ({ data: { allManualArticles, manualArticles } }) => {
  const [collapse, setCollapse] = useState(true)

  return (
    <Layout>
      <ArticlesHeader title="Manuals & Guides" backpath="/knowledgebase" />

      <MainWrapper>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="collectionName" >
            <Link to="/">HOME</Link> /{" "}
            <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> / MANUALS
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} md={9}>
            <Stack>
              {allManualArticles.group.map((group) => {
                if (!group.nodes[0].tags || group.nodes[0].tags === "") return null;
                return (
                  <ArticlesSection group={group} type="manuals" key={group.nodes[0].tags} />
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
                <ManualsSearch />
              </Box>
              <Button
                variant="outlined"
                component={Link}
                to={`/knowledgebase/articles`}
              >
                ARTICLES / FAQ
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
                    secondary="RECENT MANUALS"
                  />
                  {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Box>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                  {manualArticles.nodes.map(article => (
                    <ListItem m="20px" key={article.id}>
                      <Link to={`/knowledgebase/manuals/${article.handle}`}>
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

export default ManualsPage

export const query = graphql`
  query manualArticlesTemplate {
    allManualArticles(
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

    manualArticles: allManualArticles(
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
