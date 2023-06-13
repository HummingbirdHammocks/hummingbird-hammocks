import { Box, Button, Typography } from '@mui/material';
import { Link } from 'components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { fShopify } from '../../utils/formatTime';

export const BlogItem = ({ item, description }) => {
  return (
    <Box key={item.id}>
      <Box>
        <Link to={`/blogs/news/${item.handle}`}>
          <GatsbyImage
            imgStyle={{
              borderRadius: '20px'
            }}
            alt={item.title}
            image={item.localFile.childImageSharp.gatsbyImageData}
          />
          <Typography mt="40px" variant="h5" color="black">
            {item.title}
          </Typography>
          <Typography variant="collectionName">{fShopify(item.published_at)}</Typography>
          {description && (
            <Typography m="20px 0" variant="body1" color="black">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.summary_html
                }}
              />
            </Typography>
          )}
        </Link>
      </Box>

      <Box mt="20px" display="flex">
        <Button variant="outlined" component={Link} to={`/blogs/news/${item.handle}`}>
          Read More
        </Button>
      </Box>
    </Box>
  );
};
