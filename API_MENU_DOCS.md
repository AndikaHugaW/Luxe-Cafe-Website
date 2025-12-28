# Menu API Documentation

API untuk mengelola menu produk Luxe Cafe menggunakan PostgreSQL database.

## Base URL
```
/api/menu
```

## Endpoints

### 1. Get All Menu Items
Mengambil semua menu items atau filter berdasarkan kategori.

**Endpoint:** `GET /api/menu`

**Query Parameters:**
- `category` (optional): Filter berdasarkan kategori
  - Nilai yang valid: `coffee`, `non-coffee`, `food`, `dessert`, `snack`

**Example Request:**
```bash
# Get all menu items
GET /api/menu

# Get coffee items only
GET /api/menu?category=coffee
```

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Cappuccino",
      "description": "Classic Italian coffee with steamed milk foam",
      "price": 35000,
      "category": "coffee",
      "image_url": "https://example.com/cappuccino.jpg",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "error": "Internal server error"
}
```

---

### 2. Get Menu Item by ID
Mengambil detail menu item berdasarkan ID.

**Endpoint:** `GET /api/menu/:id`

**URL Parameters:**
- `id` (required): ID dari menu item

**Example Request:**
```bash
GET /api/menu/1
```

**Success Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Cappuccino",
    "description": "Classic Italian coffee with steamed milk foam",
    "price": 35000,
    "category": "coffee",
    "image_url": "https://example.com/cappuccino.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Menu item not found"
}
```

---

### 3. Create Menu Item
Menambahkan menu item baru.

**Endpoint:** `POST /api/menu`

**Request Body:**
```json
{
  "name": "Espresso",
  "description": "Strong and bold Italian coffee",
  "price": 25000,
  "category": "coffee",
  "image_url": "https://example.com/espresso.jpg" // optional
}
```

**Required Fields:**
- `name` (string): Nama menu item
- `description` (string): Deskripsi menu item
- `price` (number): Harga dalam Rupiah
- `category` (string): Kategori menu

**Optional Fields:**
- `image_url` (string): URL gambar produk

**Success Response (201):**
```json
{
  "data": {
    "id": 2,
    "name": "Espresso",
    "description": "Strong and bold Italian coffee",
    "price": 25000,
    "category": "coffee",
    "image_url": "https://example.com/espresso.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields"
}
```

---

### 4. Update Menu Item
Mengupdate menu item yang sudah ada.

**Endpoint:** `PUT /api/menu/:id`

**URL Parameters:**
- `id` (required): ID dari menu item yang akan diupdate

**Request Body:**
```json
{
  "name": "Espresso Double Shot",
  "description": "Extra strong Italian coffee",
  "price": 30000,
  "category": "coffee",
  "image_url": "https://example.com/espresso-double.jpg"
}
```

**Note:** Semua field bersifat optional, hanya kirim field yang ingin diupdate.

**Success Response (200):**
```json
{
  "data": {
    "id": 2,
    "name": "Espresso Double Shot",
    "description": "Extra strong Italian coffee",
    "price": 30000,
    "category": "coffee",
    "image_url": "https://example.com/espresso-double.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

---

### 5. Delete Menu Item
Menghapus menu item.

**Endpoint:** `DELETE /api/menu/:id`

**URL Parameters:**
- `id` (required): ID dari menu item yang akan dihapus

**Example Request:**
```bash
DELETE /api/menu/2
```

**Success Response (200):**
```json
{
  "message": "Menu item deleted successfully"
}
```

---

## Menu Categories

Kategori yang tersedia untuk menu items:

| Category | Description |
|----------|-------------|
| `coffee` | Minuman kopi (Espresso, Cappuccino, Latte, dll) |
| `non-coffee` | Minuman non-kopi (Tea, Juice, Smoothie, dll) |
| `food` | Makanan berat (Pasta, Rice Bowl, Sandwich, dll) |
| `dessert` | Makanan penutup (Cake, Ice Cream, Pudding, dll) |
| `snack` | Makanan ringan (Cookies, Chips, Pastry, dll) |

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Missing required fields |
| 404 | Not Found - Menu item tidak ditemukan |
| 500 | Internal Server Error |

---

## Usage Examples (TypeScript)

### Menggunakan Helper Functions

```typescript
import { 
  getMenuItems, 
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByCategory
} from '@/lib/api/menu'

// Get all menu items
const allItems = await getMenuItems()

// Get coffee items only
const coffeeItems = await getMenuItems('coffee')

// Get single item
const item = await getMenuItemById(1)

// Create new item
const newItem = await createMenuItem({
  name: 'Latte',
  description: 'Smooth espresso with steamed milk',
  price: 38000,
  category: 'coffee',
  image_url: 'https://example.com/latte.jpg'
})

// Update item
const updatedItem = await updateMenuItem(1, {
  price: 40000
})

// Delete item
await deleteMenuItem(1)

// Get items grouped by category
const groupedItems = await getMenuItemsByCategory()
console.log(groupedItems.coffee) // All coffee items
console.log(groupedItems.food)   // All food items
```

### Menggunakan Fetch API Langsung

```typescript
// GET all items
const response = await fetch('/api/menu')
const { data } = await response.json()

// GET with category filter
const response = await fetch('/api/menu?category=coffee')
const { data } = await response.json()

// POST new item
const response = await fetch('/api/menu', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Mocha',
    description: 'Chocolate coffee delight',
    price: 42000,
    category: 'coffee'
  })
})
const { data } = await response.json()

// PUT update item
const response = await fetch('/api/menu/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    price: 45000
  })
})
const { data } = await response.json()

// DELETE item
const response = await fetch('/api/menu/1', {
  method: 'DELETE'
})
const { message } = await response.json()
```

---

## Database Schema

Tabel `menu_items` di PostgreSQL:

```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa query
CREATE INDEX idx_menu_category ON menu_items(category);

-- Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_menu_items_updated_at 
BEFORE UPDATE ON menu_items 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

---

## Environment Variables

Pastikan environment variables berikut sudah di-set di `.env.local`:

```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5432/luxe_cafe
```

Untuk setup database dengan Docker, lihat `DOCKER_SETUP.md`.

---

## Notes

- Semua harga dalam format **Rupiah** (integer, tanpa desimal)
- `image_url` bersifat optional, bisa `null`
- `created_at` dan `updated_at` otomatis di-manage oleh database
- API menggunakan PostgreSQL sebagai database backend (via Docker)
- Semua endpoint sudah dilengkapi dengan error handling
- Database initialization script tersedia di `database/init.sql`
