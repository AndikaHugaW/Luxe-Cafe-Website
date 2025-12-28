-- ============================================
-- USERS & AUTHENTICATION TABLES
-- ============================================

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified TIMESTAMP,
  image TEXT,
  password VARCHAR(255), -- For credentials login
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create accounts table (for OAuth providers)
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_account_id)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create verification tokens table (for email verification)
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Create indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create indexes for accounts
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);

-- Create indexes for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);

-- Create trigger for users updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for accounts updated_at
CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MENU ITEMS TABLE
-- ============================================

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_menu_items_updated_at 
BEFORE UPDATE ON menu_items 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
  ('Cappuccino', 'Classic Italian coffee with steamed milk foam and a touch of cocoa', 35000, 'coffee', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'),
  ('Espresso', 'Strong and bold Italian coffee shot', 25000, 'coffee', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400'),
  ('Caffe Latte', 'Smooth espresso with steamed milk', 38000, 'coffee', 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400'),
  ('Americano', 'Espresso diluted with hot water', 30000, 'coffee', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
  ('Mocha', 'Chocolate coffee delight with whipped cream', 42000, 'coffee', 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=400'),
  
  ('Matcha Latte', 'Premium Japanese green tea with steamed milk', 40000, 'non-coffee', 'https://images.unsplash.com/photo-1536013564-f0271c4d1d2f?w=400'),
  ('Chocolate Milkshake', 'Rich and creamy chocolate shake', 38000, 'non-coffee', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
  ('Fresh Orange Juice', 'Freshly squeezed orange juice', 28000, 'non-coffee', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'),
  ('Iced Tea', 'Refreshing iced tea with lemon', 22000, 'non-coffee', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
  
  ('Spaghetti Carbonara', 'Creamy pasta with bacon and parmesan', 55000, 'food', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400'),
  ('Club Sandwich', 'Triple-decker sandwich with chicken, bacon, and vegetables', 48000, 'food', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400'),
  ('Caesar Salad', 'Fresh romaine lettuce with Caesar dressing and croutons', 42000, 'food', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'),
  ('Chicken Rice Bowl', 'Grilled chicken with rice and vegetables', 50000, 'food', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'),
  
  ('Tiramisu', 'Classic Italian coffee-flavored dessert', 38000, 'dessert', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'),
  ('Chocolate Lava Cake', 'Warm chocolate cake with molten center', 42000, 'dessert', 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400'),
  ('Cheesecake', 'New York style cheesecake with berry compote', 40000, 'dessert', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400'),
  ('Ice Cream Sundae', 'Three scoops with toppings and sauce', 35000, 'dessert', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'),
  
  ('Croissant', 'Buttery French pastry', 25000, 'snack', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
  ('Chocolate Chip Cookies', 'Freshly baked cookies (3 pcs)', 20000, 'snack', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'),
  ('Blueberry Muffin', 'Moist muffin with fresh blueberries', 28000, 'snack', 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400')
ON CONFLICT DO NOTHING;

-- ============================================
-- CART & WISHLIST TABLES
-- ============================================

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, menu_item_id)
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, menu_item_id)
);

-- Add updated_at trigger for cart_items
CREATE TRIGGER update_cart_items_updated_at 
BEFORE UPDATE ON cart_items 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Display success message
DO $$
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Database initialized successfully!';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '  - users (authentication)';
  RAISE NOTICE '  - accounts (OAuth providers)';
  RAISE NOTICE '  - sessions (user sessions)';
  RAISE NOTICE '  - verification_tokens (email verification)';
  RAISE NOTICE '  - menu_items (cafe menu)';
  RAISE NOTICE '  - cart_items (shopping cart)';
  RAISE NOTICE '  - wishlist_items (user wishlist)';
  RAISE NOTICE '';
  RAISE NOTICE 'Sample data inserted:';
  RAISE NOTICE '  - % menu items', (SELECT COUNT(*) FROM menu_items);
  RAISE NOTICE '  - % users', (SELECT COUNT(*) FROM users);
  RAISE NOTICE '============================================';
END $$;
