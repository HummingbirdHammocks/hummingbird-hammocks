import React from "react"
import CookieConsent from 'react-cookie-consent';
import { Button, Typography } from '@mui/material';
import { Link } from "components"


const GDPRConsent = () => {

    return (
        <CookieConsent
            acceptOnScroll={true}
            acceptOnScrollPercentage={35}
            location="bottom"
            buttonText="ACCEPT"
            enableDeclineButton
            declineButtonText="DECLINE"
            cookieName="gatsby-gdpr-google-analytics"
            style={{ background: "#10220E" }}
            buttonStyle={{ color: "#FFFFFF", backgroundColor: "#34542A", fontSize: "16px", padding: "10px 16px 10px 16px", borderRadius: "10px" }}
            declineButtonStyle={{ color: "#FFFFFF", backgroundColor: "#C12A2A", fontSize: "16px", padding: "10px 16px 10px 16px", borderRadius: "10px" }}
            debug={true}
        >
            <Typography variant="body2" color="white" sx={{ padding: 0.5 }}>
                <b>We Value Your Privacy</b>: This website uses cookies to ensure you get the best experience on our website, and to analyze traffic.
                <br />
                By continuing to use this website, you consent to the use of cookies in accordance with our <Link to="/privacy-policy" sx={{ color: "#FFFFFF" }}>Privacy Policy</Link>
            </Typography>
        </CookieConsent>
    )
}

export default GDPRConsent
