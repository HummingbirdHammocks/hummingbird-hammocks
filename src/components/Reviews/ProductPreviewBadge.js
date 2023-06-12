import { Typography } from '@mui/material';
import React from 'react';

/* import { getProductPreviewBadge } from "utils/judgeMe" */

export const ProductPreviewBadge = ({ id }) => {
  if (!id) {
    return null;
  }

  const id_only = id.split('gid://shopify/Product/')[1];

  return (
    <Typography component={'div'} sx={{ padding: '10px' }}>
      {/* {reviews && (
        <div dangerouslySetInnerHTML={{ __html: reviews.badge }} />
      )} */}
      <div className="jdgm-widget jdgm-preview-badge" data-id={id_only}></div>
    </Typography>
  );
};
