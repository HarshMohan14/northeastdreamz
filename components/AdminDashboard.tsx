'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Users, FileText, RefreshCw, Calendar, Mail, Phone, Box as PackageIcon, User, X, ChevronLeft, ChevronRight, Eye, Search, Plus, Save, Edit, Trash2, MapPin, DollarSign, Clock } from 'lucide-react'
import Image from 'next/image'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db, saveBlog, getBlogs, updateBlog, deleteBlog, BlogPostData, savePackage, getPackages, updatePackage, deletePackage, PackageData } from '@/lib/firebase'
import { BLOG_POSTS, BlogPost, Package, ItineraryItem } from '@/lib/data'
import toast, { Toaster } from 'react-hot-toast'

interface AdminDashboardProps {
  onLogout: () => void
}

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  packageName?: string
  packageDescription?: string
  plannedVisit?: string
  groupType?: string
  needBookingHelp?: boolean
  preferences?: string[]
  destination?: string
  travelDate?: string
  travelers?: string
  message?: string
  timestamp?: string
}

type BlogPostWithFirebaseId = BlogPost & { firebaseId?: string }

type PackageWithFirebaseId = Package & { firebaseId?: string }

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'blogs' | 'packages'>('inquiries')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [blogs, setBlogs] = useState<BlogPostWithFirebaseId[]>(BLOG_POSTS as BlogPostWithFirebaseId[])
  const [packages, setPackages] = useState<PackageWithFirebaseId[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddBlogModal, setShowAddBlogModal] = useState(false)
  const [showAddPackageModal, setShowAddPackageModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPostWithFirebaseId | null>(null)
  const [deletingBlog, setDeletingBlog] = useState<BlogPostWithFirebaseId | null>(null)
  const [editingPackage, setEditingPackage] = useState<PackageWithFirebaseId | null>(null)
  const [deletingPackage, setDeletingPackage] = useState<PackageWithFirebaseId | null>(null)
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null)
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    state: 'Meghalaya',
    description: '',
    image: '',
    alt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Northeast Dreamz Team',
  })
  const [newPackage, setNewPackage] = useState<Partial<Package>>({
    state: 'Meghalaya',
    name: '',
    cost: '',
    days: 5,
    image: '',
    itinerary: [{ day: 1, title: '', desc: '', image: '' }],
    gallery: [],
    availableDates: [],
    pdfUrl: '',
  })
  const itemsPerPage = 5

  const fetchInquiries = async () => {
    setIsRefreshing(true)
    try {
      if (!db) {
        console.warn('Firestore not initialized')
        setIsRefreshing(false)
        setIsLoading(false)
        return
      }

      const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
      const inquiriesCol = collection(db, `artifacts/${appId}/public/data/inquiries`)
      const q = query(inquiriesCol, orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const inquiriesData: Inquiry[] = []
      querySnapshot.forEach((doc) => {
        inquiriesData.push({
          id: doc.id,
          ...doc.data(),
        } as Inquiry)
      })
      
      setInquiries(inquiriesData)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }

  const fetchBlogs = async () => {
    setIsRefreshing(true)
    try {
      const firebaseBlogs = await getBlogs()
      // Combine Firebase blogs with static blogs from data.ts
      // Convert Firebase blogs to BlogPost format
      const convertedBlogs: BlogPostWithFirebaseId[] = firebaseBlogs.map((fb, index) => ({
        id: fb.id || (BLOG_POSTS.length + index + 1),
        slug: fb.slug,
        state: fb.state,
        title: fb.title,
        description: fb.description,
        image: fb.image,
        alt: fb.alt,
        content: fb.content,
        date: fb.date,
        author: fb.author,
        firebaseId: fb.firebaseId, // Keep Firebase ID for editing/deleting
      }))
      setBlogs([...BLOG_POSTS, ...convertedBlogs])
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs(BLOG_POSTS) // Fallback to static blogs
    } finally {
      setIsRefreshing(false)
    }
  }

  const fetchPackages = async () => {
    setIsRefreshing(true)
    try {
      console.log('🔄 Fetching packages from Firebase...')
      const firebasePackages = await getPackages()
      console.log(`📦 Received ${firebasePackages.length} packages from Firebase:`, firebasePackages)
      
      const convertedPackages: PackageWithFirebaseId[] = firebasePackages.map((fp, index) => ({
        id: fp.id || (index + 1),
        state: fp.state,
        name: fp.name,
        cost: fp.cost,
        days: fp.days,
        image: fp.image,
        itinerary: fp.itinerary || [],
        dates: fp.dates,
        gallery: fp.gallery,
        availableDates: fp.availableDates,
        pdfUrl: fp.pdfUrl,
        firebaseId: fp.firebaseId,
      }))
      
      console.log(`✅ Converted ${convertedPackages.length} packages for display`)
      setPackages(convertedPackages)
    } catch (error) {
      console.error('❌ Error fetching packages:', error)
      setPackages([]) // No fallback - all packages must be in database
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
    fetchBlogs()
    fetchPackages()
  }, [])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  // Handle title change and auto-generate slug
  const handleTitleChange = (title: string) => {
    setNewBlog({
      ...newBlog,
      title,
      slug: generateSlug(title),
    })
  }

  // Save new blog to Firebase
  const handleSaveBlog = async () => {
    if (!newBlog.title || !newBlog.slug || !newBlog.description || !newBlog.content) {
      toast.error('Please fill in all required fields (Title, Description, Content)')
      return
    }

    // Validate image path/URL
    if (!newBlog.image) {
      toast.error('Please provide an image URL or path')
      return
    }
    
    // Validate format: either starts with / (local) or http/https (URL)
    if (!newBlog.image.startsWith('/') && !newBlog.image.startsWith('http://') && !newBlog.image.startsWith('https://')) {
      toast.error('Image must be a valid URL (https://...) or local path (starting with /)')
      return
    }

    const blogToAdd: BlogPostData = {
      slug: newBlog.slug!,
      state: newBlog.state || 'Meghalaya',
      title: newBlog.title!,
      description: newBlog.description!,
      image: newBlog.image || '/Northeast Dreamz Image Bank/blog.jpg',
      alt: newBlog.alt || newBlog.title!,
      content: newBlog.content!,
      date: newBlog.date || new Date().toISOString().split('T')[0],
      author: newBlog.author || 'Northeast Dreamz Team',
    }

    const savePromise = editingBlog && editingBlog.firebaseId
      ? updateBlog(editingBlog.firebaseId, blogToAdd)
      : saveBlog(blogToAdd)

    toast.promise(savePromise, {
      loading: editingBlog ? 'Updating blog...' : 'Saving blog...',
      success: editingBlog ? 'Blog updated successfully!' : 'Blog added successfully!',
      error: 'Failed to save blog. Please try again.',
    })

    try {
      await savePromise
      
      // Refresh blogs list
      await fetchBlogs()
      
      // Reset form
      setNewBlog({
        title: '',
        slug: '',
        state: 'Meghalaya',
        description: '',
        image: '',
        alt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        author: 'Northeast Dreamz Team',
      })
      
      setShowAddBlogModal(false)
      setEditingBlog(null)
    } catch (error) {
      console.error('Error saving blog:', error)
      // Error toast is handled by toast.promise
    }
  }

  // Handle edit blog
  const handleEditBlog = (blog: BlogPostWithFirebaseId) => {
    // Only allow editing Firebase blogs (not static ones from data.ts)
    if (!blog.firebaseId) {
      toast.error('Static blogs from data.ts cannot be edited. Only blogs created through the admin panel can be edited.')
      return
    }
    
    setEditingBlog(blog)
    setNewBlog({
      title: blog.title,
      slug: blog.slug,
      state: blog.state,
      description: blog.description,
      image: blog.image,
      alt: blog.alt,
      content: blog.content,
      date: blog.date,
      author: blog.author,
    })
    setShowAddBlogModal(true)
  }

  // Handle delete blog
  const handleDeleteBlog = async () => {
    if (!deletingBlog || !deletingBlog.firebaseId) {
      toast.error('This blog cannot be deleted (it may be a static blog from data.ts)')
      setDeletingBlog(null)
      return
    }

    const deletePromise = deleteBlog(deletingBlog.firebaseId)

    toast.promise(deletePromise, {
      loading: 'Deleting blog...',
      success: 'Blog deleted successfully!',
      error: 'Failed to delete blog. Please try again.',
    })

    try {
      await deletePromise
      await fetchBlogs()
      setDeletingBlog(null)
    } catch (error) {
      console.error('Error deleting blog:', error)
      // Error toast is handled by toast.promise
    }
  }

  // Package Management Functions
  const handleSavePackage = async () => {
    if (!newPackage.name || !newPackage.cost || !newPackage.state || !newPackage.itinerary || newPackage.itinerary.length === 0) {
      toast.error('Please fill in all required fields (Name, Cost, State, Itinerary)')
      return
    }

    if (!newPackage.image) {
      toast.error('Please provide an image URL or path')
      return
    }

    if (!newPackage.image.startsWith('/') && !newPackage.image.startsWith('http://') && !newPackage.image.startsWith('https://')) {
      toast.error('Image must be a valid URL (https://...) or local path (starting with /)')
      return
    }

    const packageToAdd: PackageData = {
      state: newPackage.state!,
      name: newPackage.name!,
      cost: newPackage.cost!,
      days: newPackage.days || 5,
      image: newPackage.image,
      itinerary: newPackage.itinerary,
      dates: newPackage.dates,
      gallery: newPackage.gallery,
      availableDates: newPackage.availableDates,
      pdfUrl: newPackage.pdfUrl,
    }

    const savePromise = editingPackage && editingPackage.firebaseId
      ? updatePackage(editingPackage.firebaseId, packageToAdd)
      : savePackage(packageToAdd)

    toast.promise(savePromise, {
      loading: editingPackage ? 'Updating package...' : 'Saving package...',
      success: editingPackage ? 'Package updated successfully!' : 'Package added successfully!',
      error: 'Failed to save package. Please try again.',
    })

    try {
      await savePromise
      await fetchPackages()
      setNewPackage({
        state: 'Meghalaya',
        name: '',
        cost: '',
        days: 5,
        image: '',
        itinerary: [{ day: 1, title: '', desc: '', image: '' }],
        gallery: [],
        availableDates: [],
        pdfUrl: '',
      })
      setShowAddPackageModal(false)
      setEditingPackage(null)
    } catch (error) {
      console.error('Error saving package:', error)
    }
  }

  const handleEditPackage = (pkg: PackageWithFirebaseId) => {
    if (!pkg.firebaseId) {
      toast.error('Static packages from data.ts cannot be edited. Only packages created through the admin panel can be edited.')
      return
    }
    
    setEditingPackage(pkg)
    setNewPackage({
      state: pkg.state,
      name: pkg.name,
      cost: pkg.cost,
      days: pkg.days,
      image: pkg.image,
      itinerary: pkg.itinerary.map(item => ({ ...item, image: item.image || '' })),
      dates: pkg.dates,
      gallery: pkg.gallery || [],
      availableDates: pkg.availableDates || [],
      pdfUrl: pkg.pdfUrl || '',
    })
    setShowAddPackageModal(true)
  }

  const handleDeletePackage = async () => {
    if (!deletingPackage || !deletingPackage.firebaseId) {
      toast.error('This package cannot be deleted (it may be a static package from data.ts)')
      setDeletingPackage(null)
      return
    }

    const deletePromise = deletePackage(deletingPackage.firebaseId)

    toast.promise(deletePromise, {
      loading: 'Deleting package...',
      success: 'Package deleted successfully!',
      error: 'Failed to delete package. Please try again.',
    })

    try {
      await deletePromise
      await fetchPackages()
      setDeletingPackage(null)
    } catch (error) {
      console.error('Error deleting package:', error)
    }
  }

  const migratePackages = async () => {
    setIsMigrating(true)
    setMigrationStatus(null)
    
    try {
      // First, test if PACKAGE_DATA is accessible
      console.log('🧪 Testing package data availability...')
      const testResponse = await fetch('/api/test-packages')
      const testData = await testResponse.json()
      console.log('🧪 Test result:', testData)
      
      if (!testData.packageDataExists || testData.packageCount === 0) {
        throw new Error(`No packages found to migrate. Package count: ${testData.packageCount}`)
      }

      // First check if packages exist
      console.log('🔄 Starting migration check...')
      const checkResponse = await fetch('/api/migrate-packages', {
        method: 'POST',
      })
      const checkData = await checkResponse.json()
      console.log('📋 Migration check response:', checkData)

      if (checkData.warning) {
        // Packages exist, ask for confirmation
        const proceed = window.confirm(
          `${checkData.warning}\n\nDo you want to proceed anyway? This will create duplicate packages.`
        )
        
        if (!proceed) {
          setIsMigrating(false)
          return
        }

        // Force migration
        const forceResponse = await fetch('/api/migrate-packages', {
          method: 'PUT',
        })
        const forceData = await forceResponse.json()

        if (forceData.success) {
          setMigrationStatus({
            type: 'success',
            message: forceData.message,
          })
          toast.success(forceData.message)
          await fetchPackages()
        } else {
          throw new Error(forceData.message || 'Migration failed')
        }
      } else if (checkData.success) {
        const successCount = checkData.succeeded || checkData.results?.success?.length || 0
        const totalCount = checkData.total || 0
        
        if (successCount === 0 && totalCount > 0) {
          // Migration ran but no packages were migrated
          const errorDetails = checkData.results?.errors || []
          const errorMsg = errorDetails.length > 0 
            ? `Migration failed: ${errorDetails.map((e: any) => `${e.name}: ${e.error}`).join(', ')}`
            : 'Migration completed but no packages were added. Check server logs for details.'
          throw new Error(errorMsg)
        }
        
        setMigrationStatus({
          type: 'success',
          message: checkData.message || `Successfully migrated ${successCount} packages`,
        })
        toast.success(checkData.message || `Successfully migrated ${successCount} packages`)
        await fetchPackages()
      } else {
        const errorMsg = checkData.error || checkData.message || 'Migration failed'
        console.error('Migration error response:', checkData)
        throw new Error(errorMsg)
      }
    } catch (error: any) {
      console.error('Migration error:', error)
      setMigrationStatus({
        type: 'error',
        message: error?.message || 'Failed to migrate packages',
      })
      toast.error(error?.message || 'Failed to migrate packages')
    } finally {
      setIsMigrating(false)
    }
  }

  const addItineraryItem = () => {
    const day = (newPackage.itinerary?.length || 0) + 1
    setNewPackage({
      ...newPackage,
      itinerary: [...(newPackage.itinerary || []), { day, title: '', desc: '', image: '' }],
    })
  }

  const removeItineraryItem = (index: number) => {
    const updated = newPackage.itinerary?.filter((_, i) => i !== index) || []
    setNewPackage({ ...newPackage, itinerary: updated })
  }

  const updateItineraryItem = (index: number, field: 'title' | 'desc' | 'image', value: string) => {
    const updated = [...(newPackage.itinerary || [])]
    updated[index] = { ...updated[index], [field]: value }
    setNewPackage({ ...newPackage, itinerary: updated })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  // Search functionality
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase()
    return (
      inquiry.name.toLowerCase().includes(query) ||
      inquiry.email.toLowerCase().includes(query) ||
      inquiry.phone.toLowerCase().includes(query) ||
      inquiry.packageName?.toLowerCase().includes(query) ||
      inquiry.destination?.toLowerCase().includes(query) ||
      inquiry.message?.toLowerCase().includes(query) ||
      inquiry.groupType?.toLowerCase().includes(query) ||
      inquiry.preferences?.some(pref => pref.toLowerCase().includes(query))
    )
  })

  // Pagination calculations based on filtered results
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInquiries = filteredInquiries.slice(startIndex, endIndex)

  // Reset to page 1 when inquiries or search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [inquiries.length, searchQuery])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-primary/5 to-white">
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '90vw',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#0C4B4D',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #0C4B4D',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #ef4444',
            },
          },
          loading: {
            iconTheme: {
              primary: '#E8B900',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #E8B900',
            },
          },
        }}
      />
      {/* Header */}
      <header className="bg-white border-b border-brand-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="relative h-8 sm:h-12 w-auto flex-shrink-0">
                <Image
                  src="/Logo - green.png"
                  alt="Northeast Dreamz Logo"
                  width={150}
                  height={48}
                  className="h-8 sm:h-12 w-auto object-contain"
                  unoptimized={true}
                />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-primary section-title truncate">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-700 hover:text-brand-primary transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6">
        <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'text-brand-primary'
                : 'text-gray-600 hover:text-brand-primary'
            }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">User Inquiries</span>
              {inquiries.length > 0 && (
                <span className="bg-brand-accent text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {inquiries.length}
                </span>
              )}
            </div>
            {activeTab === 'inquiries' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'blogs'
                ? 'text-brand-primary'
                : 'text-gray-600 hover:text-brand-primary'
            }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Blog Management</span>
              {blogs.length > 0 && (
                <span className="bg-brand-accent text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {blogs.length}
                </span>
              )}
            </div>
            {activeTab === 'blogs' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'packages'
                ? 'text-brand-primary'
                : 'text-gray-600 hover:text-brand-primary'
            }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <PackageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Packages</span>
              {packages.length > 0 && (
                <span className="bg-brand-accent text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {packages.length}
                </span>
              )}
            </div>
            {activeTab === 'packages' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
              />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-8">
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary section-title">
                  User Inquiries
                </h2>
                <button
                  onClick={fetchInquiries}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
              {/* Search Box */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-600">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center premium-shadow border border-brand-primary/10">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  {searchQuery ? 'No inquiries match your search' : 'No inquiries found'}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchQuery 
                    ? 'Try adjusting your search terms' 
                    : 'User inquiries will appear here once submitted'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors text-sm"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white rounded-2xl premium-shadow border border-brand-primary/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-brand-primary/5 border-b border-brand-primary/10">
                        <tr>
                          {['Type','Name','Email','Phone','Package/Destination','Submitted',''].map((label) => (
                            <th
                              key={label || 'actions'}
                              className={`px-3 py-2 text-left text-[11px] font-semibold text-brand-primary uppercase tracking-wide ${
                                label === '' ? 'text-center' : ''
                              }`}
                            >
                              {label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentInquiries.map((inquiry, index) => (
                          <motion.tr
                            key={inquiry.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-brand-primary/5 transition-colors"
                          >
                            <td className="px-3 py-2 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                inquiry.packageName 
                                  ? 'bg-brand-accent/20 text-brand-primary' 
                                  : 'bg-brand-primary/10 text-brand-primary'
                              }`}>
                                {inquiry.packageName ? 'Package' : 'General'}
                              </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-brand-primary" />
                                <span className="font-medium text-gray-900 truncate max-w-[160px]">{inquiry.name}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 truncate max-w-[180px]">{inquiry.email}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{inquiry.phone}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="text-gray-600 truncate max-w-[200px]">
                                {inquiry.packageName ? (
                                  <div className="flex items-center space-x-2">
                                    <PackageIcon className="w-4 h-4 text-brand-primary" />
                                    <span className="truncate max-w-[150px]">{inquiry.packageName}</span>
                                  </div>
                                ) : inquiry.destination ? (
                                  <span className="truncate max-w-[150px]">{inquiry.destination}</span>
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 text-xs">{formatDate(inquiry.timestamp)}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center">
                              <button
                                onClick={() => setSelectedInquiry(inquiry)}
                                className="inline-flex items-center space-x-1 px-3 py-2 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors text-xs font-medium"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Details</span>
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {currentInquiries.map((inquiry, index) => (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl p-4 premium-shadow border border-brand-primary/10"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.packageName 
                            ? 'bg-brand-accent/20 text-brand-primary' 
                            : 'bg-brand-primary/10 text-brand-primary'
                        }`}>
                          {inquiry.packageName ? 'Package' : 'General'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedInquiry(inquiry)
                          }}
                          className="p-1.5 bg-brand-primary/10 text-brand-primary rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-brand-primary flex-shrink-0" />
                          <span className="font-semibold text-gray-900">{inquiry.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{inquiry.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{inquiry.phone}</span>
                        </div>
                        {inquiry.packageName && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <PackageIcon className="w-4 h-4 text-brand-primary flex-shrink-0" />
                            <span className="truncate">{inquiry.packageName}</span>
                          </div>
                        )}
                        {inquiry.destination && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Destination: </span>
                            <span>{inquiry.destination}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{formatDate(inquiry.timestamp)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Search Results Info */}
                {searchQuery && (
                  <div className="mt-4 px-4 py-2 bg-brand-primary/10 rounded-lg">
                    <p className="text-sm text-brand-primary">
                      Found <span className="font-semibold">{filteredInquiries.length}</span> inquiry{filteredInquiries.length !== 1 ? 'ies' : ''} matching "{searchQuery}"
                    </p>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredInquiries.length)} of {filteredInquiries.length} inquiry{filteredInquiries.length !== 1 ? 'ies' : ''}
                      {searchQuery && inquiries.length !== filteredInquiries.length && (
                        <span className="text-gray-400"> (filtered from {inquiries.length} total)</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-brand-primary/10 hover:border-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      
                      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-colors text-sm sm:text-base ${
                                  currentPage === page
                                    ? 'bg-brand-primary text-white border-brand-primary'
                                    : 'border-gray-300 hover:bg-brand-primary/10 hover:border-brand-primary'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-1 sm:px-2 text-gray-400 text-sm">...</span>
                          }
                          return null
                        })}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-brand-primary/10 hover:border-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'blogs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary section-title">
                Blog Management
              </h2>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={fetchBlogs}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <button
                  onClick={() => {
                    setEditingBlog(null)
                    setNewBlog({
                      title: '',
                      slug: '',
                      state: 'Meghalaya',
                      description: '',
                      image: '',
                      alt: '',
                      content: '',
                      date: new Date().toISOString().split('T')[0],
                      author: 'Northeast Dreamz Team',
                    })
                    setShowAddBlogModal(true)
                  }}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent/90 transition-colors text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Blog</span>
                </button>
              </div>
            </div>

            {blogs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center premium-shadow border border-brand-primary/10">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No blog posts found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 premium-shadow border border-brand-primary/10 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-brand-primary section-title break-words">
                            {blog.title}
                          </h3>
                          <span className="px-2 sm:px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full whitespace-nowrap">
                            {blog.state}
                          </span>
                          {!blog.firebaseId && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                              Static
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 text-sm sm:text-base">{blog.description}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                          <span>Author: {blog.author}</span>
                          <span>Date: {blog.date}</span>
                          <span className="hidden sm:inline">Slug: {blog.slug}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        {blog.firebaseId && (
                          <>
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                              title="Edit blog"
                            >
                              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                              onClick={() => setDeletingBlog(blog)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete blog"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'packages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary section-title">
                Package Management
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={fetchPackages}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                {packages.length === 0 && (
                  <button
                    onClick={migratePackages}
                    disabled={isMigrating}
                    className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    <RefreshCw className={`w-4 h-4 ${isMigrating ? 'animate-spin' : ''}`} />
                    <span>Migrate Static Packages</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingPackage(null)
      setNewPackage({
        state: 'Meghalaya',
        name: '',
        cost: '',
        days: 5,
        image: '',
        itinerary: [{ day: 1, title: '', desc: '', image: '' }],
        gallery: [],
        availableDates: [],
        pdfUrl: '',
      })
                    setShowAddPackageModal(true)
                  }}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent/90 transition-colors text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Package</span>
                </button>
              </div>
            </div>

            {migrationStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  migrationStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : migrationStatus.type === 'warning'
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p className="font-medium">{migrationStatus.message}</p>
              </motion.div>
            )}

            {packages.length === 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl p-12 text-center premium-shadow border border-brand-primary/10">
                <PackageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No packages found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 premium-shadow border border-brand-primary/10 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-brand-primary section-title break-words">
                            {pkg.name}
                          </h3>
                          <span className="px-2 sm:px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full whitespace-nowrap">
                            {pkg.state}
                          </span>
                          {!pkg.firebaseId && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                              Static
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold">{pkg.cost}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{pkg.days} days</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{pkg.itinerary?.length || 0} itinerary items</span>
                          </div>
                        </div>
                        {pkg.dates && (
                          <p className="text-xs sm:text-sm text-gray-500">Dates: {pkg.dates}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        {pkg.firebaseId && (
                          <>
                            <button
                              onClick={() => handleEditPackage(pkg)}
                              className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                              title="Edit package"
                            >
                              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                              onClick={() => setDeletingPackage(pkg)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete package"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Add Blog Modal */}
      <AnimatePresence>
        {showAddBlogModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowAddBlogModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto premium-shadow-2xl relative m-4 sm:m-0"
            >
              <button
                onClick={() => setShowAddBlogModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-brand-primary p-2 rounded-full bg-white transition z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-brand-primary section-title mb-4 sm:mb-6">
                  {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newBlog.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter blog title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newBlog.slug}
                        onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                        placeholder="blog-post-slug"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto-generated from title, but can be edited</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newBlog.state}
                        onChange={(e) => setNewBlog({ ...newBlog, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      >
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Assam">Assam</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Sikkim">Sikkim</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newBlog.date}
                        onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newBlog.description}
                      onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                      placeholder="Brief description of the blog post"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Image URL/Path <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newBlog.image}
                        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center space-x-1">
                          <span>📸</span>
                          <span>Using Unsplash Images (Recommended)</span>
                        </p>
                        <div className="text-xs text-blue-800 space-y-2">
                          <p><strong>Step 1:</strong> Go to <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">unsplash.com</a> and search for your image</p>
                          <p><strong>Step 2:</strong> Click on the image you want</p>
                          <p><strong>Step 3:</strong> Click "Download" or right-click → "Copy image address"</p>
                          <p><strong>Step 4:</strong> Paste the URL here</p>
                        </div>
                        <div className="mt-3 p-2 bg-white rounded border border-blue-200">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Example Unsplash URLs:</p>
                          <div className="text-xs text-gray-600 space-y-1 font-mono break-all">
                            <div className="text-blue-600">https://images.unsplash.com/photo-1234567890</div>
                            <div className="text-blue-600">https://unsplash.com/photos/abc123</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Or use local images:</p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="font-mono">/Northeast Dreamz Image Bank/image.jpg</div>
                          <p className="text-gray-500 mt-1">Start with <code className="bg-gray-200 px-1 rounded">/</code> for local images</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        value={newBlog.alt}
                        onChange={(e) => setNewBlog({ ...newBlog, alt: e.target.value })}
                        placeholder="Descriptive alt text for image"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      placeholder="Author name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      placeholder="Enter HTML content for the blog post. Use HTML tags like &lt;p&gt;, &lt;h2&gt;, etc."
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none font-mono text-sm"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use HTML format. Example: &lt;p class="mb-4 text-gray-700"&gt;Your content&lt;/p&gt;
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowAddBlogModal(false)}
                      className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveBlog}
                      className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingBlog ? 'Update Blog' : 'Save Blog'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Blog Confirmation Modal */}
      <AnimatePresence>
        {deletingBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setDeletingBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl w-full max-w-md premium-shadow-2xl relative p-6 sm:p-8 m-4 sm:m-0"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-primary section-title mb-4">
                Delete Blog Post?
              </h3>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this blog post?
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-semibold text-gray-900">{deletingBlog.title}</p>
                <p className="text-sm text-gray-500 mt-1">{deletingBlog.description}</p>
              </div>
              <p className="text-sm text-red-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
                <button
                  onClick={() => setDeletingBlog(null)}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBlog}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddPackageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowAddPackageModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto premium-shadow-2xl relative m-4 sm:m-0"
            >
              <button
                onClick={() => setShowAddPackageModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-brand-primary p-2 rounded-full bg-white transition z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-brand-primary section-title mb-4 sm:mb-6">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Package Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newPackage.name}
                        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                        placeholder="Living Roots & Waterfalls"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newPackage.state}
                        onChange={(e) => setNewPackage({ ...newPackage, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      >
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Assam">Assam</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Sikkim">Sikkim</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Cost <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newPackage.cost}
                        onChange={(e) => setNewPackage({ ...newPackage, cost: e.target.value })}
                        placeholder="₹45,000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">
                        Days <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={newPackage.days}
                        onChange={(e) => setNewPackage({ ...newPackage, days: parseInt(e.target.value) || 5 })}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Image URL/Path <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPackage.image}
                      onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use Unsplash URL or local path starting with /</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Dates (Optional)
                    </label>
                    <input
                      type="text"
                      value={newPackage.dates || ''}
                      onChange={(e) => setNewPackage({ ...newPackage, dates: e.target.value })}
                      placeholder="Available dates description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Itinerary <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                      {newPackage.itinerary?.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-brand-primary">Day {item.day}</span>
                            {newPackage.itinerary && newPackage.itinerary.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItineraryItem(index)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                            placeholder="Day title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => updateItineraryItem(index, 'desc', e.target.value)}
                            placeholder="Day description"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none text-sm"
                          />
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Image URL (Optional)
                            </label>
                            <input
                              type="text"
                              value={item.image || ''}
                              onChange={(e) => updateItineraryItem(index, 'image', e.target.value)}
                              placeholder="https://images.unsplash.com/photo-... or /path/to/image.jpg"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Add an image for this day's itinerary</p>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addItineraryItem}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors text-sm"
                      >
                        + Add Itinerary Item
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Gallery Images (Optional)
                    </label>
                    <div className="space-y-3 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                      {newPackage.gallery?.map((imageUrl, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => {
                              const updated = [...(newPackage.gallery || [])]
                              updated[index] = e.target.value
                              setNewPackage({ ...newPackage, gallery: updated })
                            }}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = newPackage.gallery?.filter((_, i) => i !== index) || []
                              setNewPackage({ ...newPackage, gallery: updated })
                            }}
                            className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setNewPackage({
                            ...newPackage,
                            gallery: [...(newPackage.gallery || []), ''],
                          })
                        }}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors text-sm"
                      >
                        + Add Gallery Image
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Add multiple images to showcase the package</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-primary mb-2">
                      Itinerary PDF URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={newPackage.pdfUrl || ''}
                      onChange={(e) => setNewPackage({ ...newPackage, pdfUrl: e.target.value })}
                      placeholder="https://example.com/path/to/itinerary.pdf"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Upload your PDF to a cloud storage (Google Drive, Dropbox, etc.) and paste the direct download link here.
                      <br />
                      <strong>Note:</strong> Make sure the link allows direct downloads (not preview links).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowAddPackageModal(false)}
                      className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePackage}
                      className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingPackage ? 'Update Package' : 'Save Package'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Package Confirmation Modal */}
      <AnimatePresence>
        {deletingPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setDeletingPackage(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl w-full max-w-md premium-shadow-2xl relative p-6 sm:p-8 m-4 sm:m-0"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-primary section-title mb-4">
                Delete Package?
              </h3>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this package?
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-semibold text-gray-900">{deletingPackage.name}</p>
                <p className="text-sm text-gray-500 mt-1">{deletingPackage.state} • {deletingPackage.days} days • {deletingPackage.cost}</p>
              </div>
              <p className="text-sm text-red-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
                <button
                  onClick={() => setDeletingPackage(null)}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePackage}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Details Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto premium-shadow-2xl relative m-4 sm:m-0"
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-brand-primary p-2 rounded-full bg-white transition z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-brand-primary section-title">
                    Inquiry Details
                  </h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedInquiry.packageName 
                      ? 'bg-brand-accent/20 text-brand-primary' 
                      : 'bg-brand-primary/10 text-brand-primary'
                  }`}>
                    {selectedInquiry.packageName ? 'Package Booking' : 'General Inquiry'}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-brand-primary mb-4 flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Contact Information</span>
                      </h3>
                      <div className="space-y-4 pl-7">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Full Name</p>
                          <p className="text-base font-medium text-gray-900">{selectedInquiry.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email</p>
                          <a 
                            href={`mailto:${selectedInquiry.email}`}
                            className="text-base text-brand-primary hover:underline flex items-center space-x-2"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{selectedInquiry.email}</span>
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Phone</p>
                          <a 
                            href={`tel:${selectedInquiry.phone}`}
                            className="text-base text-brand-primary hover:underline flex items-center space-x-2"
                          >
                            <Phone className="w-4 h-4" />
                            <span>{selectedInquiry.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {selectedInquiry.packageName && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4 flex items-center space-x-2">
                          <PackageIcon className="w-5 h-5" />
                          <span>Package Details</span>
                        </h3>
                        <div className="space-y-4 pl-7">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Package Name</p>
                            <p className="text-base font-medium text-gray-900">{selectedInquiry.packageName}</p>
                          </div>
                          {selectedInquiry.packageDescription && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Description</p>
                              <p className="text-base text-gray-700">{selectedInquiry.packageDescription}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {(selectedInquiry.plannedVisit || selectedInquiry.travelDate) && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4 flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>Travel Dates</span>
                        </h3>
                        <div className="space-y-4 pl-7">
                          {selectedInquiry.plannedVisit && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Planned Visit</p>
                              <p className="text-base text-gray-900">{selectedInquiry.plannedVisit}</p>
                            </div>
                          )}
                          {selectedInquiry.travelDate && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Travel Date</p>
                              <p className="text-base text-gray-900">{selectedInquiry.travelDate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {selectedInquiry.destination && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4">Destination</h3>
                        <p className="text-base text-gray-900">{selectedInquiry.destination}</p>
                      </div>
                    )}

                    {selectedInquiry.travelers && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4">Number of Travelers</h3>
                        <p className="text-base text-gray-900">{selectedInquiry.travelers}</p>
                      </div>
                    )}

                    {selectedInquiry.groupType && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4">Group Type</h3>
                        <p className="text-base text-gray-900">{selectedInquiry.groupType}</p>
                      </div>
                    )}

                    {selectedInquiry.preferences && selectedInquiry.preferences.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedInquiry.preferences.map((pref, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-brand-primary/10 text-brand-primary text-sm rounded-full"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedInquiry.needBookingHelp && (
                      <div>
                        <span className="px-4 py-2 bg-brand-accent/20 text-brand-primary text-sm rounded-full font-medium">
                          ✓ Needs Booking Help
                        </span>
                      </div>
                    )}

                    {selectedInquiry.message && (
                      <div>
                        <h3 className="text-lg font-semibold text-brand-primary mb-4">Message</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-base text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Submitted On</p>
                      <p className="text-base font-medium text-gray-900">
                        {formatDate(selectedInquiry.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
