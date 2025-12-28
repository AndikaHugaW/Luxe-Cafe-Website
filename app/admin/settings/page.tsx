"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Paintbrush, 
  Database,
  Save,
  Coffee,
  Store,
  Clock
} from 'lucide-react'

const sections = [
  { id: 'general', name: 'General', icon: Store },
  { id: 'orders', name: 'Order Protocol', icon: Coffee },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'branding', name: 'Appearance', icon: Paintbrush },
]

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general')
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-dark-blue tracking-tight">System Settings</h1>
        <p className="text-gray-500 font-medium">Global configuration for Luxe Cafe ecosystem.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          {sections.map((section) => {
            const IsActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                  IsActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-400 hover:bg-white hover:text-primary transition-all'
                }`}
              >
                <section.icon className="size-5" />
                {section.name}
              </button>
            )
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <h2 className="text-xl font-black text-dark-blue flex items-center gap-3 lowercase">
                <span className="bg-primary/10 text-primary p-2 rounded-xl">
                  {sections.find(s => s.id === activeSection)?.icon && 
                   React.createElement(sections.find(s => s.id === activeSection)!.icon, { className: 'size-5' })}
                </span>
                {sections.find(s => s.id === activeSection)?.name} Configuration
              </h2>
              <button className="bg-dark-blue text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/5">
                <Save className="size-4" />
                Save Changes
              </button>
            </div>

            <div className="space-y-8">
              {activeSection === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Cafe Name</label>
                    <input type="text" defaultValue="LUXE CAFE" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-dark-blue font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Store Status</label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-dark-blue font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                      <option value="open">🏪 Open (Accepting Orders)</option>
                      <option value="busy">🔥 Busy (Delayed Delivery)</option>
                      <option value="closed">🚪 Closed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Business Email</label>
                    <input type="email" defaultValue="hello@luxecafe.id" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-dark-blue font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Phone Number</label>
                    <input type="text" defaultValue="+62 21 555 0123" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-dark-blue font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                </div>
              )}

              {activeSection === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-dark-blue">Automated Order Verification</h4>
                      <p className="text-xs text-gray-400">Instantly mark paid orders as completed.</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-primary p-1 cursor-pointer">
                      <div className="size-4 bg-white rounded-full ml-auto shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-dark-blue">Maintenance Mode</h4>
                      <p className="text-xs text-gray-400">Temporarily disable order placing feature.</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 p-1 cursor-pointer">
                      <div className="size-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'branding' && (
                <div className="space-y-8 text-center py-10">
                   <div className="size-24 bg-primary/10 rounded-[32px] mx-auto flex items-center justify-center text-primary group hover:scale-110 transition-transform cursor-pointer">
                      <Paintbrush className="size-10" />
                   </div>
                   <h3 className="text-lg font-black text-dark-blue">Visual Theme customization under development.</h3>
                   <p className="text-gray-400 max-w-xs mx-auto text-sm">Stay tuned for the unified design system controller.</p>
                </div>
              )}
              
              {/* Default fallback for other sections */}
              {(activeSection === 'security' || activeSection === 'notifications') && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                    <Shield className="size-10" />
                  </div>
                  <h3 className="text-lg font-black text-dark-blue">Advanced Protocols Locked</h3>
                  <p className="text-gray-400 max-w-xs mx-auto text-sm">These settings require Level 2 clearance to modify.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
