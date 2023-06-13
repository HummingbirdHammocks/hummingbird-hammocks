import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

export const SoldOutIcon = ({ margin }) => (
  <StaticImage
    src="../../assets/images/soldout.png"
    alt="Soldout"
    height={34}
    placeholder="blurred"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: margin ? margin : '5px',
      padding: '5px'
    }}
  />
);
