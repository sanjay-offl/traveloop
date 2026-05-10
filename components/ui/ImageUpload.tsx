'use client'

import { useState, useRef } from 'react'
import { useStorage } from '../../hooks/useStorage'
import { useToast } from './Toast'

interface ImageUploadProps {
  bucket: 'avatars' | 'trip-covers'
  path: string
  currentImageUrl?: string | null
  onUploadSuccess: (url: string) => void
  className?: string
  circular?: boolean
}

export function ImageUpload({ 
  bucket, 
  path, 
  currentImageUrl, 
  onUploadSuccess, 
  className = '', 
  circular = false 
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const { uploadImage, uploading } = useStorage(bucket)
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('Please upload an image file (JPEG, PNG, WebP)', 'error')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast('Image must be less than 5MB', 'error')
      return
    }

    const url = await uploadImage(file, path)
    if (url) {
      onUploadSuccess(url)
      toast('Image uploaded successfully', 'success')
    } else {
      toast('Failed to upload image', 'error')
    }
  }

  return (
    <div 
      className={`relative group overflow-hidden ${circular ? 'rounded-full' : 'rounded-2xl'} ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {currentImageUrl ? (
        <img 
          src={currentImageUrl} 
          alt="Uploaded" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-zinc-400">
            {circular ? 'person' : 'image'}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer transition-opacity duration-200 ${
          dragActive || uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {uploading ? (
          <span className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
          <>
            <span className="material-symbols-outlined text-white text-2xl mb-1">
              upload
            </span>
            {!circular && <span className="text-white text-xs font-medium">Upload Image</span>}
          </>
        )}
      </div>
    </div>
  )
}
