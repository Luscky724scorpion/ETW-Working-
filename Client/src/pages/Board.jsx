import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Board() {
  const [feelingsData, setFeelingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeelingsData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }
        //this-is the thing
        const response = await axios.get(
          'api/feels/catch-feels', 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setFeelingsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feelings data:', err);
        setError(err.response?.data?.message || 'Failed to fetch feelings data');
        setLoading(false);
      }
    };

    fetchFeelingsData();
  }, []);

  // Api response prep
  const prepareChartData = () => {
    if (!feelingsData || !feelingsData.feelings) {
      return null;
    }

    const emotions = Object.keys(feelingsData.feelings);
    const counts = emotions.map(emotion => feelingsData.feelings[emotion]);

    // colours
    const emotionColors = {
      anger: 'rgba(255, 99, 132, 0.6)',
      fear: 'rgba(153, 102, 255, 0.6)',
      disgust: 'rgba(75, 192, 192, 0.6)',
      happy: 'rgba(255, 206, 86, 0.6)',
      sad: 'rgba(54, 162, 235, 0.6)',
      surprise: 'rgba(255, 159, 64, 0.6)',
    };

    const backgroundColors = emotions.map(emotion => 
      emotionColors[emotion.toLowerCase()] || 'rgba(201, 203, 207, 0.6)'
    );

    return {
      labels: emotions.map(emotion => emotion.charAt(0).toUpperCase() + emotion.slice(1)),
      datasets: [
        {
          label: 'Number of Days Feeling Was Logged',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Emotional Journey',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value} ${value === 1 ? 'day' : 'days'}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Days',
          font: {
            size: 14
          }
        },
        ticks: {
          precision: 0 
        }
      },
      x: {
        title: {
          display: true,
          text: 'Emotions',
          font: {
            size: 14
          }
        }
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your feelings data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!chartData) {
    return <div className="no-data">No feelings data available. Start logging your emotions!</div>;
  }

  return (
    <div className="feelings-dashboard">
      <h2>Your Feelings Dashboard</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="dashboard-tips">
        <h3>Insights</h3>
        <p>This chart shows how many days you've logged each emotion. Track your emotional patterns over time to gain personal insights.</p>
      </div>
    </div>
  );
}

export default Board;