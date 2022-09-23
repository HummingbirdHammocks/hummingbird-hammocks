import React from "react"
import { styled, Box } from "@mui/material"
import { Facebook, Twitter, Pinterest, Mail } from "@mui/icons-material"

import { AnotherLink } from "components"

const SocialItem = styled(Box)(({ color }) => ({
  borderRadius: "50%",
  padding: "10px 10px 7px 10px",
  marginRight: "9px",
  border: "1px solid #e2e2e2",
  cursor: "pointer",

  "& a": {
    color: color,
  },

  "&:hover": {
    background: color,

    "& a": {
      color: "#fff",
    },
  },
}))

export const Socials = ({ title, url, media }) => {
  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
      }}>
      <SocialItem color="#09aeec">
        <AnotherLink
          href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </AnotherLink>
      </SocialItem>
      <SocialItem color="#49659d">
        <AnotherLink
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </AnotherLink>
      </SocialItem>
      <SocialItem color="#cb1f2a">
        <AnotherLink
          href={`https://pinterest.com/pin/create/button/?url=${title}&description=${title}&media=${media}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Pinterest />
        </AnotherLink>
      </SocialItem>
      <SocialItem color="#888">
        <AnotherLink
          href={`mailto:?subject=Thought%20you%20might%20like%20${title}&body=Hey,%20I%20was%20browsing%20Hummingbird%20Hammocks%20and%20found%20${title}%20I%20wanted%20to%20share%20it%20with%20you.%0D%0A%0D%0A${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </AnotherLink>
      </SocialItem>
    </Box>
  )
}
