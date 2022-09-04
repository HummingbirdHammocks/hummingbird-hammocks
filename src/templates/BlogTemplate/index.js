import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import {
  Box,
  Typography,
  Divider,
  styled,
  useMediaQuery,
  Pagination,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

import { Seo, Layout, MainWrapper, Link, OnButton } from "components"

import { BlogItem } from "sections"

const ArticlesWrapper = styled(Box)(({ theme }) => ({
  padding: "0 15px 10px 15px",
  margin: "50px 0",
  display: "grid",
  gridTemplateColumns: "3fr 1fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    padding: "0",
  },
}))

const ArticlesGridWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  position: "relative",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "40px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const Subscribe = styled(Box)(() => ({
  padding: "30px 15px",
  marginTop: "20px",
  borderTop: "1px solid #ccc",
}))

const EmailBox = styled(Box)(() => ({
  display: "flex",

  "& input": {
    width: "50%",
    marginRight: "20px",
  },
}))

const BlogTemplate = ({ data: { allArticles, articles }, pageContext }) => {
  const matches = useMediaQuery("(max-width:900px)")
  console.log(articles)

  const [collapse, setCollapse] = useState(matches ? false : true)

  //pagination
  let numberOfPages = Math.ceil(allArticles.totalCount / 9)

  const handleChange = (e, value) => {
    if (value === 1) {
      navigate(`/blogs/news/`)
    } else {
      navigate(`/blogs/news/${value}`)
    }
  }

  return (
    <Layout>
      <Seo title="Outdoor Articles" />
      <Box mt={matches ? "40px" : "130px"}>
        <MainWrapper>
          <Typography
            sx={{ margin: "20px 10px" }}
            variant="h2"
            color="black.main"
          >
            OUTDOOR ARTICLES
          </Typography>
          <Divider color="#e2dfd9" />
        </MainWrapper>
      </Box>

      <MainWrapper>
        <ArticlesWrapper>
          <Box pr={matches ? "0" : "40px"}>
            <ArticlesGridWrapper>
              {allArticles.nodes.map(item => (
                <BlogItem description item={item} />
              ))}
            </ArticlesGridWrapper>
            <Box m="50px 0" display="flex" justifyContent="center">
              <Pagination
                count={numberOfPages}
                page={pageContext.currentPage}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box
            pl={matches ? "0" : "30px"}
            borderLeft={matches ? "0" : "1px solid #cccc"}
          >
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
                {articles.nodes.map(collection => (
                  <ListItem m="20px" key={collection.id}>
                    <Link to={`/collections/${collection.handle}`}>
                      <Typography>{collection.title}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Subscribe>
              <Typography variant="h6">SUBSCRIBE</Typography>
              <Typography mb="20px" variant="body1">
                Sign up to get the latest on sales, new releases and more …
              </Typography>
              <EmailBox>
                <input placeholder="Email Address" type="Email Address" />
                <OnButton padding="4px 20px" type="submit">
                  Sign Up
                </OnButton>
              </EmailBox>
            </Subscribe>
          </Box>
        </ArticlesWrapper>
      </MainWrapper>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
  query articlesTemplate($skip: Int!, $limit: Int!) {
    allArticles(
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

    articles: allArticles(
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
