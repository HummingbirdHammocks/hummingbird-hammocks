import React from "react"
import { Router } from "@reach/router"
import { PrivateRoute } from "../../components/Layout/PrivateRoute"

import AccountInfoPage from "../../sections/AccountPage/info"
import AccountAddressPage from "../../sections/AccountPage/addresses"
import AccountOrdersPage from "../../sections/AccountPage/orders"
import AccountNotificationsPage from "../../sections/AccountPage/notifications"
import AccountTicketsPage from "../../sections/AccountPage/tickets"
import AccountCreateTicket from "../../sections/AccountPage/createTicket"

const Account = () => {
    return (
        <Router basepath="/account">
            <PrivateRoute path="/" component={AccountOrdersPage} />
            <PrivateRoute path="/info" component={AccountInfoPage} />
            <PrivateRoute path="/addresses" component={AccountAddressPage} />
            <PrivateRoute path="/orders" component={AccountOrdersPage} />
            <PrivateRoute path="/notifications" component={AccountNotificationsPage} />
            <PrivateRoute path="/tickets" component={AccountTicketsPage} />
            <PrivateRoute path="/create-ticket" component={AccountCreateTicket} />
        </Router>
    )
}

export default Account