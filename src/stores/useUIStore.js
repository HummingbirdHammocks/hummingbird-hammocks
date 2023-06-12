import makeStore from './makeStore';

const initialState = {
  cartOpen: false,
  navDrawerOpen: false,
  banner: null,
  bannerOpen: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCartOpen':
      return {
        ...state,
        cartOpen: action.cartOpen
      };
    case 'toggleCartOpen':
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
    case 'setNavDrawerOpen':
      return {
        ...state,
        navDrawerOpen: action.navDrawerOpen
      };
    case 'toggleNavDrawerOpen':
      return {
        ...state,
        navDrawerOpen: !state.navDrawerOpen
      };
    case 'setBannerOpen':
      return {
        ...state,
        bannerOpen: action.bannerOpen
      };
    case 'toggleBannerOpen':
      return {
        ...state,
        bannerOpen: !state.bannerOpen
      };
    case 'setBanner':
      return {
        ...state,
        banner: action.banner
      };
    case 'setBannerAndOpen':
      return {
        ...state,
        bannerOpen: action.bannerOpen,
        banner: action.banner
      };
    default:
      throw new Error('Unknown action!' /*  + action */);
  }
};

const [UIProvider, useUIDispatch, useUIStore] = makeStore(reducer, initialState, 'uiStore');

export { UIProvider, useUIDispatch, useUIStore };
