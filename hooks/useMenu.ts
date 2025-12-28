'use client'

import { useState, useEffect } from 'react'
import { MenuItem, MenuCategory } from '@/lib/types/menu'
import { getMenuItems, getMenuItemsByCategory } from '@/lib/api/menu'

/**
 * Custom hook untuk fetch menu items
 * @param category - Optional category filter
 * @returns Menu items, loading state, error, and refetch function
 */
export function useMenu(category?: MenuCategory) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true)
        setError(null)
        const data = await getMenuItems(category)
        setMenuItems(data)
      } catch (err) {
        // Silently fail and use empty array
        setError(err instanceof Error ? err.message : 'API tidak tersedia')
        setMenuItems([])
        console.warn('Error fetching menu:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [category])

  const refetch = () => {
    setLoading(true)
  }

  return { menuItems, loading, error, refetch }
}

/**
 * Custom hook untuk fetch menu items grouped by category
 * @returns Menu items grouped by category, loading state, error, and refetch function
 */
export function useMenuByCategory() {
  const [groupedItems, setGroupedItems] = useState<Record<MenuCategory, MenuItem[]> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGroupedItems() {
      try {
        setLoading(true)
        setError(null)
        const data = await getMenuItemsByCategory()
        setGroupedItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu items')
        setGroupedItems(null)
        console.warn('Error fetching grouped menu:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupedItems()
  }, [])

  const refetch = () => {
    setLoading(true)
  }

  return { groupedItems, loading, error, refetch }
}
