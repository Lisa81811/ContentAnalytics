# Quick Start Guide

Get your Content Performance Dashboard up and running in 5 minutes!

## 🚀 Local Development (With Mock Data)

### 1. Navigate to the project
```bash
cd content-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

The default `.env.example` already has `REACT_APP_USE_MOCK_DATA=true`, so you can run immediately with sample data!

### 4. Start development server
```bash
npm run dev
```

### 5. Open your browser
Navigate to `http://localhost:3000`

That's it! You're now viewing the dashboard with mock data.

---

## 🌐 Deploy to Netlify (5 Minutes)

### Option 1: GitHub + Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Click "Deploy"

3. **Done!** Your site is live at `https://your-site.netlify.app`

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 📊 Connect Real Data

Once you're ready to connect real platform data:

### 1. Get API Credentials

Follow the detailed guide in `API_SETUP.md` to set up:
- YouTube Analytics API
- TikTok Business API  
- Instagram Graph API
- Facebook Graph API

### 2. Update Environment Variables

**Local Development:**
Update your `.env` file:
```env
REACT_APP_USE_MOCK_DATA=false
REACT_APP_YOUTUBE_API_KEY=your_actual_key
REACT_APP_TIKTOK_ACCESS_TOKEN=your_actual_token
# ... etc
```

**Netlify Production:**
1. Go to Netlify Dashboard → Site Settings
2. Environment Variables
3. Add each variable
4. Redeploy your site

### 3. Restart Your App
```bash
npm run dev
```

---

## 📁 Project Structure

```
content-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── ContentCalendar.jsx
│   │   ├── ContentCalendar.css
│   │   ├── OrganicVsPaid.jsx
│   │   └── OrganicVsPaid.css
│   ├── services/
│   │   └── api.js          # API integration
│   ├── App.jsx             # Main app
│   └── main.jsx            # Entry point
├── API_SETUP.md            # Detailed API setup guide
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # Full documentation
```

---

## ✨ Features

### Content Calendar View
- Filter by content type (Private/Shared)
- Sort by date, views, retention, engagement
- Performance classification (High/Average/Low)
- Platform-specific metrics for IG, FB, TikTok, YouTube

### Organic vs Paid Comparison
- Compare organic vs boosted performance
- Track ad campaign effectiveness
- Filter by ad platform (TikTok, Meta, Google)
- Detailed lift calculations

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
netlify deploy          # Deploy draft
netlify deploy --prod   # Deploy to production
```

---

## 📚 Next Steps

1. **Customize the dashboard** - Edit components in `src/components/`
2. **Set up real APIs** - Follow `API_SETUP.md`
3. **Deploy to production** - Follow `DEPLOYMENT.md`
4. **Add your branding** - Update colors, fonts in CSS files

---

## 🆘 Need Help?

- **Full Documentation**: See `README.md`
- **API Setup**: See `API_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`

---

## 🎯 Quick Tips

- Start with mock data to understand the dashboard
- Set up one API at a time (start with YouTube - easiest)
- Use Netlify environment variables for security
- Check browser console for any errors

Happy tracking! 🚀
