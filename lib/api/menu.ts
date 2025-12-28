import { 
  MenuItem, 
  MenuCategory, 
  CreateMenuItemDto, 
  UpdateMenuItemDto,
  MenuApiResponse,
  SingleMenuApiResponse,
  MenuApiError
} from '@/lib/types/menu'

const API_BASE_URL = '/api/menu'

/**
 * Fetch all menu items or filter by category
 * @param category - Optional category filter
 * @returns Promise with menu items array
 */
export async function getMenuItems(category?: MenuCategory): Promise<MenuItem[]> {
  try {
    const url = category 
      ? `${API_BASE_URL}?category=${category}` 
      : API_BASE_URL

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      const error: MenuApiError = await response.json()
      throw new Error(error.error || 'Failed to fetch menu items')
    }

    const result: MenuApiResponse = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching menu items:', error)
    throw error
  }
}

/**
 * Fetch a single menu item by ID
 * @param id - Menu item ID
 * @returns Promise with menu item
 */
export async function getMenuItemById(id: number): Promise<MenuItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const error: MenuApiError = await response.json()
      throw new Error(error.error || 'Failed to fetch menu item')
    }

    const result: SingleMenuApiResponse = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching menu item:', error)
    throw error
  }
}

/**
 * Create a new menu item
 * @param menuItem - Menu item data
 * @returns Promise with created menu item
 */
export async function createMenuItem(menuItem: CreateMenuItemDto): Promise<MenuItem> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItem),
    })

    if (!response.ok) {
      const error: MenuApiError = await response.json()
      throw new Error(error.error || 'Failed to create menu item')
    }

    const result: SingleMenuApiResponse = await response.json()
    return result.data
  } catch (error) {
    console.error('Error creating menu item:', error)
    throw error
  }
}

/**
 * Update an existing menu item
 * @param id - Menu item ID
 * @param updates - Fields to update
 * @returns Promise with updated menu item
 */
export async function updateMenuItem(
  id: number, 
  updates: UpdateMenuItemDto
): Promise<MenuItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const error: MenuApiError = await response.json()
      throw new Error(error.error || 'Failed to update menu item')
    }

    const result: SingleMenuApiResponse = await response.json()
    return result.data
  } catch (error) {
    console.error('Error updating menu item:', error)
    throw error
  }
}

/**
 * Delete a menu item
 * @param id - Menu item ID
 * @returns Promise with success message
 */
export async function deleteMenuItem(id: number): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: MenuApiError = await response.json()
      throw new Error(error.error || 'Failed to delete menu item')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting menu item:', error)
    throw error
  }
}

/**
 * Get menu items grouped by category
 * @returns Promise with menu items grouped by category
 */
export async function getMenuItemsByCategory(): Promise<Record<MenuCategory, MenuItem[]>> {
  try {
    const allItems = await getMenuItems()
    
    const grouped: Record<string, MenuItem[]> = {
      coffee: [],
      'non-coffee': [],
      food: [],
      dessert: [],
      snack: [],
    }

    allItems.forEach(item => {
      if (grouped[item.category]) {
        grouped[item.category].push(item)
      }
    })

    return grouped as Record<MenuCategory, MenuItem[]>
  } catch (error) {
    console.error('Error grouping menu items:', error)
    throw error
  }
}
