import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { Link } from '../../components';
import { fShopify } from '../../utils';

export const KnowledgebaseItem = ({ item, description, linkType }) => {
  return (
    <Paper key={item.id} sx={{ padding: 2 }}>
      <Box component={Link} to={`/knowledgebase/${linkType}/${item.handle}`}>
        {item.localFile && (
          <GatsbyImage
            imgStyle={{
              borderRadius: '20px'
            }}
            alt={item.title}
            image={item.localFile.childImageSharp.gatsbyImageData}
          />
        )}
        <Typography variant="body1" color="black" sx={{ fontSize: 16 }}>
          {item.title}
        </Typography>
        {description && (
          <div
            dangerouslySetInnerHTML={{
              __html: item.summary_html
            }}
          />
        )}
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack>
          <Typography variant="caption" sx={{ fontSize: 12 }}>
            {fShopify(item.publishedAt)}
          </Typography>
        </Stack>
        <Button component={Link} to={`/knowledgebase/${linkType}/${item.handle}`}>
          Read More
        </Button>
      </Stack>
    </Paper>
  );
};
