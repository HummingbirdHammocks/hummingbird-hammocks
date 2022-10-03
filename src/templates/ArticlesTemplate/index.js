import React from "react"
import { useTheme, Box, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { Seo, Layout, MainWrapper, Link, Socials } from "components"

import { fShopify } from '../../utils/formatTime'


const Articles = ({ data: { articles }, pageContext: { next, prev } }) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

  const { title, published_at, /* author, */ body_html, /* handle, */ localFile } = articles
  const url = typeof window !== "undefined" ? window.location.href : ""

  return (
    <Layout>
      <Seo title={title} />
      <Box
        sx={{
          display: "grid",
          position: "relative",

          [theme.breakpoints.down("md")]: {
            minHeight: "inherit",
          },
        }}>
        <GatsbyImage
          placeholder="blurred"
          alt={title}
          image={localFile.childImageSharp.gatsbyImageData}
          loading="eager"
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
          }}>
          <Box>
            <Typography
              sx={{ margin: "20px 10px" }}
              textAlign="center"
              variant="h1"
              color="white.main"
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "rgba(0,0,0,.2)",
            position: "absolute",
            inset: "0 0 0 0",
          }} />
      </Box>
      <MainWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px 300px 70px 300px",

            [theme.breakpoints.down("md")]: {
              margin: "0",
            },
          }}>
          <Box
            display="inline-flex"
            alignItems="center"
            sx={{
              background: "#34542a",
              color: "#fff",
              padding: "3px 10px",
              borderRadius: "10px"
            }}
            justifyContent="center"
            order="2"
          >
            {prev && (
              <Tooltip title={prev.title}>
                <Typography variant="collectionName">
                  <Link
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      "&:hover": {
                        opacity: "0.7",
                      },
                    }}
                    to={`/blogs/news/${prev.handle}`}
                  >
                    Prev
                  </Link>
                </Typography>
              </Tooltip>
            )}
            {prev && next && <Box m="0 10px">|</Box>}
            {next && (
              <Tooltip title={next.title}>
                <Typography variant="collectionName">
                  <Link
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      "&:hover": {
                        opacity: "0.7",
                      },
                    }}
                    to={`/blogs/news/${next.handle}`}
                  >
                    Next
                  </Link>
                </Typography>
              </Tooltip>
            )}
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Box>
              <Typography variant="collectionName">
                <Link to="/">HOME</Link> /{" "}
                <Link to={`/blogs/news/`}>OUTDOOR ARTICLES</Link>{" "}
              </Typography>
              <br />
              <Typography variant="collectionName">{fShopify(published_at)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "40px 300px 70px 300px",

            "& h2": {
              ...theme.typography.h2,
              textTransform: "uppercase",
            },

            "& a": {
              textDecoration: "none",
            },

            "& span": {
              ...theme.typography.body1,
            },

            "& h2 a span": {
              fontSize: "22px",
              color: "black",
            },

            "& p": {
              ...theme.typography.body1,
            },

            "& table": {
              ...theme.typography.body1,
            },

            "& img": {
              borderRadius: "20px",
              width: "100%",
            },

            [theme.breakpoints.down("md")]: {
              margin: "0",
            },
          }}>
          <div
            dangerouslySetInnerHTML={{
              __html: body_html,
            }}
          />
        </Box>
        <Box
          m={matches ? "0 0 60px 0" : "10px 300px 70px 300px"}
          display="flex"
          justifyContent={matches ? "center" : "right"}
        >
          <Socials
            title={title}
            url={url}
            media={localFile.childImageSharp.gatsbyImageData}
          />
        </Box>
      </MainWrapper>
    </Layout>
  )
}

export default Articles

export const query = graphql`
  query articleQuery($id: String) {
    articles(id: { eq: $id }) {
      localFile {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      author
      body_html
      summary_html
      published_at
      title
      handle
      id
    }
  }
`
