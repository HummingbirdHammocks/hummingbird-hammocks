import React, { useEffect, useContext, useCallback } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { Box, Typography, Button } from "@mui/material"
// components
import {
    Layout,
    Link,
} from "components"
// stores
import { CartContext } from "contexts"


const Discounts = () => {
    const { addDiscount } = useContext(CartContext)

    const location = useLocation();

    const handleRedirection = useCallback(async () => {
        console.log(location)
        if (!location || !location.search) return navigate("/");

        const params = new URLSearchParams(location.search);
        const redirectURL = params.get("redirect");
        console.log(redirectURL);
        if (redirectURL) {
            navigate(redirectURL);
        }
    }, [location])

    const handleDiscountCode = useCallback(async () => {
        if (!location || !location.pathname) return;
        const discountPath = location.pathname;
        console.log(discountPath.substring(discountPath.lastIndexOf('/')));
        if (discountPath === "/discount") {
            handleRedirection();
        } else {
            await addDiscount({ discountCode: discountPath.substring(discountPath.lastIndexOf('/') + 1) })
            handleRedirection();
        }
    }, [location, addDiscount, handleRedirection])

    useEffect(() => {
        handleDiscountCode();
    }, [location, handleDiscountCode]);

    return (
        <Layout>
            <Box
                minHeight="450px"
                justifyContent="center"
                alignItems="center"
                display="flex"
            >
                <Typography variant="h5">Registering Your Discount...</Typography>
                <Button>
                    <Link to="/">Return To Homepage</Link>
                </Button>
            </Box>
        </Layout>
    )
}

export default Discounts