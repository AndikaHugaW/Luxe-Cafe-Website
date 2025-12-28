"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users as UsersIcon, 
  Search, 
  Shield, 
  UserCircle, 
  Mail, 
  Calendar,
  MoreVertical,
  ChevronRight,
  UserCheck,
  UserX
} from 'lucide-react'

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (!res.ok) throw new Error('Failed to fetch users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchUsers()
  }, [])

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: newRole })
      })
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filteredUsers = users.filter(user => 
    (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-dark-blue tracking-tight">User Management</h1>
        <p className="text-gray-500 font-medium">Manage user permissions and account roles.</p>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Users</p>
            <p className="text-2xl font-black text-dark-blue">{users.length}</p>
          </div>
          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <UsersIcon className="size-6" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User Profile</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Security Role</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-gray-400 text-sm font-bold">Synchronizing user data...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                          {user.image ? (
                            <img src={user.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <UserCircle className="size-6 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-dark-blue">{user.name || 'Anonymous User'}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Mail className="size-3" /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        user.role === 'admin' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Shield className="size-3" />
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-bold">
                        <Calendar className="size-4 opacity-40" />
                        {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right p-0">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleRoleUpdate(user.id, user.role === 'admin' ? 'user' : 'admin')}
                          className={`p-2 rounded-xl transition-all ${
                            user.role === 'admin' 
                              ? 'text-red-500 hover:bg-red-50' 
                              : 'text-green-500 hover:bg-green-50'
                          }`}
                          title={user.role === 'admin' ? 'Remove Admin Access' : 'Promote to Admin'}
                        >
                          {user.role === 'admin' ? <UserX className="size-5" /> : <UserCheck className="size-5" />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-dark-blue hover:bg-gray-100 rounded-xl transition-all">
                          <MoreVertical className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <p className="text-gray-400 font-bold">No users matches your search criteria.</p>
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
