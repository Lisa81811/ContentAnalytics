import React, { useState, useEffect } from 'react';

// ============= MOCK DATA =============
const mockData = [
  {
    contentNumber: 'Content 646',
    contentType: 'shared',
    hook: 'One thing this Sydney hostel does differently',
    postedDate: '2026-02-07',
    views: { instagram: 278, facebook: 50, tiktok: 303, youtube: 100 },
    retention: { instagram: 40, facebook: 30, tiktok: 56, youtube: 45 },
    likes: 15, comments: 3, saves: 5, shares: 2, newFollows: 1,
    ads: { tiktok: false, meta: false, google: false },
    boosted: {
      views: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
      retention: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
      likes: 0, comments: 0, saves: 0, shares: 0, newFollows: 0
    }
  },
  {
    contentNumber: 'Content 661',
    contentType: 'private',
    hook: 'This is the smarter way to stay in Sydney',
    postedDate: '2026-02-11',
    views: { instagram: 779, facebook: 200, tiktok: 695, youtube: 450 },
    retention: { instagram: 57, facebook: 42, tiktok: 47, youtube: 55 },
    likes: 45, comments: 12, saves: 20, shares: 8, newFollows: 5,
    ads: { tiktok: true, meta: true, google: false },
    boosted: {
      views: { instagram: 1200, facebook: 850, tiktok: 1500, youtube: 450 },
      retention: { instagram: 52, facebook: 38, tiktok: 44, youtube: 55 },
      likes: 85, comments: 28, saves: 45, shares: 18, newFollows: 15
    }
  },
  {
    contentNumber: 'Content 656',
    contentType: 'shared',
    hook: "Why weight loss alone isn't always enough?",
    postedDate: '2026-02-06',
    views: { instagram: 261, facebook: 120, tiktok: 295, youtube: 80 },
    retention: { instagram: 19, facebook: 25, tiktok: 45, youtube: 30 },
    likes: 8, comments: 1, saves: 2, shares: 1, newFollows: 0,
    ads: { tiktok: false, meta: false, google: false },
    boosted: {
      views: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
      retention: { instagram: 0, facebook: 0, tiktok: 0, youtube: 0 },
      likes: 0, comments: 0, saves: 0, shares: 0, newFollows: 0
    }
  }
];

