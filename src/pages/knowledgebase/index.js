import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { graphql } from 'gatsby';
import React from 'react';

import DoubleHammockBackground from '../../assets/images/product-backgrounds/DoubleHammockBackground.jpg';
import { Layout, Link, MainWrapper, Seo } from '../../components';
import { ArticleTagsTabs } from '../../sections';
import { KnowledgebaseArticlesSearch, KnowledgebaseComboSearch, ManualsSearch } from '../../utils';

const HelpCenter = ({ data: { allKnowledgebaseArticles, allManualArticles } }) => {
  return (
    <Layout>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Box
          sx={{
            height: '100%',
            width: 'auto',
            backgroundColor: '#FDFDF5',
            backgroundImage: `url(${DoubleHammockBackground})`,
            backgroundSize: 'cover'
          }}>
          <Container
            maxWidth="md"
            sx={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 2,
              paddingRight: 2
            }}>
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '20px',
                padding: 4
              }}>
              <Stack alignItems={'center'} sx={{ margin: 6 }}>
                <Typography sx={{ margin: '20px 10px' }} variant="h2" color="black.main">
                  KNOWLEDGE BASE
                </Typography>
                <Typography sx={{ margin: '20px 10px' }} variant="h3">
                  How Can We Help?
                </Typography>
                <Box className="articles" sx={{ width: 300 }}>
                  <KnowledgebaseComboSearch />
                </Box>
                <Stack spacing={2} direction="row" sx={{ paddingTop: 4 }}>
                  <Button variant="contained" component={Link} to={`/account/create-ticket`}>
                    Create Ticket
                  </Button>
                  <Button variant="contained" component={Link} to={`/account/tickets`}>
                    Your Tickets
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Box>

      <Box display={{ xs: 'block', md: 'none' }}>
        <Box
          sx={{
            padding: 2
          }}>
          <Container
            maxWidth="md"
            sx={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 2,
              paddingRight: 2
            }}>
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '20px',
                padding: 4
              }}>
              <Stack alignItems={'center'}>
                <Typography variant="h2" color="black.main" fontSize="1rem">
                  KNOWLEDGE BASE
                </Typography>
                <Typography sx={{ margin: '10px 5px' }} variant="h3" fontSize="1.2rem">
                  How Can We Help?
                </Typography>
                <Box className="articles" sx={{ width: 300 }}>
                  <KnowledgebaseComboSearch />
                </Box>
                <Stack spacing={2} direction="row" sx={{ paddingTop: 2 }}>
                  <Button variant="contained" component={Link} to={`/account/create-ticket`}>
                    Create Ticket
                  </Button>
                  <Button variant="contained" component={Link} to={`/account/tickets`}>
                    Your Tickets
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Box>

      <MainWrapper>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              padding={2}>
              <Typography variant="h4">FAQ & Articles</Typography>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <KnowledgebaseArticlesSearch />
                <Button variant="outlined" component={Link} to={`/knowledgebase/articles`}>
                  All Articles
                </Button>
              </Stack>
            </Stack>
            <ArticleTagsTabs allArticles={allKnowledgebaseArticles} linkType="articles" />
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              padding={2}>
              <Typography variant="h4">Manuals & Guides</Typography>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <ManualsSearch />
                <Button variant="outlined" component={Link} to={`/knowledgebase/manuals`}>
                  All Manuals
                </Button>
              </Stack>
            </Stack>
            <ArticleTagsTabs allArticles={allManualArticles} linkType="manuals" />
          </Grid>
        </Grid>
      </MainWrapper>
    </Layout>
  );
};

export default HelpCenter;

export const query = graphql`
  query helpCenterArticlesTemplate {
    allKnowledgebaseArticles(sort: { publishedAt: DESC }) {
      totalCount
      group(field: { tags: SELECT }) {
        nodes {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          contentHtml
          publishedAt
          title
          handle
          id
          tags
        }
      }
    }

    allManualArticles(sort: { publishedAt: DESC }) {
      totalCount
      group(field: { tags: SELECT }) {
        nodes {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          contentHtml
          publishedAt
          title
          handle
          id
          tags
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Help Center Knowledge Base | Hummingbird Hammocks" />;
