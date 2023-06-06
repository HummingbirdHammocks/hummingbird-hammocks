import { Add, Close, Co2, Delete, Forest, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { Link } from 'components';
import { CartContext } from 'contexts';
import window from 'global';
import React, { useContext } from 'react';

// stores
import { useUIDispatch, useUIStore } from '../../../stores';

export const CartDrawer = () => {
  const { cartOpen } = useUIStore();
  const uiDispatch = useUIDispatch();

  const { checkout, updateLineItem, removeLineItem } = useContext(CartContext);

  let totalQuantity = 0;

  if (checkout) {
    checkout.lineItems.forEach((lineItem) => {
      totalQuantity = totalQuantity + lineItem.quantity;
    });
  }

  const handleDecrementQuantity = ({ variantId }) => {
    updateLineItem({ quantity: -1, variantId });
  };
  const handleIncrementQuantity = ({ variantId }) => {
    updateLineItem({ quantity: 1, variantId });
  };

  return (
    <Drawer
      PaperProps={{
        sx: { width: { xs: '90%', md: '450px' }, borderRadius: '20px 0 0 20px' }
      }}
      anchor="right"
      open={cartOpen}
      onClose={() => uiDispatch({ type: 'toggleCartOpen' })}>
      <Box display="flex" justifyContent="space-between" padding="16px 25px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <ShoppingCartOutlined sx={{ mr: '10px' }} />
          <Typography sx={{ mt: '2px' }} variant="navMenu">
            {totalQuantity} {totalQuantity > 1 || totalQuantity === 0 ? 'Items' : 'Item'}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => uiDispatch({ type: 'toggleCartOpen' })} ml={2.5}>
            <Close fontSize="lg" />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ overflow: 'auto', height: 'calc((100vh - 80px) - 3.25rem)' }}>
        {checkout?.lineItems?.map((item) => (
          <Box
            key={item.id}
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom="1px solid #4f4c4c00"
            display="flex">
            <Box mr="20px" display="flex" alignItems="center" flexDirection="column">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() =>
                  handleIncrementQuantity({
                    variantId: item.variant.id
                  })
                }
                sx={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '300px'
                }}>
                <Add fontSize="small" />
              </IconButton>
              <Typography fontWeight={600} fontSize="15px" my="3px">
                {item.quantity}
              </Typography>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() =>
                  handleDecrementQuantity({
                    variantId: item.variant.id
                  })
                }
                sx={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '300px'
                }}>
                <Remove fontSize="small" />
              </IconButton>
            </Box>

            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  opacity: '0.7'
                }
              }}
              to={`/products/${item.variant.product.handle}`}
              onClick={() => uiDispatch({ type: 'toggleCartOpen' })}>
              <img
                alt={item.variant.image.altText}
                src={item.variant.image.src}
                height="76px"
                width="76px"
              />
            </Link>

            <Box pl="20px" flex="1 1 0">
              <Link
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: '0.7'
                  }
                }}
                to={`/products/${item.variant.product.handle}`}
                onClick={() => uiDispatch({ type: 'toggleCartOpen' })}>
                <Typography variant="cartTitle" fontSize="14px">
                  {item.title}
                </Typography>
              </Link>
              <br />
              <Typography variant="cartVariant" color="grey.600">
                {item.variant.title === 'Default Title' ? '' : item.variant.title}
              </Typography>
              <Box fontWeight={600} fontSize="14px" color="primary.main" mt={0.5}>
                <Typography variant="subtitle3">
                  {`$${(item.quantity * item.variant.price.amount).toFixed(2)} ${item.variant.price.currencyCode}`}
                </Typography>
              </Box>
            </Box>

            <IconButton onClick={() => removeLineItem(item.id)} ml={2.5} size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.44)',
          backdropFilter: 'saturate(180%) blur(20px)',
          padding: '15px 25px 30px  25px'
        }}>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <List>
            <ListItem disablePadding>
              <Tooltip title="Learn More" placement="bottom">
                <ListItemButton
                  component="a"
                  href="https://www.shopify.com/climate/sustainability-fund/partners"
                  target="_blank">
                  <ListItemIcon>
                    <Co2 />
                  </ListItemIcon>
                  <ListItemText primary="All deliveries are carbon neutral" />
                </ListItemButton>
              </Tooltip>
            </ListItem>
            <ListItem disablePadding>
              <Tooltip title="Learn More" placement="bottom">
                <ListItemButton
                  component="a"
                  href="https://ecologi.com/hummingbirdhammocks?r=60b8efa8e6e3c022ec95c2bb"
                  target="_blank">
                  <ListItemIcon>
                    <Forest />
                  </ListItemIcon>
                  <ListItemText primary="We plant two trees for every order" />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
        {!checkout?.lineItems.length ? (
          <Button
            variant="outlined"
            sx={{
              height: 40
            }}
            fullWidth
            disabled>
            Your Cart is Empty!
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to="/cart"
              onClick={() => uiDispatch({ type: 'toggleCartOpen' })}>
              Go to Cart
            </Button>

            <Button
              variant="outlined"
              sx={{
                height: 40
              }}
              fullWidth
              onClick={() => {
                window.location.href = checkout.webUrl;
              }}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
