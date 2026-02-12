# Content Performance Dashboard

A comprehensive multi-platform content analytics dashboard that tracks performance across Instagram, Facebook, TikTok, and YouTube. Compare organic vs paid performance, analyze retention rates, and monitor engagement metrics all in one place.

## Features

### 📊 Content Calendar
- View all content with key metrics at a glance
- Filter by content type (Private/Shared) and performance level
- Sort by date, views, retention, or engagement
- Platform-specific breakdowns for views and retention rates
- Performance classification (High/Average/Low)

### 📈 Organic vs Paid Comparison
- Side-by-side comparison of organic and boosted content
- Track performance lift from ad campaigns
- Filter by ad platform (TikTok Ads, Meta Ads, Google Ads)
- Detailed metrics including views, retention, and engagement

### 📱 Multi-Platform Support
- **Instagram**: Views, retention, engagement metrics
- **Facebook**: Views, retention, engagement metrics
- **TikTok**: Views, hook rate (retention), engagement metrics
- **YouTube**: Views, retention rate, engagement metrics

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS3 with CSS Variables
- **APIs**: 
  - YouTube Analytics API
  - TikTok Business API
  - Instagram Graph API
  - Facebook Graph API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- API credentials for each platform you want to track

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/content-dashboard.git
cd content-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your API credentials in `.env`:
```env
# YouTube
REACT_APP_YOUTUBE_API_KEY=your_key
REACT_APP_YOUTUBE_CHANNEL_ID=your_channel_id

# TikTok
REACT_APP_TIKTOK_ACCESS_TOKEN=your_token

# Instagram
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_token
REACT_APP_INSTAGRAM_USER_ID=your_user_id

# Facebook
REACT_APP_FACEBOOK_ACCESS_TOKEN=your_token
REACT_APP_FACEBOOK_PAGE_ID=your_page_id

# Use mock data for development
REACT_APP_USE_MOCK_DATA=true
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Setup Guide

### YouTube Analytics API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Analytics API
4. Create credentials (API Key)
5. Get your Channel ID from YouTube Studio
6. Add to `.env` file

**Required Scopes:**
- `https://www.googleapis.com/auth/youtube.readonly`
- `https://www.googleapis.com/auth/yt-analytics.readonly`

### TikTok Business API

1. Apply for [TikTok for Developers](https://developers.tiktok.com/)
2. Create an app in the Developer Portal
3. Request access to TikTok Login Kit and Video API
4. Get your access token
5. Add to `.env` file

**Required Permissions:**
- `user.info.basic`
- `video.list`
- `video.insights`

### Instagram Graph API

1. Create a Facebook Developer account
2. Create an app with Instagram Basic Display or Instagram Graph API
3. Get Instagram Business/Creator Account access token
4. Get your Instagram User ID
5. Add to `.env` file

**Required Permissions:**
- `instagram_basic`
- `instagram_manage_insights`
- `pages_read_engagement`

### Facebook Graph API

1. Use the same Facebook app from Instagram setup
2. Add Facebook Login product
3. Get Page access token
4. Get your Facebook Page ID
5. Add to `.env` file

**Required Permissions:**
- `pages_read_engagement`
- `pages_manage_posts`
- `read_insights`

## Deployment to Netlify

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/content-dashboard.git
git push -u origin main
```

2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Netlify dashboard under Site Settings > Environment Variables
7. Deploy!

### Method 2: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

4. Set environment variables:
```bash
netlify env:set REACT_APP_YOUTUBE_API_KEY "your_key"
netlify env:set REACT_APP_TIKTOK_ACCESS_TOKEN "your_token"
# ... add all other variables
```

5. Deploy:
```bash
netlify deploy --prod
```

## Project Structure

```
content-dashboard/
├── src/
│   ├── components/
│   │   ├── ContentCalendar.jsx      # Main content table view
│   │   ├── ContentCalendar.css
│   │   ├── OrganicVsPaid.jsx        # Organic vs Paid comparison
│   │   └── OrganicVsPaid.css
│   ├── services/
│   │   └── api.js                   # API integration logic
│   ├── App.jsx                      # Main app component
│   ├── App.css
│   ├── main.jsx                     # Entry point
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── .env.example
└── README.md
```

## Data Structure

The dashboard expects data in the following format:

```javascript
{
  contentNumber: "Content 646",
  contentType: "shared" | "private",
  hook: "Your content hook/title",
  postedDate: "2026-02-07",
  views: {
    instagram: 278,
    facebook: 50,
    tiktok: 303,
    youtube: 100
  },
  retention: {
    instagram: 40,  // percentage
    facebook: 30,
    tiktok: 56,
    youtube: 45
  },
  likes: 15,
  comments: 3,
  saves: 5,
  shares: 2,
  newFollows: 1,
  ads: {
    tiktok: false,
    meta: false,
    google: false
  },
  boosted: {
    views: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
    retention: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
    likes: 0,
    comments: 0,
    saves: 0,
    shares: 0,
    newFollows: 0
  }
}
```

## Customization

### Adding New Platforms

1. Update the data structure in `src/services/api.js`
2. Add new platform icons in CSS
3. Update the UI components to display new platform data

### Changing Performance Thresholds

Edit the `calculatePerformance` function in `ContentCalendar.jsx`:

```javascript
// Current thresholds
if (avgRetention > 40 || engagementRate > 5) return 'high';
if (avgRetention < 25 && engagementRate < 2) return 'low';
return 'average';
```

## Development vs Production

### Development Mode
- Uses mock data by default (`REACT_APP_USE_MOCK_DATA=true`)
- Hot module replacement
- Source maps enabled

### Production Mode
- Connects to real APIs
- Optimized build
- Minified assets

## Troubleshooting

### API Rate Limits
- YouTube: 10,000 quota units/day
- TikTok: Varies by endpoint
- Instagram/Facebook: 200 calls/hour per user

If you hit rate limits, implement caching or reduce refresh frequency.

### CORS Issues
All API calls should be made server-side. Consider adding a backend proxy if you encounter CORS errors.

### Missing Data
Check that:
1. API credentials are correct
2. Required permissions are granted
3. Platform accounts are properly connected
4. Data exists for the requested time period

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own needs.

## Support

For issues or questions:
- Create an issue on GitHub
- Check the API documentation for each platform
- Review Netlify deployment logs

## Roadmap

- [ ] Add export functionality (CSV, PDF)
- [ ] Implement real-time data refresh
- [ ] Add data visualization charts
- [ ] Include sentiment analysis
- [ ] Add team collaboration features
- [ ] Mobile app version
