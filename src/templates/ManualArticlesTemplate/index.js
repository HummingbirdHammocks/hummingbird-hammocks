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
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';

import { Layout, Link, MainWrapper, Seo, Socials } from '../../components';
import { ArticlesHeader, ArticlesSidebar } from '../../sections';
import { useRecentlyViewedDispatch } from '../../stores';
import { fShopify } from '../../utils';

const ManualArticles = ({
  data: { manualArticles, recentManualArticles },
  pageContext: { next, prev }
}) => {
  const theme = useTheme();

  const rvpDispatch = useRecentlyViewedDispatch();

  const type = 'manuals';

  const { title, publishedAt, contentHtml, localFile } = manualArticles;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (manualArticles.title && manualArticles.handle) {
      rvpDispatch({
        type: 'addRecentlyViewedKBArticle',
        article: {
          id: manualArticles.id,
          title: manualArticles.title,
          handle: manualArticles.handle,
          link: `/knowledgebase/${type}/${manualArticles.handle}`
        }
      });
    }
  }, [manualArticles, rvpDispatch]);

  return (
    <Layout>
      <ArticlesHeader
        title={title}
        backpath={'/knowledgebase/manuals'}
        date={fShopify(publishedAt)}
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
            <Link to={`/knowledgebase/manuals/`}>MANUALS</Link> / {title}
          </Typography>

          <ButtonGroup variant="outlined" aria-label="navigation button group">
            {prev && prev.handle && (
              <Tooltip title={prev.title}>
                <Button size="small" component={Link} to={`/knowledgebase/manuals/${prev.handle}`}>
                  Prev
                </Button>
              </Tooltip>
            )}
            {next && next.handle && (
              <Tooltip title={next.title}>
                <Button size="small" component={Link} to={`/knowledgebase/manuals/${next.handle}`}>
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
                    __html: contentHtml
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
            <ArticlesSidebar recentArticles={recentManualArticles} type={type} page={true} />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout>
  );
};

export default ManualArticles;

export const query = graphql`
  query manualArticleQuery($id: String) {
    manualArticles(id: { eq: $id }) {
      localFile {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      authorV2 {
        name
      }
      contentHtml
      excerpt
      publishedAt
      title
      handle
      id
    }

    recentManualArticles: allManualArticles(limit: 5, sort: { publishedAt: DESC }) {
      nodes {
        title
        handle
        id
      }
    }
  }
`;

export const Head = ({ data }) => {
  let title = '';
  if (data?.manualArticles?.seo?.title) {
    title = data?.manualArticles?.seo?.title;
  } else {
    title = data.manualArticles.title;
  }

  let description = '';
  if (data?.manualArticles?.seo?.description) {
    description = data?.manualArticles?.seo?.description;
  } else {
    description = data.manualArticles.content;
  }

  return <Seo title={`${title} | HH Knowledgebase`} description={description} />;
};
