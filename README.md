# Content Performance Dashboard - Static Version

✅ **NO NPM, NO BUILD TOOLS** - Just upload and go!

## 📁 Single File Dashboard

```
content-dashboard/
└── index.html  ← That's it! Just ONE file!
```

## 🚀 Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `content-dashboard`
3. Make it Public
4. Click "Create repository"

### Step 2: Upload File

**Option A: Via GitHub Website**
1. Click "uploading an existing file"
2. Drag `index.html` into the upload area
3. Click "Commit changes"

**Option B: Via Git**
```bash
git init
git add index.html
git commit -m "Add dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch `main`
4. Folder: `/ (root)`
5. Click "Save"

### Step 4: Visit Your Site

Your dashboard will be live at:
```
https://YOUR_USERNAME.github.io/content-dashboard/
```

Wait 1-2 minutes for it to deploy!

## 🎯 Features

- ✅ Content Calendar with filters
- ✅ Organic vs Paid comparison
- ✅ Multi-platform metrics (IG, FB, TikTok, YouTube)
- ✅ Interactive filtering
- ✅ Responsive design
- ✅ Works offline (no external dependencies!)

## 💡 Customize Data

To add your own content data, open `index.html` and find line 207:

```javascript
const contentData = [
    {
        contentNumber: 'Content 646',
        contentType: 'shared',
        hook: 'Your hook here',
        // ... add your data
    }
];
```

Just edit the data array with your content!

## ✅ Advantages

- **No build process** - just HTML, CSS, JavaScript
- **No dependencies** - everything in one file
- **Works anywhere** - GitHub Pages, Netlify, any web host
- **Double-click to run** - works locally in browser
- **Easy to edit** - just one file to modify

## 🔧 Troubleshooting

**Page not loading?**
- Wait 1-2 minutes after pushing
- Check Settings → Pages is enabled
- Verify file is named `index.html` (lowercase)

**Want to test locally?**
- Just double-click `index.html`
- Or use: `python -m http.server 8000`
- Open http://localhost:8000

## 📊 How It Works

Everything is in ONE file:
- HTML structure
- CSS styles (in `<style>` tag)
- JavaScript logic (in `<script>` tag)
- Sample data (hardcoded in JS)

No compilation needed - the browser runs it directly!

---

**That's it!** Upload `index.html` and you're done! 🎉
