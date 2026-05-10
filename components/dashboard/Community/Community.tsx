'use client'

import { useState } from 'react'
import { useCommunity } from '../../../hooks/useCommunity'
import { useAuthProfile } from '../../../hooks/useAuthProfile'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { communityPostSchema, type CommunityPostInput } from '../../../lib/validations'
import { useToast } from '../../ui/Toast'

export function Community() {
  const { posts, loading, createPost } = useCommunity()
  const { isAuthenticated } = useAuthProfile()
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CommunityPostInput>({
    resolver: zodResolver(communityPostSchema),
    defaultValues: { tag: 'General' }
  })

  const onSubmit = async (data: CommunityPostInput) => {
    const err = await createPost(data)
    if (!err) {
      toast('Post published!', 'success')
      reset()
      setShowForm(false)
    } else {
      toast('Failed to post', 'error')
    }
  }

  return (
    <section id="community" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Community</h2>
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-ghost text-xs px-3 py-1.5">
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showForm && isAuthenticated && (
        <div className="card-premium p-4 mb-4 fade-up">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-[1fr_120px] gap-3">
              <input type="text" placeholder="Post title..." {...register('title')} className={`form-input text-sm py-2 ${errors.title ? 'border-red-500' : ''}`} disabled={isSubmitting} />
              <select {...register('tag')} className="form-input text-sm py-2" disabled={isSubmitting}>
                <option value="General">General</option>
                <option value="Tips">Tips</option>
                <option value="Itinerary">Itinerary</option>
                <option value="Budget">Budget</option>
              </select>
            </div>
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            
            <textarea placeholder="Write your post..." {...register('content')} className="form-input text-sm py-2 h-20 resize-none" disabled={isSubmitting} />
            <div className="flex justify-end mt-1">
              <button type="submit" disabled={isSubmitting} className="btn-primary text-sm py-2 px-6 rounded-lg">
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="card-premium h-24 animate-pulse bg-black/5 dark:bg-white/5" />)
        ) : posts.map(post => (
          <div key={post.id} className="card-premium p-5 group cursor-pointer hover:border-blue-600/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-inner flex-shrink-0">
                {post.profiles?.avatar_url ? (
                  <img src={post.profiles.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : post.profiles?.full_name?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.profiles?.full_name || 'Anonymous'}</span> • {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/10 text-blue-600 ml-2 flex-shrink-0">
                    {post.tag}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">{post.content}</p>
                <div className="flex gap-4 mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[16px]">favorite</span> {post.likes_count}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-blue-500 transition-colors"><span className="material-symbols-outlined text-[16px]">chat_bubble</span> {post.replies_count}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
