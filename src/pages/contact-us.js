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
      It all began about 5 years ago. Chris Loidolt, a Certified Parachute
      Rigger, sitting in a room full of top-quality parachute material decided
      he wanted to relax in a hammock that afternoon. Flash forward to today and
      that simple idea has led to an ultralight hammock company that is obsessed
      with weight, quality, and thinking outside the box.
      <br />
      <br />
      The use of real parachute materials, combined with the design and
      construction techniques borrowed from the Parachute Industry Association
      created a hammock that is stronger, far lighter, and much smaller packing
      than any other hammock on the market.
      <br />
      <br />
      He thought “cool, a new hammock”, and we thought “we want one”. Turns out,
      everyone else wanted one too!
      <br />
      <br />
      We are a family-run business, doing our best to create the best gear we
      can and provide the kind of customer service we wish other companies
      would. Our products are all meticulously designed, hand-made, packed with
      love, and shipped to locations all over the globe. So order yourself one,
      order a friend one, get outside and help us change the way the world hangs
      out with nature.
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
