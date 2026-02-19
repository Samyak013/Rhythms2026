# RHYTHMS 2026 - Hostinger Deployment Guide

## 📁 Files Ready for Upload

Your production build is complete! All necessary files are in the `dist/public` folder.

## 🚀 Step-by-Step Deployment to Hostinger

### Step 1: Access Hostinger File Manager

1. Log in to your Hostinger account
2. Go to **hPanel** → **File Manager**
3. Navigate to `public_html` folder (this is your website's root directory)

### Step 2: Upload Your Website Files

1. **Clear existing files** (if any) in `public_html`
2. Upload **ALL** contents from the `dist/public` folder:
   - `index.html`
   - `favicon.png`
   - `.htaccess` (IMPORTANT for routing!)
   - `assets/` folder (contains all CSS, JS, and images)

**Important:** Make sure to upload the `.htaccess` file! It's hidden on Windows by default but it's crucial for proper routing.

### Step 3: Verify File Structure

After upload, your `public_html` should look like this:
```
public_html/
├── index.html
├── favicon.png
├── .htaccess
└── assets/
    ├── index-HE8qBnIW.css
    ├── index-KKx3F2ro.js
    ├── logo-CTLbM0UX.png
    ├── logoc-CkMAFxRB.png
    └── ufo-nZgW8IH1.png
```

### Step 4: Set Correct File Permissions

In Hostinger File Manager:
1. Select all files and folders
2. Right-click → **Permissions**
3. Set folders to `755`
4. Set files to `644`

### Step 5: Test Your Website

1. Visit your domain (e.g., `https://yourdomain.com`)
2. Test all pages:
   - Home page: `/`
   - About page: `/about`
   - Events page: `/events`
   - Contact page: `/contact`
3. Make sure navigation works smoothly
4. Test the UFO animation (should only show once per session)

## ✅ Checklist

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present
- [ ] File permissions set correctly
- [ ] Home page loads successfully
- [ ] All navigation links work
- [ ] All pages display correctly
- [ ] UFO animation works
- [ ] Theme days section visible on About page
- [ ] Events listing displays properly

## 🔧 Troubleshooting

### Issue: Pages show 404 error when refreshing
**Solution:** Make sure `.htaccess` file is uploaded and contains the rewrite rules.

### Issue: Site doesn't load
**Solution:** 
1. Check if files are in `public_html` (not in a subfolder)
2. Clear browser cache
3. Check file permissions

### Issue: Images not loading
**Solution:** 
1. Verify `assets/` folder is uploaded
2. Check file permissions on images (should be 644)

### Issue: Routing doesn't work
**Solution:** 
1. Verify `.htaccess` file exists
2. Check if mod_rewrite is enabled (contact Hostinger support if needed)

## 📝 Important Notes

1. **Google Form Integration:** Remember to update the Google Form URL in `client/src/config/registration.ts` before rebuilding for final deployment

2. **Database:** Currently configured for local SQLite. For production with Hostinger MySQL:
   - Update environment variables
   - Configure MySQL connection in Hostinger
   - Run database migrations

3. **HTTPS:** Hostinger provides free SSL. Enable it in hPanel → SSL

4. **After Making Changes:** If you make any code changes:
   ```bash
   npm run build
   ```
   Then re-upload the `dist/public` folder contents.

## 🎉 Your Website is Live!

Once uploaded, your RHYTHMS 2026 website will be accessible at your domain with:
- Smooth navigation between all pages
- Working UFO animation
- Theme days information
- Event listings
- Contact page
- All styling and animations intact

Need help? Check Hostinger documentation or contact their 24/7 support!
