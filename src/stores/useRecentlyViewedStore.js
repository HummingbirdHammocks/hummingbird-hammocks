import makeStore from './makeStore';

const initialState = {
  recentlyViewedProducts: [],
  recentlyViewedBlogArticles: [],
  recentlyViewedKBArticles: []
};

const handleCheckExistingAndAdd = (item, array, maxLength) => {
  const newArray = array || [];

  let existingItem = null;
  if (newArray !== [] && newArray.length > 0) {
    existingItem = newArray.find((i) => i.id === item.id);
  }

  if (existingItem) {
    newArray.unshift(
      newArray.splice(
        newArray.findIndex((i) => i.id === item.id),
        1
      )[0]
    );
  } else {
    if (newArray.length >= maxLength) {
      newArray.pop();
      return [item, ...newArray];
    }

    if (newArray === [] || newArray.length < maxLength) {
      return [item, ...newArray];
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addRecentlyViewedProduct': {
      if (!action.recentlyViewedProduct || !action.recentlyViewedProduct.id) {
        return {
          ...state
        };
      }

      const updatedRecentlyViewedProducts = handleCheckExistingAndAdd(
        action.recentlyViewedProduct,
        state.recentlyViewedProducts,
        6
      );

      return {
        ...state,
        recentlyViewedProducts: updatedRecentlyViewedProducts
      };
    }
    case 'addRecentlyViewedBlogArticle': {
      if (
        !action.article ||
        !action.article.handle ||
        !action.article.title ||
        !action.article.link
      ) {
        return {
          ...state
        };
      }

      const updatedRecentlyViewdBlogArticles = handleCheckExistingAndAdd(
        action.article,
        state.recentlyViewedBlogArticles,
        6
      );

      return {
        ...state,
        recentlyViewedBlogArticles: updatedRecentlyViewdBlogArticles
      };
    }
    case 'addRecentlyViewedKBArticle': {
      if (
        !action.article ||
        !action.article.handle ||
        !action.article.title ||
        !action.article.link
      ) {
        return {
          ...state
        };
      }

      const updatedRecentlyViewedKBArticles = handleCheckExistingAndAdd(
        action.article,
        state.recentlyViewedKBArticles,
        6
      );

      return {
        ...state,
        recentlyViewedKBArticles: updatedRecentlyViewedKBArticles
      };
    }
    default:
      throw new Error('Unknown action!' + action);
  }
};

const [RecentlyViewedProvider, useRecentlyViewedDispatch, useRecentlyViewedStore] = makeStore(
  reducer,
  initialState,
  'recentlyViewedStore'
);

export { RecentlyViewedProvider, useRecentlyViewedDispatch, useRecentlyViewedStore };
