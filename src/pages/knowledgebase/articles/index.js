import { Box, Grid, Stack, Typography } from '@mui/material';
import { graphql } from 'gatsby';
import React from 'react';

import { Layout, Link, MainWrapper, Seo } from '../../../components';
import { ArticlesHeader, ArticlesSection, ArticlesSidebar } from '../../../sections';

const KnowledgebaseArticlesPage = ({
  data: { allKnowledgebaseArticles, knowledgebaseArticles }
}) => {
  const type = 'articles';

  return (
    <Layout>
      <ArticlesHeader title="FAQs & Articles" backpath="/knowledgebase" />

      <MainWrapper>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="collectionName">
            <Link to="/">HOME</Link> / <Link to={`/knowledgebase/`}>KNOWLEDGEBASE</Link> / MANUALS
          </Typography>
        </Box>

        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} lg={9}>
            <Stack>
              {allKnowledgebaseArticles.group.map((group) => {
                if (!group.nodes[0].tags || group.nodes[0].tags === '') return null;
                return <ArticlesSection group={group} type={type} key={group.nodes[0].tags} />;
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} lg={3} mt={2}>
            <ArticlesSidebar recentArticles={knowledgebaseArticles} type={type} />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout>
  );
};

export default KnowledgebaseArticlesPage;

export const query = graphql`
  query knowlegebaseArticlesTemplate {
    allKnowledgebaseArticles(sort: { published_at: DESC }) {
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

    knowledgebaseArticles: allKnowledgebaseArticles(limit: 5, sort: { published_at: DESC }) {
      nodes {
        title
        handle
        id
      }
    }
  }
`;

export const Head = () => <Seo title="Knowledgebase Articles | Hummingbird Hammocks" />;
