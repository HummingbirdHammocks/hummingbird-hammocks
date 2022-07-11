import { graphql } from "gatsby"

export const productFields = graphql`
  fragment ShopifyProductFields on ShopifyProduct {
    shopifyId
    title
    description
    tags
    handle
    productType
    publishedAt
    id
    images {
      id
      altText
      gatsbyImageData(placeholder: BLURRED)
    }
    variants {
      id
      availableForSale
      shopifyId
      title
    }
    featuredImage {
      altText
      gatsbyImageData(placeholder: BLURRED)
    }
  }
`

export const productTileFields = graphql`
  fragment ProductTileFields on ShopifyProduct {
    handle
    priceRangeV2 {
      minVariantPrice {
        currencyCode
        amount
      }
    }
  }
`
