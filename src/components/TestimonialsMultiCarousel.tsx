'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Testimonial {
  _id: string
  clientName: string
  company?: string
  position?: string
  testimonial: string
  rating: number
  featured: boolean
}

interface TestimonialsMultiCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsMultiCarousel({ testimonials }: TestimonialsMultiCarouselProps) {
  const [currentSet, setCurrentSet] = useState(0)

  // Create enough duplicates for seamless looping
  const visibleCards = 3 // Number of cards visible at once
  const totalSets = Math.ceil(testimonials.length / visibleCards) || 1

  useEffect(() => {
    if (testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % totalSets)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [testimonials.length, totalSets])

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">Client testimonials coming soon.</p>
        <p className="text-slate-500 mt-2">We&apos;re gathering feedback from our satisfied clients.</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex justify-center">
        <motion.div
          className="flex space-x-6"
          animate={{
            x: [0, -400, -800][currentSet % 3], // Adjust based on card width + gap
          }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial._id}-${index}`}
              className="flex-shrink-0 w-80 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              whileHover={{ y: -5 }}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating ? 'text-amber-400' : 'text-slate-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 mb-4 italic leading-relaxed">
                &quot;{testimonial.testimonial}&quot;
              </p>

              {/* Client Info */}
              <div>
                <p className="font-semibold text-slate-900">{testimonial.clientName}</p>
                <p className="text-slate-600 text-sm">
                  {testimonial.position} {testimonial.company && `at ${testimonial.company}`}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
      
      {/* Dots Indicator */}
      {testimonials.length > 3 && (
        <div className="flex justify-center space-x-3 mt-8">
          {[...Array(totalSets)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSet(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSet 
                  ? 'bg-amber-500 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}