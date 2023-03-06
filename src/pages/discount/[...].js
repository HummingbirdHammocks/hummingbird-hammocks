import React, { useEffect, useState, useContext, useCallback } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { Box, Typography, Button } from "@mui/material"
// components
import {
    Layout,
    Link,
} from "components"


const Discounts = () => {
    const location = useLocation();

    const handleRedirection = useCallback(async () => {
        if (!location || !location.search) return navigate("/");

        const params = new URLSearchParams(location.search);
        const redirectURL = params.get("redirect");
        if (redirectURL) {
            navigate(redirectURL);
        }
    }, [location])

    const handleDiscountCode = useCallback(async () => {
        if (!location || !location.pathname) return;
        const discountPath = location.pathname;

        if (discountPath !== "/discount") {
            let code = discountPath.substring(discountPath.lastIndexOf('/') + 1)
            var date = new Date()

            localStorage.setItem('discount_code', code);
            document.cookie = `discount_code=${code}; path=/; expires=${date.toGMTString()};`;

            handleRedirection();
        } else {
            handleRedirection();
        }
    }, [location, handleRedirection])

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
                <Box>
                    <Typography variant="h5">Registering Your Discount...</Typography>
                    <Typography variant="h6">You will be redirected once complete</Typography>
                    <br />
                    <Button>
                        <Link to="/">Return To Homepage</Link>
                    </Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default Discounts