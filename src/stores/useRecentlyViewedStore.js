import makeStore from './makeStore';

const initialState = {
    recentlyViewedProducts: [],
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

            let existingItem = newRVP.find(i => i.id === action.recentlyViewedProduct.id)
            /* console.log(existingItem) */


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

                if (newRVP.length < 6) {
                    return {
                        ...state,
                        recentlyViewedProducts: [action.recentlyViewedProduct, ...state.recentlyViewedProducts],
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