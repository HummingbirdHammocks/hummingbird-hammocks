import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

export function ProductItem({ hit, components }) {
  return (
    <Link to={`/products/${hit.handle}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        {hit?.featuredMedia?.preview?.image?.gatsbyImageData && (
          <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
            <GatsbyImage
              image={getImage(hit?.featuredMedia?.preview?.image?.gatsbyImageData)}
              alt={hit.title + ' Featured Image'}
            />
          </div>
        )}

        <div className="aa-ItemContentBody">
          <div className="aa-ItemTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>
          {/* <div className="aa-ItemContentDescription">{hit.description}</div> */}
        </div>
      </div>
    </Link>
  );
}
