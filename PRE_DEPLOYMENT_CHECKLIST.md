# Pre-Deployment Checklist

Before deploying to GoDaddy, update these items with your actual domain and information.

## 🔗 Update Domain URLs

### 1. `app/layout.tsx`

Update these lines:

```typescript
// Line 33: Update canonical URL
alternates: {
  canonical: 'https://YOURDOMAIN.com', // ← Change this
},

// Line 54: Update JSON-LD schema URL
url: 'https://YOURDOMAIN.com', // ← Change this

// Line 55: Update logo URL (if you have a logo)
logo: 'https://YOURDOMAIN.com/logo.png', // ← Change this

// Line 58: Update phone number
telephone: '+91-XXXXXXXXXX', // ← Change this

// Line 60: Update email
email: 'info@YOURDOMAIN.com', // ← Change this
```

### 2. `app/sitemap.ts`

Update base URL:

```typescript
// Line 4: Update base URL
const baseUrl = 'https://YOURDOMAIN.com' // ← Change this
```

Or set environment variable:
```env
NEXT_PUBLIC_SITE_URL=https://YOURDOMAIN.com
```

### 3. `app/robots.ts`

Update sitemap URL:

```typescript
// Line 9: Update sitemap URL
sitemap: 'https://YOURDOMAIN.com/sitemap.xml', // ← Change this
```

### 4. `public/robots.txt`

Update sitemap URL:

```
Sitemap: https://YOURDOMAIN.com/sitemap.xml
```

## 📧 Update Contact Information

### In `app/layout.tsx` JSON-LD schema:

- **Phone Number**: Update with your real contact number
- **Email**: Update with your real email address
- **Logo**: Update logo path if you have one

## 🔐 Environment Variables

Ensure `.env.local` has production values:

```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
NEXT_PUBLIC_APP_ID=your-app-id
NEXT_PUBLIC_SITE_URL=https://YOURDOMAIN.com
```

## 🖼️ Images & Assets

- [ ] All images are optimized
- [ ] Logo file exists (if referenced)
- [ ] Favicon is set
- [ ] All image paths are correct

## ✅ SEO Verification

- [ ] Meta title is descriptive
- [ ] Meta description is compelling
- [ ] Keywords are relevant
- [ ] Open Graph tags are complete
- [ ] Twitter Card tags are complete
- [ ] Structured data (JSON-LD) is accurate
- [ ] All URLs use HTTPS
- [ ] Canonical URLs are set

## 🧪 Testing

Before deployment, test locally:

```bash
npm run build
npm start
```

Test:
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Forms submit (if using Firebase)
- [ ] Mobile responsive
- [ ] No console errors

## 📝 Final Steps

1. **Update all URLs** in the files listed above
2. **Update contact information**
3. **Test build locally**: `npm run build`
4. **Check the `out` folder** exists and has all files
5. **Ready to deploy!**

## 🚀 After Updating

1. Run `npm run build`
2. Upload `out` folder to GoDaddy
3. Test your live site
4. Submit to Google Search Console
5. Submit to Bing Webmaster Tools

---

**Once all items are checked, you're ready to deploy!** ✅
