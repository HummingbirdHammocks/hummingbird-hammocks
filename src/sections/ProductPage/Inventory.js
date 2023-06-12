import { gql, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import { MiddleSpinner } from 'components';
import React from 'react';

export const Inventory = ({ handle, id }) => {
  // Get Variants Quantity
  const { data, loading /* , error */ } = useQuery(VARIANT_INFO, {
    variables: {
      handle
    }
  });

  const inventory = data?.productByHandle.variants.nodes.find((item) => item.id === id);

  return (
    <>
      {loading ? (
        <MiddleSpinner size="10px" itemposition="left" />
      ) : (
        <>
          {inventory?.quantityAvailable === 1 ? (
            <Typography sx={{ fontStyle: 'italic' }}>1 Item Left!</Typography>
          ) : inventory?.quantityAvailable < 20 && inventory?.quantityAvailable > 0 ? (
            <Typography sx={{ fontStyle: 'italic' }}>
              {inventory?.quantityAvailable} Items Left!
            </Typography>
          ) : inventory?.quantityAvailable > 20 ? (
            ''
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

const VARIANT_INFO = gql`
  query ($handle: String!) {
    productByHandle(handle: $handle) {
      variants(first: 10) {
        nodes {
          id
          quantityAvailable
        }
      }
    }
  }
`;
