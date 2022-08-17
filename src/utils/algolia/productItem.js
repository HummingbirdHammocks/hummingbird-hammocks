import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function ProductItem({ hit, components }) {
  return (
    <Link to={`/products/${hit.handle}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
          <GatsbyImage
            image={getImage(hit.featuredImage.gatsbyImageData)}
            alt={hit.title + " Featured Image"}
          />
        </div>

        <div className="aa-ItemContentBody">
          <div className="aa-ItemTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>
          {/* <div className="aa-ItemContentDescription">{hit.description}</div> */}
        </div>
      </div>
    </Link>
  )
}
