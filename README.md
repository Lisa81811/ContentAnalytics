# Content Performance Dashboard

Multi-platform content analytics dashboard for Instagram, Facebook, TikTok, and YouTube.

## 📁 Files (Only 5 Essential Files!)

```
content-dashboard/
├── index.html          ← HTML entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
└── src/
    ├── main.jsx       ← React entry point
    └── App.jsx        ← All components & styles in ONE file
```

## 🚀 Quick Deploy to Netlify

### Step 1: Upload to GitHub

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git
git push -u origin main
```

### Step 2: Deploy on Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import from Git"
3. Select your GitHub repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site"

Done! Your dashboard will be live in 2 minutes.

## 💻 Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## ✨ Features

- **Content Calendar** - View all content with performance metrics
- **Organic vs Paid** - Compare organic and boosted content performance
- **Multi-Platform** - Track Instagram, Facebook, TikTok, YouTube
- **Mock Data** - Works immediately with sample data

## 📊 How to Add Your Real Data

The dashboard currently uses mock data. To connect real APIs:

1. **Replace mock data** in `src/App.jsx` (line 4-48)
2. **Add API calls** to fetch from YouTube, TikTok, Instagram, Facebook
3. **Set environment variables** for API keys

For detailed API setup, see the full documentation in the original package.

## 🔧 Troubleshooting

**Build fails on Netlify?**
- Make sure `src/main.jsx` and `src/App.jsx` exist
- Check Node version is 18+ (set in Netlify environment)
- Clear cache: Site Settings → Build & deploy → Clear cache

**Can't see changes?**
- Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
- Check deploy logs in Netlify dashboard

## 📝 File Structure Explained

- **index.html** - Loads the React app
- **src/main.jsx** - Renders the app to the DOM
- **src/App.jsx** - Contains:
  - All React components (ContentCalendar, OrganicVsPaid)
  - All CSS styles
  - Mock data
  - App logic

Everything is consolidated into ONE component file for simplicity!

## 🎯 Next Steps

1. Deploy to Netlify
2. View your live dashboard
3. Customize the mock data
4. Add real API integrations (optional)

---

**Questions?** Check Netlify build logs or GitHub issues.
