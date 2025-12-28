"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, delta: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load from API on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const result = await response.json()
          setCartItems(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      }
    }
    fetchCart()
  }, [])

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_item_id: item.id, quantity: 1 })
      })
      
      if (response.ok) {
        // Refresh cart data
        const refreshResponse = await fetch('/api/cart')
        const result = await refreshResponse.json()
        setCartItems(result.data)
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      // Fallback to local state if offline/error
      setCartItems(prev => {
        const existing = prev.find(i => i.id === item.id)
        if (existing) {
          return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    }
  }

  const removeFromCart = async (id: number) => {
    try {
      const response = await fetch(`/api/cart?menu_item_id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setCartItems(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    }
  }

  const updateQuantity = async (id: number, delta: number) => {
    const item = cartItems.find(i => i.id === id)
    if (!item) return

    const newQty = Math.max(1, item.quantity + delta)

    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_item_id: id, quantity: newQty })
      })
      
      if (response.ok) {
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i))
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const clearCart = async () => {
    try {
      await fetch('/api/cart', { method: 'DELETE' })
      setCartItems([])
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
