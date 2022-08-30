import React, { useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"

import { Seo, Layout, MainWrapper } from "components"
import { Hero, Info, Details, RecentViewed } from "sections"
import { ProductContext } from "contexts"

const heroData = {
  position: "center",
  mainText: "A SHORT BUT SWEET STORY",
}

const detailsData = {
  title: "DIRECT TO CONSUMER",
  subText:
    "We design and build our hammocks using premium, hand-picked, certified, materials. The vast majority of our materials are Military Spec, even down to the non-load bearing thread! These wonderful materials are hand cut and sewn by skilled sewing machine operators in Alamo, TN.\n \nAll of this effort is to ensure our gear is something you will be proud to own and use, we know we sure are!\n \nUnwilling to compromise our materials and build quality to meet margins required for retail sale, we decided to sell our gear directly to the people we care about most, our customers.\n \nSo what you’re getting for the price is far better than what you might find on a store shelf. You can kick your feet up and relax knowing that your hard-earned money went directly to excellent materials and build quality, and you bypassed the 50% to 100% retail store mark up.",
}

const detailsData2 = {
  title: "CERTIFIED OPEN HARDWARE",
  subText:
    "Our gear is completely open-source and certified by the Open Source Hardware Association.\n \nWhy would we want to give away designs for free? We believe ideas and designs should be shared so that others may benefit from them, be inspired to make something new, or contribute an idea that leads to a better or more useful product!\n \nBelow you will find all of our design files and associated information for our current products as well as for products we are currently developing.    ",
  buttonText: "GITHUB REPOSITORY",
  hrefLink: "https://github.com/HummingbirdHammocks",
}

const detailsData3 = {
  title: "TWO TREES PER ORDER",
  subText:
    "Through a partnership with Ecologi and the Eden Reforestation Projects, we are planting two mangrove trees for every order we receive. \n \nMangroves are four times more effective at capturing carbon per acre than tropical rainforests, provide a natural coastal erosion barrier and habitat, and are effective in filtering waterborne pollutants.\n \nCheck out Hummingbird Hammocks' Forest to learn more or donate more trees!",
  buttonText: "Learn More",
  hrefLink: "https://ecologi.com/hummingbirdhammocks",
}

const detailsData4 = {
  title: "LIFETIME GUARANTEE",
  subText:
    "We are proud of what we do and stand behind it. If you are not satisfied with one of our products, or if one of our products does not perform to your satisfaction, contact us via our Support Form below or at support@hummingbirdhammocks.com for a repair, replacement, or refund. FOREVER.\n \nOur hassle-free return system makes it easy to get the right hammock for you and our support specialists are here to help if you have any questions!",
  buttonText: "Support",
  hrefLink: "https://help.hummingbirdhammocks.com/help/1694808310",
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
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/explore/explore.jpg"
          placeholder="blurred"
        />
      </Hero>
      <Info>
        It all began about 5 years ago. Chris Loidolt, a Certified Parachute
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
        <Details divider={true} data={detailsData}>
          <StaticImage
            imgStyle={{ borderRadius: "20px" }}
            src="../assets/images/explore/conjumer.jpeg"
            alt="DIRECT TO CONSUMER"
            placeholder="blurred"
          />
        </Details>
        <Details order="2" divider={true} data={detailsData2}>
          <StaticImage
            imgStyle={{ borderRadius: "20px" }}
            src="../assets/images/explore/open-source-hardware.jpeg"
            alt={detailsData2.title}
            placeholder="blurred"
          />
        </Details>
        <Details divider={true} data={detailsData3}>
          <StaticImage
            imgStyle={{ borderRadius: "20px" }}
            src="../assets/images/explore/two-trees-per-order.jpeg"
            alt={detailsData3.title}
            placeholder="blurred"
          />
        </Details>
        <Details order="2" data={detailsData4}>
          <StaticImage
            imgStyle={{ borderRadius: "20px" }}
            src="../assets/images/explore/lifetime-guarantee.jpeg"
            alt={detailsData4.title}
            placeholder="blurred"
          />
        </Details>

        <RecentViewed
          title="Featured Products"
          products={featuredProducts.slice(0, 5)}
        />
      </MainWrapper>
    </Layout>
  )
}

export default ExplorePage
