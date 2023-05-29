import makeStore from './makeStore';

const initialState = {
    recentlyViewedProducts: [],
    recentlyViewedKBArticles: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "addRecentlyViewedProduct":
            if (!action.recentlyViewedProduct || !action.recentlyViewedProduct.id) {
                return {
                    ...state,
                };
            }

            let newRVP = state.recentlyViewedProducts
            /* console.log(state.recentlyViewedProducts) */

            let existingItem = null;
            /* console.log(existingItem) */

            if (newRVP !== [] && newRVP.length > 0) {
                existingItem = newRVP.find(i => i.id === action.recentlyViewedProduct.id)
            }


            if (existingItem && newRVP.length < 6) {
                newRVP.unshift(
                    newRVP.splice(
                        newRVP.findIndex(i => i.id === action.recentlyViewedProduct.id),
                        1
                    )[0]
                )
            }

            if (!existingItem) {
                if (newRVP.length >= 6) {
                    newRVP.pop()
                    return {
                        ...state,
                        recentlyViewedProducts: [action.recentlyViewedProduct, ...newRVP.recentlyViewedProducts],
                    };
                }

                if (newRVP === [] || newRVP.length < 6) {
                    return {
                        ...state,
                        recentlyViewedProducts: [action.recentlyViewedProduct, ...state.recentlyViewedProducts],
                    };
                }
            }

            return {
                ...state,
            };
        case "addRecentlyViewedKBArticle":
            if (!action.article || !action.article.handle || !action.article.title || !action.article.link) {
                return {
                    ...state,
                };
            }

            /* console.log(action) */
            let newRVKBA = state.recentlyViewedKBArticles
            /* console.log(state.recentlyViewedKBArticles) */

            let existingKBItem = null;
            /* console.log(existingItem) */

            if (newRVKBA !== [] && newRVKBA.length > 0) {
                existingKBItem = newRVKBA.find(i => i.handle === action.article.handle)
            }


            if (existingKBItem && newRVKBA.length < 6) {
                newRVKBA.unshift(
                    newRVKBA.splice(
                        newRVKBA.findIndex(i => i.handle === action.article.handle),
                        1
                    )[0]
                )
            }

            if (!existingKBItem) {
                if (newRVKBA.length >= 6) {
                    newRVKBA.pop()
                    return {
                        ...state,
                        recentlyViewedKBArticles: [action.article, ...newRVKBA.recentlyViewedKBArticles],
                    };
                }

                if (newRVKBA === [] || newRVKBA.length < 6) {
                    return {
                        ...state,
                        recentlyViewedKBArticles: [action.article, ...state.recentlyViewedKBArticles],
                    };
                }
            }

            return {
                ...state,
            };
        default:
            throw new Error("Unknown action!"/*  + action */);
    }
};

const [
    RecentlyViewedProvider,
    useRecentlyViewedDispatch,
    useRecentlyViewedStore
] = makeStore(reducer, initialState, "recentlyViewedStore")

export { RecentlyViewedProvider, useRecentlyViewedDispatch, useRecentlyViewedStore }