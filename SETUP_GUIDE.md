# Hospitality Analytics Dashboard - Complete Setup Guide

## 📁 Project Structure

```
hospitality-analytics/
├── frontend/
│   ├── src/
│   │   ├── Dashboard.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── server.js
    ├── package.json
    ├── .env.example
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Google Analytics 4 account
- Cloudbeds account

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your API credentials

npm run dev
```

The backend will run on `http://localhost:3001`

## 📋 Detailed Setup Instructions

### Frontend Configuration

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Development Mode:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Production Build:**
   ```bash
   npm run build
   npm run preview
   ```

### Backend Configuration

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server
PORT=3001

# Google Analytics 4
GA4_PROPERTY_ID=123456789
GOOGLE_ANALYTICS_KEY_PATH=./service-account-key.json

# Cloudbeds
CLOUDBEDS_ACCESS_TOKEN=your_access_token
CLOUDBEDS_CLIENT_ID=your_client_id
CLOUDBEDS_CLIENT_SECRET=your_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Step 3: Google Analytics Setup

1. **Create Service Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select project
   - Enable "Google Analytics Data API"
   - Create service account
   - Download JSON key file → save as `service-account-key.json` in backend folder

2. **Configure GA4:**
   - Google Analytics → Admin → Property Settings
   - Copy Property ID
   - Property Access Management → Add service account email with Viewer role

3. **Update .env:**
   ```env
   GA4_PROPERTY_ID=YOUR_PROPERTY_ID
   GOOGLE_ANALYTICS_KEY_PATH=./service-account-key.json
   ```

#### Step 4: Cloudbeds Setup

1. **Get API Credentials:**
   - Login to Cloudbeds
   - Settings → API & Integrations
   - Create OAuth2 application
   - Copy Client ID and Secret

2. **Generate Access Token:**
   - Use OAuth2 flow or Cloudbeds token generator
   - Copy the access token

3. **Update .env:**
   ```env
   CLOUDBEDS_ACCESS_TOKEN=your_token
   CLOUDBEDS_CLIENT_ID=your_client_id
   CLOUDBEDS_CLIENT_SECRET=your_client_secret
   ```

#### Step 5: Start Backend Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 🎯 Features

### Dashboard Features
- ✅ Real-time data from Google Analytics & Cloudbeds
- ✅ Date range filtering (Today, Yesterday, Last 7/14/28/30 days, etc.)
- ✅ Custom date range selector
- ✅ Export to CSV
- ✅ Export to PDF
- ✅ API connection status monitoring
- ✅ Loading indicators
- ✅ Responsive design

### Data Displayed
- **Website Traffic:** Sessions, page views, engagement time, new users, ADR, RevPAR, conversion rate
- **Property Performance:** Bookings, private rooms, occupancy, beds remaining
- **Operational Metrics:** Check-ins, check-outs, in-house, stay-overs, no-shows, cancellations
- **Booking Breakdown:** By country, hour, day, platform

## 🔧 Troubleshooting

### Frontend Issues

**Problem:** "Cannot find module 'recharts'"
```bash
cd frontend
npm install recharts
```

**Problem:** Port 3000 already in use
```bash
# Edit vite.config.js and change port
server: { port: 3001 }
```

### Backend Issues

**Problem:** Google Analytics connection failed
- Verify service account key file exists
- Check service account has Viewer access in GA4
- Confirm GA4_PROPERTY_ID is correct

**Problem:** Cloudbeds connection failed
- Verify access token is valid
- Check token hasn't expired
- Regenerate token if needed

**Problem:** CORS errors
- Ensure backend is running on port 3001
- Check FRONTEND_URL in .env matches your frontend URL
- Verify proxy configuration in vite.config.js

### Data Issues

**Problem:** No data showing
- Check both APIs are connected (hamburger menu)
- Verify date range has data
- Check browser console for errors
- Review backend logs

**Problem:** Incorrect property data
- Verify property names in Cloudbeds match:
  - Allen
  - Potts Point
  - Surry Hills
  - Central Sydney
- Update mapping in server.js if different

## 📊 API Endpoints

### POST /api/dashboard-data
Fetches dashboard data for date range

**Request:**
```json
{
  "startDate": "2026-01-14T00:00:00.000Z",
  "endDate": "2026-02-10T00:00:00.000Z"
}
```

### GET /api/connection-status
Checks API connection status

**Response:**
```json
{
  "googleAnalytics": {
    "connected": true,
    "lastSync": "2026-02-11T10:30:00.000Z"
  },
  "cloudbeds": {
    "connected": true,
    "lastSync": "2026-02-11T10:30:00.000Z"
  }
}
```

### POST /api/export-pdf
Generates PDF report

## 🔒 Security Notes

- ❌ Never commit `.env` file
- ❌ Never commit service account key files
- ✅ Add to `.gitignore`:
  ```
  .env
  *.json (service account keys)
  node_modules/
  ```
- ✅ Rotate API credentials regularly
- ✅ Use environment variables for all secrets

## 📦 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload dist/ folder
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd backend
# Set environment variables in platform
# Deploy using git or platform CLI
```

### Environment Variables for Production
Set these in your hosting platform:
- `PORT`
- `GA4_PROPERTY_ID`
- `GOOGLE_ANALYTICS_KEY_PATH`
- `CLOUDBEDS_ACCESS_TOKEN`
- `CLOUDBEDS_CLIENT_ID`
- `CLOUDBEDS_CLIENT_SECRET`
- `FRONTEND_URL`

## 💡 Tips

1. **Testing API Connections:**
   - Open hamburger menu to see connection status
   - Green dot = connected, Red dot = disconnected

2. **Date Range Selection:**
   - Click preset buttons (Today, Yesterday, etc.)
   - Or use custom date picker
   - Always click "Update" to apply changes

3. **Exporting Data:**
   - CSV: Quick export for spreadsheet analysis
   - PDF: Professional report for presentations

4. **Performance:**
   - Data caches for 5 minutes
   - Avoid selecting very large date ranges
   - Use preset ranges when possible

## 📞 Support

- Backend API Docs: See `backend/README.md`
- Google Analytics API: https://developers.google.com/analytics/devguides/reporting/data/v1
- Cloudbeds API: https://hotels.cloudbeds.com/api/docs/

## 🎨 Customization

### Change Colors
Edit `Dashboard.jsx`:
```javascript
// Main accent color
const accentColor = '#2d5a3d';
```

### Add Properties
Update `server.js` to include your property names

### Modify Metrics
Edit API response processing in `server.js` to include additional metrics
