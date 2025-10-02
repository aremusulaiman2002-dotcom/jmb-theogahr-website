'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function About() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About JMB The Oga HR</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Leading the evolution of human capital management with strategic insights 
              and innovative solutions for modern businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                To transform how organizations build, manage, and scale their most valuable asset—their people. 
                We believe that strategic human capital management is the cornerstone of sustainable business growth.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Founded on the principle that &ldquo;we don&apos;t just fill positions—we build teams that scale,&rdquo; 
                JMB The Oga HR brings executive-level HR expertise to businesses of all sizes.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-lg">JMB</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">JMB The Oga HR</p>
                  <p className="text-slate-600">Founder & Principal Consultant</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why &ldquo;The Oga HR&rdquo;</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Authority & Expertise</h4>
                    <p className="text-slate-700">Deep industry knowledge and proven methodologies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Strategic Partnership</h4>
                    <p className="text-slate-700">Working as an extension of your leadership team</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Results-Driven Approach</h4>
                    <p className="text-slate-700">Focus on measurable business outcomes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide our approach to human capital management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "Delivering exceptional quality in every engagement and maintaining the highest professional standards.",
                icon: "⭐"
              },
              {
                title: "Integrity",
                description: "Building trust through transparency, honesty, and ethical business practices.",
                icon: "🔒"
              },
              {
                title: "Innovation",
                description: "Leveraging cutting-edge HR strategies and technologies to drive business success.",
                icon: "💡"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Transform Your HR Strategy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 mb-8"
          >
            Let&apos;s discuss how our expertise can drive your business forward.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-all duration-300 inline-block"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}