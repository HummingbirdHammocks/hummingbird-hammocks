import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Stack, Box } from "@mui/material"

import { Seo, Layout, MainWrapper, FeaturedReviewsCarousel } from "components"
import { Hero, Info, Details, FeaturedProduct, OutDoorArticles } from "sections"

const heroData = {
  position: "center",
  subtitle1: "Tiny on the Scale, Tiny in your Pocket",
  mainText: "ULTRALIGHT HAMMOCKS FOR EVERY ADVENTURE",
  subtitle2: "One Order Placed = Two Trees Planted",
  button: [
    {
      id: 1,
      text: "Hammocks",
      type: "link",
      url: "/collections/hammocks",
    },
    {
      id: 2,
      text: "Tree Straps",
      url: "/collections/tree-straps",
      background: "transparent",
      color: "white",
      type: "link",
    },
  ],
}

const secondData = {
  position: "right",
  subtitle1: "FAA Certified Parachute Fabric",
  mainText: "REAL PARACHUTE FABRIC",
  subtitle2:
    "All of our hammocks use actual FAA certified reserve parachute material. This fabric is trusted by skydivers, BASE jumpers, and aerobatic pilots every day.",
}

const thirdData = {
  position: "left",
  subtitle1: "Hammocks need trees, and so do we!",
  mainText: "WE PLANT TWO TREES FOR EVERY ORDER",
  subtitle2: "One Order Placed = Two Trees Planted",
  button: [
    {
      id: 1,
      text: "Ecology",
      url: "https://ecologi.com/hummingbirdhammocks",
      type: "href",
      background: "transparent",
      color: "white",
      hoverBack: "#34542a",
      hoverBolor: "#fff",
      hoverBorder: "1px solid #34542a",
    },
    {
      id: 2,
      text: "Eden Project",
      type: "href",
      url: "https://www.edenprojects.org/our-work",
      hoverBack: "#34542a",
      hoverBolor: "#fff",
      hoverBorder: "1px solid #34542a",
    },
  ],
}

const fourthData = {
  position: "right",
  subtitle1: "We're Counting Every Gram",
  mainText: "DYE SUBLIMATION",
  subtitle2:
    "The fabric equivalent of a tattoo. This system allows us to print graphics and information on our gear without adding any weight or bulk.",
}

const detailsData = {
  order: 1,
  title: "SIL-POLY RAIN TARPS",
  subText:
    "Don't let rain... rain on your parade. Be ready for any weather with one of our ultralight, no-stretch, sil-poly rain tarps!",
  buttonText: "Shop Rain Tarps",
  buttonLink: "/collections/shelter",
}

const detailsData2 = {
  order: 2,
  title: "1.55 OZ ULTRALIGHT TREE STRAPS",
  subText:
    "Tired of carrying around heavy Tree Straps? So were we, so we made our own! At 1.55 oz and packing smaller than a candy bar, these straps are ready to go everywhere you are.",
  buttonText: "Shop Tree Tarps",
  buttonLink: "/collections/tree-straps",
}

const detailsData3 = {
  order: 2,
  title: "BUG PROTECTION FOR EVERY ADVENTURE",
  subText:
    "Relax and sleep without concern for our small creepy, crawly, airborne friends. At only 5.5 oz (156 g,) the Warbler Bug Net provides full 360-degree protection from mosquitos, other bugs, and possibly even small birds.",
  buttonText: "Shop Bug Nets",
  buttonLink: "/products/warbler-bug-net",
}

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <Hero data={heroData}>
        <StaticImage
          style={{
            gridArea: "1/1",
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/hero-back.jpg"
          placeholder="blurred"
        />
      </Hero>
      <Info title="MORE THAN JUST ULTRALIGHT">
        Our gear weighs about 30% less than anything else on the market, but
        weight isn’t the only thing we care about. We also demand that the hammock
        packs small and travels well. We believe the volume in your pack deserves
        as much love as its weight.
        <br /> <br />
        You'll find no bulky metal parts or thick webbing here. Using actual
        reserve parachute nylon and our button link system, we compress the
        hammock into a very small stuff sack, keeping it as unnoticed in your pack
        as it is on the scale.
      </Info>
      <Hero data={secondData}>
        <StaticImage
          style={{
            gridArea: "1/1",
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/hammocks fabric.jpg"
          placeholder="blurred"
        />
      </Hero>
      <FeaturedProduct />
      <Hero data={thirdData}>
        <StaticImage
          style={{
            gridArea: "1/1",
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/ecology.jpg"
          placeholder="blurred"
        />
      </Hero>
      <MainWrapper>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          <Details data={detailsData}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/home/SilPolyFabric.jpg"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
            />
          </Details>
          <Details order="2" data={detailsData2}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/home/Details.jpg"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
            />
          </Details>
          <Details data={detailsData3}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/home/Details 2.jpg"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
            />
          </Details>
        </Stack>
      </MainWrapper>
      <Hero data={fourthData}>
        <StaticImage
          style={{
            gridArea: "1/1",
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/Hammocks Back.jpg"
          placeholder="blurred"
        />
      </Hero>
      <MainWrapper>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 4,
            marginBottom: 4,
          }}
        >

          <Box sx={{ maxWidth: "1920px" }}>
            <FeaturedReviewsCarousel />
          </Box>

          <Box>
            <OutDoorArticles />
          </Box>
        </Stack>
      </MainWrapper>
    </Layout>
  )
}

export default IndexPage
