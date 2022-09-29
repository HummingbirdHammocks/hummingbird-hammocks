import React, { useState, useEffect, createContext } from "react"
import Client from "shopify-buy"

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
})

const defaultState = {
  customerAccessToken: null,
}

export const CartContext = createContext(defaultState)

export function CartContextProvider({ children }) {
  const [checkout, setCheckout] = useState(
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("checkout") : null
    )
  )

  const [successfulOrder, setSuccessfulOrder] = useState(null)
  const checkoutId = checkout?.id

  useEffect(() => {
    const getCheckout = async () => {
      if (checkoutId && typeof window !== "undefined") {
        const fetchedCheckout = await client.checkout.fetch(checkoutId)
        if (fetchedCheckout?.completedAt) {
          localStorage.removeItem("checkout")
          setCheckout(null)
          setSuccessfulOrder(fetchedCheckout)
        } else {
          setCheckout(fetchedCheckout)
          localStorage.setItem("checkout", JSON.stringify(fetchedCheckout))
        }
      }
    }

    getCheckout()
  }, [setCheckout, setSuccessfulOrder, checkoutId])

  async function getProductById(productId) {
    const product = await client.product.fetch(productId)
    return product
  }

  const updateLineItem = async ({ variantId, quantity }) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout || (await client.checkout.create())

    // check to see if this variantId exists in storedCheckout
    const lineItemVariant = newCheckout.lineItems?.find(
      lineItem => lineItem.variant.id === variantId
    )

    if (lineItemVariant) {
      const newQuantity = lineItemVariant.quantity + quantity

      if (newQuantity) {
        newCheckout = await client.checkout.updateLineItems(newCheckout.id, [
          {
            id: lineItemVariant.id,
            quantity: newQuantity,
          },
        ])
      } else {
        newCheckout = await client.checkout.removeLineItems(newCheckout.id, [
          lineItemVariant.id,
        ])
      }
    } else {
      newCheckout = await client.checkout.addLineItems(newCheckout.id, [
        {
          variantId,
          quantity,
        },
      ])
    }

    setCheckout(newCheckout)
    setSuccessfulOrder(null)
    if (typeof window !== "undefined") {
      localStorage.setItem("checkout", JSON.stringify(newCheckout))
    }
  }

  const updateAttributes = async ({ attributeKey, attributeValue }) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout || (await client.checkout.create())

    const input = {
      customAttributes: [
        { key: attributeKey, value: attributeValue }
      ]
    };

    newCheckout = await client.checkout.updateAttributes(checkoutId, input)

    console.log(newCheckout.customAttributes)

    setCheckout(newCheckout)
    setSuccessfulOrder(null)
    if (typeof window !== "undefined") {
      localStorage.setItem("checkout", JSON.stringify(newCheckout))
    }
  }

  const removeLineItem = async lineItemId => {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      lineItemId,
    ])

    setCheckout(newCheckout)
  }

  const dismissSuccessfulOrder = () => {
    setSuccessfulOrder(null)
  }

  return (
    <CartContext.Provider
      value={{
        checkout,
        updateLineItem,
        removeLineItem,
        getProductById,
        successfulOrder,
        dismissSuccessfulOrder,
        updateAttributes,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
