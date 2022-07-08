import { graphql } from "gatsby"

export const productFields = graphql`
  fragment ShopifyProductFields on ShopifyProduct {
    shopifyId
    title
    description
    tags
    handle
    productType
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
