'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-slate-900 text-white"
    >
      <div className="container-corporate">
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold">JMB</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">The Oga HR</h3>
                <p className="text-slate-400 text-sm">Human Capital Solutions</p>
              </div>
            </motion.div>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Strategic HR partners dedicated to building high-performing teams and driving organizational excellence through innovative human capital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-slate-200">Solutions</h4>
            <ul className="space-y-3">
              {['HR Outsourcing', 'Executive Recruitment', 'HR Advisory', 'Corporate Consulting'].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <Link href="/services" className="text-slate-400 hover:text-white transition-colors duration-300">
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-slate-200">Connect</h4>
            <ul className="space-y-3 text-slate-400">
              <li>contact@jmbthenogahr.com</li>
              <li>+234 XXX XXX XXXX</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-slate-800 py-8 text-center text-slate-400"
        >
          <p>&copy; {new Date().getFullYear()} JMB The Oga HR Consulting. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}