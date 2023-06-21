import { Container } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useContext } from 'react';

import { Layout, MainWrapper, Seo } from '../components';
import { ProductContext } from '../contexts';
import { Details, Hero, Info, RecentlyViewed } from '../sections';

const heroData = {
  position: 'center',
  mainText: 'OUR IMPACT'
};

const twoTreesData = {
  title: 'TWO TREES PER ORDER',
  subText: `When you order a Hummingbird Hammock, you're not just investing in a high-quality piece of outdoor gear; you're becoming a hero for our planet. Through our partnership with Ecologi and the Eden Reforestation Projects, every purchase you make triggers the planting of two potent mangrove trees.
    \n\n
    Why mangroves, you might ask? Well, these robust trees are nothing short of carbon superheroes. They're capable of capturing four times more carbon per acre than tropical rainforests. However, their prowess extends beyond carbon capture. Mangroves act as a natural defense against coastal erosion, provide essential habitats for a variety of species, and serve as Mother Nature's water filtration system, helping to cleanse waterborne pollutants.
    \n\n
    Hungry for more knowledge? Head over to the Hummingbird Hammocks' Forest page to learn about our reforestation efforts, or if you're feeling especially green-thumbed, consider donating to plant even more trees.`,
  buttonText: 'Learn More',
  hrefLink: 'https://ecologi.com/hummingbirdhammocks?r=60b8efa8e6e3c022ec95c2bb'
};

const carbonNeutralShipping = {
  title: 'CARBON NEUTRAL SHIPPING',
  subText:
    "With Hummingbird Hammocks, you can rest easy knowing your outdoor gear reached you without leaving a carbon footprint. We're proud to offset our shipping emissions through the Shopify Sustainability Fund. Whether your order is flying across the globe or traveling a few blocks, our commitment to carbon neutrality ensures that we're doing our part to maintain a cleaner, greener world.",
  buttonText: 'Learn More',
  hrefLink: 'https://www.shopify.com/climate/sustainability-fund/partners'
};

const solarPowered = {
  title: 'SOLAR POWERED',
  subText:
    "Our commitment to the environment extends to our office operations as well. We're harnessing the sun's power through solar panels to fuel our workspace. This clean and renewable energy source not only powers our daily operations but also decreases our reliance on fossil fuels, paving the way towards a more sustainable future."
};

const packaging = {
  title: 'RESPONSIBLE PACKAGING',
  subText:
    "At Hummingbird Hammocks, we believe in less is more. We minimize our packaging materials, using recycled materials whenever possible. Our fulfillment process is nearly paperless, with the exception of shipping labels. We've streamlined our operations to prioritize efficiency and sustainability, ensuring that our love for nature isn't compromised by unnecessary waste."
};

const wildlifeHabitat = {
  title: 'CERTIFIED WILDLIFE HABITAT',
  subText: `But we don't stop at our products and operations. Nestled in our office backyard in Monument, CO, you'll find a certified wildlife habitat, protected and maintained with a certification from the National Wildlife Federation. It serves as a living testament to our dedication to wildlife conservation. It's more than just our backyard—it's a sanctuary, a small yet vibrant oasis where wildlife can thrive.
    \n\n
    We're committed to extending our ethos of sustainability and conservation beyond our office walls. When you choose Hummingbird Hammocks, you're joining us on this journey towards a sustainable future, where the wild remains wild and the sky remains limitless. Welcome to our world, where every swing is a step towards preserving nature.`,
  buttonText: 'Learn More',
  hrefLink: 'https://www.nwf.org/'
};

const SustainabilityPage = () => {
  const { featuredProducts } = useContext(ProductContext);
  return (
    <Layout>
      <Hero data={heroData}>
        <StaticImage
          style={{
            gridArea: '1/1'
          }}
          loading="eager"
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/product-backgrounds/MartinBugNetBackground.jpg"
          placeholder="blurred"
        />
      </Hero>
      <Info>
        We're committed to extending our ethos of sustainability and conservation beyond our office
        walls. When you choose Hummingbird Hammocks, you're joining us on this journey towards a
        sustainable future, where the wild remains wild and the sky remains limitless. Welcome to
        our world, where every swing is a step towards preserving nature.
      </Info>

      <MainWrapper>
        <Container maxWidth="lg" sx={{ marginBottom: 20 }}>
          <Details divider={true} data={twoTreesData}>
            <StaticImage
              imgStyle={{ borderRadius: '20px' }}
              src="../assets/images/sustainability/TwoTreesPlanting.png"
              alt={twoTreesData.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={carbonNeutralShipping}>
            <StaticImage
              imgStyle={{ borderRadius: '20px' }}
              src="../assets/images/sustainability/CarbonOffsetShipping.png"
              alt={carbonNeutralShipping.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={solarPowered}>
            <StaticImage
              imgStyle={{ borderRadius: '20px' }}
              src="../assets/images/sustainability/SolarOffice.png"
              alt={solarPowered.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={packaging}>
            <StaticImage
              imgStyle={{ borderRadius: '20px' }}
              src="../assets/images/sustainability/SustainablePackagingTree.png"
              alt={packaging.title}
              placeholder="blurred"
            />
          </Details>
          <Details divider={true} data={wildlifeHabitat}>
            <StaticImage
              imgStyle={{ borderRadius: '20px' }}
              src="../assets/images/sustainability/CertifiedWildlifeHabitat.png"
              alt={wildlifeHabitat.title}
              placeholder="blurred"
            />
          </Details>
        </Container>

        <RecentlyViewed title="RECENTLY VIEWED PRODUCTS" products={featuredProducts.slice(0, 5)} />
      </MainWrapper>
    </Layout>
  );
};

export default SustainabilityPage;

export const Head = () => <Seo title="Sustainability | Hummingbird Hammocks" />;
