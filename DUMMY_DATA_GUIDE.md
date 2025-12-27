# Dummy Data Guide - Packages & PDF URLs

## Overview

All packages now have dummy PDF URLs added. These are placeholder URLs that can be replaced with actual PDF links when you have the real itinerary PDFs ready.

## Current Dummy PDF URLs

All packages have been assigned dummy Google Drive PDF URLs in the format:
```
https://drive.google.com/file/d/{unique-id}/view?usp=sharing
```

### Package PDF URLs:

1. **Living Roots & Waterfalls** (Meghalaya)
   - `https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/view?usp=sharing`

2. **Adventure Caves & Clear Rivers** (Meghalaya)
   - `https://drive.google.com/file/d/2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q/view?usp=sharing`

3. **Misty Shillong & Local Culture** (Meghalaya)
   - `https://drive.google.com/file/d/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r/view?usp=sharing`

4. **Rhino & River Cruise** (Assam)
   - `https://drive.google.com/file/d/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s/view?usp=sharing`

5. **Majuli Island Cultural Retreat** (Assam)
   - `https://drive.google.com/file/d/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t/view?usp=sharing`

6. **Tea Trails & Ahom History** (Assam)
   - `https://drive.google.com/file/d/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u/view?usp=sharing`

7. **Monastic Himalayan Trail** (Arunachal Pradesh)
   - `https://drive.google.com/file/d/7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v/view?usp=sharing`

8. **Ziro Valley Festival Special** (Arunachal Pradesh)
   - `https://drive.google.com/file/d/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w/view?usp=sharing`

9. **North Sikkim Alpine Loop** (Sikkim)
   - `https://drive.google.com/file/d/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x/view?usp=sharing`

10. **West Sikkim Heritage & Views** (Sikkim)
    - `https://drive.google.com/file/d/0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y/view?usp=sharing`

## How to Replace with Real PDFs

### Option 1: Update via Admin Dashboard (Recommended)

1. Go to Admin Dashboard
2. Click on "Packages" tab
3. Find the package you want to update
4. Click "Edit" button
5. Update the "PDF URL" field with your actual PDF link
6. Click "Save"

### Option 2: Update via Firebase Console

1. Go to Firebase Console → Firestore Database
2. Navigate to: `artifacts/{your-app-id}/public/data/packages`
3. Find the package document
4. Edit the `pdfUrl` field
5. Save the document

### Option 3: Update in Code (for static data)

If you're still using static data (before migration), edit `lib/data.ts` and replace the `pdfUrl` values.

## PDF Hosting Options

You can host your PDFs on:

1. **Google Drive** (Recommended)
   - Upload PDF to Google Drive
   - Right-click → Get link
   - Change sharing to "Anyone with the link"
   - Use the view link format: `https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing`

2. **Firebase Storage**
   - Upload PDFs to Firebase Storage
   - Get the download URL
   - Use that URL as `pdfUrl`

3. **AWS S3 / Cloud Storage**
   - Upload PDFs to your cloud storage
   - Get the public URL
   - Use that URL as `pdfUrl`

4. **Your Own Server**
   - Upload PDFs to your server
   - Use the direct URL: `https://yourdomain.com/pdfs/package-name.pdf`

## Testing PDF URLs

After updating PDF URLs:

1. Go to the website
2. Click on a package
3. Click "View Itinerary"
4. Click "Download Detailed Itinerary"
5. Verify the PDF opens in a new tab

## Migration Note

When you migrate packages to Firebase using the migration script or admin panel, the PDF URLs will be included automatically. You can then update them individually through the Admin Dashboard.

## Current Status

✅ All 10 packages have dummy PDF URLs
✅ Migration script includes PDF URLs
✅ Admin Dashboard can edit PDF URLs
✅ Download button opens PDF URLs in new tab

## Next Steps

1. Create actual itinerary PDFs for each package
2. Upload PDFs to your preferred hosting service
3. Update PDF URLs through Admin Dashboard
4. Test the download functionality
