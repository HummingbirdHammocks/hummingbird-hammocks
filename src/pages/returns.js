import React from "react"
import { Container } from "@mui/material"

import { Seo, Layout, MainWrapper } from "components"
import { ReturnsStepper } from "sections"

const ReturnsPage = () => {
    return (
        <Layout>
            <Seo />

            <MainWrapper>
                <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                    <ReturnsStepper />
                </Container>
            </MainWrapper>
        </Layout>
    )
}

export default ReturnsPage