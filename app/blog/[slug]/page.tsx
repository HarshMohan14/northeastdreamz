import { BLOG_POSTS, BlogPost } from '@/lib/data'
import BlogPostClient from './BlogPostClient'

// Required for static export - generates all static paths at build time
export function generateStaticParams() {
  // Return all blog post slugs from static data
  // Firebase blogs will be handled client-side
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug
  
  // Find the blog post from static data at build time
  const initialPost = BLOG_POSTS.find((p) => p.slug === slug) || null

  return <BlogPostClient initialPost={initialPost} slug={slug} />
}
