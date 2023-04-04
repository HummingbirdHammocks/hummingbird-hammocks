import React from "react"
import { Container } from "@mui/material"

import { Seo, Layout, MainWrapper } from "components"
import { GearSelectorStepper } from "sections"

const GearSelectorPage = () => {
  return (
    <Layout>
      <Seo />

      <MainWrapper>
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          <GearSelectorStepper />
        </Container>
      </MainWrapper>
    </Layout>
  )
}

export default GearSelectorPage
