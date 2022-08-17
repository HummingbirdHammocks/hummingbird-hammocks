import React from "react"
import { styled, Box } from "@mui/material"

const Wrapper = styled("section")(({ theme }) => ({
  margin: "40px 200px",

  [theme.breakpoints.down("md")]: {
    margin: "40px 0",
  },
}))

const VideoRelative = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  paddingBottom: "56.25%",
}))

export const YouTubeEmbed = ({ url, title }) => {
  return (
    <Wrapper>
      <VideoRelative>
        <iframe
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            border: "0",
            borderRadius: "20px",
          }}
          src={`https://www.youtube.com/embed/${url
            .split("v=")[1]
            .substring(0, 11)}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </VideoRelative>
    </Wrapper>
  )
}
