import { Router } from '@gatsbyjs/reach-router';
import React from 'react';

import { Seo } from '../../components';
import { PrivateRoute } from '../../components/Layout/PrivateRoute';
import AccountAddressPage from '../../sections/AccountPage/addresses';
import AccountInfoPage from '../../sections/AccountPage/info';
import AccountNotificationsPage from '../../sections/AccountPage/notifications';
import AccountOrdersPage from '../../sections/AccountPage/orders';
import AccountTicketsPage from '../../sections/AccountPage/tickets';

const Account = () => {
  return (
    <Router basepath="/account">
      <PrivateRoute path="/" component={AccountOrdersPage} />
      <PrivateRoute path="/info" component={AccountInfoPage} />
      <PrivateRoute path="/addresses" component={AccountAddressPage} />
      <PrivateRoute path="/orders" component={AccountOrdersPage} />
      <PrivateRoute path="/notifications" component={AccountNotificationsPage} />
      <PrivateRoute path="/tickets" component={AccountTicketsPage} />
    </Router>
  );
};

export default Account;

export const Head = () => <Seo title="Account | Hummingbird Hammocks" />;
