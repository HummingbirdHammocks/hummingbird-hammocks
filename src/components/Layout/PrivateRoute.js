import React from "react"
import { navigate } from "gatsby"
// stores
import { useAuthStore } from "../../stores/useAuthStore";

export const PrivateRoute = ({ component: Component, location, ...rest }) => {

    const { customerAccessToken } = useAuthStore();

    if (!customerAccessToken) {
        navigate("/account/login")
        return null
    }

    return <Component {...rest} />
}