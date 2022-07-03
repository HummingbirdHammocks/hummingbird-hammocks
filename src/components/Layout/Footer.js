import React from "react"
import {
  styled,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
} from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import { Facebook, Twitter, YouTube } from "@mui/icons-material"

import { MainWrapper, AnotherLink } from "components"

const FooterSection = styled("footer")(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: "50px 0",
}))

const socials = [
  {
    id: 1,
    name: "Facebook",
    url: "https://example.com",
    iconTag: <Facebook />,
  },
  {
    id: 2,
    name: "Twitter",
    url: "https://example.com",
    iconTag: <Twitter />,
  },
  {
    id: 3,
    name: "YouTube",
    url: "https://example.com",
    iconTag: <YouTube />,
  },
  {
    id: 4,
    name: "YouTube",
    url: "https://example.com",
    iconTag: <YouTube />,
  },
  {
    id: 5,
    name: "YouTube",
    url: "https://example.com",
    iconTag: <YouTube />,
  },
]

const customerSupport = [
  { id: 1, name: "Get Help", url: "https://Example.com" },
  { id: 2, name: "Manuals", url: "https://Example.com" },
  { id: 3, name: "Knowledgebase", url: "https://Example.com" },
  { id: 4, name: "Returns", url: "https://Example.com" },
  { id: 5, name: "Keep Up To Date", url: "https://Example.com" },
]

const Footer = () => {
  return (
    <FooterSection>
      <MainWrapper>
        <Grid
          sx={{ pb: "30px" }}
          container
          spacing={4}
          justifyContent="space-evenly"
        >
          <Grid item>
            <StaticImage
              src="../../assets/images/footer-logo.png"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
              height={130}
            />
            <List
              disablePadding
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {socials.map(social => (
                <ListItem disablePadding key={social.id}>
                  <AnotherLink color="white" href={social.url} underline="none">
                    {social.iconTag}
                  </AnotherLink>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <Typography color="white" variant="h6">
              Customer Support
            </Typography>
            <List>
              {customerSupport.map(customer => (
                <ListItem sx={{ pl: "0" }} key={customer.id}>
                  <AnotherLink
                    sx={{ fontSize: "14px" }}
                    color="white"
                    href={customer.url}
                    underline="none"
                  >
                    {customer.name}
                  </AnotherLink>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <Typography color="white" variant="h6">
              Customer Support
            </Typography>
            <List>
              {customerSupport.map(customer => (
                <ListItem sx={{ pl: "0" }} key={customer.id}>
                  <AnotherLink
                    sx={{ fontSize: "14px" }}
                    color="white"
                    href={customer.url}
                    underline="none"
                  >
                    {customer.name}
                  </AnotherLink>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <StaticImage
              src="../../assets/images/ecology.png"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
              height={130}
            />
          </Grid>
          <Grid item>
            <StaticImage
              src="../../assets/images/judge-me.png"
              alt="Hummingbird Hammocks"
              placeholder="blurred"
              height={130}
            />
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "white" }} />
      </MainWrapper>
    </FooterSection>
  )
}

export default Footer
