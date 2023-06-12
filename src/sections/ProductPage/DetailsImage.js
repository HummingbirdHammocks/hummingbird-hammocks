import React from 'react';

export const DetailsImage = ({ src, title }) => {
  return <img style={{ borderRadius: '20px', width: '100%' }} src={src} alt={title} />;
};
