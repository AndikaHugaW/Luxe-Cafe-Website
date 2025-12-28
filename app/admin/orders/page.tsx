"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Filter,
  MoreHorizontal,
  ExternalLink,
  Package,
  Receipt
} from 'lucide-react'

export default function OrdersManagement() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [mounted, setMounted] = useState(false)

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchOrders()
  }, [])

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      })
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  )

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark-blue tracking-tight">Order Management</h1>
          <p className="text-gray-500 font-medium">Track and process customer orders in real-time.</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl border border-gray-100 flex gap-1 shadow-sm">
          {['all', 'pending', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                filterStatus === status 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid/Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order Ref</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Process</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-gray-400 text-sm font-bold">Retrieving orders...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                          <Receipt className="size-5" />
                        </div>
                        <div>
                          <p className="font-black text-dark-blue">#LX-{order.id.toString().padStart(4, '0')}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(order.created_at).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-dark-blue">{order.user_name}</p>
                        <p className="text-xs text-gray-400">{order.user_email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-primary">
                        {(order.total_amount || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        order.status === 'completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status === 'completed' ? <CheckCircle2 className="size-3" /> :
                         order.status === 'cancelled' ? <XCircle className="size-3" /> :
                         <Clock className="size-3" />}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateStatus(order.id, 'completed')}
                              className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all shadow-sm"
                              title="Mark as Completed"
                            >
                              <CheckCircle2 className="size-5" />
                            </button>
                            <button 
                              onClick={() => updateStatus(order.id, 'cancelled')}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all shadow-sm"
                              title="Cancel Order"
                            >
                              <XCircle className="size-5" />
                            </button>
                          </>
                        )}
                        <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-all">
                          <MoreHorizontal className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                        <ShoppingBag className="size-10" />
                      </div>
                      <p className="text-gray-400 font-bold">No orders found in this category.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
