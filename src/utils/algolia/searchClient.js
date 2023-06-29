import algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_ADMIN_KEY
);
