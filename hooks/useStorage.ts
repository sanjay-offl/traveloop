import { useState } from 'react'
import { createClient } from '../utils/supabase/client'

export function useStorage(bucket: 'avatars' | 'trip-covers') {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function uploadImage(file: File, path: string): Promise<string | null> {
    try {
      setUploading(true)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image: ', error)
      return null
    } finally {
      setUploading(false)
    }
  }

  async function deleteImage(url: string) {
    try {
      // Extract the file path from the public URL
      const urlParts = url.split(`/${bucket}/`)
      if (urlParts.length !== 2) return false
      
      const filePath = urlParts[1]
      const { error } = await supabase.storage.from(bucket).remove([filePath])
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting image: ', error)
      return false
    }
  }

  return { uploadImage, deleteImage, uploading }
}
