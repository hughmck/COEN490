import { UserContext } from "../../contexts/user.context";
import React, { useState, useEffect, useRef, useContext } from "react";
import { App, Credentials } from "realm-web";
import axios from 'axios';
import '../../style/user/user-dashboard.css';
import  Chart from 'chart.js/auto';
import { Grid } from '@mui/material';
import { Tweet } from 'react-twitter-widgets';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';



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
          labels: ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am","12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
          datasets: [
            {
              label: "Heart Rate Today",
              data: [50, 50, 60, 50, 50, 60, 50, 50, 60, 50, 80, 160, 160, 80, 60, 50, 60, 60, 50, 60, 50, 50, 60],
              borderColor: "white",
              backgroundColor: "white",
              backdropFilter: "white",
              color: "white"
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          width: 700,
          height: 500,
          borderColor: "white",
          fontColor: "white",
          ticks: "white",
          scales: {
            yAxes: [{
              ticks: {
                fontColor: "white"
              },
              gridLines: {
                color: "white",
                zeroLineColor: "white"
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                labels: "white"
              },
              gridLines: {
                color: "white",
                zeroLineColor: "white",
                fontColor:"white"
              }
            }]
          }
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
              label: "Quality of sleep",
              data: [1, 3, 2, 3],
              backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 1
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          width: 300,
          height: 200,
          scales: {
            yAxes: [{
              ticks: {
                fontColor: "white"
              },
              gridLines: {
                color: "white",
                zeroLineColor: "white"
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white"
              },
              gridLines: {
                color: "white",
                zeroLineColor: "white"
              }
            }]
          }
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
    <main className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apt">View Appointments</a>
          <a href="/user-book-apt">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
      </div>
      <MDBRow style={{marginLeft: '15px', marginTop: '60px', background: 'rgba(251, 250, 250, 0.2)', backdropFilter: 'blur(8px)'}}>
        <MDBCol md='6'>
        <canvas id="line-chart" ref={lineChartRef} style={{width: "800px", height: "500px", fontColor: "white",  color: "white"}}></canvas>
        </MDBCol>
        <MDBCol md='3'>
        <canvas id="bar-chart" ref={barChartRef} style={{width: "500px", height: "500px", marginLeft: '80px'}}></canvas>
        </MDBCol>
      </MDBRow>
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
       {/* {tweetId && <Tweet tweetId={tweetId} />} */}
</main>

    </>
  );
}
