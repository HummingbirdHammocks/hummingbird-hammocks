import { navigate } from 'gatsby';
import React from 'react';

// stores
import { useAuthStore } from '../../stores';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { customerAccessToken } = useAuthStore();

  if (!customerAccessToken) {
    navigate('/account/login');
    return null;
  }

  return <Component {...rest} />;
};
