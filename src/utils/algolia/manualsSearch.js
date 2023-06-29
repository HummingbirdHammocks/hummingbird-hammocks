import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { navigate } from 'gatsby';
import React from 'react';

import { KnowledgebaseItem } from './KnowledgebaseItem';
import { Autocomplete } from './customAutocomplete';
import { searchClient } from './searchClient';

export function ManualsSearch() {
  return (
    <Autocomplete
      openOnFocus={true}
      detachedMediaQuery={''}
      getSources={({ query }) => [
        {
          sourceId: process.env.GATSBY_ALGOLIA_MANUALS_INDEX_NAME,
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: process.env.GATSBY_ALGOLIA_MANUALS_INDEX_NAME,
                  query
                }
              ]
            });
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `);
            setIsOpen(false);
            refresh();
          },
          /* getItemUrl({ item }) {
            return "/communities/" + item.slug;
          }, */
          navigator: {
            navigate({ item }) {
              navigate(item.Path);
            }
          },
          templates: {
            header() {
              return (
                <>
                  <span className="aa-SourceHeaderTitle">MANUALS & GUIDES</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              );
            },
            item({ item, components }) {
              return <KnowledgebaseItem hit={item} components={components} linkType={'manuals'} />;
            },
            noResults() {
              return 'No Matching Manuals or Guides';
            }
          }
        }
      ]}
    />
  );
}
