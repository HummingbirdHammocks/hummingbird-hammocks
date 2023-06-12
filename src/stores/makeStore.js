import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

const windowVar = typeof window !== 'undefined';

export default function makeStore(userReducer, initialState, key) {
  const dispatchContext = createContext(null);
  const storeContext = createContext(null);

  if (windowVar) {
    try {
      initialState = JSON.parse(localStorage.getItem(key)) || initialState;
    } catch {
      return null;
    }
  }

  const reducer = (state, action) => {
    const newState = userReducer(state, action);
    windowVar && localStorage.setItem(key, JSON.stringify(newState));
    return newState;
  };

  const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  StoreProvider.propTypes = {
    children: PropTypes.any
  };

  function useDispatch() {
    return useContext(dispatchContext);
  }

  function useStore() {
    return useContext(storeContext);
  }

  return [StoreProvider, useDispatch, useStore];
}
