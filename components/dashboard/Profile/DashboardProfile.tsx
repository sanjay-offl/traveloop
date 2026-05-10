'use client'

import { useAuthProfile } from '../../../hooks/useAuthProfile'
import { useToast } from '../../ui/Toast'
import { ImageUpload } from '../../ui/ImageUpload'
import { createClient } from '../../../utils/supabase/client'
import { useState } from 'react'

export function DashboardProfile() {
  const { displayName, email, initials, user } = useAuthProfile()
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Edit form state
  const [formName, setFormName] = useState('')
  const [formBio, setFormBio] = useState('')
  const [formLocation, setFormLocation] = useState('')

  function openEdit() {
    const meta = user?.user_metadata as Record<string, string> | undefined
    setFormName(displayName)
    setFormBio(meta?.bio ?? '')
    setFormLocation(meta?.location ?? '')
    setEditing(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!formName.trim()) {
      toast('Name cannot be empty.', 'error')
      return
    }
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: formName.trim(),
        bio: formBio.trim(),
        location: formLocation.trim(),
      },
    })
    setSaving(false)
    if (error) {
      toast(error.message || 'Failed to save profile.', 'error')
    } else {
      toast('Profile updated successfully!', 'success')
      setEditing(false)
    }
  }

  const meta = user?.user_metadata as Record<string, string> | undefined
  const bio = meta?.bio
  const location = meta?.location
  const avatarUrl = meta?.avatar_url

  async function handleAvatarUpload(url: string) {
    const supabase = createClient()
    await supabase.auth.updateUser({
      data: { avatar_url: url }
    })
    // In a real app we'd refresh the profile context here
  }

  return (
    <section id="profile" className="scroll-mt-24 mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Profile</h2>
        <button type="button" onClick={openEdit} className="btn-ghost text-sm px-4 py-2">
          Edit profile
        </button>
      </div>

      {/* Profile card */}
      <div className="card-premium p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        {/* Avatar */}
        <div className="shrink-0 w-20 h-20">
          <ImageUpload
            bucket="avatars"
            path={user?.id || 'unknown'}
            currentImageUrl={avatarUrl}
            onUploadSuccess={handleAvatarUpload}
            circular={true}
            className="w-full h-full shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{displayName}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {email || 'No email on file'} · <span className="text-blue-600 dark:text-blue-400 font-medium">Pro member</span>
          </p>
          {bio && <p className="text-sm text-zinc-600 dark:text-zinc-400">{bio}</p>}
          {location && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {location}
            </p>
          )}
        </div>

        {/* Stats chips */}
        <div className="flex gap-3 flex-wrap">
          <div className="text-center rounded-xl bg-black/4 dark:bg-white/4 border border-black/5 dark:border-white/8 px-4 py-2.5">
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">12</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Countries</p>
          </div>
          <div className="text-center rounded-xl bg-black/4 dark:bg-white/4 border border-black/5 dark:border-white/8 px-4 py-2.5">
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Trips</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5" htmlFor="edit-name">
                  Full name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="form-input"
                  placeholder="Your full name"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5" htmlFor="edit-bio">
                  Bio <span className="font-normal text-zinc-400">(optional)</span>
                </label>
                <textarea
                  id="edit-bio"
                  value={formBio}
                  onChange={e => setFormBio(e.target.value)}
                  className="form-input resize-none h-20"
                  placeholder="A short bio about yourself…"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5" htmlFor="edit-location">
                  Location <span className="font-normal text-zinc-400">(optional)</span>
                </label>
                <input
                  id="edit-location"
                  type="text"
                  value={formLocation}
                  onChange={e => setFormLocation(e.target.value)}
                  className="form-input"
                  placeholder="e.g. San Francisco, CA"
                  disabled={saving}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn-ghost flex-1 py-2.5 text-sm"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 py-2.5 text-sm rounded-xl"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving…
                    </span>
                  ) : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
