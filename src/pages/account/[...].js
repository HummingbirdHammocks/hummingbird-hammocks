import React from "react"
import { Router } from "@reach/router"
import { PrivateRoute } from "../../components"

import AccountGeneralPage from "./general"
import AccountAddressPage from "./addresses"
import AccountOrdersPage from "./orders"

const App = () => {
    return (
        <Router basepath="/account">
            <PrivateRoute path="/" component={AccountGeneralPage} />
            <PrivateRoute path="/addresses" component={AccountAddressPage} />
            <PrivateRoute path="/orders" component={AccountOrdersPage} />
        </Router>
    )
}

export default App