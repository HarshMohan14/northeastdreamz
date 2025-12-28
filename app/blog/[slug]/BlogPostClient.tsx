'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BLOG_POSTS, BlogPost } from '@/lib/data'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BlogPostContent from '@/components/BlogPostContent'
import { getBlogs, BlogPostData } from '@/lib/firebase'

interface BlogPostClientProps {
  initialPost: BlogPost | null
  slug: string
}

export default function BlogPostClient({ initialPost, slug }: BlogPostClientProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [isLoading, setIsLoading] = useState(!initialPost)
  const [notFound, setNotFound] = useState(!initialPost)

  useEffect(() => {
    // If we already have the post from static data, we're done
    if (initialPost) {
      return
    }

    const loadBlog = async () => {
      try {
        // Check Firebase blogs
        const firebaseBlogs = await getBlogs()
        const firebasePost = firebaseBlogs.find((fb) => fb.slug === slug)
        
        if (firebasePost) {
          const foundPost: BlogPost = {
            id: firebasePost.id || 0,
            slug: firebasePost.slug,
            state: firebasePost.state,
            title: firebasePost.title,
            description: firebasePost.description,
            image: firebasePost.image,
            alt: firebasePost.alt,
            content: firebasePost.content,
            date: firebasePost.date,
            author: firebasePost.author,
          }
          setPost(foundPost)
          setNotFound(false)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Error loading blog:', error)
        setNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (slug) {
      loadBlog()
    }
  }, [slug, initialPost])

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading blog post...</div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  if (notFound || !post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <BlogPostContent post={post} />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
