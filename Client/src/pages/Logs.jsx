import React, { useState, useEffect } from 'react';
import axiosInstance from '../contexts/AxiosInstance';

const cardStyles={
  container:{
    display:"flex",
    padding:20,
    
   
    alignItems:"center",
    justifyContent:'center',

    borderRadius:20,
    flexDirection:"column"
  },entrycard:{
    display:'flex',
    flexDirection:'column',
    boxShadow:"0 0 2px 3px black",
    margin:10,
    paddingRight:50,
    paddingLeft:50,
    borderRadius:20,
    alignItems:'center'
  }
}


 
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
    <div style={cardStyles.container}>
      <h2>Your Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found. Create your first entry!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} style={cardStyles.entrycard}>
            <h3>{entry.title}</h3>
            
            <h4 className="entry-meta">
              Created: {new Date(entry.createdAt).toLocaleDateString()}
            </h4>
          </div>
        ))
      )}
    </div>
  );
}

export default Logs;
