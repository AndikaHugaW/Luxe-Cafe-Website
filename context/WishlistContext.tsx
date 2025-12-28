"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  toggleWishlist: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load from API on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist')
        if (response.ok) {
          const result = await response.json()
          setWishlistItems(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      }
    }
    fetchWishlist()
  }, [])

  const addToWishlist = async (item: WishlistItem) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_item_id: item.id })
      })
      if (response.ok) {
        const refreshResponse = await fetch('/api/wishlist')
        const result = await refreshResponse.json()
        setWishlistItems(result.data)
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
    }
  }

  const removeFromWishlist = async (id: number) => {
    try {
      const response = await fetch(`/api/wishlist?menu_item_id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setWishlistItems(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    }
  }

  const isInWishlist = (id: number) => wishlistItems.some(item => item.id === id)

  const toggleWishlist = async (item: WishlistItem) => {
    // Optimistic UI update could be added here
    await addToWishlist(item) // Our POST handler already handles toggle
  }

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider')
  return context
}
