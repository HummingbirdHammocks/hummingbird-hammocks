import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout, Link, MainWrapper, Socials } from 'components';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { ArticlesHeader, ArticlesSidebar } from 'sections';

import { useRecentlyViewedDispatch } from '../../stores';
import { fShopify } from '../../utils/formatTime';

const KnowledgebaseArticles = ({
  data: { knowledgebaseArticles, recentKnowledgebaseArticles },
  pageContext: { next, prev }
}) => {
  const theme = useTheme();

  const rvpDispatch = useRecentlyViewedDispatch();

  const type = 'articles';

  const { title, published_at, /* author, */ body_html, /* handle, */ localFile } =
    knowledgebaseArticles;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (knowledgebaseArticles.title && knowledgebaseArticles.handle) {
      rvpDispatch({
        type: 'addRecentlyViewedKBArticle',
        article: {
          id: knowledgebaseArticles.id,
          title: knowledgebaseArticles.title,
          handle: knowledgebaseArticles.handle,
          link: `/knowledgebase/${type}/${knowledgebaseArticles.handle}`
        }
      });
    }
  }, [knowledgebaseArticles, rvpDispatch]);

  return (
    <Layout>
      <ArticlesHeader
        title={title}
        backpath={'/knowledgebase/articles'}
        date={fShopify(published_at)}
      />
      <MainWrapper>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: 1 }}>
          <Typography variant="collectionName">
            <Link to="/">HOME</Link> / <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> /{' '}
            <Link to={`/knowledgebase/articles/`}>ARTICLES</Link> / {title}
          </Typography>

          <ButtonGroup variant="outlined" aria-label="navigation button group">
            {prev && prev.handle && (
              <Tooltip title={prev.title}>
                <Button size="small" component={Link} to={`/knowledgebase/articles/${prev.handle}`}>
                  Prev
                </Button>
              </Tooltip>
            )}
            {next && next.handle && (
              <Tooltip title={next.title}>
                <Button size="small" component={Link} to={`/knowledgebase/articles/${next.handle}`}>
                  Next
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </Stack>

        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} lg={9}>
            <Container maxWidth="md">
              <Box
                sx={{
                  '& h2': {
                    ...theme.typography.h2,
                    textTransform: 'uppercase'
                  },

                  '& a': {
                    textDecoration: 'none'
                  },

                  '& span': {
                    ...theme.typography.body1
                  },

                  '& h2 a span': {
                    fontSize: '22px',
                    color: 'black'
                  },

                  '& p': {
                    ...theme.typography.body1
                  },

                  '& table': {
                    ...theme.typography.body1
                  },

                  '& img': {
                    borderRadius: '20px',
                    width: '100%'
                  },

                  marginTop: 6
                }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: body_html
                  }}
                />
              </Box>
            </Container>
            <Box
              display="flex"
              justifyContent={{ xs: 'center', md: 'right' }}
              sx={{
                margin: { xs: '10px 300px 70px 300px', md: '0 0 60px 0' }
              }}>
              {localFile && (
                <Socials
                  title={title}
                  url={url}
                  media={localFile.childImageSharp.gatsbyImageData}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} mt={2}>
            <ArticlesSidebar recentArticles={recentKnowledgebaseArticles} type={type} page={true} />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout>
  );
};

export default KnowledgebaseArticles;

export const query = graphql`
  query knowledgebaseArticleQuery($id: String) {
    knowledgebaseArticles(id: { eq: $id }) {
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

    recentKnowledgebaseArticles: allKnowledgebaseArticles(
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
`;
