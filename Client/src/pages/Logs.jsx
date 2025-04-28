import React, { useState, useEffect } from 'react';
import axiosInstance from '../contexts/AxiosInstance';

function Logs() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEntries = async () => {
      const tokenForDebug = localStorage.getItem('authToken');
console.log("Logs Component - Token Check:", tokenForDebug ? "Token found" : "NO TOKEN FOUND");
      setLoading(true)
      setError(null)
      try {
        
      
        
        const response = await axiosInstance.get('/api/create/display'
        );
       if(response.data.success){ 
          console.log("Logs for entries ")
          setEntries(response.data.entries);
       }else{
        console.warn("Logs component error")
        setEntries([])
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
