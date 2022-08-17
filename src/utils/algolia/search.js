import React from "react"
import { navigate } from "gatsby"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import "@algolia/autocomplete-theme-classic"

import "./autocomplete.css"
import Autocomplete from "./customAutocomplete"
import ProductItem from "./productItem"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_ADMIN_KEY
)

export default function Search() {
  return (
    <Autocomplete
      openOnFocus={true}
      detachedMediaQuery={""}
      getSources={({ query }) => [
        {
          sourceId: "dev_products",
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  clickAnalytics: true,
                  indexName: "dev_products",
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
                  <span className="aa-SourceHeaderTitle">PRODUCTS</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              )
            },
            item({ item, components }) {
              return <ProductItem hit={item} components={components} />
            },
            noResults() {
              return "No Matching Posts"
            },
          },
        },
      ]}
    />
  )
}
