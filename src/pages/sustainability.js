import React, { useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Container } from "@mui/material"

import { Seo, Layout, MainWrapper } from "components"
import { Hero, Info, Details, RecentlyViewed } from "sections"
import { ProductContext } from "contexts"

const heroData = {
  position: "center",
  mainText: "OUR IMPACT",
}

const twoTreesData = {
  title: "TWO TREES PER ORDER",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
  buttonText: "Learn More",
  hrefLink: "https://ecologi.com/hummingbirdhammocks?r=60b8efa8e6e3c022ec95c2bb",
}

const carbonNeutralShipping = {
  title: "CARBON NEUTRAL SHIPPING",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
  buttonText: "Learn More",
  hrefLink: "https://www.shopify.com/climate/sustainability-fund/partners",
}

const solarPowered = {
  title: "SOLAR POWERED OFFICE",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
}

const wildlifeHabitat = {
  title: "CERTIFIED WILDLIFE HABITAT",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
  buttonText: "Learn More",
  hrefLink: "https://www.nwf.org/",
}

const packaging = {
  title: "RESPONSIBLE PACKAGING",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
}

const ExplorePage = () => {
  const { featuredProducts } = useContext(ProductContext)
  return (
    <Layout>
      <Seo />
      <Hero data={heroData}>
        <StaticImage
          style={{
            gridArea: "1/1",
          }}
          loading="eager"
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/explore/explore.jpg"
          placeholder="blurred"
        />
      </Hero>
      <Info>
        It all began about 10 years ago. Chris Loidolt, a Certified Parachute
        Rigger, sitting in a room full of top-quality parachute material decided
        he wanted to relax in a hammock that afternoon. Flash forward to today
        and that simple idea has led to an ultralight hammock company that is
        obsessed with weight, quality, and thinking outside the box.
        <br />
        <br />
        The use of real parachute materials, combined with the design and
        construction techniques borrowed from the Parachute Industry Association
        created a hammock that is stronger, far lighter, and much smaller
        packing than any other hammock on the market.
        <br />
        <br />
        He thought “cool, a new hammock”, and we thought “we want one”. Turns
        out, everyone else wanted one too!
        <br />
        <br />
        We are a family-run business, doing our best to create the best gear we
        can and provide the kind of customer service we wish other companies
        would. Our products are all meticulously designed, hand-made, packed
        with love, and shipped to locations all over the globe. So order
        yourself one, order a friend one, get outside and help us change the way
        the world hangs out with nature.
      </Info>

      <MainWrapper>
        <Container maxWidth="lg" sx={{ marginBottom: 20 }}>
          <Details divider={true} data={twoTreesData}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={twoTreesData.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={carbonNeutralShipping}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={carbonNeutralShipping.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={solarPowered}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={solarPowered.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={packaging}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={packaging.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={wildlifeHabitat}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={wildlifeHabitat.title}
              placeholder="blurred"
            />
          </Details>
        </Container>

        <RecentlyViewed
          title="RECENTLY VIEWED PRODUCTS"
          products={featuredProducts.slice(0, 5)}
        />
      </MainWrapper>
    </Layout>
  )
}

export default ExplorePage
