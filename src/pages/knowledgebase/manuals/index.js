import { Box, Grid, Stack, Typography } from '@mui/material';
import { Layout, Link, MainWrapper } from 'components';
import { graphql } from 'gatsby';
import React from 'react';
import { ArticlesHeader, ArticlesSection, ArticlesSidebar } from 'sections';

const ManualsPage = ({ data: { allManualArticles, manualArticles } }) => {
  const type = 'manuals';

  return (
    <Layout>
      <ArticlesHeader title="Manuals & Guides" backpath="/knowledgebase" />

      <MainWrapper>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="collectionName">
            <Link to="/">HOME</Link> / <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> / MANUALS
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <Stack>
              {allManualArticles.group.map((group) => {
                if (!group.nodes[0].tags || group.nodes[0].tags === '') return null;
                return <ArticlesSection group={group} type={type} key={group.nodes[0].tags} />;
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} lg={3} mt={2}>
            <ArticlesSidebar recentArticles={manualArticles} type={type} />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout>
  );
};

export default ManualsPage;

export const query = graphql`
  query manualArticlesTemplate {
    allManualArticles(sort: { published_at: DESC }) {
      totalCount
      group(field: { tags: SELECT }) {
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

    manualArticles: allManualArticles(limit: 5, sort: { published_at: DESC }) {
      nodes {
        title
        handle
        id
      }
    }
  }
`;
