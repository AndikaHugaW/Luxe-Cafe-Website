"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react'

export default function MenuManagement() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [mounted, setMounted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (selectedFile) {
      formData.set('image', selectedFile)
    }
    
    if (editingItem) {
      formData.append('id', editingItem.id)
      formData.append('image_url', editingItem.image_url || '')
    }

    try {
      const res = await fetch('/api/admin/menu', {
        method: editingItem ? 'PUT' : 'POST',
        body: formData
      })

      if (res.ok) {
        setIsModalOpen(false)
        fetchItems()
        setSelectedFile(null)
        setPreviewUrl('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/menu')
      if (!res.ok) throw new Error('Failed to fetch menu')
      const data = await res.json()
      if (Array.isArray(data)) {
        setItems(data)
      } else {
        setItems([])
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setItems([])
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchItems()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' })
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filteredItems = Array.isArray(items) ? items.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  }) : []

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark-blue tracking-tight">Menu Management</h1>
          <p className="text-gray-500 font-medium">Manage your cafe menu items, prices, and categories.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null)
            setIsModalOpen(true)
          }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="size-5" />
          Add New Item
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'coffee', 'non-coffee', 'food', 'snack', 'dessert'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-gray-400">Loading menu data...</td>
                </tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.tr 
                    layout
                    key={item.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <ImageIcon className="size-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-dark-blue">{item.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-wider">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-primary">
                        {(item.price || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setEditingItem(item)
                            setIsModalOpen(true)
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium whitespace-nowrap">
                    No menu items found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Form Modal (Placeholder for actual implementation) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
            >
              <h2 className="text-2xl font-black text-dark-blue mb-2 lowercase italic">
                {editingItem ? 'Edit Menu Item' : 'Add New Item'}
              </h2>
              <p className="text-gray-400 text-sm font-medium mb-6">Enter the details for your menu item below.</p>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[32px] p-6 bg-gray-50/50 group hover:border-primary/30 transition-all relative overflow-hidden">
                    {(previewUrl || editingItem?.image_url) ? (
                      <div className="relative size-32">
                        <img 
                          src={previewUrl || editingItem?.image_url} 
                          className="w-full h-full object-cover rounded-2xl shadow-xl" 
                          alt="Preview" 
                        />
                        <button 
                          type="button"
                          onClick={() => { setSelectedFile(null); setPreviewUrl(''); }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 cursor-pointer w-full h-full py-4">
                        <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-sm group-hover:text-primary transition-colors">
                          <Plus className="size-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Media</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Name</label>
                    <input name="name" defaultValue={editingItem?.name} type="text" required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-dark-blue outline-none focus:ring-4 focus:ring-primary/5 transition-all" placeholder="e.g. Caramel Macchiato" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Description</label>
                    <textarea name="description" defaultValue={editingItem?.description} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-600 outline-none focus:ring-4 focus:ring-primary/5 h-28 resize-none transition-all" placeholder="Enter item description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Price (Rp)</label>
                      <input name="price" defaultValue={editingItem?.price} type="number" required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-black text-primary outline-none focus:ring-4 focus:ring-primary/5 transition-all" placeholder="35000" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Category</label>
                      <select name="category" defaultValue={editingItem?.category || 'coffee'} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-dark-blue outline-none focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer">
                        <option value="coffee">Coffee</option>
                        <option value="non-coffee">Non-Coffee</option>
                        <option value="food">Food</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">Cancel</button>
                  <button type="submit" className="flex-[2] py-4 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark active:scale-[0.98] transition-all">
                    {editingItem ? 'Update Portfolio' : 'Confirm New Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
