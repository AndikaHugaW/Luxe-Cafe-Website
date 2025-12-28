"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Coffee, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  MoreVertical,
  AlertCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [timeframe, setTimeframe] = useState('This Week')

  useEffect(() => {
    setMounted(true)
    fetch('/api/admin/stats')
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          const errMsg = data.error || (res.status === 401 ? 'Unauthorized' : 'Failed to fetch stats')
          throw new Error(errMsg)
        }
        return data
      })
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const cards = stats && !stats.error ? [
    { name: 'Total Revenue', value: (stats.summary.totalRevenue || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100', trend: stats.summary.growth.revenue, trendType: 'up' },
    { name: 'Avg. Order Value (AOV)', value: (stats.summary.aov || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }), icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10', trend: stats.summary.growth.aov, trendType: 'up' },
    { name: 'Total Orders', value: stats.summary.totalOrders || 0, icon: Coffee, color: 'text-blue-600', bg: 'bg-blue-100', trend: stats.summary.growth.orders, trendType: 'up' },
    { name: 'Operational Capacity', value: '84%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', trend: 'Optimal', trendType: 'neutral' },
  ] : []

  if (!mounted) return null

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-gray-400 font-bold animate-pulse">Initializing Business Hub...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-red-50 rounded-3xl border border-red-100">
      <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <Users className="size-8" />
      </div>
      <h2 className="text-2xl font-black text-red-900 mb-2">Access Denied</h2>
      <p className="text-red-600 font-medium max-w-md mb-6">{error === 'Unauthorized' ? 'Anda tidak memiliki hak akses untuk halaman ini. Pastikan Anda login sebagai administrator.' : error}</p>
      <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
        Back to Home
      </button>
    </div>
  )

  return (
    <div className="space-y-8 pb-10">
      {/* Business Header with Time Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-dark-blue tracking-tighter uppercase italic">Business Performance</h1>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            Control Room &bull; <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-black">LIVE</span>
          </p>
        </div>
        
        <div className="flex items-center p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          {['Today', 'This Week', 'This Month'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                timeframe === t 
                  ? 'bg-dark-blue text-white shadow-lg' 
                  : 'text-gray-400 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Insight Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.insights?.map((insight: any, i: number) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className={`p-4 rounded-2xl border flex items-start gap-4 ${
              insight.type === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'
            }`}
          >
            <div className={`p-2 rounded-xl ${
              insight.type === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
            }`}>
              <AlertCircle className="size-5" />
            </div>
            <div>
              <p className={`text-xs font-black uppercase tracking-wider ${
                insight.type === 'warning' ? 'text-orange-900' : 'text-green-900'
              }`}>{insight.title}</p>
              <p className={`text-[13px] font-medium leading-tight mt-1 ${
                insight.type === 'warning' ? 'text-orange-700/80' : 'text-green-700/80'
              }`}>{insight.message}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={card.name}
            className="group bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3.5 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon className="size-6" />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap ${
                card.trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
              }`}>
                {card.trendType === 'up' && <ArrowUpRight className="size-3" />}
                {card.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{card.name}</p>
              <h3 className="text-2xl font-black text-dark-blue tracking-tight">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Middle Section: Trends & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-dark-blue flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                SALES REVENUE TREND
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Daily revenue distribution</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary italic">Rp 5,8M+</p>
            </div>
          </div>
          
          <div className="h-[250px] flex items-end gap-3 md:gap-6 px-4">
            {stats.analytics?.salesTrend.map((data: any, idx: number) => {
              const height = (data.value / 1200000) * 100
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-dark-blue text-white px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Rp {data.value.toLocaleString('id-ID')}
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + (idx * 0.1), type: 'spring' }}
                    className={`w-full rounded-t-xl transition-all ${
                      idx >= 4 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-100 group-hover:bg-primary/20'
                    }`}
                  />
                  <span className="text-[10px] font-black text-gray-300 mt-4 uppercase group-hover:text-primary transition-colors">{data.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black text-dark-blue mb-8 uppercase tracking-tighter italic">Top Performance</h3>
          <div className="space-y-6">
            {stats.analytics?.topProducts.map((product: any, i: number) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-black text-dark-blue">{product.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.orders} Sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-dark-blue">
                    {(product.revenue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                  </p>
                  <p className="text-[10px] font-black text-green-500 uppercase">+12%</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-10 py-4 bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-100 hover:text-dark-blue transition-all">
            View Category Breakdown
          </button>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Customer Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <h3 className="font-black text-dark-blue uppercase tracking-widest text-sm flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              Live Feed
            </h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Full Audit Logs</button>
          </div>
          <div className="divide-y divide-gray-50">
            {stats?.recentActivity?.map((activity: any) => (
              <div key={activity.id} className="p-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                  activity.type === 'order' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'order' ? <ShoppingBag className="size-5" /> : <Users className="size-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-dark-blue line-clamp-1">{activity.user}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{activity.time}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {activity.type === 'order' 
                      ? `Purchased ${activity.item}` 
                      : `Joined the ecosystem`
                    }
                  </p>
                </div>
                {activity.amount && (
                  <div className="text-right ml-4">
                    <p className="text-sm font-black text-dark-blue">
                      Rp {activity.amount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Breakdown / Target Mix */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col">
           <div className="mb-10 text-center">
              <h3 className="text-xl font-black text-dark-blue uppercase tracking-tighter italic">Customer Loyalty Mix</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Engagement distribution</p>
           </div>
           
           <div className="space-y-8 flex-1">
              {stats.analytics?.categoryMix.map((cat: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-gray-500">{cat.name}</span>
                    </div>
                    <span className="text-dark-blue">{cat.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
           </div>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="bg-primary/5 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Store Status</p>
                <p className="text-lg font-black text-primary">Open & Active</p>
              </div>
              <div className="size-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
