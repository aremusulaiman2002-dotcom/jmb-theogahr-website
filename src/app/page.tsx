'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getFeaturedTestimonials, getServices } from '@/lib/queries'
import TestimonialsMultiCarousel from '@/components/TestimonialsMultiCarousel'

// Professional animation variants
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}

interface Service {
  _id: string
  title: string
  description: string
  icon?: string
  features?: string[]
  benefits?: string[]
}

interface Testimonial {
  _id: string
  clientName: string
  company?: string
  position?: string
  testimonial: string
  rating: number
  featured: boolean
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [testimonialsData, servicesData] = await Promise.all([
          getFeaturedTestimonials(),
          getServices()
        ])
        setTestimonials(testimonialsData)
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="pt-16">
      {/* Hero Section - Corporate Style */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-slate-700"
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              <span className="text-sm text-slate-300">Trusted HR Partner for Businesses</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Strategic HR
              <br />
              <span className="text-amber-400">Solutions</span> for
              <br />
              Business Growth
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              We don&apos;t just fill positions—we architect high-performing teams that drive your business forward. 
              Comprehensive HR consulting tailored for corporate excellence.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact" 
                  className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-all duration-300 shadow-2xl inline-flex items-center space-x-2"
                >
                  <span>Start Partnership</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/services" 
                  className="border-2 border-slate-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-slate-50 border-y border-slate-200"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="py-12">
            <p className="text-slate-500 text-sm font-medium text-center mb-8 uppercase tracking-wider">
              Trusted by Forward-Thinking Organizations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {['Startups', 'SMEs', 'Enterprises', 'Scale-ups'].map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-slate-900 mb-2">{type}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Corporate HR Excellence
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive human capital solutions designed to optimize your workforce and drive sustainable business growth.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon || '💼'}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                            className="flex items-center text-slate-700 text-sm"
                          >
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    <motion.div whileHover={{ x: 5 }} className="mt-4">
                      <Link href="/services" className="text-slate-900 font-semibold hover:text-amber-600 transition-colors inline-flex items-center">
                        Learn more <span className="ml-2">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Multi Carousel */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trusted by businesses that have transformed their HR operations with our expertise.
            </p>
          </motion.div>

          <TestimonialsMultiCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white"
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Ready to Transform Your HR Strategy?
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Partner with us to build a workforce that drives measurable business results.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/contact" 
              className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-all duration-300 shadow-2xl"
            >
              Schedule Executive Briefing
            </Link>
            <Link 
              href="tel:+2340000000000"
              className="border-2 border-slate-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Call Our Experts
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}