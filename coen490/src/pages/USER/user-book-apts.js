import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBContainer,
  MDBCol
} from 'mdb-react-ui-kit';

export default function UserBookApt(){

  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [localReset, setLocalReset] = useState([]);
  const [date, setDate] = useState(new Date());
  const [realDate, setRealDate] = useState("");
  const [isDateOpen, SetIsDateOpen] = useState(false);
  const [canBook, setCanBook] = useState(false);


   useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('http://localhost:4444/user/bookapt/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
    try {
      const data = await response.json();
      setSearchResults(data);
      setLocalReset(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

    function onChangeDate(newDate) {
        setDate(newDate);
      }


    const handleSearch = async (event) => {
      event.preventDefault();
      if(!type || !reason || !date || !time){
        document.getElementById('popup-container').innerText = 'Please Input Your Preferences In The Search Bar.';
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
        setTimeout(() => {
          document.getElementById('popup-container').style.display = 'none';
        }, 5000);
      }
      else{
      setCanBook(true);
      let databody = {
       "reason": reason,
       "type": type,
       "time" : time,
       "date" : realDate
      }

           const response = await fetch('http://localhost:4444/user/bookapt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(databody),
          });
          try {
              const data = await response.json();
              setSearchResults(data);
            } catch (error) {
              console.log(error);
            }
          }
      };

      const handleReset = async (event) => {
              event.preventDefault();
              setCanBook(false);
              setReason('Reason');
              setType('Type');
              setTime('Time');
              setDate('Date');
              setSearchResults(localReset);

        };

        const handleDate= async (event) => {
                event.preventDefault();
                SetIsDateOpen(true);

          };


          const handleDateClick = (date) => {
          setDate(date);
          const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-11
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${month}.${day}.${year}`;
          setRealDate(formattedDate);
          console.log(realDate);
          SetIsDateOpen(false);
          };



        const handleBook = async (user) => {

        if(!canBook){
          console.log("IN", canBook);
          document.getElementById('popup-container').innerText = 'Please Input Your Preferences In The Search Bar.';
          document.getElementById('popup-container').style.display = 'block';
          document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
          setTimeout(() => {
            document.getElementById('popup-container').style.display = 'none';
          }, 5000);
        }
        else{
            console.log("OUT", canBook);
        let HCPbooked = {
          "HCPemail": user.email,
          "HCPfirstname": user.name,
          "HCPlastname": user.lastname,
          "MeetingDate" : realDate,
          "MeetingTime" : time
        };
        try {
    const response = await fetch('http://localhost:4444/user/booked', {
      method: 'POST',
      body: JSON.stringify(HCPbooked),
      headers: {
        'Content-Type': 'application/json'
      }
    });
      const data = await response.json();
      if (data == '1') {
        document.getElementById('popup-container').innerText = 'Your Interview Has Been Booked For ' + date + ' ' + time + ' with ' + user.name + ' ' + user.lastname;
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#38f57d';

      } else if (data == '0') {
        document.getElementById('popup-container').innerText = 'You Already Have An Appointment Booked With An HCP. Please View Appointments Page.';
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
      }
      } catch (error) {
        console.error(error);
    }
    setTimeout(() => {
      document.getElementById('popup-container').style.display = 'none';
    }, 5000);
  }
};


  return(
    <>
    <div id="popup-container" style={{
    display: "none",
    width: "900px",
    height: "65px",
    position: "fixed",
    top: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d5eef7",
    zIndex: 9999,
    textAlign: "center",
    borderRadius: "10px",
    opacity: 0.9,
    fontSize: "15px",
    fontFamily: "Montserrat",
    lineHeight: "70px"
  }}>
  </div>



    <form className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center items-center m-2">
            <select
                className="block w-48 bg-blue-200 border border-blue-400 hover:border-blue-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            >
                <option value="">Reason</option>
                <option value="Addictions">Addictions</option>
                <option value="ADHD">ADHD</option>
                <option value="Mental Issues">Mental Issues</option>
                <option value="PTSD">PTSD</option>
                <option value="Disorders">Disorders</option>
            </select>
            <select
                className="block w-48 bg-blue-200 border border-blue-400 hover:border-blue-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Meeting</option>
                <option value="chat">Chat</option>
                <option value="audiocall">Audio Call</option>
                <option value="videocall">Video Call</option>
            </select>

                <MDBBtn onClick={handleDate} color="primary">{date.toDateString()}</MDBBtn>
                {isDateOpen && (
                    <div>
                        <Calendar onChange={handleDateClick} value={date} />
                    </div>
                )}
                <select
                    className="block w-48 bg-blue-600 border border-blue-800 hover:border-blue-900 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-blue-900 ml-2"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option value="">Time</option>
                    <option value="9am">9am</option>
                    <option value="10am">10am</option>
                    <option value="11am">11am</option>
                    <option value="12am">12am</option>
                    <option value="1pm">1pm</option>
                    <option value="2pm">2pm</option>
                    <option value="3pm">3pm</option>
                    <option value="4pm">4pm</option>
                    <option value="5pm">5pm</option>
                    <option value="6pm">6pm</option>
                    <option value="7pm">7pm</option>
                </select>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-2"
                type="submit"
                onClick={handleSearch}
            >
                Search
            </button>
            <button
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                type="reset"
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    </form>

  <MDBContainer>
      <MDBRow>
        {searchResults.map((user, index) => (
          <MDBCol size='3' key={index} style={{ margin: "40px" }}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{user.name} {user.lastname}</MDBCardTitle>
                <MDBListGroup flush>
                  <MDBListGroupItem>Type: {user.type}</MDBListGroupItem>
                  <MDBListGroupItem>Certificate: {user.Certificate}</MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn onClick={() => handleBook(user)} href='#' style={{marginTop: "10px"}}>View Profile</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
    </>
  );
};
