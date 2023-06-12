import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SoldOutWrap = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '80px',
  right: '90px',
  background: '#f41901',
  padding: '8px 10px',
  color: theme.palette.white.main,
  fontFamily: theme.typography.fontFamily,
  borderRadius: '10px',
  letterSpacing: '2px',
  zIndex: '999',

  [theme.breakpoints.down('md')]: {
    top: '70px',
    right: '80px'
  }
}));
