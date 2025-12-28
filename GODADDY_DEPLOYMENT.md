# GoDaddy Deployment Guide with SEO Optimization

This guide will help you deploy your Next.js website to GoDaddy with optimal SEO settings.

## 📋 Prerequisites

1. **GoDaddy Account** with hosting plan
2. **Domain name** (e.g., northeastdreamz.com)
3. **FTP/Cpanel Access** to your GoDaddy hosting
4. **Node.js** installed on your local machine

## 🚀 Step 1: Build Your Site for Production

### 1.1 Update Environment Variables

Make sure your `.env.local` file has production values:

```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
NEXT_PUBLIC_APP_ID=your-app-id
```

### 1.2 Build Static Site

Run the build command to generate static files:

```bash
npm run build
```

This will create an `out` folder with all static files ready for deployment.

## 📤 Step 2: Upload to GoDaddy

### Option A: Using cPanel File Manager (Recommended)

1. **Login to GoDaddy cPanel**
   - Go to your GoDaddy account
   - Navigate to cPanel

2. **Navigate to Public HTML**
   - Open **File Manager**
   - Go to `public_html` folder (or your domain's root folder)

3. **Clear Existing Files** (if any)
   - Select all files in `public_html`
   - Delete them (keep a backup if needed)

4. **Upload Files**
   - Upload all files from the `out` folder
   - You can:
     - Drag and drop files
     - Use "Upload" button
     - Or use FTP client (see Option B)

5. **Verify Structure**
   - Ensure `index.html` is in the root
   - Check that `_next` folder is uploaded
   - Verify all images and assets are present

### Option B: Using FTP Client

1. **Get FTP Credentials**
   - From GoDaddy cPanel → FTP Accounts
   - Note: Host, Username, Password, Port

2. **Connect with FTP Client**
   - Use FileZilla, Cyberduck, or similar
   - Connect to your GoDaddy server

3. **Upload Files**
   - Navigate to `public_html` (or your domain root)
   - Upload all contents from the `out` folder
   - Maintain folder structure

## 🔧 Step 3: Configure GoDaddy Settings

### 3.1 Set Default Document

In cPanel → Indexes:
- Ensure `index.html` is the first default document

### 3.2 Enable Compression (for better SEO)

In cPanel → Optimize Website:
- Enable GZIP compression
- This improves page load speed (important for SEO)

### 3.3 Set Up SSL Certificate

1. **Get SSL Certificate**
   - GoDaddy offers free SSL with hosting
   - Enable it in cPanel → SSL/TLS Status

2. **Force HTTPS**
   - This is important for SEO
   - Google prefers HTTPS sites

## 🔍 Step 4: SEO Optimization Checklist

### 4.1 Verify SEO Files

After deployment, verify these URLs work:

- ✅ `https://yourdomain.com/robots.txt`
- ✅ `https://yourdomain.com/sitemap.xml`
- ✅ `https://yourdomain.com/favicon.ico`

### 4.2 Submit to Search Engines

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (your domain)
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit sitemap

### 4.3 Update Canonical URLs

Update the canonical URL in `app/layout.tsx`:

```typescript
alternates: {
  canonical: 'https://yourdomain.com', // Replace with your actual domain
},
```

Rebuild and redeploy after this change.

### 4.4 Update Structured Data

Update the JSON-LD schema in `app/layout.tsx`:

```typescript
url: 'https://yourdomain.com', // Replace with your actual domain
logo: 'https://yourdomain.com/logo.png', // Update logo path
contactPoint: {
  telephone: '+91-99000-00000', // Update with real phone
  email: 'info@yourdomain.com', // Update with real email
},
```

## 📊 Step 5: Performance Optimization

### 5.1 Enable Caching

In cPanel → Cache Settings:
- Enable browser caching
- Set cache expiration (recommended: 1 year for static assets)

### 5.2 Optimize Images

Before deployment:
- Compress all images
- Use WebP format where possible
- Ensure images are optimized

### 5.3 Minify Assets

The Next.js build already minifies:
- JavaScript
- CSS
- HTML

## 🔄 Step 6: Update Build Script

For future updates, use this workflow:

```bash
# 1. Make changes to your code
# 2. Build static site
npm run build

# 3. Upload the 'out' folder contents to GoDaddy
# 4. Clear browser cache and test
```

## 🐛 Troubleshooting

### Issue: 404 Errors

**Solution:**
- Ensure `trailingSlash: true` in `next.config.js` (already set)
- Check that all files from `out` folder are uploaded
- Verify `.htaccess` file (see below)

### Issue: Images Not Loading

**Solution:**
- Check image paths are correct
- Ensure images are in `public` folder
- Verify image URLs in browser console

### Issue: Firebase Not Working

**Solution:**
- Verify environment variables are set correctly
- Check Firebase config is valid
- Ensure Firestore rules allow public reads

### Issue: Slow Loading

**Solution:**
- Enable GZIP compression in cPanel
- Optimize images before upload
- Use CDN if available (GoDaddy offers CDN)

## 📝 Create .htaccess File

Create a `.htaccess` file in your `public` folder (it will be in `out` after build):

```apache
# Enable GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Force HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Custom Error Pages (Optional)
ErrorDocument 404 /404.html
```

**Note:** For Next.js static export, you may need to handle routing differently. The `.htaccess` above handles basic optimizations.

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly at your domain
- [ ] All images display properly
- [ ] Navigation works
- [ ] Forms submit correctly (if using Firebase)
- [ ] `robots.txt` is accessible
- [ ] `sitemap.xml` is accessible
- [ ] SSL certificate is active (HTTPS)
- [ ] Site is submitted to Google Search Console
- [ ] Site is submitted to Bing Webmaster Tools
- [ ] Mobile responsiveness works
- [ ] Page speed is acceptable (use Google PageSpeed Insights)

## 🎯 SEO Best Practices Implemented

Your site already includes:

✅ **Meta Tags** - Title, description, keywords
✅ **Open Graph** - For social media sharing
✅ **Twitter Cards** - For Twitter sharing
✅ **Structured Data** - JSON-LD schema
✅ **Sitemap** - XML sitemap for search engines
✅ **Robots.txt** - Search engine directives
✅ **Semantic HTML** - Proper HTML structure
✅ **Alt Text** - Image alt attributes
✅ **Canonical URLs** - Prevent duplicate content
✅ **Mobile Responsive** - Mobile-friendly design

## 📈 Monitor Your SEO

After deployment:

1. **Google Search Console**
   - Monitor search performance
   - Check for indexing issues
   - View search analytics

2. **Google Analytics** (Optional)
   - Track visitor behavior
   - Monitor traffic sources
   - Analyze user engagement

3. **PageSpeed Insights**
   - Test page speed
   - Get optimization suggestions
   - Monitor Core Web Vitals

## 🚀 Quick Deploy Commands

```bash
# Full deployment workflow
npm run build
# Then upload 'out' folder to GoDaddy
```

## 📞 Need Help?

If you encounter issues:
1. Check GoDaddy's documentation
2. Verify all files are uploaded correctly
3. Check browser console for errors
4. Test with different browsers

---

**Your site is now ready for deployment with optimal SEO settings!** 🎉
