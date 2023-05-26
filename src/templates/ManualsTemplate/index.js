import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import {
  Box,
  Typography,
  Divider,
  Pagination,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Stack,
  Button,
  Grid,
} from "@mui/material"
import { ExpandLess, ExpandMore, ArrowBack } from "@mui/icons-material"

import { Seo, Layout, MainWrapper, Link } from "components"
import { KnowledgebaseItem } from "sections"
import ManualsSearch from "../../utils/algolia/manualsSearch"

const ManualsTemplate = ({ data: { allManualArticles, manualArticles }, pageContext }) => {
  const [collapse, setCollapse] = useState(true)

  //pagination
  let numberOfPages = Math.ceil(allManualArticles.totalCount / 9)

  const handleChange = (e, value) => {
    if (value === 1) {
      navigate(`/knowledgebase/manuals/`)
    } else {
      navigate(`/knowledgebase/manuals/${value}`)
    }
  }

  return (
    <Layout>
      <Seo title="Knowledgebase Manuals" />
      <Box pt={"10px"}>
        <MainWrapper>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ margin: "20px 10px" }}
          >
            <Typography
              variant="h4"
            >
              MANUALS / GUIDES
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Button
                variant="contained"
                component={Link}
                to={`/knowledgebase`}
                startIcon={<ArrowBack />}
              >
                BACK TO ALL
              </Button>
            </Stack>
          </Stack>
          <Divider color="#e2dfd9" />
        </MainWrapper>
      </Box>

      <MainWrapper>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} md={9}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              padding={2}
            >
              {allManualArticles.nodes.map(item => (
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <KnowledgebaseItem description item={item} linkType="manuals" />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box m="50px 0" display="flex" justifyContent="center">
                  <Pagination
                    count={numberOfPages}
                    page={pageContext.currentPage}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
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

export default ManualsTemplate

export const query = graphql`
  query manualArticlesTemplate($skip: Int!, $limit: Int!) {
    allManualArticles(
      limit: $limit
      skip: $skip
      sort: { fields: published_at, order: DESC }
    ) {
      totalCount
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
