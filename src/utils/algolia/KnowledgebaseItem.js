import { Link } from 'gatsby';
import React from 'react';

export function KnowledgebaseItem({ hit, components, linkType }) {
  /* console.log(hit); */
  /* console.log(components); */
  return (
    <Link to={`/knowledgebase/${linkType}/${hit.handle}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
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
