# How to Migrate Static Packages to Firebase

There are two ways to migrate the static packages to Firebase:

## Method 1: Using Admin Dashboard (Easiest) ⭐

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open the Admin Dashboard:**
   - Navigate to your admin panel
   - Click on the **"Packages"** tab

3. **Click "Migrate Static Packages" button:**
   - This button only appears when there are no packages in the database
   - Click the button to start the migration
   - Wait for the migration to complete
   - You'll see a success message when done

4. **Refresh the packages list:**
   - Click the "Refresh" button to see your migrated packages

## Method 2: Using Command Line

1. **Set up environment variables:**
   Make sure you have a `.env.local` file with:
   ```env
   NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
   NEXT_PUBLIC_APP_ID=your-app-id
   ```

2. **Run the migration script:**
   ```bash
   node scripts/migrate-packages-to-firebase.js
   ```

3. **Verify in Firebase Console:**
   - Go to Firebase Console → Firestore Database
   - Navigate to: `artifacts/{your-app-id}/public/data/packages`
   - You should see 10 packages

## What Gets Migrated?

All 10 static packages from `lib/data.ts`:
1. Living Roots & Waterfalls (Meghalaya)
2. Adventure Caves & Clear Rivers (Meghalaya)
3. Misty Shillong & Local Culture (Meghalaya)
4. Rhino & River Cruise (Assam)
5. Majuli Island Cultural Retreat (Assam)
6. Tea Trails & Ahom History (Assam)
7. Monastic Himalayan Trail (Arunachal Pradesh)
8. Ziro Valley Festival Special (Arunachal Pradesh)
9. North Sikkim Alpine Loop (Sikkim)
10. West Sikkim Heritage & Views (Sikkim)

## Troubleshooting

### "NEXT_PUBLIC_FIREBASE_CONFIG is not set"
- Make sure you have a `.env.local` file in the root directory
- Verify the Firebase config JSON is valid
- Restart your development server after adding environment variables

### "Packages already exist"
- If packages already exist, the migration will ask for confirmation
- You can choose to proceed (creates duplicates) or cancel
- To avoid duplicates, delete existing packages from Firebase Console first

### "Migration failed"
- Check your Firebase Console for errors
- Verify Firestore security rules allow writes
- Check that your Firebase project has Firestore enabled
- Verify the collection path matches: `artifacts/{appId}/public/data/packages`

### Packages not showing after migration
- Click the "Refresh" button in the admin panel
- Check the browser console for errors
- Verify packages exist in Firebase Console
- Check that `NEXT_PUBLIC_APP_ID` matches your Firebase setup

## After Migration

Once packages are migrated:
- ✅ All packages are now in Firebase
- ✅ You can edit/delete packages through the Admin Dashboard
- ✅ You can add new packages through the Admin Dashboard
- ✅ The static `PACKAGE_DATA` array is no longer used (kept for reference only)

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Check Firebase Console for package data
3. Verify environment variables are set correctly
4. Check Firestore security rules
