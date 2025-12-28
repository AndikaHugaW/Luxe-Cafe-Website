'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Coffee, GlassWater, Cookie, Shirt, ShoppingCart, Heart } from 'lucide-react'
import { useMenu } from '@/hooks/useMenu'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import AuthModal from './AuthModal'
import { MenuItem, MenuCategory } from '@/lib/types/menu'

const categories = [
  { id: 'bestseller', name: 'Best Seller', icon: Star },
  { id: 'coffee', name: 'Coffee', icon: Coffee },
  { id: 'noncoffee', name: 'Non Coffee', icon: GlassWater },
  { id: 'snack', name: 'Snack', icon: Cookie },
  { id: 'merchandise', name: 'Merchandise', icon: Shirt },
]

const menuData = {
  bestseller: [
    { id: 1, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000', image_url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800' },
    { id: 2, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800' },
    { id: 3, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' },
    { id: 4, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
    { id: 5, name: 'Vanilla Latte', description: 'Smooth espresso with vanilla and steamed milk', price: 'Rp 36.000', image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800' },
    { id: 6, name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', price: 'Rp 58.000', image_url: 'https://images.unsplash.com/photo-1586788680434-30d324b3d46f?w=800' },
    { id: 7, name: 'Iced Caramel Latte', description: 'Cold caramel latte with ice and whipped cream', price: 'Rp 40.000', image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800' },
    { id: 8, name: 'Chocolate Chip Muffin', description: 'Fresh baked muffin with chocolate chips', price: 'Rp 30.000', image_url: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?w=800' },
    { id: 9, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800' },
    { id: 10, name: 'Strawberry Cheesecake', description: 'Creamy cheesecake with fresh strawberries', price: 'Rp 56.000', image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800' },
    { id: 11, name: 'Hazelnut Latte', description: 'Rich hazelnut flavor with espresso and milk', price: 'Rp 39.000', image_url: 'https://images.unsplash.com/photo-1595433707802-680453f66c05?w=800' },
    { id: 12, name: 'Almond Croissant', description: 'Buttery croissant filled with almond cream', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
    { id: 13, name: 'Iced Matcha', description: 'Refreshing cold matcha with ice', price: 'Rp 37.000', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800' },
    { id: 14, name: 'New York Cheesecake', description: 'Classic creamy New York style cheesecake', price: 'Rp 52.000', image_url: 'https://images.unsplash.com/photo-1524351199679-4360e224e757?w=800' },
    { id: 15, name: 'Mocha Frappe', description: 'Blended mocha with ice and whipped cream', price: 'Rp 43.000', image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800' },
    { id: 16, name: 'Blueberry Scone', description: 'Buttery scone with fresh blueberries', price: 'Rp 29.000', image_url: 'https://images.unsplash.com/photo-1516223403212-04e3b3346cfd?w=800' },
    { id: 17, name: 'White Chocolate Mocha', description: 'Espresso with white chocolate and milk', price: 'Rp 41.000', image_url: 'https://images.unsplash.com/photo-1544787210-2211d4073a3b?w=800' },
    { id: 18, name: 'Lemon Tart', description: 'Tangy lemon curd in buttery pastry shell', price: 'Rp 45.000', image_url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800' },
    { id: 19, name: 'Cold Brew', description: 'Smooth cold-brewed coffee, served over ice', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
    { id: 20, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 'Rp 48.000', image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },
  ],
  coffee: [
    { id: 1, name: 'Espresso', description: 'Rich and bold espresso with a perfect crema', price: 'Rp 25.000', image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800' },
    { id: 2, name: 'Americano', description: 'Espresso with hot water, bold and smooth', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800' },
    { id: 3, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800' },
    { id: 4, name: 'Latte', description: 'Espresso with steamed milk, smooth and creamy', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800' },
    { id: 5, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000', image_url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800' },
    { id: 6, name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 'Rp 40.000', image_url: 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=800' },
    { id: 7, name: 'Flat White', description: 'Double espresso with microfoam milk', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800' },
    { id: 8, name: 'Cold Brew', description: 'Smooth cold-brewed coffee, served over ice', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
    { id: 9, name: 'Vanilla Latte', description: 'Smooth espresso with vanilla and steamed milk', price: 'Rp 36.000', image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800' },
    { id: 10, name: 'Hazelnut Latte', description: 'Rich hazelnut flavor with espresso and milk', price: 'Rp 39.000', image_url: 'https://images.unsplash.com/photo-1595433707802-680453f66c05?w=800' },
    { id: 11, name: 'White Chocolate Mocha', description: 'Espresso with white chocolate and milk', price: 'Rp 41.000', image_url: 'https://images.unsplash.com/photo-1544787210-2211d4073a3b?w=800' },
    { id: 12, name: 'Cortado', description: 'Equal parts espresso and steamed milk', price: 'Rp 33.000', image_url: 'https://images.unsplash.com/photo-1534720485984-9694f6b21640?w=800' },
    { id: 13, name: 'Affogato', description: 'Espresso poured over vanilla ice cream', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1594243681330-07e0c4a457ee?w=800' },
    { id: 14, name: 'Long Black', description: 'Double espresso with hot water', price: 'Rp 30.000', image_url: 'https://images.unsplash.com/photo-1512568400610-64daadadbc67?w=800' },
    { id: 15, name: 'Piccolo Latte', description: 'Small latte with ristretto shot', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1570624320959-1e3dad5de0e7?w=800' },
    { id: 16, name: 'Caffe Breve', description: 'Espresso with half-and-half instead of milk', price: 'Rp 37.000', image_url: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=800' },
    { id: 17, name: 'Red Eye', description: 'Drip coffee with a shot of espresso', price: 'Rp 34.000', image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800' },
    { id: 18, name: 'Irish Coffee', description: 'Coffee with Irish whiskey and cream', price: 'Rp 45.000', image_url: 'https://images.unsplash.com/photo-1592318818558-86737517c591?w=800' },
    { id: 19, name: 'Vietnamese Coffee', description: 'Strong coffee with condensed milk', price: 'Rp 36.000', image_url: 'https://images.unsplash.com/photo-1525088553748-01d6e210e00b?w=800' },
    { id: 20, name: 'Turkish Coffee', description: 'Traditional finely ground coffee, unfiltered', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1512568400610-64daadadbc67?w=800' },
  ],
  noncoffee: [
    { id: 1, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800' },
    { id: 2, name: 'Chocolate Latte', description: 'Rich chocolate with steamed milk', price: 'Rp 36.000', image_url: 'https://images.unsplash.com/photo-1544787210-2211d4073a3b?w=800' },
    { id: 3, name: 'Green Tea', description: 'Premium Japanese green tea', price: 'Rp 22.000', image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800' },
    { id: 4, name: 'Earl Grey Tea', description: 'Classic bergamot-scented black tea', price: 'Rp 22.000', image_url: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?w=800' },
    { id: 5, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800' },
    { id: 6, name: 'Lemonade', description: 'Fresh lemonade with a hint of mint', price: 'Rp 26.000', image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800' },
    { id: 7, name: 'Smoothie Berry', description: 'Mixed berries with yogurt and honey', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1553530666-ba01af7744b7?w=800' },
    { id: 8, name: 'Hot Chocolate', description: 'Rich and creamy hot chocolate', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800' },
    { id: 9, name: 'Iced Matcha', description: 'Refreshing cold matcha with ice', price: 'Rp 37.000', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800' },
    { id: 10, name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800' },
    { id: 11, name: 'Jasmine Tea', description: 'Fragrant jasmine green tea', price: 'Rp 24.000', image_url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800' },
    { id: 12, name: 'Peach Iced Tea', description: 'Refreshing peach flavored iced tea', price: 'Rp 27.000', image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800' },
    { id: 13, name: 'Mango Smoothie', description: 'Fresh mango blended with yogurt', price: 'Rp 39.000', image_url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800' },
    { id: 14, name: 'Strawberry Smoothie', description: 'Fresh strawberries with banana and yogurt', price: 'Rp 37.000', image_url: 'https://images.unsplash.com/photo-1464918644474-057049580436?w=800' },
    { id: 15, name: 'Avocado Smoothie', description: 'Creamy avocado with condensed milk', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800' },
    { id: 16, name: 'Watermelon Juice', description: 'Fresh watermelon juice, chilled', price: 'Rp 25.000', image_url: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800' },
    { id: 17, name: 'Ginger Tea', description: 'Warming ginger tea with honey', price: 'Rp 23.000', image_url: 'https://images.unsplash.com/photo-1616118132284-93361e27a6e1?w=800' },
    { id: 18, name: 'Chamomile Tea', description: 'Calming herbal chamomile tea', price: 'Rp 24.000', image_url: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?w=800' },
    { id: 19, name: 'Coconut Water', description: 'Fresh young coconut water', price: 'Rp 30.000', image_url: 'https://images.unsplash.com/photo-1543881335-961f3640b79e?w=800' },
    { id: 20, name: 'Mint Lemonade', description: 'Refreshing mint and lemon blend', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800' },
  ],
  snack: [
    { id: 1, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
    { id: 2, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' },
    { id: 3, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 'Rp 48.000', image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },
    { id: 4, name: 'Cheesecake', description: 'Creamy New York style cheesecake', price: 'Rp 52.000', image_url: 'https://images.unsplash.com/photo-1524351199679-4360e224e757?w=800' },
    { id: 5, name: 'Blueberry Muffin', description: 'Fresh baked muffin with blueberries', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800' },
    { id: 6, name: 'Chocolate Chip Cookie', description: 'Warm, gooey chocolate chip cookies', price: 'Rp 25.000', image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800' },
    { id: 7, name: 'Banana Bread', description: 'Moist banana bread with walnuts', price: 'Rp 35.000', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800' },
    { id: 8, name: 'Cinnamon Roll', description: 'Sweet cinnamon roll with cream cheese frosting', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800' },
    { id: 9, name: 'Almond Croissant', description: 'Buttery croissant filled with almond cream', price: 'Rp 32.000', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800' },
    { id: 10, name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', price: 'Rp 58.000', image_url: 'https://images.unsplash.com/photo-1586788680434-30d324b3d46f?w=800' },
    { id: 11, name: 'Strawberry Cheesecake', description: 'Creamy cheesecake with fresh strawberries', price: 'Rp 56.000', image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800' },
    { id: 12, name: 'Blueberry Scone', description: 'Buttery scone with fresh blueberries', price: 'Rp 29.000', image_url: 'https://images.unsplash.com/photo-1516223403212-04e3b3346cfd?w=800' },
    { id: 13, name: 'Lemon Tart', description: 'Tangy lemon curd in buttery pastry shell', price: 'Rp 45.000', image_url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800' },
    { id: 14, name: 'Chocolate Brownie', description: 'Rich fudgy chocolate brownie', price: 'Rp 33.000', image_url: 'https://images.unsplash.com/photo-1470124182917-cc6e41f22314?w=800' },
    { id: 15, name: 'Apple Pie', description: 'Classic apple pie with cinnamon', price: 'Rp 42.000', image_url: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800' },
    { id: 16, name: 'Carrot Cake', description: 'Moist carrot cake with cream cheese frosting', price: 'Rp 48.000', image_url: 'https://images.unsplash.com/photo-1470124182917-cc6e41f22314?w=800' },
    { id: 17, name: 'Pecan Pie', description: 'Sweet pecan pie with caramel', price: 'Rp 46.000', image_url: 'https://images.unsplash.com/photo-1628198751515-d4ed27e289a5?w=800' },
    { id: 18, name: 'Chocolate Eclair', description: 'Cream-filled pastry with chocolate glaze', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1621236304847-0211f18d7bc2?w=800' },
    { id: 19, name: 'Raspberry Danish', description: 'Flaky pastry with raspberry filling', price: 'Rp 36.000', image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800' },
    { id: 20, name: 'Pistachio Macaron', description: 'Delicate French macaron with pistachio', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1470124182917-cc6e41f22314?w=800' },
  ],
  merchandise: [
    { id: 1, name: 'Luxe Cafe T-Shirt', description: 'Premium cotton t-shirt with logo', price: 'Rp 150.000', image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800' },
    { id: 2, name: 'Luxe Cafe Tumbler', description: 'Insulated stainless steel tumbler 500ml', price: 'Rp 180.000', image_url: 'https://images.unsplash.com/photo-1517502884487-4322f3d6fe8d?w=800' },
    { id: 3, name: 'Luxe Cafe Mug', description: 'Ceramic mug with logo design', price: 'Rp 95.000', image_url: 'https://images.unsplash.com/photo-1517256011273-df5f654f59fc?w=800' },
    { id: 4, name: 'Luxe Cafe Tote Bag', description: 'Canvas tote bag with logo', price: 'Rp 120.000', image_url: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?w=800' },
    { id: 5, name: 'Coffee Beans Pack', description: 'Premium coffee beans 250gr', price: 'Rp 125.000', image_url: 'https://images.unsplash.com/photo-1559056191-744230756771?w=800' },
    { id: 6, name: 'Luxe Cafe Hoodie', description: 'Comfortable hoodie with logo', price: 'Rp 280.000', image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
    { id: 7, name: 'Luxe Cafe Cap', description: 'Adjustable cap with embroidered logo', price: 'Rp 110.000', image_url: 'https://images.unsplash.com/photo-1588850567047-14794928595d?w=800' },
    { id: 8, name: 'Coffee Grinder', description: 'Manual coffee grinder for home use', price: 'Rp 350.000', image_url: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=800' },
    { id: 9, name: 'French Press', description: 'Glass French press 500ml', price: 'Rp 220.000', image_url: 'https://images.unsplash.com/photo-1544194233-f720937a7f6c?w=800' },
    { id: 10, name: 'Pour Over Set', description: 'Complete pour over coffee brewing set', price: 'Rp 195.000', image_url: 'https://images.unsplash.com/photo-1544194233-f720937a7f6c?w=800' },
    { id: 11, name: 'Coffee Scale', description: 'Digital coffee scale with timer', price: 'Rp 275.000', image_url: 'https://images.unsplash.com/photo-1517093157656-b9421f24d9f7?w=800' },
    { id: 12, name: 'Luxe Cafe Apron', description: 'Professional barista apron with logo', price: 'Rp 165.000', image_url: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?w=800' },
    { id: 13, name: 'Coffee Syrup Set', description: 'Set of 3 flavored coffee syrups', price: 'Rp 140.000', image_url: 'https://images.unsplash.com/photo-1517502884487-4322f3d6fe8d?w=800' },
    { id: 14, name: 'Luxe Cafe Notebook', description: 'Premium notebook with cafe logo', price: 'Rp 85.000', image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800' },
    { id: 15, name: 'Coffee Gift Set', description: 'Gift set with beans, mug, and syrup', price: 'Rp 320.000', image_url: 'https://images.unsplash.com/photo-1559056191-744230756771?w=800' },
    { id: 16, name: 'Luxe Cafe Stickers', description: 'Set of 10 premium vinyl stickers', price: 'Rp 45.000', image_url: 'https://images.unsplash.com/photo-1589384273347-1c626c04fdfb?w=800' },
    { id: 17, name: 'Coffee Thermometer', description: 'Digital coffee temperature gauge', price: 'Rp 155.000', image_url: 'https://images.unsplash.com/photo-1517093157656-b9421f24d9f7?w=800' },
    { id: 18, name: 'Luxe Cafe Keychain', description: 'Metal keychain with logo design', price: 'Rp 65.000', image_url: 'https://images.unsplash.com/photo-1589384273347-1c626c04fdfb?w=800' },
    { id: 19, name: 'Coffee Filters Pack', description: 'Premium paper filters 100pcs', price: 'Rp 75.000', image_url: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=800' },
    { id: 20, name: 'Luxe Cafe Gift Card', description: 'Gift card with custom design', price: 'Rp 100.000', image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800' },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('bestseller')
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  
  // Try to use API, fallback to local data
  const { menuItems: apiItems, loading, error } = useMenu(activeCategory)
  
  // Use API data if available and no error, otherwise use local data
  const currentItems = (!error && apiItems.length > 0)
    ? apiItems 
    : (menuData[activeCategory as keyof typeof menuData] || [])

  return (
    <section id="menu" className="pt-24 pb-20 px-6 lg:px-8 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-dark-blue mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-dark-blue/70">
            Discover our handcrafted beverages and artisanal treats
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as MenuCategory)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-cream'
                    : 'bg-white text-dark-blue border border-primary/20 hover:border-primary/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            )
          })}
        </div>

        {/* Loading State - Only show if trying to load from API */}
        {loading && !error && (
          <div className="text-center py-12">
            <p className="text-dark-blue/70">Loading menu...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-primary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Product Image */}
              <div className="relative w-full h-64 overflow-hidden bg-cream/50">
                {item.image_url ? (
                  <motion.img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-primary/20 bg-primary/5">
                    <Coffee className="w-12 h-12 mb-2" />
                    <span className="text-xs font-medium uppercase tracking-widest">No Image</span>
                  </div>
                )}
                
                {/* Category Badge - Floating */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-dark-blue text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {activeCategory}
                  </span>
                </div>

                {/* Best Seller / Must Try Badge */}
                {activeCategory === 'bestseller' && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-primary/95 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-current text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Must Try</span>
                    </div>
                  </div>
                )}
                {/* Action Buttons - Floating on hover */}
                <div className="absolute inset-x-4 bottom-4 flex justify-between items-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist({
                        id: item.id,
                        name: item.name,
                        price: item.price as number,
                        image: item.image_url || ''
                      })
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full shadow-lg backdrop-blur-md transition-colors ${
                      isInWishlist(item.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-dark-blue hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-dark-blue leading-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-dark-blue/60 leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>

                {/* Price & Action */}
                <div className="mt-auto flex items-center justify-between gap-4">
                  <span className="text-xl font-bold text-primary">
                    {typeof item.price === 'number' 
                      ? `Rp ${item.price.toLocaleString('id-ID')}` 
                      : item.price}
                  </span>
                  
                  <motion.button
                    onClick={() => {
                      if (!user) {
                        setAuthModalOpen(true)
                      } else {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: typeof item.price === 'number' ? item.price : parseInt(item.price.toString().replace(/\D/g, '')),
                          image: item.image_url || ''
                        })
                      }
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-xs font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-primary/30"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          initialView="login" 
        />

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-blue/70">No items available in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
