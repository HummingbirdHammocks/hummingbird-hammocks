import { getAlgoliaResults } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import algoliasearch from 'algoliasearch';
import { navigate } from 'gatsby';
import React from 'react';

import ArticleItem from './ArticleItem';
import KnowledgebaseItem from './KnowledgebaseItem';
import './autocomplete.css';
import Autocomplete from './customAutocomplete';
import ProductItem from './productItem';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_ADMIN_KEY
);

export default function Search() {
  return (
    <Autocomplete
      openOnFocus={true}
      detachedMediaQuery={''}
      getSources={({ query }) => [
        {
          sourceId: process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX_NAME,
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX_NAME,
                  query
                }
              ]
            });
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `);
            setIsOpen(true);
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
                  <span className="aa-SourceHeaderTitle">PRODUCTS</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              );
            },
            item({ item, components }) {
              return <ProductItem hit={item} components={components} />;
            },
            noResults() {
              return 'No Matching Products';
            }
          }
        },
        {
          sourceId: process.env.GATSBY_ALGOLIA_KNOWLEDGEBASE_INDEX_NAME,
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: process.env.GATSBY_ALGOLIA_KNOWLEDGEBASE_INDEX_NAME,
                  query
                }
              ]
            });
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `);
            setIsOpen(true);
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
                  <span className="aa-SourceHeaderTitle">FAQs & ARTICLES</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              );
            },
            item({ item, components }) {
              return <KnowledgebaseItem hit={item} components={components} linkType={'articles'} />;
            },
            noResults() {
              return 'No Matching Knowlege Base Articles';
            }
          }
        },
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
            setIsOpen(true);
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
        },
        {
          sourceId: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
                  query
                }
              ]
            });
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `);
            setIsOpen(true);
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
                  <span className="aa-SourceHeaderTitle">ARTICLES</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              );
            },
            item({ item, components }) {
              return <ArticleItem hit={item} components={components} linkType={'news'} />;
            },
            noResults() {
              return 'No Matching Articles';
            }
          }
        }
      ]}
    />
  );
}
