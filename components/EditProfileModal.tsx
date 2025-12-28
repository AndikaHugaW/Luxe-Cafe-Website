'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Camera, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  currentName: string
  currentImage?: string | null
  currentEmail: string
  onUpdate: (name: string, image: string) => void
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentName,
  currentImage,
  currentEmail,
  onUpdate
}: EditProfileModalProps) {
  const { update } = useSession()
  const [name, setName] = useState(currentName)
  const [imageUrl, setImageUrl] = useState(currentImage || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(currentImage || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file')

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB')
      return
    }

    setImageFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (url: string) => {
    setImageUrl(url)
    setImagePreview(url)
    setImageFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    setLoading(true)

    try {
      let finalImage = imageUrl

      // If file is selected, convert to base64
      if (imageFile) {
        const reader = new FileReader()
        finalImage = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(imageFile)
        })
      }

      const formData = new FormData()
      formData.append('name', name.trim())
      if (finalImage) {
        formData.append('image', finalImage)
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess(true)
      onUpdate(data.user.name, data.user.image)
      
      // Update NextAuth session - trigger refresh without passing the giant image string
      await update({
        name: data.user.name,
        // We don't pass the image here to avoid 4KB cookie limit
      })
      
      setTimeout(() => {
        onClose()
      }, 1500)

    } catch (err: any) {
      console.error('Profile update error:', err)
      setError(err.message === 'Failed to fetch' 
        ? 'Network error or file too large. Please try a smaller image or use a URL.' 
        : err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-dark-blue">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="size-24 border-4 border-white shadow-lg">
                  <AvatarImage src={imagePreview || undefined} alt={name} />
                  <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                    {getInitials(name, currentEmail)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Upload new photo</p>
            </div>

            {/* Upload Method Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setUploadMethod('file')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  uploadMethod === 'file'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📁 Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  uploadMethod === 'url'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔗 Image URL
              </button>
            </div>

            {/* File Upload */}
            {uploadMethod === 'file' && (
              <div className="space-y-2">
                <Label htmlFor="imageFile">Choose Image File</Label>
                <div className="relative">
                  <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageFile"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {imageFile ? imageFile.name : 'Click to upload image'}
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Supported: JPG, PNG, GIF (Max 2MB)
                </p>
              </div>
            )}

            {/* URL Input */}
            {uploadMethod === 'url' && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profile Image URL</Label>
                <div className="relative">
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="pr-10"
                  />
                  <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Paste an image URL from any source
                </p>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentEmail}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">Profile updated successfully!</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
