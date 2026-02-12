# Complete API Setup Guide

This guide walks you through setting up all required API integrations for the Content Performance Dashboard.

## Table of Contents
1. [YouTube Analytics API](#youtube-analytics-api)
2. [TikTok Business API](#tiktok-business-api)
3. [Instagram Graph API](#instagram-graph-api)
4. [Facebook Graph API](#facebook-graph-api)
5. [API Response Mapping](#api-response-mapping)
6. [Rate Limits & Best Practices](#rate-limits--best-practices)

---

## YouTube Analytics API

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name (e.g., "Content Dashboard")
4. Click "Create"

### Step 2: Enable YouTube APIs

1. In the Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable:
   - **YouTube Data API v3** (for video metadata)
   - **YouTube Analytics API** (for analytics data)

### Step 3: Create Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy your API key
4. (Optional) Click "Restrict Key":
   - Under "API restrictions", select "Restrict key"
   - Check YouTube Data API v3 and YouTube Analytics API
   - Save

### Step 4: Set Up OAuth 2.0 (Required for Analytics)

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" → "Create"
3. Fill in app information:
   - App name: "Content Dashboard"
   - User support email: your email
   - Developer contact: your email
4. Click "Save and Continue"
5. Add scopes:
   - `https://www.googleapis.com/auth/youtube.readonly`
   - `https://www.googleapis.com/auth/yt-analytics.readonly`
6. Click "Save and Continue"
7. Add test users (your YouTube account email)

### Step 5: Create OAuth Client ID

1. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
2. Application type: "Web application"
3. Name: "Content Dashboard"
4. Authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.netlify.app` (for production)
5. Click "Create"
6. Copy Client ID and Client Secret

### Step 6: Get Your Channel ID

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click your profile icon → "Settings"
3. Click "Channel" → "Advanced settings"
4. Copy your "Channel ID"

### Environment Variables
```env
REACT_APP_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_YOUTUBE_CLIENT_ID=123456789-xxxxxxxxxxxxx.apps.googleusercontent.com
REACT_APP_YOUTUBE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxx
REACT_APP_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx
```

---

## TikTok Business API

### Step 1: Apply for TikTok Developer Access

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Sign in with your TikTok account
3. Click "Manage Apps" → "Create App"

### Step 2: Create an App

1. Fill in app details:
   - App name: "Content Dashboard"
   - App type: "Analytics"
   - Description: "Multi-platform content analytics"
2. Click "Submit"

### Step 3: Add Products

1. In your app dashboard, click "Add Products"
2. Add the following:
   - **Login Kit** (for authentication)
   - **Video Kit** (for video data)
   - **Research API** (optional, requires approval)

### Step 4: Configure Login Kit

1. Click "Login Kit" → "Configure"
2. Add redirect URIs:
   - `http://localhost:3000/auth/tiktok/callback`
   - `https://yourdomain.netlify.app/auth/tiktok/callback`
3. Request permissions:
   - `user.info.basic`
   - `video.list`
   - `video.publish`

### Step 5: Get Access Token

**Option A: Manual Testing (Development)**
1. Go to "Tools" → "Test Event"
2. Generate a test access token
3. Copy the token (valid for 24 hours)

**Option B: OAuth Flow (Production)**
```javascript
// Implement OAuth flow in your app
const authUrl = `https://www.tiktok.com/v2/auth/authorize/?`
  + `client_key=${CLIENT_KEY}`
  + `&scope=user.info.basic,video.list`
  + `&response_type=code`
  + `&redirect_uri=${REDIRECT_URI}`;

// Exchange code for access token
const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_key: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    code: authCode,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI
  })
});
```

### Environment Variables
```env
REACT_APP_TIKTOK_CLIENT_KEY=awXXXXXXXXXXXXXXXXXX
REACT_APP_TIKTOK_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_TIKTOK_ACCESS_TOKEN=act.xxxxxxxxxxxxxxxxxxxxxx
```

### Available Endpoints

**List Videos:**
```javascript
POST https://open.tiktokapis.com/v2/video/list/
Headers: Authorization: Bearer {access_token}
Body: {
  "fields": ["id", "title", "create_time", "share_count", "view_count", 
             "like_count", "comment_count", "video_description"]
}
```

**Get Video Analytics:**
```javascript
POST https://open.tiktokapis.com/v2/video/insights/
Headers: Authorization: Bearer {access_token}
Body: {
  "video_id": "video_id_here",
  "fields": ["average_time_watched", "total_time_watched", 
             "reach", "full_video_watched_rate"]
}
```

---

## Instagram Graph API

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Business" as app type
4. Fill in:
   - App name: "Content Dashboard"
   - App contact email: your email
5. Click "Create App"

### Step 2: Add Instagram Product

1. In app dashboard, click "Add Product"
2. Find "Instagram" → Click "Set Up"
3. Choose "Instagram Basic Display" or "Instagram Graph API"
   - **Basic Display**: For personal accounts
   - **Graph API**: For Business/Creator accounts (recommended)

### Step 3: Configure Instagram Basic Display (if using)

1. Click "Basic Display" → "Create App"
2. Fill in:
   - Display name: "Content Dashboard"
   - Privacy Policy URL: your URL
   - User Data Deletion URL: your URL
3. Add OAuth Redirect URIs:
   - `https://localhost:3000/auth/instagram/callback`
   - `https://yourdomain.netlify.app/auth/instagram/callback`
4. Save changes

### Step 4: Get User Access Token

**For Business/Creator Accounts (Graph API):**

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Click "Generate Access Token"
4. Grant permissions:
   - `instagram_basic`
   - `instagram_manage_insights`
   - `pages_read_engagement`
5. Copy the access token
6. Convert to long-lived token:
```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}"
```

### Step 5: Get Instagram User ID

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token={access-token}"
```

Then get Instagram Business Account ID:
```bash
curl -X GET "https://graph.facebook.com/v18.0/{page-id}?fields=instagram_business_account&access_token={access-token}"
```

### Environment Variables
```env
REACT_APP_INSTAGRAM_APP_ID=123456789012345
REACT_APP_INSTAGRAM_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_INSTAGRAM_ACCESS_TOKEN=IGQVJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_INSTAGRAM_USER_ID=17841400000000000
```

### Available Endpoints

**Get Media:**
```javascript
GET https://graph.facebook.com/v18.0/{user-id}/media
  ?fields=id,caption,media_type,media_url,timestamp,like_count,comments_count
  &access_token={access-token}
```

**Get Insights (Reels):**
```javascript
GET https://graph.facebook.com/v18.0/{media-id}/insights
  ?metric=ig_reels_avg_watch_time,ig_reels_video_view_total_time,reach,plays
  &access_token={access-token}
```

---

## Facebook Graph API

### Step 1: Use Existing Facebook App

Use the same app created for Instagram (they share the same app).

### Step 2: Add Facebook Login Product

1. In app dashboard, click "Add Product"
2. Find "Facebook Login" → Click "Set Up"
3. Select "Web" platform
4. Enter site URL: `https://yourdomain.netlify.app`

### Step 3: Get Page Access Token

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Under "User or Page", select "Get Page Access Token"
4. Select your Facebook Page
5. Grant permissions:
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `read_insights`
6. Copy the page access token

### Step 4: Get Page ID

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token={access-token}"
```

### Environment Variables
```env
REACT_APP_FACEBOOK_APP_ID=123456789012345
REACT_APP_FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_FACEBOOK_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_FACEBOOK_PAGE_ID=123456789012345
```

### Available Endpoints

**Get Posts:**
```javascript
GET https://graph.facebook.com/v18.0/{page-id}/posts
  ?fields=id,message,created_time,insights.metric(post_impressions,post_engaged_users)
  &access_token={page-access-token}
```

**Get Video Insights:**
```javascript
GET https://graph.facebook.com/v18.0/{post-id}/insights
  ?metric=post_video_views,post_video_avg_time_watched,post_video_complete_views_30s
  &access_token={page-access-token}
```

---

## API Response Mapping

### Calculating Retention Rate

**YouTube:**
```javascript
retention = (averageViewDuration / videoDuration) * 100
```

**TikTok:**
```javascript
retention = (average_time_watched / video_duration) * 100
```

**Instagram Reels:**
```javascript
retention = (avg_watch_time / video_duration) * 100
```

**Facebook:**
```javascript
retention = (post_video_avg_time_watched / video_length) * 100
```

### Data Transformation Example

```javascript
// YouTube Data → Dashboard Format
const youtubeVideo = {
  videoId: 'abc123',
  views: 1000,
  averageViewDuration: 45, // seconds
  videoDuration: 60, // seconds
  likes: 50,
  comments: 10
};

const dashboardData = {
  views: { youtube: youtubeVideo.views },
  retention: { 
    youtube: (youtubeVideo.averageViewDuration / youtubeVideo.videoDuration) * 100 
  },
  likes: youtubeVideo.likes,
  comments: youtubeVideo.comments
};
```

---

## Rate Limits & Best Practices

### YouTube Analytics API
- **Quota**: 10,000 units/day
- **Cost per query**: ~1-10 units depending on metrics
- **Best Practice**: Cache results, batch requests, use date ranges

### TikTok API
- **Rate Limit**: Varies by endpoint (typically 100-1000/day)
- **Best Practice**: Implement exponential backoff, cache results

### Instagram Graph API
- **Rate Limit**: 200 calls/hour per user
- **Best Practice**: Use webhooks for real-time updates, batch field requests

### Facebook Graph API
- **Rate Limit**: 200 calls/hour per user, 4800/day
- **Best Practice**: Use batch requests, implement rate limit headers check

### Implementation Tips

```javascript
// Rate limit handling
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRateLimit(url, options, retries = 3) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      if (retries > 0) {
        const retryAfter = response.headers.get('Retry-After') || 60;
        await delay(retryAfter * 1000);
        return fetchWithRateLimit(url, options, retries - 1);
      }
      throw new Error('Rate limit exceeded');
    }
    
    return response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

// Caching strategy
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(key, fetchFn) {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### Security Best Practices

1. **Never expose API keys in client-side code**
   - Use environment variables
   - Implement a backend proxy

2. **Rotate access tokens regularly**
   - Implement token refresh logic
   - Store refresh tokens securely

3. **Use HTTPS only**
   - Configure Netlify to enforce HTTPS
   - Set secure headers

4. **Implement proper error handling**
   - Don't leak sensitive info in errors
   - Log errors server-side

---

## Testing Your Setup

Create a test script to verify all APIs are working:

```bash
# Create test-apis.js
node test-apis.js
```

```javascript
// test-apis.js
const testYouTube = async () => {
  console.log('Testing YouTube API...');
  // Add test code
};

const testTikTok = async () => {
  console.log('Testing TikTok API...');
  // Add test code
};

const testInstagram = async () => {
  console.log('Testing Instagram API...');
  // Add test code
};

const testFacebook = async () => {
  console.log('Testing Facebook API...');
  // Add test code
};

(async () => {
  await testYouTube();
  await testTikTok();
  await testInstagram();
  await testFacebook();
  console.log('All tests complete!');
})();
```

---

## Troubleshooting

### Common Issues

**"Invalid credentials"**
- Check API keys are correct
- Verify access token hasn't expired
- Ensure app has proper permissions

**"Rate limit exceeded"**
- Implement caching
- Add delays between requests
- Use batch requests where possible

**"CORS errors"**
- Implement backend proxy
- Use Netlify Functions or similar

**"No data returned"**
- Verify account permissions
- Check date ranges
- Ensure content exists for query

---

## Additional Resources

- [YouTube Analytics API Docs](https://developers.google.com/youtube/analytics)
- [TikTok for Developers](https://developers.tiktok.com/doc/overview)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [Facebook Graph API Docs](https://developers.facebook.com/docs/graph-api)
