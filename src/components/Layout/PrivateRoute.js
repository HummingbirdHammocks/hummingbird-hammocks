import React, { useContext } from "react"
import { navigate } from "gatsby"
import { UserContext } from "contexts"

export const PrivateRoute = ({ component: Component, location, ...rest }) => {

    const {
        store: { customerAccessToken },
    } = useContext(UserContext)

    if (!customerAccessToken) {
        navigate("/account/login")
        return null
    }

    return <Component {...rest} />
}