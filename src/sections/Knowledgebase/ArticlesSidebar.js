import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';

import { Link } from '../../components';
import { useRecentlyViewedStore } from '../../stores';
import { KnowledgebaseComboSearch } from '../../utils';

export const ArticlesSidebar = ({ recentArticles, type, page }) => {
  const [collapseRecentlyViewed, setCollapseRecentlyViewed] = useState(true);
  const [collapseMoreArticles, setCollapseMoreArticles] = useState(true);

  const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { recentlyViewedKBArticles } = useRecentlyViewedStore();

  return (
    <Box
      sx={{
        marginLeft: 2,
        marginRight: 2
      }}>
      {!matches && <Divider sx={{ marginBottom: 2 }} />}
      <Grid
        container
        spacing={2}
        sx={{
          borderLeft: { xs: '0', lg: '1px solid #cccc' }
        }}>
        <Grid
          item
          xs={12}
          md={4}
          lg={12}
          sx={{
            padding: 2
          }}>
          <Stack spacing={2}>
            <Box className="articles">
              <KnowledgebaseComboSearch />
            </Box>
            <Button
              disabled={type === 'manuals' && !page}
              variant="outlined"
              component={Link}
              to={`/knowledgebase/manuals`}>
              MANUALS & GUIDES
            </Button>
            <Button
              disabled={type === 'articles' && !page}
              variant="outlined"
              component={Link}
              to={`/knowledgebase/articles`}>
              FAQs & ARTICLES
            </Button>

            <Divider />

            <Button variant="outlined" component={Link} to={`/account/create-ticket`}>
              Create Ticket
            </Button>
            <Button variant="outlined" component={Link} to={`/account/tickets`}>
              Your Tickets
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={12}
          sx={{
            borderLeft: { xs: '1px solid #cccc', lg: '0' },
            padding: 2
          }}>
          {matches && <Divider />}
          {recentlyViewedKBArticles && recentlyViewedKBArticles.length > 0 && (
            <Box>
              <Box>
                <ListItemButton onClick={() => setCollapseRecentlyViewed(!collapseRecentlyViewed)}>
                  <ListItemText
                    secondaryTypographyProps={{
                      fontSize: 20,
                      letterSpacing: 1.2,
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      color: '#000'
                    }}
                    secondary="RECENTLY VIEWED"
                  />
                  {collapseRecentlyViewed ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Box>
              <Collapse in={collapseRecentlyViewed} timeout="auto" unmountOnExit>
                <List>
                  {recentlyViewedKBArticles.map((article) => (
                    <ListItem m="20px" key={article.id}>
                      <Link to={article.link}>
                        <Typography>{article.title}</Typography>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </Box>
          )}

          <Box>
            <ListItemButton onClick={() => setCollapseMoreArticles(!collapseMoreArticles)}>
              <ListItemText
                secondaryTypographyProps={{
                  fontSize: 20,
                  letterSpacing: 1.2,
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#000'
                }}
                secondary="MORE ARTICLES"
              />
              {collapseMoreArticles ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Box>
          <Collapse in={collapseMoreArticles} timeout="auto" unmountOnExit>
            <List>
              {recentArticles.nodes.map((article) => (
                <ListItem m="20px" key={article.id}>
                  <Link to={`/knowledgebase/${type}/${article.handle}`}>
                    <Typography>{article.title}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  );
};
