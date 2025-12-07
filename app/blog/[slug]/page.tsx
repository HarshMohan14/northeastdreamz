import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/data'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BlogPostContent from '@/components/BlogPostContent'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
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
