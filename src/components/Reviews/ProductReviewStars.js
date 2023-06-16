import { Star, StarBorder, StarHalf } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React from 'react';

export const ProductReviewStars = ({ max = 5, rating, count, accentcolor }) => {
  if (!rating || !count) {
    return null;
  }

  const maxValue = parseInt(max); // Parse the max as a float

  const ratingValue = parseFloat(rating); // Parse the rating as a float
  const starCount = Math.floor(ratingValue); // Get the integer part of the rating
  const hasHalfStar = ratingValue % 1 !== 0; // Check if the rating has a half star

  /* console.log(maxValue, starCount, hasHalfStar, count); */

  const stars = [];
  for (let i = 0; i < maxValue; i++) {
    if (i < starCount) {
      // Full star
      stars.push(<Star key={i} sx={{ color: accentcolor }} />);
    } else if (i === starCount && hasHalfStar) {
      // Half star
      stars.push(<StarHalf key={i} sx={{ color: accentcolor }} />);
    } else {
      // Empty star
      stars.push(<StarBorder key={i} sx={{ color: accentcolor }} />);
    }
  }

  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Stack direction={'row'}>{stars}</Stack>
      <Typography variant={'caption'}>{count} reviews</Typography>
    </Stack>
  );
};
