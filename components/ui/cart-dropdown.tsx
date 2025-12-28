"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, X, Plus, Minus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

import { useCart } from '@/context/CartContext';

interface CartDropdownProps {
  isLight?: boolean;
}

export const CartDropdown = ({ isLight = false }: CartDropdownProps) => {
  const { cartItems: items, removeFromCart, updateQuantity, subtotal } = useCart();

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
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="w-6 h-6" />
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
              Shopping Cart
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-dark-blue text-sm truncate">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <p className="text-primary font-bold text-sm mb-2">Rp {item.price.toLocaleString('id-ID')}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-dark-blue">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button className="text-primary text-sm font-bold mt-2 hover:underline">Start Shopping</button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="text-dark-blue font-bold text-lg">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 text-sm font-bold text-dark-blue border border-gray-200 rounded-xl hover:bg-white transition-all shadow-sm">
                View Cart
              </button>
              <button className="px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Checkout
              </button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
