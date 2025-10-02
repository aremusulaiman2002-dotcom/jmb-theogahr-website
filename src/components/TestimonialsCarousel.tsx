'use client'

import { motion, AnimatePresence } from 'framer-motion'
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

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length, isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">Client testimonials coming soon.</p>
        <p className="text-slate-500 mt-2">We're gathering feedback from our satisfied clients.</p>
      </div>
    )
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Carousel */}
      <div className="relative h-80 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center text-center h-full justify-center">
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < testimonials[currentIndex].rating ? 'text-amber-400' : 'text-slate-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl text-slate-700 mb-6 max-w-2xl leading-relaxed">
                "{testimonials[currentIndex].testimonial}"
              </blockquote>

              {/* Client Info */}
              <div>
                <p className="font-semibold text-slate-900 text-lg">
                  {testimonials[currentIndex].clientName}
                </p>
                <p className="text-slate-600">
                  {testimonials[currentIndex].position} 
                  {testimonials[currentIndex].company && ` at ${testimonials[currentIndex].company}`}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <span className="text-2xl">←</span>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <span className="text-2xl">→</span>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
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