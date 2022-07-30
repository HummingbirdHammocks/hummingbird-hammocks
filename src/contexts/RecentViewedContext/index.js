import React, { useState, createContext } from "react"

const windowVar = typeof window !== "undefined"

const defaultState = {
  recentViewedProducts:
    windowVar && localStorage.getItem("recent_viewed_product")
      ? JSON.parse(localStorage.getItem("recent_viewed_product"))
      : [],
  addRecentProducts: () => {},
}

export const RecentViewedContext = createContext(defaultState)

export function RecentViewedContextProvider({ children }) {
  const [store, updateStore] = useState(defaultState)

  return (
    <RecentViewedContext.Provider
      value={{
        recentViewedProducts: store.recentViewedProducts,
        addRecentProducts: async item => {
          let newRecentProduct = store.recentViewedProducts

          let existItem = await newRecentProduct.find(i => i.id === item.id)

          if (existItem && newRecentProduct.length < 6) {
            newRecentProduct.unshift(
              newRecentProduct.splice(
                newRecentProduct.findIndex(i => i.id === item.id),
                1
              )[0]
            )
          }

          if (!existItem && newRecentProduct.length === 6) {
            await newRecentProduct.pop()
            windowVar &&
              localStorage.setItem(
                "recent_viewed_product",
                JSON.stringify([item, ...newRecentProduct])
              )

            updateStore(state => {
              return {
                ...state,
                recentViewedProducts: [item, ...newRecentProduct],
              }
            })
          }

          if (!existItem && newRecentProduct.length < 6) {
            windowVar &&
              localStorage.setItem(
                "recent_viewed_product",
                JSON.stringify([item, ...store.recentViewedProducts])
              )

            updateStore(state => {
              return {
                ...state,
                recentViewedProducts: [item, ...store.recentViewedProducts],
              }
            })
          }
        },
      }}
    >
      {children}
    </RecentViewedContext.Provider>
  )
}
