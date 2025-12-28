"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface WishlistDropdownProps {
  isLight?: boolean;
}

export const WishlistDropdown = ({ isLight = false }: WishlistDropdownProps) => {
  const { wishlistItems: items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            isLight 
              ? 'hover:bg-white/10 text-white drop-shadow-md' 
              : 'hover:bg-gray-100 text-dark-blue'
          }`}
          aria-label="Wishlist"
        >
          <Heart className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[360px] rounded-2xl bg-white p-0 shadow-2xl border border-gray-100 overflow-hidden" align="end">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-dark-blue text-lg flex items-center gap-2">
              My Wishlist
              <span className="text-xs font-normal text-gray-400">({items.length} items)</span>
            </h3>
          </div>
        </div>

        {/* Items List */}
        <div className="max-h-[350px] overflow-y-auto p-2">
          <AnimatePresence initial={false}>
            {items.length > 0 ? (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-dark-blue text-sm truncate group-hover:text-primary transition-colors">{item.name}</h4>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-dark-blue font-bold text-sm mb-2">Rp {item.price.toLocaleString('id-ID')}</p>
                    
                    <button 
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image
                        });
                        removeFromWishlist(item.id);
                      }}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary-dark cursor-pointer transition-all"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">Your wishlist is empty</p>
                <button className="text-primary text-sm font-bold mt-2 hover:underline">Explore Products</button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-3 border-t border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
              Manage Wishlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WishlistDropdown;
