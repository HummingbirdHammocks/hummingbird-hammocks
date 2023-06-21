import { Box, Button, ButtonGroup, Container, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { Layout, Link, MainWrapper, Seo, Socials } from '../../components';
import { fShopify } from '../../utils';

const Articles = ({ data: { articles }, pageContext: { next, prev } }) => {
  const theme = useTheme();

  const { title, publishedAt, contentHtml, localFile } = articles;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      <Box
        sx={{
          display: 'grid',
          position: 'relative',

          [theme.breakpoints.down('md')]: {
            minHeight: 'inherit'
          }
        }}>
        <GatsbyImage
          placeholder="blurred"
          alt={title}
          image={localFile.childImageSharp.gatsbyImageData}
          loading="eager"
        />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '100'
          }}>
          <Box>
            <Typography
              sx={{ margin: '20px 10px' }}
              textAlign="center"
              variant="h1"
              color="white.main">
              {title}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: 'rgba(0,0,0,.2)',
            position: 'absolute',
            inset: '0 0 0 0'
          }}
        />
      </Box>
      <MainWrapper>
        <Container maxWidth="md">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 2, marginBottom: 6 }}>
            <Box>
              <Typography variant="collectionName">
                <Link to="/">HOME</Link> / <Link to={`/blogs/news/`}>OUTDOOR ARTICLES</Link>{' '}
              </Typography>
              <br />
              <Typography variant="collectionName">{fShopify(publishedAt)}</Typography>
            </Box>
            <ButtonGroup variant="outlined" aria-label="navigation button group">
              {prev && (
                <Tooltip title={prev.title}>
                  <Button size="small" component={Link} to={`/blogs/news/${prev.handle}`}>
                    Prev
                  </Button>
                </Tooltip>
              )}
              {next && (
                <Tooltip title={next.title}>
                  <Button size="small" component={Link} to={`/blogs/news/${next.handle}`}>
                    Next
                  </Button>
                </Tooltip>
              )}
            </ButtonGroup>
          </Stack>

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

              [theme.breakpoints.down('md')]: {
                margin: '0'
              }
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
          <Socials title={title} url={url} media={localFile.childImageSharp.gatsbyImageData} />
        </Box>
      </MainWrapper>
    </Layout>
  );
};

export default Articles;

export const query = graphql`
  query articleQuery($id: String) {
    articles(id: { eq: $id }) {
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
  }
`;

export const Head = ({ data }) => {
  let title = '';
  if (data?.articles?.seo?.title) {
    title = data?.articles?.seo?.title;
  } else {
    title = data.articles.title;
  }

  let description = '';
  if (data?.articles?.seo?.description) {
    description = data?.articles?.seo?.description;
  } else {
    description = data.articles.content;
  }

  return <Seo title={`${title} | HH Outdoor Articles`} description={description} />;
};
