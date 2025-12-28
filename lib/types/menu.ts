// Menu Item Types
export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  image_url?: string | null
  created_at?: string
  updated_at?: string
}

// Menu Categories
export type MenuCategory = 
  | 'bestseller'
  | 'coffee'
  | 'noncoffee'
  | 'food'
  | 'dessert'
  | 'snack'
  | 'merchandise'

// API Response Types
export interface MenuApiResponse {
  data: MenuItem[]
}

export interface SingleMenuApiResponse {
  data: MenuItem
}

export interface MenuApiError {
  error: string
}

// Create Menu Item DTO
export interface CreateMenuItemDto {
  name: string
  description: string
  price: number
  category: MenuCategory
  image_url?: string
}

// Update Menu Item DTO
export interface UpdateMenuItemDto {
  name?: string
  description?: string
  price?: number
  category?: MenuCategory
  image_url?: string
}
