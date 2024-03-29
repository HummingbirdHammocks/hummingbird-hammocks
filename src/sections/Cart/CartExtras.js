import { Divider, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';

import { CartContext } from '../../contexts';
import { OrderOptions } from './OrderOptions';
import { ThruHikerForm } from './ThruHikerForm';

export function CartExtras() {
  const theme = useTheme();
  const [attributes, setAttributes] = useState([]);

  const { updateAttributes } = useContext(CartContext);

  const handleAttributes = async (attribute) => {
    console.log('Attribute', attribute);

    const newAttributes = attributes;
    /* console.log(newAttributes) */

    if (attributes.length > 0) {
      const index = attributes.findIndex((item) => item.key === attribute.key);
      if (index > -1) {
        newAttributes[index] = attribute;
      } else {
        newAttributes.push(attribute);
      }
    } else {
      newAttributes.push(attribute);
    }

    /* console.log(newAttributes) */
    await updateAttributes({ customAttributes: newAttributes });

    setAttributes(newAttributes);
  };

  return (
    <Paper
      sx={{
        margin: 4,
        padding: 4,

        [theme.breakpoints.down('sm')]: {
          margin: 0
        }
      }}>
      <Typography pb="20px" variant="h5">
        EXTRA CHECKOUT OPTIONS
      </Typography>
      <Divider />
      <Grid container spacing={4} sx={{ marginTop: 1 }}>
        <Grid item xs={12} lg={6}>
          <ThruHikerForm handleAttributes={handleAttributes} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrderOptions handleAttributes={handleAttributes} />
        </Grid>
      </Grid>
    </Paper>
  );
}
