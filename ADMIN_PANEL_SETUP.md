# Admin Panel Setup Guide

## 🎯 What You Need to Do

### Step 1: Set Up Firebase (Required for Admin Panel)

The admin panel needs Firebase to store and retrieve user inquiries. Follow these steps:

#### 1.1 Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

#### 1.2 Enable Firestore Database
1. In your Firebase project, go to **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** (you can set up security rules later)
4. Select a location closest to your users
5. Click "Enable"

#### 1.3 Get Your Firebase Configuration
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. If you don't have a web app, click the **Web icon** (`</>`) to add one
4. Register your app with a nickname (e.g., "Northeast Dreamz Website")
5. Copy the `firebaseConfig` object

#### 1.4 Create Environment Variables File
Create a file named `.env.local` in the root of your project:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"YOUR_API_KEY","authDomain":"YOUR_PROJECT.firebaseapp.com","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_PROJECT.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abcdef"}'

# App ID (can be any unique identifier, e.g., your project name)
NEXT_PUBLIC_APP_ID=northeast-dreamz

# Admin Panel Credentials (Optional - defaults shown below)
NEXT_PUBLIC_ADMIN_EMAIL=admin@northeastdreamz.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

**Important:** 
- Replace the values in `NEXT_PUBLIC_FIREBASE_CONFIG` with your actual Firebase config
- Keep the quotes around the JSON string
- The `.env.local` file should NOT be committed to git (it's already in `.gitignore`)

### Step 2: Set Up Firestore Security Rules (Recommended)

To secure your data, set up Firestore security rules:

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for inquiries (form submissions)
    match /artifacts/{appId}/public/data/inquiries/{inquiryId} {
      allow read, write: if true;
    }
    
    // Allow read/write for blogs
    match /artifacts/{appId}/public/data/blogs/{blogId} {
      allow read: if true;  // Anyone can read blogs
      allow write: if true; // Allow writes (you may want to restrict this in production)
    }
    
    // Allow read/write for packages
    match /artifacts/{appId}/public/data/packages/{packageId} {
      allow read: if true;  // Anyone can read packages
      allow write: if true; // Allow writes (you may want to restrict this in production)
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Note:** The above rules allow public writes (for form submissions) but you should restrict reads. For production, consider:
- Using Firebase Authentication for admin access
- Setting up proper read/write permissions
- Using Firebase Functions to handle form submissions securely

### Step 3: Test the Admin Panel

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the inquiry form:**
   - Go to `http://localhost:3000`
   - Scroll to the "Get In Touch" section
   - Fill out and submit the inquiry form
   - You should see a success message

3. **Test the admin panel:**
   - Go to `http://localhost:3000/admin-panel`
   - Login with default credentials:
     - Email: `admin@northeastdreamz.com`
     - Password: `admin123`
   - You should see your submitted inquiry in the "User Inquiries" section

### Step 4: Customize Admin Credentials (Optional but Recommended)

For security, change the default admin credentials:

1. Update `.env.local`:
   ```env
   NEXT_PUBLIC_ADMIN_EMAIL=your-secure-email@example.com
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ```

2. Restart your development server for changes to take effect

### Step 5: Deploy to Production

When deploying to production (Vercel, Netlify, etc.):

1. **Add environment variables in your hosting platform:**
   - Go to your project settings
   - Add all variables from `.env.local` as environment variables
   - Make sure to use the same variable names (starting with `NEXT_PUBLIC_`)

2. **For Vercel:**
   - Go to Project Settings → Environment Variables
   - Add each variable from your `.env.local`
   - Redeploy your application

3. **For Netlify:**
   - Go to Site Settings → Environment Variables
   - Add each variable
   - Redeploy your site

## 🔒 Security Recommendations

1. **Change default admin credentials** before going live
2. **Set up proper Firestore security rules** to protect your data
3. **Consider using Firebase Authentication** for more secure admin access
4. **Use environment variables** for all sensitive data
5. **Regularly review** submitted inquiries and clean up old data

## 📊 How It Works

1. **User submits inquiry form** → Data saved to Firebase Firestore
2. **User submits booking modal** → Data saved to Firebase Firestore
3. **Admin logs into `/admin-panel`** → Fetches all inquiries from Firebase
4. **Admin can view** all inquiries with full details

## 🐛 Troubleshooting

### Admin panel shows "No inquiries found"
- Check that Firebase is properly configured in `.env.local`
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors
- Make sure you've submitted at least one inquiry form

### Can't login to admin panel
- Verify `NEXT_PUBLIC_ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_PASSWORD` are set correctly
- Check browser console for errors
- Try clearing browser cache/localStorage

### Form submissions not appearing
- Check Firebase Console → Firestore Database to see if data is being saved
- Verify the collection path: `artifacts/{APP_ID}/public/data/inquiries`
- Check browser console for Firebase errors
- Ensure Firestore security rules allow writes

### Firebase connection errors
- Verify your `NEXT_PUBLIC_FIREBASE_CONFIG` JSON is valid
- Check that all required Firebase services are enabled
- Ensure your Firebase project billing is enabled (Firestore requires it)

## 📝 Next Steps

- [ ] Set up Firebase project
- [ ] Create `.env.local` with Firebase config
- [ ] Test form submission
- [ ] Test admin panel login
- [ ] Change default admin credentials
- [ ] Set up Firestore security rules
- [ ] Deploy to production with environment variables

---

**Need Help?** Check the Firebase documentation or review the code in:
- `lib/firebase.ts` - Firebase configuration
- `components/AdminLogin.tsx` - Login component
- `components/AdminDashboard.tsx` - Dashboard component
- `components/InquiryFormSection.tsx` - Inquiry form
