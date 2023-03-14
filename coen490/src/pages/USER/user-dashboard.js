import { UserContext } from "../../contexts/user.context";
import React, { useState, useEffect, useRef, useContext } from "react";
import { App, Credentials } from "realm-web";
import axios from 'axios';
import '../../style/user/user-dashboard.css';
import  Chart from 'chart.js/auto';
import { Grid } from '@mui/material';
import { Tweet } from 'react-twitter-widgets';


export default function UserDashboard() {

  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [lineChart, setLineChart] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [tweetId, setTweetId] = useState('1513487024556290051');




  useEffect(() => {
    const popupSeen = localStorage.getItem("popupSeen");

    if (!popupSeen) {
      setShowPopup(true);
      localStorage.setItem("popupSeen", true);
    }
    else{
      setShowPopup(false);
      localStorage.setItem("popupSeen", false);
    }



    // Line chart
    const lineCtx = lineChartRef.current.getContext("2d");
    let lineChart = new Chart(lineCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Hours of sleep",
            data: [6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6, 5],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        width: 700,
        height: 500
      },
    });

    // Bar chart
    const barCtx = barChartRef.current.getContext("2d");
    let barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["N1", "N2", "N3", "REM"],
        datasets: [
          {
            label: "Hours of sleep",
            data: [1, 3, 2, 3],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        width: 300,
        height: 200
      },
    });
    const getMsUntilNextHour = () => {
      const now = new Date();
      const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
      return nextHour.getTime() - now.getTime();
    };

    const fetchLatestTweetId = async () => {
      /*const response = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=<screen_name>&count=1', {
        headers: {
          'Authorization': 'Bearer <bearer_token>'
        }
      });
      const data = await response.json();
      */
      return "1513487024556290051";
    };

    const getLatestTweetId = async () => {
      const latestTweetId = await fetchLatestTweetId();
      setTweetId(latestTweetId);
    };

    const interval = setInterval(() => {
      getLatestTweetId();
    }, getMsUntilNextHour());

    return () => {
      lineChart.destroy();
      barChart.destroy();
      clearInterval(interval);
    };




  }, []);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:4444/user/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });
  };





  return (
    <>
    <div className="chart-container">
        <canvas id="line-chart" ref={lineChartRef}></canvas>
        <canvas id="bar-chart" ref={barChartRef}></canvas>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            <button className="close-button" onClick={() => setShowPopup(false)}>
              X
            </button>
          </div>
        </div>
      )}
       {tweetId && <Tweet tweetId={tweetId} />}
    </>
  );
}
