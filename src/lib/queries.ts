import { client } from './sanity'

// Blog Posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      readTime,
      author
    }
  `)
}

export async function getBlogPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      readTime,
      author,
      body
    }
  `, { slug })
}

export async function getFeaturedPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      readTime
    }
  `)
}

// Testimonials
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      clientName,
      company,
      position,
      testimonial,
      rating,
      featured
    }
  `)
}

export async function getFeaturedTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      _id,
      clientName,
      company,
      position,
      testimonial,
      rating
    }
  `)
}

// Job Postings
export async function getActiveJobs() {
  return client.fetch(`
    *[_type == "job" && isActive == true] | order(_createdAt desc) {
      _id,
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements,
      isActive
    }
  `)
}

// Services
export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      features,
      benefits,
      ctaText
    }
  `)
}