import makeStore from './makeStore';

const initialState = {
    products: [],
    featuredProducts: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setProducts":
            return {
                ...state,
                products: action.products,
            };
        case "setFeaturedProducts":
            return {
                ...state,
                featuredProducts: !state.featuredProducts,
            };
        default:
            throw new Error("Unknown action!"/*  + action */);
    }
};

const [
    ProductsProvider,
    useProductsDispatch,
    useProductsStore
] = makeStore(reducer, initialState, "productsStore")

export { ProductsProvider, useProductsDispatch, useProductsStore }