import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Logs() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await axios.get('/api/create/display', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setEntries(response.data.entries);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError(err.response?.data?.message || "Failed to fetch entries");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, []);
  
  if (loading) return <div>Loading entries...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="entries-list">
      <h2>Your Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found. Create your first entry!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <h3>{entry.title}</h3>
            
            <div className="entry-meta">
              Created: {new Date(entry.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Logs;