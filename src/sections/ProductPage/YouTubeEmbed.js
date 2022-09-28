import React from "react"
import { Box } from "@mui/material"

export const YouTubeEmbed = ({ url, title }) => {

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        marginTop: "70px",
      }}>
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
        allowFullScreen
      />
    </Box>
  )
}
