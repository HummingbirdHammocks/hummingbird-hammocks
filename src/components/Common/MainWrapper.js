import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export const MainWrapper = ({ children }) => <Container maxWidth="xl">{children}</Container>;

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
