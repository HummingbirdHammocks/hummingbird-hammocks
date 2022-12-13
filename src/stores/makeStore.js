import React from 'react'
import PropTypes from 'prop-types'

const windowVar = typeof window !== "undefined"

export default function makeStore(userReducer, initialState, key) {
    const dispatchContext = React.createContext(null)
    const storeContext = React.createContext(null)

    if (windowVar) {
        try {
            initialState = JSON.parse(localStorage.getItem(key)) || initialState
        } catch { return null }
    }

    const reducer = (state, action) => {
        const newState = userReducer(state, action)
        windowVar && localStorage.setItem(key, JSON.stringify(newState))
        return newState
    }

    const StoreProvider = ({ children }) => {
        const [store, dispatch] = React.useReducer(
            reducer,
            initialState
        )

        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider value={store}>
                    {children}
                </storeContext.Provider>
            </dispatchContext.Provider>
        )
    }

    StoreProvider.propTypes = {
        children: PropTypes.any,
    };

    function useDispatch() {
        return React.useContext(dispatchContext)
    }

    function useStore() {
        return React.useContext(storeContext)
    }

    return [StoreProvider, useDispatch, useStore]
}