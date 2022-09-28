import React from "react"
import { Router } from "@reach/router"
import { PrivateRoute } from "../../components/Layout/PrivateRoute"

import AccountAddressPage from "./addresses"
import AccountOrdersPage from "./orders"

const App = () => {
    return (
        <Router basepath="/account">
            <PrivateRoute path="/" component={AccountOrdersPage} />
            <PrivateRoute path="/addresses" component={AccountAddressPage} />
            <PrivateRoute path="/orders" component={AccountOrdersPage} />
        </Router>
    )
}

export default App