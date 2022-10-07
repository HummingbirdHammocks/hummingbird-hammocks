import React from "react"
import { useTheme, Box, Grid, Tabs, Tab, Typography, useMediaQuery, styled } from "@mui/material"
import { SquareFoot, Category, TravelExplore, Support } from "@mui/icons-material"

import { Specs } from "./Specs"
import { SupportLinks } from "./SupportLinks"

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ accentColor, theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&.Mui-selected': {
      fontWeight: theme.typography.fontWeightMedium,
      color: "rgba(0, 0, 0, 0.87)",
    },
    '&.Mui-focusVisible': {
      backgroundColor: accentColor ? accentColor : theme.palette.secondary.main,
    },
  }),
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`,
  };
}

export const ProductDetailsTabs = ({
  specs,
  features,
  included,
  materials,
  manufacturing,
  manualUrl,
  oshwaId,
  oshwaUrl,
  careInstructions,
  video,
  repo,
  backgroundColor,
  accentColor,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "#FDFDF5",
        borderColor: accentColor ? accentColor : 'divider',
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
        paddingTop: { xs: 2, md: 4 },
        paddingBottom: 4,
        paddingLeft: { xs: 1, md: 4 },
        paddingRight: { xs: 1, md: 4 },
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Grid container spacing={2}>

        <Grid item xs={12} md={3} lg={2}>
          <Tabs
            orientation={matches ? "horizontal" : "vertical"}
            variant={matches ? "scrollable" : "standard"}
            value={value}
            onChange={handleChange}
            scrollButtons={matches ? true : false}
            allowScrollButtonsMobile={matches ? true : false}
            aria-label="product details tabs"
            TabIndicatorProps={{
              style: {
                background: accentColor ? accentColor : theme.palette.secondary.main
              }
            }}
            sx={{
              borderRight: { xs: 0, md: 1 },
              borderColor: 'divider'
            }}
          >
            <StyledTab accentColor={accentColor} icon={<SquareFoot />} label="SPECS" {...a11yProps(0)} />
            <StyledTab accentColor={accentColor} icon={<Category />} label="FEATURES" {...a11yProps(1)} />
            <StyledTab accentColor={accentColor} icon={<TravelExplore />} label="TRANSPARENCY" {...a11yProps(2)} />
            <StyledTab accentColor={accentColor} icon={<Support />} label="SUPPORT" {...a11yProps(3)} />
          </Tabs>
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          <TabPanel value={value} index={0}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              SPECIFICATIONS
            </Typography>
            <Specs metas={specs} />
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
              spacing={2}
            >
              {features && (
                <Grid item xs={12} lg={6}>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: features }} />
                  </Typography>
                </Grid>
              )}

              {included && (
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5">Included</Typography>
                  <Typography component="span">
                    <div dangerouslySetInnerHTML={{ __html: included }} />
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
              spacing={2}
            >
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
              manualUrl={manualUrl}
              oshwaId={oshwaId}
              oshwaUrl={oshwaUrl}
              careInstructions={careInstructions}
              video={video}
              repo={repo}
            />
          </TabPanel>
        </Grid>

      </Grid>
    </Box >
  )
}
