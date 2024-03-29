import { UserContext } from "../../contexts/user.context";
import React, { useState, useEffect, useRef, useContext } from "react";
import { App, Credentials, User } from "realm-web";
import axios from 'axios';
import '../../style/user/user-dashboard.css';
import { MDBRow, MDBCol, MDBCardTitle } from 'mdb-react-ui-kit';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import logo from '../../style/490LogoWhite.png';
 

export default function UserDashboard() {

  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [braceletData, setBraceletData] = useState(null);
  const [braceletTime, setBraceletTime] = useState(null);
  const [dataLength, setDataLength] = useState(null);
  const [dataBPM, setDataBPM] = useState(null);
  const [userData, setUserData] = useState({});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Live Sensored Data',
    },
  },
  
};



const labels = Array.from({ length: dataLength }, (_, i) => `T-${dataLength - i}`);
labels[labels.length - 1] = braceletTime;

console.log(braceletData, dataBPM)

 const data = {
  labels,
  datasets: [
    {
      label: 'Live Data Points',
      data: braceletData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      color: 'rgb(128,0,128)',
    },
    {
      label: 'Hourly BPM',
      data: dataBPM,
      borderColor: 'rgb(128,0,128)',
      backgroundColor: 'rgb(128,0,128)',
      color: 'rgb(128,0,128)',
    },
  ],  
};


useEffect(() => {
    axios.get("http://localhost:4444/user/profile")
      .then(res => {
        setUserData(res.data)
        console.log(userData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

useEffect(() => {
 const fetchData = async () => {
 const response = await fetch('http://localhost:4444/user/braceletdata', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: null,
 });
 try {
   const data = await response.json();
   setDataLength(data[0].HourlyBPM[0].length);
   setBraceletData(data[0].HourlyBPM[0])
   setBraceletTime(data[0].lastReset.slice(11,19));
   const tempBPM = data[0].BPM
   setDataBPM(Array(data[0].HourlyBPM[0].length).fill(tempBPM))
 } catch (error) {
   console.log(error);
 }
};
fetchData();
}, []);


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
  }, []);


  useEffect(() => {
    axios.get("http://localhost:4444/user/profile")
      .then(res => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
          <nav className="navbar" style={{ marginLeft: "20px", width: "1740px" }}>
            <img className="nav-logo" src={logo}/>
            <ul className="nav-links">
              <a href="/user-dashboard">Dashboard</a>
              <a href="/user-connect">Connect</a>
              <a href="/user-view-apt">View Appointments</a>
              <a href="/user-book-apt">Book Appointments</a>
              <a href="/user-profile">Profile</a>
            </ul>
          </nav>
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
        <div class="dash-cards container">
            <div class="pt-1" style={{width:'1500px', marginLeft: '-125px', height: '100px', marginBottom:'100px'}}>
              <MDBCardTitle><h2 class="followers-info__count" style={{color: "white", marginTop: '20px'}}>Welcome back, {userData.firstname} {userData.lastname}!</h2></MDBCardTitle>
            </div>
          </div>
          <div class="dash-cards container">
            <div class='pt-1' style={{backdropFilter: 'blur(9px)', background: 'rgba(255, 255, 255, 0.2)'}}>
              <Line options={options} data={data}/>
            </div>
          </div>
      </main>
    </>
  );
}
