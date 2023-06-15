import { Box, Container, Stack } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import { FeaturedReviewsCarousel, Layout, MainWrapper, Seo } from '../components';
import { Details, FeaturedProduct, Hero, Info, OutDoorArticles } from '../sections';

const heroData = {
  position: 'center',
  subtitle1: 'Ultralight and Beyond',
  mainText: 'EXPLORE THE OUTDOORS UNENCUMBERED',
  subtitle2: 'Ultralight Gear For Every Adventure',
  button: [
    {
      id: 1,
      text: 'Hammocks',
      type: 'link',
      url: '/collections/hammocks'
    },
    {
      id: 2,
      text: 'Tree Straps',
      url: '/collections/tree-straps',
      background: 'transparent',
      color: 'white',
      type: 'link'
    }
  ]
};

const secondData = {
  position: 'right',
  subtitle1: 'FAA Certified Parachute Fabric',
  mainText: 'REAL PARACHUTE FABRIC',
  subtitle2:
    'All of our hammocks use actual FAA-certified reserve parachute material. This fabric is trusted by skydivers, BASE jumpers, and aerobatic pilots daily.'
};

const thirdData = {
  position: 'left',
  subtitle1: 'Hammocks need trees, and so do we!',
  mainText: 'WE PLANT TWO TREES FOR EVERY ORDER',
  subtitle2: 'One Order Placed = Two Trees Planted',
  button: [
    {
      id: 1,
      text: 'Ecology',
      url: 'https://ecologi.com/hummingbirdhammocks?r=60b8efa8e6e3c022ec95c2bb',
      type: 'href',
      background: 'transparent',
      color: 'white',
      hoverBack: '#34542a',
      hoverBolor: '#fff',
      hoverBorder: '1px solid #34542a'
    },
    {
      id: 2,
      text: 'Eden Project',
      type: 'href',
      url: 'https://www.edenprojects.org/our-work',
      hoverBack: '#34542a',
      hoverBolor: '#fff',
      hoverBorder: '1px solid #34542a'
    }
  ]
};

const fourthData = {
  position: 'right',
  subtitle1: "We're Counting Every Gram",
  mainText: 'DYE SUBLIMATION',
  subtitle2:
    'The fabric equivalent of a tattoo. This system allows us to print graphics and information on our gear without adding any weight or bulk.'
};

const detailsData = {
  order: 1,
  title: 'SIL-POLY RAIN TARPS',
  subText:
    "Don't let rain... rain on your parade. Be ready for any weather with one of our ultralight, no-stretch, sil-poly rain tarps!",
  buttonText: 'Shop Rain Tarps',
  buttonLink: '/collections/shelter'
};

const detailsData2 = {
  order: 2,
  title: '1.55 OZ ULTRALIGHT TREE STRAPS',
  subText:
    'Tired of carrying around heavy Tree Straps? So were we, so we made our own! At 1.55 oz and packing smaller than a candy bar, these straps are ready to go everywhere you are.',
  buttonText: 'Shop Tree Tarps',
  buttonLink: '/collections/tree-straps'
};

const detailsData3 = {
  order: 2,
  title: 'BUG PROTECTION FOR EVERY ADVENTURE',
  subText:
    'Relax and sleep without concern for our small creepy, crawly, airborne friends. At only 5.5 oz, the Warbler Bug Net provides complete 360-degree protection from mosquitos, other bugs, and possibly even small birds.',
  buttonText: 'Shop Bug Nets',
  buttonLink: '/products/warbler-bug-net'
};

const IndexPage = () => {
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
          src="../assets/images/home/hero-back.jpg"
          placeholder="blurred"
        />
      </Hero>
      <Info title="MORE THAN JUST ULTRALIGHT">
        The ultralight camping gear we design is an industry standout, weighing in at a remarkable
        30% less than similar gear on the market. But at our company, we go beyond just creating
        ultralight equipment; we're equally dedicated to packability and portability.
        <br /> <br />
        We understand that both volume and weight in your backpack can affect your outdoor
        experience. That's why we've meticulously crafted our gear to respect both factors,
        designing ultralight hammocks that not only weigh less but also compress to an impressively
        small size.
        <br /> <br />
        Say goodbye to cumbersome metal components and chunky webbing. Our innovative hammock gear
        employs actual reserve parachute nylon and our unique button link system, allowing you to
        squeeze it down into a surprisingly tiny stuff sack. This way, our gear stays virtually
        unnoticed, whether it's tucked away in your pack or weighed on a scale. Elevate your camping
        and hiking adventures with our ultralight hammock gear, designed to go the distance without
        weighing you down. Discover the freedom of traveling lighter and smarter with us.
      </Info>
      <Hero data={secondData}>
        <StaticImage
          style={{
            gridArea: '1/1'
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
            gridArea: '1/1'
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/ecology.jpg"
          placeholder="blurred"
        />
      </Hero>
      <MainWrapper>
        <Container maxWidth="lg">
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 4,
              marginBottom: 4
            }}>
            <Details data={detailsData}>
              <StaticImage
                imgStyle={{ borderRadius: '20px' }}
                src="../assets/images/home/SilPolyFabric.jpg"
                alt="Hummingbird Hammocks"
                placeholder="blurred"
              />
            </Details>
            <Details order="2" data={detailsData2}>
              <StaticImage
                imgStyle={{ borderRadius: '20px' }}
                src="../assets/images/home/Details.jpg"
                alt="Hummingbird Hammocks"
                placeholder="blurred"
              />
            </Details>
            <Details data={detailsData3}>
              <StaticImage
                imgStyle={{ borderRadius: '20px' }}
                src="../assets/images/home/Details 2.jpg"
                alt="Hummingbird Hammocks"
                placeholder="blurred"
              />
            </Details>
          </Stack>
        </Container>
      </MainWrapper>
      <Hero data={fourthData}>
        <StaticImage
          style={{
            gridArea: '1/1'
          }}
          layout="fullWidth"
          alt="Ultralight Hammock"
          src="../assets/images/home/Hammocks Back.jpg"
          placeholder="blurred"
        />
      </Hero>
      <MainWrapper>
        <Container maxWidth="lg">
          <FeaturedReviewsCarousel />
        </Container>

        <Box>
          <OutDoorArticles />
        </Box>
      </MainWrapper>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Ultralight Outdoor Gear | Hummingbird Hammocks" />;
