# 🚀 Quick Commands - Copy & Paste Ready

## First Time GitHub Setup

### 1. Create GitHub Repository
Go to https://github.com/new and create a new repository named `content-dashboard`

### 2. Push to GitHub (HTTPS)

```bash
# Navigate to your project folder
cd /path/to/content-dashboard

# Add GitHub remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git

# Push to GitHub
git push -u origin main
```

### 2. Push to GitHub (SSH - Alternative)

```bash
# Navigate to your project folder
cd /path/to/content-dashboard

# Add GitHub remote (REPLACE YOUR_USERNAME)
git remote add origin git@github.com:YOUR_USERNAME/content-dashboard.git

# Push to GitHub
git push -u origin main
```

---

## Local Development

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deploy to Netlify

### Option 1: Via GitHub (Recommended)
1. Push code to GitHub (see above)
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Deploy settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

### Option 2: Via CLI

```bash
# Install Netlify CLI (first time only)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

---

## Future Updates (After Initial Push)

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Updated dashboard features"

# Push to GitHub
git push origin main
```

Netlify will auto-deploy when you push to main!

---

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View current remote
git remote -v

# Create new branch
git checkout -b feature-name

# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main
```

---

## Environment Variables

### Local Development (.env file)
```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env  # or use your preferred editor
```

### Netlify (Production)
1. Netlify Dashboard → Site Settings
2. Environment Variables
3. Add each variable from .env.example
4. Set REACT_APP_USE_MOCK_DATA=false for production

---

## Troubleshooting

### Can't push to GitHub?
```bash
# Remove existing remote
git remote remove origin

# Add correct remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git

# Try pushing again
git push -u origin main
```

### Need to update commit author?
```bash
# Set your name and email
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Build fails on Netlify?
- Check environment variables are set
- Verify Node version (needs 18+)
- Check build logs for errors

---

## Quick Links

- **Your Project**: https://github.com/YOUR_USERNAME/content-dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **YouTube API**: https://console.cloud.google.com
- **TikTok Developers**: https://developers.tiktok.com
- **Meta Developers**: https://developers.facebook.com

---

## Support Files in This Repository

- 📖 **README.md** - Full documentation
- ⚡ **QUICKSTART.md** - 5-minute setup guide
- 🔧 **API_SETUP.md** - API credential setup
- 🚀 **DEPLOYMENT.md** - Detailed deployment guide
- 💻 **GITHUB_SETUP.md** - GitHub setup guide (you are here)

---

**Remember**: Replace `YOUR_USERNAME` with your actual GitHub username in all commands! 🎯
