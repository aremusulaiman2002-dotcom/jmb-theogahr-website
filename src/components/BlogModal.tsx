'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { getBlogPost } from '@/lib/queries'

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  categories: string[]
  publishedAt: string
  readTime: string
  author: string
  body: any[] // Keeping this as any since it's from Sanity CMS
}

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  postSlug: string
}

interface BlockChild {
  text: string
}

interface ContentBlock {
  _type: string
  children: BlockChild[]
}

export default function BlogModal({ isOpen, onClose, postSlug }: BlogModalProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPost = useCallback(async () => {
    setLoading(true)
    try {
      const postData = await getBlogPost(postSlug)
      setPost(postData)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }, [postSlug])

  useEffect(() => {
    if (isOpen && postSlug) {
      fetchPost()
    }
  }, [isOpen, postSlug, fetchPost])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <span className="text-2xl">×</span>
          </button>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : post ? (
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="bg-slate-900 text-white p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category: string, index: number) => (
                    <span
                      key={index}
                      className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span>By {post.author}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Excerpt */}
                <div className="bg-amber-50 border-l-4 border-amber-500 pl-6 py-4 mb-8 rounded-r-lg">
                  <p className="text-slate-700 text-lg italic">{post.excerpt}</p>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  {post.body && post.body.map((block: ContentBlock, index: number) => {
                    if (block._type === 'block') {
                      return (
                        <div key={index} className="mb-6">
                          {block.children.map((child: BlockChild, childIndex: number) => (
                            <p key={childIndex} className="text-slate-700 leading-relaxed mb-4">
                              {child.text}
                            </p>
                          ))}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>

                {/* CTA */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Need Professional HR Guidance?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Let&rsquo;s discuss how we can help optimize your human capital strategy.
                  </p>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-300 inline-block"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600">Post not found.</p>
              <button
                onClick={onClose}
                className="mt-4 text-amber-500 hover:text-amber-600 font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}