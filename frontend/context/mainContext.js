import { toast } from 'react-toastify'
import React from 'react'
const STORAGE_KEY = 'NEXT_ECOMMERCE_STARTER_'

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

const SiteContext = React.createContext()

function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

function ContextProviderComponent({ children }) {
  const [state, setState] = React.useState(initialState)
  const [isClient, setIsClient] = React.useState(false)

  // Only run on client side after mount
  React.useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        setState(JSON.parse(storageState))
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }, [])

  const updateState = (newState) => {
    setState(newState)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    }
  }

  const setItemQuantity = (item) => {
    const { cart } = state
    const index = cart.findIndex(cartItem => cartItem.id === item.id)
    if (index >= 0) {
      cart[index].quantity = item.quantity
      const newState = {
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      }
      updateState(newState)
    }
  }

  const addToCart = (item) => {
    const { cart } = state
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem.id === item.id)
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        cart[index].quantity = cart[index].quantity + item.quantity
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(item)
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(item)
    }

    const newState = {
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    }
    updateState(newState)
    toast("Successfully added item to cart!", {
      position: toast.POSITION.TOP_LEFT
    })
  }

  const removeFromCart = (item) => {
    let { cart } = state
    cart = cart.filter(c => c.id !== item.id)

    const newState = {
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    }
    updateState(newState)
  }

  const clearCart = () => {
    updateState(initialState)
  }

  return (
    <SiteContext.Provider value={{
      ...state,
      addToCart,
      clearCart,
      removeFromCart,
      setItemQuantity
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export {
  SiteContext,
  ContextProviderComponent
}