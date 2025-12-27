# Troubleshooting: Packages Not Showing in Admin Panel

If migrated packages are not showing in the admin panel, follow these steps:

## Step 1: Check Browser Console

Open your browser's developer console (F12) and look for:
- `🔄 Fetching packages from Firebase...`
- `✅ Fetched X packages from Firebase`
- Any error messages

## Step 2: Verify Packages in Firebase

1. Go to Firebase Console → Firestore Database
2. Navigate to: `artifacts/{your-app-id}/public/data/packages`
3. Verify that packages exist in the database
4. Check that each package has:
   - `state` (string)
   - `name` (string)
   - `cost` (string)
   - `days` (number)
   - `image` (string)
   - `itinerary` (array)
   - `timestamp` (string, optional but recommended)

## Step 3: Check Environment Variables

Verify these are set correctly:
- `NEXT_PUBLIC_FIREBASE_CONFIG` - Your Firebase configuration JSON
- `NEXT_PUBLIC_APP_ID` - Your app ID (defaults to 'default-app-id' if not set)

## Step 4: Check Firestore Security Rules

Ensure your Firestore security rules allow reading from the packages collection:

```javascript
match /artifacts/{appId}/public/data/packages/{packageId} {
  allow read: if true; // Or your specific auth rules
  allow write: if request.auth != null; // Or your specific auth rules
}
```

## Step 5: Common Issues

### Issue: "Firestore not initialized"
**Solution**: Check that `NEXT_PUBLIC_FIREBASE_CONFIG` is set correctly and contains valid JSON.

### Issue: "Timestamp ordering failed"
**Solution**: This is handled automatically - packages will still be fetched, just without timestamp ordering. You can add timestamps to existing packages manually or re-run the migration.

### Issue: Packages exist but not showing
**Solution**: 
1. Click the "Refresh" button in the admin panel
2. Check the browser console for errors
3. Verify the package data structure matches the expected format

### Issue: Empty array returned
**Solution**:
1. Check Firestore security rules
2. Verify the collection path matches: `artifacts/{appId}/public/data/packages`
3. Check that `NEXT_PUBLIC_APP_ID` matches your Firebase setup

## Step 6: Re-run Migration (if needed)

If packages are missing, you can re-run the migration script:

```bash
node scripts/migrate-packages-to-firebase.js
```

**Note**: This will create duplicate packages if they already exist. You may need to delete duplicates manually from Firebase Console.

## Step 7: Manual Package Check

To manually verify a package structure, check the browser console for:
```javascript
// In browser console, you can test:
// (Make sure Firebase is initialized)
import { getPackages } from '@/lib/firebase'
const packages = await getPackages()
console.log('Packages:', packages)
```

## Debugging Tips

1. **Enable verbose logging**: The code now includes console.log statements to help debug
2. **Check network tab**: Look for Firestore requests in the Network tab
3. **Check Firebase Console**: Verify packages exist and have correct structure
4. **Test with a single package**: Try adding one package manually through the admin panel to verify the flow works

## Still Not Working?

If packages still don't show:
1. Check the browser console for specific error messages
2. Verify Firebase initialization is successful
3. Check that the AdminDashboard component is actually calling `fetchPackages()`
4. Verify the packages tab is active (click on "Packages" tab in admin panel)
