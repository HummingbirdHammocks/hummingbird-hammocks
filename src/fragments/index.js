import { graphql } from 'gatsby';

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
    metafields {
      key
      value
      namespace
      shopifyId
      description
    }
    media {
      ... on ShopifyMediaImage {
        shopifyId
        image {
          altText
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    variants {
      metafields {
        namespace
        key
        value
        description
      }
      id
      availableForSale
      shopifyId
      title
      media {
        ... on ShopifyMediaImage {
          shopifyId
          image {
            altText
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
      metafields {
        key
        value
        namespace
        shopifyId
        description
      }
    }
    options {
      shopifyId
      name
      values
    }
    featuredImage {
      altText
      originalSrc
      gatsbyImageData(placeholder: BLURRED)
    }
    seo {
      title
      description
    }
  }
`;

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
`;
