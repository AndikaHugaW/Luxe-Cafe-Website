'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bell, Lock, Globe, Moon, Shield, Smartphone } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  if (!user) {
    router.push('/')
    return null
  }

  const settings = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Receive updates about your orders',
      toggle: notifications,
      onChange: setNotifications
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Switch to dark theme',
      toggle: darkMode,
      onChange: setDarkMode
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add extra security to your account',
      toggle: twoFactor,
      onChange: setTwoFactor
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-dark-blue mb-2">Settings</h1>
          <p className="text-gray-500 mb-8">Manage your account preferences</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-dark-blue mb-6">Preferences</h2>
            <div className="space-y-4">
              {settings.map((setting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <setting.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-blue">{setting.title}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setting.onChange(!setting.toggle)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      setting.toggle ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        setting.toggle ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-dark-blue mb-6">Account Security</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-blue">Change Password</p>
                    <p className="text-sm text-gray-500">Update your password regularly</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-blue">Connected Devices</p>
                    <p className="text-sm text-gray-500">Manage your logged-in devices</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </motion.div>

          {/* Language & Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-dark-blue mb-6">Language & Region</h2>
            <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-dark-blue">Language</p>
                  <p className="text-sm text-gray-500">English (US)</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
