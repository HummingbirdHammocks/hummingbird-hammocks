import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext } from 'react';

const query = graphql`
  {
    allProducts: allShopifyProduct {
      edges {
        node {
          ...ShopifyProductFields
          ...ProductTileFields
        }
      }
    }
    featuredProducts: allShopifyProduct(filter: { tags: { eq: "Featured" } }) {
      edges {
        node {
          ...ShopifyProductFields
          ...ProductTileFields
        }
      }
    }
  }
`;

const defaultState = {
  products: []
};

export const ProductContext = createContext(defaultState);

export function ProductContextProvider({ children }) {
  const { allProducts, featuredProducts } = useStaticQuery(query);
  return (
    <ProductContext.Provider
      value={{
        products: allProducts.edges.map(({ node }) => node),
        featuredProducts: featuredProducts.edges.map(({ node }) => node)
      }}>
      {children}
    </ProductContext.Provider>
  );
}
