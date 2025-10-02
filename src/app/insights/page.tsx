'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { getBlogPosts } from '@/lib/queries'
import { useEffect } from 'react'
import BlogModal from '@/components/BlogModal'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  categories: string[]
  publishedAt: string
  readTime: string
  author: string
}

export default function Insights() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsData = await getBlogPosts()
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const openModal = (postSlug: string) => {
    setSelectedPostSlug(postSlug)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPostSlug(null)
  }

  const categories = ["All", "Recruitment", "HR Strategy", "Compliance", "Talent Management", "Startup HR"]

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Blog Modal */}
      <BlogModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        postSlug={selectedPostSlug || ''}
      />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Oga HR Insights</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Expert perspectives on HR trends, best practices, and strategies to optimize your human capital management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-300 font-medium"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No articles published yet.</p>
              <p className="text-slate-500 mt-2">Check back soon for expert HR insights.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(post.slug.current)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      {post.categories && post.categories.length > 0 && (
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.categories[0]}
                        </span>
                      )}
                      <span className="text-slate-500 text-sm">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <button className="text-amber-500 hover:text-amber-600 font-semibold text-sm flex items-center">
                        Read more
                        <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Stay Updated with HR Insights</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get the latest HR trends, strategies, and best practices delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none border border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}