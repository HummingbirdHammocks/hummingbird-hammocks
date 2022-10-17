import React from "react"
import {
  useTheme,
  Box,
} from "@mui/material"

export const FooterShapeDivider = (props) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",

          "& svg": {
            position: "relative",
            display: "block",
            width: { xs: "calc(40% + 1.3px)", sm: "calc(30% + 1.3px)", md: "calc(20% + 1.3px)" },
            marginLeft: "auto",
            marginRight: 4,
          },
        }}>
        <svg
          viewBox="0 0 889 194"
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
          }}
          {...props}
        >
          <path
            d="M0 193.85h888.556l-55.127-29.528-41.754-42.324-30.36 32.36-92.098-51.357-66.972-48.964-57.44 40.76-50.632-33.637L438.748 0l-49.211 37.546-35.942 22.294-47.687 49.612-43.943 25.553-55.858 23.062-13.693-.306-84.225 35.73-27.642-32.842-14.791 4.172-28.638-22.584-11.625 23.175L0 193.85Z"
            style={{
              fill: "#10220e",
            }}
          />
        </svg>
      </Box >
    </Box >
  )
}
