import { Box, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { KnowledgebaseItem } from 'sections';

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
    id: `articles-tab-${index}`,
    'aria-controls': `articles-tabpanel-${index}`
  };
}

export const ArticleTagsTabs = ({ allArticles, backgroundColor, accentcolor, linkType }) => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:900px)');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : '#ECEFF1',
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
            aria-label="articles tabs"
            TabIndicatorProps={{
              style: {
                background: accentcolor ? accentcolor : theme.palette.secondary.main
              }
            }}
            sx={{
              borderRight: { xs: 0, md: 1 },
              borderColor: 'divider'
            }}>
            {allArticles.group.map((group) => {
              if (!group.nodes[0].tags || group.nodes[0].tags === '') return null;
              return (
                <StyledTab
                  accentcolor={accentcolor}
                  label={group.nodes[0].tags}
                  {...a11yProps(group.nodes[0].tags)}
                  key={group.nodes[0].tags}
                />
              );
            })}
          </Tabs>
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          {allArticles.group.map((group, index) => (
            <TabPanel value={value} index={index} key={index}>
              <Typography variant="h5" sx={{ marginBottom: 4 }}>
                {group.nodes[0].tags}
              </Typography>
              <Grid container spacing={2}>
                {group.nodes.map((article) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={article.id}>
                    <KnowledgebaseItem
                      description={article.description}
                      item={article}
                      linkType={linkType}
                    />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
