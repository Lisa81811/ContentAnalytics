# Deployment Guide

This guide covers deploying your Content Performance Dashboard to Netlify.

## Quick Deploy to Netlify

### Option 1: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Content Performance Dashboard"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/content-dashboard.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`
6. Click "Deploy site"

#### Step 3: Add Environment Variables

1. In Netlify dashboard, go to "Site settings"
2. Click "Environment variables" in the left sidebar
3. Click "Add a variable"
4. Add each variable from your `.env` file:

```
REACT_APP_YOUTUBE_API_KEY = your_youtube_api_key
REACT_APP_YOUTUBE_CHANNEL_ID = your_channel_id
REACT_APP_TIKTOK_ACCESS_TOKEN = your_tiktok_token
REACT_APP_INSTAGRAM_ACCESS_TOKEN = your_instagram_token
REACT_APP_INSTAGRAM_USER_ID = your_instagram_user_id
REACT_APP_FACEBOOK_ACCESS_TOKEN = your_facebook_token
REACT_APP_FACEBOOK_PAGE_ID = your_facebook_page_id
REACT_APP_USE_MOCK_DATA = false
```

5. Click "Save"

#### Step 4: Trigger Redeploy

1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for build to complete
4. Your site will be live at `https://your-site-name.netlify.app`

---

### Option 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify

```bash
netlify login
```

This will open a browser for authentication.

#### Step 3: Initialize Site

```bash
cd content-dashboard
netlify init
```

Follow the prompts:
- Create & configure a new site? **Yes**
- Team: Select your team
- Site name: Enter a name (e.g., `my-content-dashboard`)
- Build command: `npm run build`
- Directory to deploy: `dist`

#### Step 4: Set Environment Variables

```bash
# Set each environment variable
netlify env:set REACT_APP_YOUTUBE_API_KEY "your_youtube_api_key"
netlify env:set REACT_APP_YOUTUBE_CHANNEL_ID "your_channel_id"
netlify env:set REACT_APP_TIKTOK_ACCESS_TOKEN "your_tiktok_token"
netlify env:set REACT_APP_INSTAGRAM_ACCESS_TOKEN "your_instagram_token"
netlify env:set REACT_APP_INSTAGRAM_USER_ID "your_instagram_user_id"
netlify env:set REACT_APP_FACEBOOK_ACCESS_TOKEN "your_facebook_token"
netlify env:set REACT_APP_FACEBOOK_PAGE_ID "your_facebook_page_id"
netlify env:set REACT_APP_USE_MOCK_DATA "false"
```

#### Step 5: Deploy

**Draft deploy (preview):**
```bash
netlify deploy
```

**Production deploy:**
```bash
netlify deploy --prod
```

Your site will be live at the URL shown in the terminal.

---

### Option 3: Drag & Drop Deploy

#### Step 1: Build Locally

```bash
npm run build
```

This creates a `dist` folder with your built site.

#### Step 2: Deploy to Netlify

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `dist` folder onto the upload area
3. Wait for deployment
4. Your site is live!

**Note**: This method doesn't support environment variables or auto-deploys.

---

## Custom Domain Setup

### Add Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `dashboard.yourdomain.com`)
4. Follow DNS configuration instructions

### Configure DNS

**Option A: Netlify DNS (Recommended)**
1. Update your domain's nameservers to Netlify's
2. Netlify will handle everything automatically

**Option B: External DNS**
Add these records to your DNS provider:

```
Type: A
Name: @ (or subdomain)
Value: 75.2.60.5

Type: CNAME
Name: www (or subdomain)
Value: your-site.netlify.app
```

### Enable HTTPS

1. Netlify automatically provisions SSL certificates
2. In "Domain settings", verify "HTTPS" is enabled
3. Enable "Force HTTPS" to redirect HTTP to HTTPS

---

## Continuous Deployment

Every push to your GitHub repository will automatically trigger a new deploy.

### Branch Deploys

1. Go to "Site settings" → "Build & deploy"
2. Scroll to "Deploy contexts"
3. Enable "Branch deploys"
4. Select which branches to deploy

### Deploy Previews

