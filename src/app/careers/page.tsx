'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getActiveJobs } from '@/lib/queries'
import { useEffect, useState } from 'react'

interface Job {
  _id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  requirements: string[]
  deadline: string
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsData = await getActiveJobs()
        setJobs(jobsData)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers at JMB The Oga HR</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join our team of HR experts and help shape the future of work for businesses across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Openings</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore opportunities to grow your career with a leading HR consulting firm.
            </p>
          </motion.div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No current openings at the moment.</p>
              <p className="text-slate-500 mt-2">Please check back later or join our talent pool.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {job.location}
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {job.type}
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-4 leading-relaxed">{job.description}</p>
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Key Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((requirement, reqIndex) => (
                              <li key={reqIndex} className="flex items-start text-slate-700">
                                <span className="text-amber-400 mr-3">•</span>
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="lg:w-48 flex-shrink-0">
                      <Link
                        href="/contact?subject=Job Application"
                        className="w-full bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-300 text-center block"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Talent Pool CTA */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Join Our Talent Pool</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Don't see the perfect role? Join our talent pool and be the first to know about new opportunities 
              that match your skills and career aspirations.
            </p>
            <Link
              href="/contact?type=talent-pool"
              className="bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800 transition-all duration-300 inline-block"
            >
              Join Talent Pool
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}