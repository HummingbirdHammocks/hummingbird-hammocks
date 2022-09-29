import React from "react"
import { Router } from "@reach/router"
import { PrivateRoute } from "../../components/Layout/PrivateRoute"

import AccountInfoPage from "./info"
import AccountAddressPage from "./addresses"
import AccountOrdersPage from "./orders"
import AccountNotificationsPage from "./notifications"

const App = () => {
    return (
        <Router basepath="/account">
            <PrivateRoute path="/" component={AccountOrdersPage} />
            <PrivateRoute path="/info" component={AccountInfoPage} />
            <PrivateRoute path="/addresses" component={AccountAddressPage} />
            <PrivateRoute path="/orders" component={AccountOrdersPage} />
            <PrivateRoute path="/notifications" component={AccountNotificationsPage} />
        </Router>
    )
}

export default App