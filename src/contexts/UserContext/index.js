import React, { useState, createContext } from "react"

const windowVar = typeof window !== "undefined"

const defaultState = {
  customerAccessToken:
    windowVar && localStorage.getItem("customerAccessToken")
      ? JSON.parse(localStorage.getItem("customerAccessToken"))
      : null,
  setValue: () => {},
  logout: () => {},
}

export const UserContext = createContext(defaultState)

export function UserContextProvider({ children }) {
  const [store, updateStore] = useState(defaultState)

  return (
    <UserContext.Provider
      value={{
        store,
        setValue: value => {
          windowVar &&
            localStorage.setItem("customerAccessToken", JSON.stringify(value))
          updateStore(state => {
            return { ...state, customerAccessToken: value }
          })
        },
        logout: () => {
          windowVar && localStorage.removeItem("customerAccessToken")
          updateStore(state => {
            return { ...state, customerAccessToken: null }
          })
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
