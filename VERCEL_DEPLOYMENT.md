# Vercel Deployment Guide

## 🔒 Important: Keep .env.local in .gitignore

**DO NOT remove `.env.local` from `.gitignore`!** This file contains sensitive information and should never be committed to git.

## ✅ How to Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Log in to [Vercel](https://vercel.com)
2. Select your project: `northeastdreamz`
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Each Environment Variable

Add the following environment variables one by one:

#### 1. Firebase Configuration
- **Name:** `NEXT_PUBLIC_FIREBASE_CONFIG`
- **Value:** Your Firebase config JSON (as a string)
- **Example:**
  ```
  {"apiKey":"AIzaSyCiugccg5q9tNfFV8-HOrFDStYJz-DB5NA","authDomain":"northeastdreamz-15b67.firebaseapp.com","projectId":"northeastdreamz-15b67","storageBucket":"northeastdreamz-15b67.firebasestorage.app","messagingSenderId":"929002890606","appId":"1:929002890606:web:871697214b4ec7f70b0d7f"}
  ```
- **Environments:** Production, Preview, Development (select all)

#### 2. App ID
- **Name:** `NEXT_PUBLIC_APP_ID`
- **Value:** `northeast-dreamz`
- **Environments:** Production, Preview, Development (select all)

#### 3. Admin Email (Optional - for custom credentials)
- **Name:** `NEXT_PUBLIC_ADMIN_EMAIL`
- **Value:** `admin@northeastdreamz.com` (or your custom email)
- **Environments:** Production, Preview, Development (select all)

#### 4. Admin Password (Optional - for custom credentials)
- **Name:** `NEXT_PUBLIC_ADMIN_PASSWORD`
- **Value:** `admin123` (or your custom secure password)
- **Environments:** Production, Preview, Development (select all)

### Step 3: Redeploy

After adding all environment variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on your latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## 📝 Quick Checklist

- [ ] `NEXT_PUBLIC_FIREBASE_CONFIG` added
- [ ] `NEXT_PUBLIC_APP_ID` added
- [ ] `NEXT_PUBLIC_ADMIN_EMAIL` added (optional)
- [ ] `NEXT_PUBLIC_ADMIN_PASSWORD` added (optional)
- [ ] All variables set for Production, Preview, and Development
- [ ] Redeployed the application

## 🔐 Security Best Practices

1. **Never commit `.env.local` to git** - It's already in `.gitignore` ✅
2. **Use strong admin passwords** in production
3. **Rotate credentials** periodically
4. **Use different passwords** for different environments if needed
5. **Review Vercel environment variables** regularly

## 🐛 Troubleshooting

### Environment variables not working?
- Make sure variable names match exactly (case-sensitive)
- Ensure variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check Vercel build logs for errors

### Firebase not connecting?
- Verify `NEXT_PUBLIC_FIREBASE_CONFIG` JSON is valid
- Check that all Firebase services are enabled
- Ensure Firestore security rules allow the operations

### Admin panel not accessible?
- Verify `NEXT_PUBLIC_ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_PASSWORD` are set
- Check that variables start with `NEXT_PUBLIC_` (required for client-side access)

## 📚 Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
