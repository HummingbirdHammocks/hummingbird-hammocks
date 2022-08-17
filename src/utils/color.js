import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Color = ({ title }) => {
  return (
    <>
      {
        {
          "Skydiver Blue": (
            <StaticImage
              src="../assets/images/color/skydiver-blue.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Deep Purple": (
            <StaticImage
              src="../assets/images/color/deep-purple.png"
              alt={title}
              placeholder="blurred"
              imgStyle={{ borderRadius: "50%" }}
              height={34}
            ></StaticImage>
          ),
          Ash: (
            <StaticImage
              src="../assets/images/color/slate-gray.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Grass Green": (
            <StaticImage
              src="../assets/images/color/grass-green.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Sunset Orange": (
            <StaticImage
              src="../assets/images/color/sunset-orange.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Forest Green": (
            <StaticImage
              src="../assets/images/color/forest-green.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Gray and Grass Green": (
            <StaticImage
              src="../assets/images/color/gray-and-grass-green.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Gray and Skydiver Blue": (
            <StaticImage
              src="../assets/images/color/gray-and-skydiver-blue.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Gray and Deep Purple": (
            <StaticImage
              src="../assets/images/color/gray-and-deep-purple.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Gray and Sunset Orange": (
            <StaticImage
              src="../assets/images/color/gray-and-sunset-orange.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Dark Olive": (
            <StaticImage
              src="../assets/images/color/dark-olive.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Coyote Brown": (
            <StaticImage
              src="../assets/images/color/coyote-brown.png"
              alt={title}
              placeholder="blurred"
              imgStyle={{ borderRadius: "50%" }}
              height={34}
            ></StaticImage>
          ),
          "Slate Gray": (
            <StaticImage
              src="../assets/images/color/slate-gray.png"
              alt={title}
              imgStyle={{ borderRadius: "50%" }}
              height={34}
              placeholder="blurred"
            ></StaticImage>
          ),
          "Gray and Forest Green": (
            <StaticImage
              src="../assets/images/color/gray-and-forest-green.png"
              alt={title}
              placeholder="blurred"
              imgStyle={{ borderRadius: "50%" }}
              height={34}
            ></StaticImage>
          ),
        }[title]
      }
    </>
  )
}

export default Color
