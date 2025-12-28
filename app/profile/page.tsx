'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Edit, Camera } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EditProfileModal from '@/components/EditProfileModal'
import { useState, useEffect } from 'react'
import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function ProfilePage() {
  const { user } = useRequireAuth()
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    image: user?.image || ''
  })

  // Sync with session if user data updates
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        image: user.image || ''
      })
    }
  }, [user])

  if (!user) {
    return null
  }

  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return email?.slice(0, 2).toUpperCase() || 'U'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-6"
        >
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="size-24 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.image || user.image || undefined} alt={profileData.name || user.name || user.email || ''} />
                <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                  {getInitials(profileData.name || user.name, user.email || '')}
                </AvatarFallback>
              </Avatar>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-dark-blue mb-1">
                    {profileData.name || user.name || 'User'}
                  </h1>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-gray-500">Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">8</p>
                  <p className="text-sm text-gray-500">Favorites</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">1,250</p>
                  <p className="text-sm text-gray-500">Points</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-xl font-bold text-dark-blue mb-6">Profile Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-dark-blue">{user.name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-dark-blue">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold text-dark-blue">December 2024</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentName={profileData.name || user.name || ''}
        currentImage={profileData.image || user.image}
        currentEmail={user.email || ''}
        onUpdate={(name, image) => {
          setProfileData({ name, image })
        }}
      />
    </div>
  )
}
