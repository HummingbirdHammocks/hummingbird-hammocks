import { Typography } from '@mui/material';
import React from 'react';

export const ProductReviewWidget = ({ title, id }) => {
  if (!id) {
    return null;
  }

  const id_only = id.split('gid://shopify/Product/')[1];

  return (
    <Typography component={'div'} sx={{ padding: '10px' }}>
      <div
        className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
        data-id={id_only}
        data-product-title={title}></div>
    </Typography>
  );
};
