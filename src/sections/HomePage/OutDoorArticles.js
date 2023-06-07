import { Box, Grid, Typography } from '@mui/material';
import { MainWrapper } from 'components';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { BlogItem } from 'sections';

export function OutDoorArticles() {
  const data = useStaticQuery(graphql`
    {
      allArticles(limit: 3, sort: {published_at: DESC}) {
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
    }
  `);

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 4
      }}>
      <MainWrapper>
        <Typography
          sx={{
            textDecoration: 'underline',
            textTransform: 'uppercase',
            textUnderlineOffset: '10px',
            textDecorationColor: '#cccc',
            mb: '30px'
          }}
          textAlign="center"
          variant="h2">
          Outdoor Articles
        </Typography>

        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
          {data.allArticles.nodes.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BlogItem item={item} />
            </Grid>
          ))}
        </Grid>
      </MainWrapper>
    </Box>
  );
}
