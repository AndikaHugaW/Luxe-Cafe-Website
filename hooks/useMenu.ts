'use client'

import { useState, useEffect } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  category: string
  image_url?: string | null
}

export function useMenu(category?: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true)
        setError(null)
        const url = category 
          ? `/api/menu?category=${category}`
          : '/api/menu'
        
        const response = await fetch(url)
        
        if (!response.ok) {
          // Don't throw, just set error and return empty array
          setError('API tidak tersedia, menggunakan data lokal')
          setMenuItems([])
          return
        }
        
        const result = await response.json()
        
        // Handle error response from API
        if (result.error) {
          setError('API error: ' + result.error)
          setMenuItems([])
          return
        }
        
        // Handle both array response and object with data property
        const items = Array.isArray(result) ? result : (result.data || [])
        
        if (items.length > 0) {
          setMenuItems(items)
          setError(null)
        } else {
          setError('Tidak ada data dari API, menggunakan data lokal')
          setMenuItems([])
        }
      } catch (err) {
        // Silently fail and use local data
        setError('API tidak tersedia, menggunakan data lokal')
        setMenuItems([])
        console.warn('Error fetching menu, using local data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [category])

  return { menuItems, loading, error }
}

