import React from "react"
import {
  useTheme,
  Box,
  Tooltip,
  Container,
  Stack,
  Typography,
  Button,
  ButtonGroup
} from "@mui/material"
import { graphql } from "gatsby"

import { Seo, Layout, MainWrapper, Link, Socials } from "components"

import { fShopify } from '../../utils/formatTime'


const ManualArticles = ({ data: { manualArticles }, pageContext: { next, prev } }) => {
  const theme = useTheme();

  const { title, published_at, /* author, */ body_html, /* handle, */ localFile } = manualArticles
  const url = typeof window !== "undefined" ? window.location.href : ""

  return (
    <Layout>
      <Seo title={title} />
      <MainWrapper>
        <Container maxWidth="md">
          <Box sx={{ marginBottom: 6 }}>
            <Typography
              sx={{ margin: "20px 10px" }}
              textAlign="center"
              variant="h2"
            >
              {title}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 2, marginBottom: 6 }}
          >
            <Box>
              <Typography variant="collectionName">
                <Link to="/">HOME</Link> /{" "}
                <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> /{" "}
                <Link to={`/knowledgebase/manuals/`}>MANUALS</Link>{" "}
              </Typography>
              <br />
              <Typography variant="collectionName">{fShopify(published_at)}</Typography>
            </Box>
            <ButtonGroup variant="outlined" aria-label="navigation button group">
              {prev && prev.handle && (
                <Tooltip title={prev.title}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/knowledgebase/manuals/${prev.handle}`}
                  >
                    Prev
                  </Button>
                </Tooltip>
              )}
              {next && next.handle && (
                <Tooltip title={next.title}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/knowledgebase/manuals/${next.handle}`}
                  >
                    Next
                  </Button>
                </Tooltip>
              )}
            </ButtonGroup>
          </Stack>

          <Box
            sx={{

              "& h2": {
                ...theme.typography.h2,
                textTransform: "uppercase",
              },

              "& a": {
                textDecoration: "none",
              },

              "& span": {
                ...theme.typography.body1,
              },

              "& h2 a span": {
                fontSize: "22px",
                color: "black",
              },

              "& p": {
                ...theme.typography.body1,
              },

              "& table": {
                ...theme.typography.body1,
              },

              "& img": {
                borderRadius: "20px",
                width: "100%",
              },

              [theme.breakpoints.down("md")]: {
                margin: "0",
              },
            }}>
            <div
              dangerouslySetInnerHTML={{
                __html: body_html,
              }}
            />
          </Box>
        </Container>
        <Box
          display="flex"
          justifyContent={{ xs: "center", md: "right" }}
          sx={{
            margin: { xs: "10px 300px 70px 300px", md: "0 0 60px 0" },
          }}
        >
          {localFile && (
            <Socials
              title={title}
              url={url}
              media={localFile.childImageSharp.gatsbyImageData}
            />
          )}
        </Box>
      </MainWrapper>
    </Layout >
  )
}

export default ManualArticles

export const query = graphql`
  query manualArticleQuery($id: String) {
    manualArticles(id: { eq: $id }) {
      localFile {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      author
      body_html
      summary_html
      published_at
      title
      handle
      id
    }
  }
`
