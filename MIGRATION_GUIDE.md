# Package Migration Guide

This guide explains how to migrate all packages from static code to Firebase database for full control.

## Overview

All packages are now managed in Firebase database. The static `PACKAGE_DATA` array in `lib/data.ts` has been deprecated and is kept only for reference.

## Migration Steps

### Step 1: Run the Migration Script

You have two options to migrate the static packages to Firebase:

#### Option A: Using Node.js (Recommended)

```bash
# Make sure you have your Firebase config set in environment variables
export NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
export NEXT_PUBLIC_APP_ID='your-app-id'

# Run the migration script
node scripts/migrate-packages-to-firebase.js
```

#### Option B: Using TypeScript (if you have ts-node or tsx)

```bash
# Install tsx if needed
npm install -g tsx

# Run the migration script
npx tsx scripts/migrate-packages-to-firebase.ts
```

### Step 2: Verify Migration

After running the migration script, verify that all packages were successfully migrated:

1. Check the console output for success/error messages
2. Go to your Firebase Console → Firestore Database
3. Navigate to: `artifacts/{your-app-id}/public/data/packages`
4. Verify that all 10 packages are present

### Step 3: Code Updates (Already Done)

The following changes have already been made to the codebase:

- ✅ `PackagesSection.tsx` - Now loads packages only from Firebase
- ✅ Removed fallback to static packages
- ✅ Updated ID generation to work without static packages
- ✅ Added loading state for packages
- ✅ Marked `PACKAGE_DATA` as deprecated in `lib/data.ts`

## Managing Packages

### Adding a New Package

Use the Admin Dashboard to add new packages. All packages are stored in Firebase and will be automatically displayed on the website.

### Editing Packages

1. Go to Admin Dashboard
2. Navigate to Packages section
3. Edit any package directly in Firebase
4. Changes will be reflected immediately on the website

### Deleting Packages

1. Go to Admin Dashboard
2. Navigate to Packages section
3. Delete the package from Firebase
4. The package will be removed from the website

## Troubleshooting

### No Packages Showing

If no packages are showing on the website:

1. **Check Firebase Connection**: Verify that `NEXT_PUBLIC_FIREBASE_CONFIG` is set correctly
2. **Check App ID**: Verify that `NEXT_PUBLIC_APP_ID` matches your Firebase setup
3. **Check Firestore Rules**: Ensure your Firestore security rules allow reading from the packages collection
4. **Check Console**: Look for errors in the browser console

### Migration Script Fails

If the migration script fails:

1. **Check Environment Variables**: Ensure `NEXT_PUBLIC_FIREBASE_CONFIG` and `NEXT_PUBLIC_APP_ID` are set
2. **Check Firebase Config**: Verify the JSON is valid and contains all required fields
3. **Check Firestore Rules**: Ensure write permissions are enabled for the migration
4. **Check Network**: Ensure you have internet connection to access Firebase

### Duplicate Packages

If you see duplicate packages:

1. The migration script doesn't check for duplicates
2. You may need to manually delete duplicates from Firebase Console
3. Or update the script to check for existing packages before adding

## Firebase Structure

Packages are stored in Firestore at:
```
artifacts/{appId}/public/data/packages/{packageId}
```

Each package document contains:
- `state`: string
- `name`: string
- `cost`: string
- `days`: number
- `image`: string
- `itinerary`: array of { day, title, desc }
- `dates`: string (optional)
- `gallery`: string[] (optional)
- `availableDates`: array of { month, dates[] } (optional)
- `pdfUrl`: string (optional)
- `timestamp`: string (ISO date)

## Notes

- The static `PACKAGE_DATA` array is kept for reference but should not be used
- All packages must be in Firebase for the website to function
- The migration script can be run multiple times (but will create duplicates)
- Consider adding duplicate checking if you need to re-run the migration
