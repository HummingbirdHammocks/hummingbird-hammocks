import React from "react"
import { navigate } from "gatsby"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import "@algolia/autocomplete-theme-classic"

import "./autocomplete.css"
import Autocomplete from "./customAutocomplete"
import ArticleItem from "./ArticleItem"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_ADMIN_KEY
)

export default function ArticlesSearch() {
  return (
    <Autocomplete
      openOnFocus={true}
      detachedMediaQuery={""}
      getSources={({ query }) => [
        {
          sourceId: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
                  query,
                },
              ],
            })
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `)
            setIsOpen(true)
            refresh()
          },
          /* getItemUrl({ item }) {
            return "/communities/" + item.slug;
          }, */
          navigator: {
            navigate({ item }) {
              navigate(item.Path)
            },
          },
          templates: {
            header() {
              return (
                <>
                  <span className="aa-SourceHeaderTitle">ARTICLES</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              )
            },
            item({ item, components }) {
              return <ArticleItem hit={item} components={components} linkType={"news"} />
            },
            noResults() {
              return "No Matching Articles"
            },
          },
        },
      ]}
    />
  )
}
