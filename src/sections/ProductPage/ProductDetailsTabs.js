import { Category, SquareFoot, Support, TravelExplore } from '@mui/icons-material';
import { Box, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import { Specs } from './Specs';
import { SupportLinks } from './SupportLinks';

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ accentcolor, theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    fontWeight: theme.typography.fontWeightMedium,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  '&.Mui-focusVisible': {
    backgroundColor: accentcolor ? accentcolor : theme.palette.secondary.main
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}>
      {value === index && (
        <Box
          sx={{
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            paddingTop: 2,
            paddingBottom: 2
          }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`
  };
}

export const ProductDetailsTabs = ({
  variantMetafields,
  productMetafields,
  backgroundColor,
  accentcolor
}) => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:900px)');
  const [value, setValue] = useState(0);

  let manual_url;
  let manufacturing;
  let video;
  let care_instructions;
  let materials;
  let repository;
  let oshwa_id;
  let oshwa_url;
  let features_main;
  let features_included;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!productMetafields || !productMetafields.length) return null;

  for (let i = 0; i < productMetafields.length; i++) {
    switch (productMetafields[i].namespace) {
      case 'support':
        switch (productMetafields[i].key) {
          case 'manual_url':
            manual_url = productMetafields[i].value;
            break;
          case 'video':
            video = productMetafields[i].value;
            break;
          case 'care_instructions':
            care_instructions = productMetafields[i].value;
            break;
        }
        break;
      case 'transparency':
        switch (productMetafields[i].key) {
          case 'materials':
            materials = productMetafields[i].value;
            break;
          case 'manufacturing':
            manufacturing = productMetafields[i].value;
            break;
        }
        break;
      case 'features':
        switch (productMetafields[i].key) {
          case 'included':
            features_included = productMetafields[i].value;
            break;
          case 'main':
            features_main = productMetafields[i].value;
            break;
        }
        break;
      case 'opensource':
        switch (productMetafields[i].key) {
          case 'repository':
            repository = productMetafields[i].value;
            break;
          case 'oshwa_url':
            oshwa_url = productMetafields[i].value;
            break;
          case 'oshwa_id':
            oshwa_id = productMetafields[i].value;
            break;
        }
        break;
    }
  }

  /* console.log(variantMetafields); */
  /* console.log(productMetafields); */

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : '#FDFDF5',
        borderColor: accentcolor ? accentcolor : 'divider',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '20px',
        paddingTop: { xs: 2, md: 4 },
        paddingBottom: 4,
        paddingLeft: { xs: 1, md: 4 },
        paddingRight: { xs: 1, md: 4 },
        marginTop: 4,
        marginBottom: 4
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={2}>
          <Tabs
            orientation={matches ? 'horizontal' : 'vertical'}
            variant={matches ? 'scrollable' : 'standard'}
            value={value}
            onChange={handleChange}
            scrollButtons={matches ? true : false}
            allowScrollButtonsMobile={matches ? true : false}
            aria-label="product details tabs"
            TabIndicatorProps={{
              style: {
                background: accentcolor ? accentcolor : theme.palette.secondary.main
              }
            }}
            sx={{
              borderRight: { xs: 0, md: 1 },
              borderColor: 'divider'
            }}>
            <StyledTab
              accentcolor={accentcolor}
              icon={<SquareFoot />}
              label="SPECS"
              {...a11yProps(0)}
            />
            <StyledTab
              accentcolor={accentcolor}
              icon={<Category />}
              label="FEATURES"
              {...a11yProps(1)}
            />
            <StyledTab
              accentcolor={accentcolor}
              icon={<TravelExplore />}
              label="TRANSPARENCY"
              {...a11yProps(2)}
            />
            <StyledTab
              accentcolor={accentcolor}
              icon={<Support />}
              label="SUPPORT"
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          <TabPanel value={value} index={0}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              SPECIFICATIONS
            </Typography>
            <Specs metas={variantMetafields} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              FEATURES
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}>
              {features_main && (
                <Grid item xs={12} lg={6}>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: features_main }} />
                  </Typography>
                </Grid>
              )}

              {features_included && (
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5">Included</Typography>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: features_included }} />
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              TRANSPARENCY
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}>
              {materials && (
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5">Materials</Typography>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: materials }} />
                  </Typography>
                </Grid>
              )}

              {manufacturing && (
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5">Manufacturing</Typography>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: manufacturing }} />
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              SUPPORT
            </Typography>
            <SupportLinks
              manualUrl={manual_url}
              oshwaId={oshwa_id}
              oshwaUrl={oshwa_url}
              careInstructions={care_instructions}
              video={video}
              repo={repository}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
