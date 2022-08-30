import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Box, Typography, styled } from "@mui/material"

import {
  Seo,
  Layout,
  LinkButton,
  MainWrapper,
  ButtonAnotherLink,
} from "components"
import { Hero, Info } from "sections"

const GridWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

const heroData = {
  position: "center",
  mainText: "GET IN TOUCH",
}

const GridItem = ({ children, title, subText, buttonLink, buttonText }) => {
  return (
    <Box p="0 30px">
      <Box display="flex" justifyContent="center">
        {children}
      </Box>

      <Typography
        textTransform="uppercase"
        textAlign="center"
        sx={{ mb: "30px" }}
        variant="h2"
      >
        {title}
      </Typography>
      <Typography
        textAlign="center"
        sx={{ mt: "30px", maxWidth: "1200px" }}
        variant="body1"
      >
        {subText}
      </Typography>

      <Box m="30px 0 70px 0" display="flex" justifyContent="center">
        <LinkButton
          bordercolor="#34542a"
          color="black"
          background="white"
          to={buttonLink}
        >
          {buttonText}
        </LinkButton>
      </Box>
    </Box>
  )
}

const ContactUsPage = () => (
  <Layout>
    <Seo />
    <Hero data={heroData}>
      <StaticImage
        style={{
          gridArea: "1/1",
        }}
        layout="fullWidth"
        alt="Ultralight Hammock"
        src="../assets/images/contact-us/contact-hero.jpg"
        placeholder="blurred"
      />
    </Hero>
    <Info title="CONTACT US">
      We know you don't want to talk to a robot. Our support team is completely
      internal (and human), nothing is outsourced, and you won't be asked to
      jump through a bunch of hoops. We offer informed and concise help so you
      can get off the computer and back outside.
      <br />
      <br />
      If you have a question, need help with anything, or are just looking for
      advice. Reach out to us below and we will get back to you as soon as
      possible.
      <Box mt="40px" display="flex" justifyContent="center">
        <ButtonAnotherLink
          href="https://help.hummingbirdhammocks.com/help/1694808310"
          bordercolor="#34542a"
          rel="noopener noreferrer"
          target="_blank"
        >
          Contact Support
        </ButtonAnotherLink>
      </Box>
    </Info>

    <MainWrapper>
      <GridWrapper>
        <GridItem
          buttonLink="/professional-and-educational-discounts"
          buttonText="Learn More"
          title="PRO DEAL"
          subText="Our Pro Deal Program is our way of providing outdoor professionals, first responders, military personnel, and students/educators our products at a discount."
        >
          <StaticImage
            alt="Pro Deal"
            src="../assets/images/contact-us/pro-deal.png"
            placeholder="blurred"
          />
        </GridItem>
        <GridItem
          buttonLink="/"
          buttonText="Get Started"
          title="AFFILIATE PROGRAM"
          subText="We are a small team that relies heavily on our faithful community spreading the news about what we do. Join our team and earn commissions on the future happy campers you send our way!"
        >
          <StaticImage
            alt="AFFILIATE PROGRAM"
            src="../assets/images/contact-us/affliate-programmin.png"
            placeholder="blurred"
          />
        </GridItem>
      </GridWrapper>
    </MainWrapper>
  </Layout>
)

export default ContactUsPage
