'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import TalentPoolForm from '@/components/TalentPoolForm'

export default function Contact() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to transform your HR strategy? Let's start a conversation about how we can help 
              your business achieve its human capital objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods & Forms */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="contact-form">
              <ContactForm />
            </div>

            {/* Talent Pool Form */}
            <div>
              <TalentPoolForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl mb-4">📍</div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-slate-300">Lagos, Nigeria</p>
              </div>
              <div>
                <div className="text-2xl mb-4">📞</div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-slate-300">+234 XXX XXX XXXX</p>
              </div>
              <div>
                <div className="text-2xl mb-4">✉️</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-slate-300">contact@jmbthenogahr.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}