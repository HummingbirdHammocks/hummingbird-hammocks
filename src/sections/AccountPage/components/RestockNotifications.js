import {
  Launch
  /* , Delete */
} from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { Link } from 'components';
import React from 'react';

// hooks
import useRestockNotifications from '../../../hooks/useRestockNotifications';

/* /products/single-hammock */
export const RestockNotifications = ({ email }) => {
  const { data, state, error } = useRestockNotifications(email);

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error || state === 'error') {
    return null;
  }

  return (
    <List>
      {state === 'loading' ? (
        loadingArray.map((index) => <Skeleton key={index} />)
      ) : data ? (
        data.map((item, index) => (
          <ListItem
            key={index}
            sx={{ marginTop: 1, marginBottom: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}
            secondaryAction={
              <Stack direction="row" spacing={2}>
                <Tooltip title="View Product">
                  <IconButton
                    aria-label="view product"
                    component={Link}
                    to={'/products/' + item.productHandle}>
                    <Launch />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Remove Notification">
                  <IconButton edge="end" aria-label="delete" onClick={(item) => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip> */}
              </Stack>
            }>
            <ListItemText primary={item.productTitle} secondary={item.variantTitle} />
          </ListItem>
        ))
      ) : (
        <Typography>
          No notifications, you can add one from an out of stock product page.
        </Typography>
      )}
    </List>
  );
};