Pull requests automatically get preview deployments:
1. Create a pull request on GitHub
2. Netlify builds a preview
3. Comment appears with preview URL
4. Review changes before merging

---

## Environment-Specific Configuration

### Development Environment

```env
# .env.development
REACT_APP_USE_MOCK_DATA=true
```

### Production Environment

Set in Netlify dashboard:
```
REACT_APP_USE_MOCK_DATA = false
# ... add real API credentials
```

### Staging Environment

Create a separate Netlify site for staging:
```bash
netlify init --name my-content-dashboard-staging
```

---

## Monitoring & Analytics

### Netlify Analytics

1. In Netlify dashboard, click "Analytics"
2. Click "Enable Analytics" (paid feature)
3. View traffic, performance metrics

### Build Notifications

Set up Slack/Email notifications:
1. Go to "Site settings" → "Build & deploy"
2. Scroll to "Deploy notifications"
3. Add notification (Slack, email, webhook)

### Build Logs

View build logs for debugging:
1. Go to "Deploys" tab
2. Click on any deploy
3. Click "View deploy" to see logs

---

## Performance Optimization

### Enable Asset Optimization

1. Go to "Site settings" → "Build & deploy"
2. Scroll to "Post processing"
3. Enable:
   - Bundle CSS
   - Minify CSS
   - Minify JS
   - Compress images

### Enable Netlify Edge

For faster global delivery:
1. Your site automatically uses Netlify's CDN
2. Configure caching headers in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to "Deploys" tab
2. Click failed deploy
3. Review error messages

**Common issues:**
- Missing dependencies: Run `npm install` locally
- Environment variables: Verify all required vars are set
- Build command: Check `netlify.toml` configuration

### Site Not Updating

1. Clear deploy cache:
   - Go to "Site settings" → "Build & deploy"
   - Click "Clear cache and retry deploy"
2. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
3. Check if deploy actually succeeded

### API Errors in Production

1. Verify environment variables are set correctly
2. Check API credentials are valid
3. Review browser console for CORS errors
4. Ensure API endpoints are accessible from Netlify

### 404 Errors

If you get 404s on routes, verify `netlify.toml` has:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Rollback

If a deploy breaks your site:

1. Go to "Deploys" tab
2. Find a working previous deploy
3. Click the three dots menu
4. Select "Publish deploy"

---

## Advanced: Netlify Functions (Optional)

For server-side API calls (avoiding CORS):

### Step 1: Create Functions Directory

```bash
mkdir netlify/functions
```

### Step 2: Create a Function

```javascript
// netlify/functions/fetch-youtube.js
exports.handler = async (event, context) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  // Your API call here
  const response = await fetch(`https://...?key=${apiKey}`);
  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

### Step 3: Update netlify.toml

```toml
[functions]
  directory = "netlify/functions"
```

### Step 4: Call from Frontend

```javascript
const response = await fetch('/.netlify/functions/fetch-youtube');
const data = await response.json();
```

---

## Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use Netlify environment variables

2. **Use environment-specific configs**
   - Mock data for development
   - Real APIs for production

3. **Implement rate limiting**
   - Cache API responses
   - Use Netlify Functions for sensitive calls

4. **Enable security headers**
   Add to `netlify.toml`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       X-XSS-Protection = "1; mode=block"
       Referrer-Policy = "strict-origin-when-cross-origin"
   ```

---

## Cost Estimation

### Netlify Pricing

**Free Tier:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Perfect for small teams

**Pro Tier** ($19/month):
- 1 TB bandwidth
- 25,000 build minutes
- Team members
- Analytics

**Bandwidth Usage Estimate:**
- Dashboard size: ~500 KB
- With images/data: ~2-5 MB per visit
- 100 GB = ~20,000-50,000 monthly visits

---

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Netlify Status](https://www.netlifystatus.com/)

---

## Checklist

Before deploying:
- [ ] All API credentials configured
- [ ] Environment variables set in Netlify
- [ ] `.env` files in `.gitignore`
- [ ] Build succeeds locally (`npm run build`)
- [ ] All features tested with production data
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Analytics/monitoring set up
