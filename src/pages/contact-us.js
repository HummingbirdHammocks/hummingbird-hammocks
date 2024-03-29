import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import { Layout, Link, MainWrapper, Seo } from '../components';
import { ContactUsForm, Hero, Info } from '../sections';

const heroData = {
  position: 'center',
  mainText: 'GET IN TOUCH'
};

const GridItem = ({ children, title, subText, buttonLink, buttonText }) => {
  return (
    <Box p="0 30px">
      <Box display="flex" justifyContent="center">
        {children}
      </Box>

      <Typography textTransform="uppercase" textAlign="center" sx={{ mb: '30px' }} variant="h2">
        {title}
      </Typography>
      <Typography textAlign="center" sx={{ mt: '30px', maxWidth: '1200px' }} variant="body1">
        {subText}
      </Typography>

      <Box m="30px 0 70px 0" display="flex" justifyContent="center">
        <Button variant="contained" component={Link} to={buttonLink}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

const ContactUsPage = () => {
  const theme = useTheme();
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
          src="../assets/images/contact-us/contact-hero.jpg"
          placeholder="blurred"
        />
      </Hero>

      <MainWrapper>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Info title="CONTACT US">
              Our support team is completely internal and nothing is outsourced, and you won't be
              asked to jump through a bunch of hoops. We offer informed and concise help so you can
              get off the computer and back outside.
              <br />
              <br />
              Please reach out to us using the contact form on this page for general questions or
              create a support ticket using the button below for more in-depth and detailed help. We
              will get back to you as soon as possible.
              <Box mt="40px" display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  component="a"
                  onClick={() => navigate('/account/create-ticket')}>
                  Create Support Ticket
                </Button>
              </Box>
            </Info>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: '60px 15px',

                [theme.breakpoints.down('md')]: {
                  padding: '50px 0',
                  wordBreak: 'break-word'
                }
              }}>
              <ContactUsForm />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',

            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr'
            }
          }}>
          <GridItem
            buttonLink="/professional-and-educational-discounts"
            buttonText="Learn More"
            title="PRO DEAL"
            subText="Our Pro Deal Program is our way of providing outdoor professionals, first responders, military personnel, and students/educators our products at a discount.">
            <Link to="/professional-and-educational-discounts">
              <StaticImage
                alt="Pro Deal"
                src="../assets/images/contact-us/pro-deal.png"
                placeholder="blurred"
              />
            </Link>
          </GridItem>
          <GridItem
            buttonLink="/affiliate-program"
            buttonText="Get Started"
            title="AFFILIATE PROGRAM"
            subText="We are a small team that relies heavily on our faithful community spreading the news about what we do. Join our team and earn commissions on the happy campers you send our way!">
            <Link to="/affiliate-program">
              <StaticImage
                component={Link}
                to="/paffiliate-program"
                alt="AFFILIATE PROGRAM"
                src="../assets/images/contact-us/affliate-program.png"
                placeholder="blurred"
              />
            </Link>
          </GridItem>
        </Box>
      </MainWrapper>
    </Layout>
  );
};

export default ContactUsPage;

export const Head = () => <Seo title="Contact Us | Hummingbird Hammocks" />;
