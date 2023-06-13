import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';

export const SupportLinks = ({ manualUrl, oshwaId, oshwaUrl, careInstructions, video, repo }) => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
      <Grid item xs={12} lg={6}>
        <List>
          {manualUrl && (
            <ListItem disablePadding>
              <ListItemButton
                component={'a'}
                href={manualUrl}
                target="_blank"
                rel="noopener noreferrer">
                <ListItemText primary="Online Manual" />
              </ListItemButton>
            </ListItem>
          )}
          {careInstructions && (
            <ListItem disablePadding>
              <ListItemButton
                component={'a'}
                href={careInstructions}
                target="_blank"
                rel="noopener noreferrer">
                <ListItemText primary="Care Instructions" />
              </ListItemButton>
            </ListItem>
          )}
          {video && (
            <ListItem disablePadding>
              <ListItemButton
                component={'a'}
                href={video}
                target="_blank"
                rel="noopener noreferrer">
                <ListItemText primary="Video Guide" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton
              component={'a'}
              href={'/knowledgebase'}
              target="_blank"
              rel="noopener noreferrer">
              <ListItemText primary="Knowledge Base" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={'a'}
              href={'/account/create-ticket'}
              target="_blank"
              rel="noopener noreferrer">
              <ListItemText primary="Get Help" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      {(oshwaId || oshwaUrl || repo) && (
        <Grid item xs={12} lg={6}>
          <Typography marginBottom={2} variant="h5">
            OPEN SOURCE
          </Typography>
          <List>
            {oshwaId && oshwaUrl && (
              <ListItem disablePadding>
                <ListItemButton
                  component={'a'}
                  href={oshwaUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <ListItemText primary={`OSHWA UID ${oshwaId}`} />
                </ListItemButton>
              </ListItem>
            )}
            {repo && (
              <ListItem disablePadding>
                <ListItemButton
                  component={'a'}
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer">
                  <ListItemText primary="Design Files" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Grid>
      )}
    </Grid>
  );
};
