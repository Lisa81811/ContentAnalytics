import React, { useState, useEffect } from 'react';
import './App.css';
import ContentCalendar from './components/ContentCalendar';
import OrganicVsPaid from './components/OrganicVsPaid';
import { fetchAllPlatformData } from './services/api';

function App() {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchAllPlatformData();
      setContentData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load data: ' + err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Content Performance Dashboard</h1>
          <button onClick={loadData} className="refresh-btn" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
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
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

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
