# Quick Deployment Guide - GoDaddy

## 🚀 3-Step Deployment

### Step 1: Build
```bash
npm run build
```
This creates an `out` folder with all static files.

### Step 2: Upload
1. Login to GoDaddy cPanel
2. Open File Manager
3. Go to `public_html` folder
4. Upload ALL contents from the `out` folder

### Step 3: Verify
1. Visit your domain
2. Check `yourdomain.com/robots.txt`
3. Check `yourdomain.com/sitemap.xml`
4. Test all pages work

## ⚙️ Before Building

### Update Domain in Code

1. **Update `app/layout.tsx`:**
   - Change `canonical: 'https://northeastdreamz.com'` to your domain
   - Update JSON-LD schema URLs
   - Update contact information

2. **Update `app/sitemap.ts`:**
   - Change `baseUrl` to your domain

3. **Update `app/robots.ts`:**
   - Change sitemap URL to your domain

4. **Rebuild:**
   ```bash
   npm run build
   ```

## 📋 Post-Deployment Checklist

- [ ] Site loads at your domain
- [ ] HTTPS is working (SSL enabled)
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] All images load
- [ ] Forms work (if using Firebase)
- [ ] Mobile responsive
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

## 🔄 Updating Your Site

1. Make changes locally
2. Run `npm run build`
3. Upload new `out` folder contents to GoDaddy
4. Clear browser cache and test

## 🆘 Common Issues

**404 Errors:** Ensure all files from `out` folder are uploaded

**Images Not Loading:** Check image paths in `public` folder

**Slow Loading:** Enable GZIP compression in cPanel

---

**See `GODADDY_DEPLOYMENT.md` for detailed instructions.**
