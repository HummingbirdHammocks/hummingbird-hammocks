import React, { useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Container } from "@mui/material"

import { Seo, Layout, MainWrapper } from "components"
import { Hero, Info, Details, RecentlyViewed } from "sections"
import { ProductContext } from "contexts"

const heroData = {
  position: "center",
  mainText: "A SHORT BUT SWEET STORY",
}

const detailsData = {
  title: "DIRECT TO CONSUMER",
  subText:
    "<p>We stand out in the ultralight hammock and camping gear industry by putting our valued customers first. Our company operates under a Direct to Consumer model, a strategic move that places our focus squarely on you and ensures your hard-earned money is well-spent.</p><p>Instead of navigating through retail markups that can inflate prices by 50% to 100%, we deliver our top-tier, Military Spec ultralight camping gear straight to you. This guarantees better value for your investment and emphasizes our commitment to you as our priority.</p><p>Our range of camping gear, including our ultralight hammocks, are more than just products - they are a promise of quality, resilience, and customer satisfaction. As you gear up for your next outdoor adventure, know that by choosing us, you're selecting a customer-centric company that values your trust and aims to provide unrivaled comfort and durability in every product.</p>",
}

const detailsData2 = {
  title: "CERTIFIED OPEN HARDWARE",
  subText:
    "<p>We're proud to say that all of our gear designs are not only open-source, but they are also officially certified by the Open Source Hardware Association. Why would we choose to share our design blueprints freely? The answer is simple - we firmly believe in the power of sharing and collective innovation. By opening up our designs, we hope to inspire others, foster a sense of community, and invite you to contribute your ingenious ideas to enhance our products. In our GitHub repositories, you'll find all the necessary design files and detailed information for our entire range of current and upcoming ultralight hammock and camping gear products. We look forward to seeing how our shared knowledge can lead to even better and more practical outdoor gear!</p>",
  buttonText: "GITHUB REPOSITORY",
  hrefLink: "https://github.com/HummingbirdHammocks",
}

const detailsData3 = {
  title: "TWO TREES PER ORDER",
  subText:
    "<p>We've teamed up with Ecologi and the Eden Reforestation Projects, committing to plant two mangrove trees with every order you place. Why mangroves? They're incredibly efficient carbon warriors, capturing four times more carbon per acre than tropical rainforests. But their benefits don't stop there. They also naturally curb coastal erosion, create crucial habitats for diverse species, and act as nature's water filter, cleansing waterborne pollutants. Want to learn more? Swing by the Hummingbird Hammocks' Forest page or donate to plant even more trees if you're feeling generous!</p>",
  buttonText: "Learn More",
  hrefLink: "https://ecologi.com/hummingbirdhammocks",
}

const detailsData4 = {
  title: "LIFETIME GUARANTEE",
  subText:
    "<p>We take immense pride in our work and fully stand by the quality of our products. However, should you ever find yourself less than completely satisfied with any of our gear, or if it doesn't meet your expectations, don't worry; we've got you covered. Simply reach out to us through our Support Form. Whether you're seeking a repair, replacement, or refund, we promise to help—always and forever. Our easy-to-use, hassle-free return system ensures you can find the perfect gear effortlessly. Our support specialists are never outsourced and are always just a message away, ready and eager to answer any questions you may have. Your satisfaction is our guarantee!</p>",
  buttonText: "Support",
  hrefLink: "/account/create-ticket",
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
        Nearly a decade ago, our founder, certified Parachute Rigger Chris Loidolt, envisioned a hammock crafted from quality parachute material. Today, we've become a thriving, family-run business centered around producing ultralight, small-packing hammocks.
        <br />
        <br />
        Our products, derived from authentic parachute materials, use design principles inspired by the Parachute Industry Association. The outcome is market-leading hammocks that are stronger, lighter, and more compact than anything else on the market.
        <br />
        <br />
        Being a direct-to-consumer business allows us to maintain a strong bond with our customers, providing the highest possible quality gear for the price by minimizing overhead and eliminating retail markups. Our open-source design philosophy encourages a collaborative community that supports innovation and mutual growth.
        <br />
        <br />
        We're proud to offer a lifetime guarantee on all our products, a testament to our confidence in their quality and durability. Furthermore, our commitment to sustainability ensures we actively strive to reduce our environmental impact, using responsibly sourced materials and eco-friendly practices.
        <br />
        <br />
        Join us in revolutionizing how we enjoy nature, and help us reshape outdoor relaxation, one hammock at a time.
      </Info>

      <MainWrapper>
        <Container maxWidth="lg">
          <Details divider={true} data={detailsData}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/conjumer.png"
              alt="DIRECT TO CONSUMER"
              placeholder="blurred"
            />
          </Details>
          <Details order="2" divider={true} data={detailsData2}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/open-source.png"
              alt={detailsData2.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={detailsData3}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/two-tress.png"
              alt={detailsData3.title}
              placeholder="blurred"
            />
          </Details>
          <Details order="2" data={detailsData4}>
            <StaticImage
              imgStyle={{ borderRadius: "20px" }}
              src="../assets/images/explore/lifetime-guarantee.png"
              alt={detailsData4.title}
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
