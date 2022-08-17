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
      shopifyId
      altText
      gatsbyImageData(placeholder: BLURRED)
    }
    variants {
      metafields {
        key
        value
      }
      id
      availableForSale
      shopifyId
      title
      image {
        id
        altText
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    options {
      id
      name
      values
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
