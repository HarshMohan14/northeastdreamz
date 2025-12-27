# Quick Start Guide

## 🚀 Getting Your Site Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase (Optional but Recommended)

If you want form submissions to work:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
NEXT_PUBLIC_APP_ID=your-app-id
```

**Note:** The site will work without Firebase - form submissions will just log to console in development.

### 3. Add Your Images

Place your images in the `public/` directory:
- Customer gallery images
- Package images
- Blog post images

The code references these images from your original HTML:
- `2a0ee7f6fbe1530c0558c44723bcd9e8.jpg`
- `9b4832c29ef18ad9c168652a88874450.jpg`
- `846b1c56c5b0078b59647d3215c8b9e2.jpg`
- `96772b9688ecc97ced4f7742bead5dd0.jpg`
- `3903757b0aa237109f58f1216a0cc3f1.jpg`
- `774575a9275321fcf868921a11d02b3e.jpg`
- `all-saints-church-shillong-meghalaya-2-attr-hero.jpg`
- `34375365711_bcedb321eb_b.jpg`
- `_ab95a98e-2fc4-11eb-9f6e-b84f2c2b8c49.avif`

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

## ✨ Key Features Implemented

✅ **SEO Optimized**
- Comprehensive metadata
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Semantic HTML

✅ **Beautiful Animations**
- Framer Motion throughout
- Smooth page transitions
- Hover effects
- Scroll animations

✅ **Premium Design**
- Clean, modern UI
- Premium color scheme
- Responsive design
- Video hero section

✅ **Interactive Components**
- Package filtering
- Modal dialogs
- Image gallery carousel
- Reviews carousel

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'brand-primary': '#0C4B4D',    // Your primary color
  'brand-secondary': '#D4DEDF',   // Secondary color
  'brand-accent': '#E8B900',      // Accent color
}
```

### Update Content
- **Packages**: Manage via Admin Dashboard or Firebase Console (all packages are in Firebase database)
- **Reviews**: `lib/data.ts` → `MOCK_REVIEWS`
- **Blog Posts**: Manage via Admin Dashboard or Firebase Console

### Change Fonts
The site uses:
- **Inter** for body text (sans-serif)
- **Playfair Display** for headings (serif)

To change, edit `app/globals.css` and `tailwind.config.ts`

## 📝 Next Steps

1. Replace placeholder images with your actual photos
2. Update package data with real pricing and dates
3. Add your Firebase configuration
4. Customize colors and branding
5. Deploy to Vercel/Netlify

## 🐛 Troubleshooting

**Images not loading?**
- Make sure images are in the `public/` directory
- Check image filenames match exactly (case-sensitive)

**Firebase errors?**
- Check your `.env.local` file exists
- Verify Firebase config JSON is valid
- Make sure Firestore is enabled in Firebase console

**Build errors?**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+ required)