// ============= CONTENT CALENDAR COMPONENT =============
function ContentCalendar({ data }) {
  const [filterType, setFilterType] = useState('all');
  const [filterPerformance, setFilterPerformance] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const calculatePerformance = (item) => {
    const avgViews = (item.views.instagram + item.views.facebook + item.views.tiktok + item.views.youtube) / 4;
    const avgRetention = (item.retention.instagram + item.retention.facebook + item.retention.tiktok + item.retention.youtube) / 4;
    const engagementRate = ((item.likes + item.comments + item.saves + item.shares) / avgViews) * 100;
    
    if (avgRetention > 40 || engagementRate > 5) return 'high';
    if (avgRetention < 25 && engagementRate < 2) return 'low';
    return 'average';
  };

  const filteredAndSorted = [...data]
    .filter(item => filterType === 'all' || item.contentType === filterType)
    .filter(item => filterPerformance === 'all' || calculatePerformance(item) === filterPerformance)
    .sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'date') {
        aVal = new Date(a.postedDate);
        bVal = new Date(b.postedDate);
      } else if (sortBy === 'views') {
        aVal = a.views.instagram + a.views.facebook + a.views.tiktok + a.views.youtube;
        bVal = b.views.instagram + b.views.facebook + b.views.tiktok + b.views.youtube;
      } else if (sortBy === 'retention') {
        aVal = (a.retention.instagram + a.retention.facebook + a.retention.tiktok + a.retention.youtube) / 4;
        bVal = (b.retention.instagram + b.retention.facebook + b.retention.tiktok + b.retention.youtube) / 4;
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  return (
    <div className="content-calendar">
      <div className="filters-section">
        <div className="filter-group">
          <label>Content Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="private">Private</option>
            <option value="shared">Shared</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Performance:</label>
          <select value={filterPerformance} onChange={(e) => setFilterPerformance(e.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="average">Average</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Content #</th>
              <th>Type</th>
              <th>Hook</th>
              <th onClick={() => setSortBy('date')}>Posted Date {sortBy === 'date' && '↓'}</th>
              <th>Performance</th>
              <th onClick={() => setSortBy('views')}>Total Views {sortBy === 'views' && '↓'}</th>
              <th>Platform Views</th>
              <th onClick={() => setSortBy('retention')}>Avg Retention {sortBy === 'retention' && '↓'}</th>
              <th>Engagement</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((item) => {
              const performance = calculatePerformance(item);
              const totalViews = item.views.instagram + item.views.facebook + item.views.tiktok + item.views.youtube;
              const avgRetention = ((item.retention.instagram + item.retention.facebook + item.retention.tiktok + item.retention.youtube) / 4).toFixed(1);

              return (
                <tr key={item.contentNumber}>
                  <td>{item.contentNumber}</td>
                  <td><span className={`type-badge type-${item.contentType}`}>{item.contentType}</span></td>
                  <td className="hook-text">{item.hook}</td>
                  <td>{new Date(item.postedDate).toLocaleDateString()}</td>
                  <td><span className={`performance-badge badge-${performance}`}>{performance}</span></td>
                  <td className="total-views">{totalViews.toLocaleString()}</td>
                  <td className="platform-breakdown">
                    <div className="platform-stat"><span className="platform-icon ig">IG</span> {item.views.instagram}</div>
                    <div className="platform-stat"><span className="platform-icon fb">FB</span> {item.views.facebook}</div>
                    <div className="platform-stat"><span className="platform-icon tt">TT</span> {item.views.tiktok}</div>
                    <div className="platform-stat"><span className="platform-icon yt">YT</span> {item.views.youtube}</div>
                  </td>
                  <td>{avgRetention}%</td>
                  <td className="engagement-stats">
                    <div>❤️ {item.likes}</div>
                    <div>💬 {item.comments}</div>
                    <div>🔖 {item.saves}</div>
                    <div>🔄 {item.shares}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============= ORGANIC VS PAID COMPONENT =============
function OrganicVsPaid({ data }) {
  const boostedContent = data.filter(item => item.ads.tiktok || item.ads.meta || item.ads.google);

  const calculateLift = (organic, boosted) => {
    if (organic === 0) return 0;
    return (((boosted - organic) / organic) * 100).toFixed(1);
  };

  return (
    <div className="organic-vs-paid">
      <h2>Organic vs Paid Performance Comparison</h2>
      
      {boostedContent.length === 0 ? (
        <div className="no-data"><p>No boosted content found.</p></div>
      ) : (
        <div className="comparison-grid">
          {boostedContent.map(item => (
            <div key={item.contentNumber} className="comparison-card">
              <div className="card-header">
                <h3>{item.contentNumber}</h3>
                <p>{item.hook}</p>
                <div className="ad-platforms">
                  {item.ads.tiktok && <span className="platform-tag">TikTok Ads</span>}
                  {item.ads.meta && <span className="platform-tag">Meta Ads</span>}
                  {item.ads.google && <span className="platform-tag">Google Ads</span>}
                </div>
              </div>

              <div className="comparison-sections">
                <div className="metric-comparison">
                  <h4>Views Comparison</h4>
                  <div className="comparison-row">
                    <div className="metric-column organic">
                      <span className="label">Organic</span>
                      <div>IG: {item.views.instagram.toLocaleString()}</div>
                      <div>FB: {item.views.facebook.toLocaleString()}</div>
                      <div>TT: {item.views.tiktok.toLocaleString()}</div>
                      <div>YT: {item.views.youtube.toLocaleString()}</div>
                    </div>
                    <div className="metric-column boosted">
                      <span className="label">Boosted</span>
                      <div>IG: {item.boosted.views.instagram.toLocaleString()} 
                        <span className="lift positive">+{calculateLift(item.views.instagram, item.boosted.views.instagram)}%</span>
                      </div>
                      <div>FB: {item.boosted.views.facebook.toLocaleString()} 
                        <span className="lift positive">+{calculateLift(item.views.facebook, item.boosted.views.facebook)}%</span>
                      </div>
                      <div>TT: {item.boosted.views.tiktok.toLocaleString()} 
                        <span className="lift positive">+{calculateLift(item.views.tiktok, item.boosted.views.tiktok)}%</span>
                      </div>
                      <div>YT: {item.boosted.views.youtube.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="metric-comparison">
                  <h4>Engagement</h4>
                  <div className="comparison-row">
                    <div className="metric-column organic">
                      <span className="label">Organic</span>
                      <div>❤️ {item.likes}</div>
                      <div>💬 {item.comments}</div>
                      <div>🔖 {item.saves}</div>
                      <div>🔄 {item.shares}</div>
                    </div>
                    <div className="metric-column boosted">
                      <span className="label">Boosted</span>
                      <div>❤️ {item.boosted.likes} <span className="lift positive">+{calculateLift(item.likes, item.boosted.likes)}%</span></div>
                      <div>💬 {item.boosted.comments} <span className="lift positive">+{calculateLift(item.comments, item.boosted.comments)}%</span></div>
                      <div>🔖 {item.boosted.saves} <span className="lift positive">+{calculateLift(item.saves, item.boosted.saves)}%</span></div>
                      <div>🔄 {item.boosted.shares} <span className="lift positive">+{calculateLift(item.shares, item.boosted.shares)}%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= MAIN APP COMPONENT =============
function App() {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setContentData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Content Performance Dashboard</h1>
        </div>
        <nav className="tabs">
          <button 
            className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Content Calendar
          </button>
          <button 
            className={`tab ${activeTab === 'organic-vs-paid' ? 'active' : ''}`}
            onClick={() => setActiveTab('organic-vs-paid')}
          >
            Organic vs Paid
          </button>
        </nav>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading content data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'calendar' && <ContentCalendar data={contentData} />}
            {activeTab === 'organic-vs-paid' && <OrganicVsPaid data={contentData} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
