import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Stack,
  Typography
} from '@mui/material';
import { graphql, navigate } from 'gatsby';
import React, { useState } from 'react';

import { Layout, Link, MainWrapper, Seo } from '../../components';
import { BlogItem } from '../../sections';

/* import { ArticlesSearch } from '../../utils'; */

const BlogTemplate = ({ data: { allArticles, articles }, pageContext }) => {
  const [collapse, setCollapse] = useState(true);

  //pagination
  const numberOfPages = Math.ceil(allArticles.totalCount / 9);

  const handleChange = (e, value) => {
    if (value === 1) {
      navigate(`/blogs/news/`);
    } else {
      navigate(`/blogs/news/${value}`);
    }
  };

  return (
    <Layout>
      <Seo title="Outdoor Articles" />
      <Box pt={'10px'}>
        <MainWrapper>
          <Typography sx={{ margin: '20px 10px' }} variant="h2" color="black.main">
            OUTDOOR ARTICLES
          </Typography>
          <Divider color="#e2dfd9" />
        </MainWrapper>
      </Box>

      <MainWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              padding={2}>
              {allArticles.nodes.map((item) => (
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <BlogItem description item={item} />
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
                borderLeft: { xs: '0', md: '1px solid #cccc' },
                paddingLeft: 2,
                paddingRight: 2
              }}>
              {/* <Box className="articles">
                <ArticlesSearch />
              </Box> */}
              <Box>
                <ListItemButton onClick={() => setCollapse(!collapse)}>
                  <ListItemText
                    secondaryTypographyProps={{
                      fontSize: 20,
                      letterSpacing: 1.2,
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      color: '#000'
                    }}
                    secondary="RECENT ARTICLES"
                  />
                  {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Box>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                  {articles.nodes.map((article) => (
                    <ListItem m="20px" key={article.id}>
                      <Link to={`/blogs/news/${article.handle}`}>
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
    </Layout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query articlesTemplate($skip: Int!, $limit: Int!) {
    allArticles(limit: $limit, skip: $skip, sort: { publishedAt: DESC }) {
      totalCount
      nodes {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        content
        contentHtml
        publishedAt
        title
        handle
        id
      }
    }

    articles: allArticles(limit: 10, sort: { publishedAt: DESC }) {
      nodes {
        title
        handle
        id
      }
    }
  }
`;

export const Head = () => <Seo title={`Outdoor Articles | Hummingbird Hammocks`} />;
