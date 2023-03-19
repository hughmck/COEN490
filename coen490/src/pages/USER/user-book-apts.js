import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../../style/user/user-dashboard.css';
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
  MDBCardText,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter

} from 'mdb-react-ui-kit';

export default function UserBookApt(){

  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [localReset, setLocalReset] = useState([]);
  const [date, setDate] = useState(new Date());
  const [realDate, setRealDate] = useState("");
  const [isDateOpen, SetIsDateOpen] = useState(false);
  const [canBook, setCanBook] = useState(false);
  const [basicModal, setBasicModal] = useState(false);




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

      const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-11
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}.${day}.${year}`;
      setRealDate(formattedDate);

      console.log(type + reason + date + time);
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
              setReason('');
              setType('');
              setTime('');
              setDate(new Date());
              setSearchResults(localReset);

        };

        const handleDate= async (event) => {
                event.preventDefault();
                SetIsDateOpen(true);

          };

      const toggleShow = (user) => {

        setCardData(user);
        console.log(cardData);
        setBasicModal(!basicModal)

      };



          const handleDateClick = (date) => {
          setDate(date);
          const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-11
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${month}.${day}.${year}`;
          setRealDate(formattedDate);
          SetIsDateOpen(false);
          };



        const handleBook = async (user) => {
        let HCPbooked = {
          "HCPemail": user.email,
          "HCPfirstname": user.name,
          "HCPlastname": user.lastname,
          "MeetingDate" : realDate,
          "MeetingTime" : time,
          "canBook" : canBook
        };

        console.log(HCPbooked)
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
              document.getElementById('popup-container').innerText = 'Your Meeting Has Been Booked For ' + date + ' ' + time + ' with ' + user.name + ' ' + user.lastname;
              document.getElementById('popup-container').style.display = 'block';
              document.getElementById('popup-container').style.backgroundColor = '#38f57d';

            }
            else if (data == '2') {
              document.getElementById('popup-container').innerText = 'You Need To Enter Your Preferences Before Booking!';
              document.getElementById('popup-container').style.display = 'block';
              document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
            }
            } catch (error) {
              console.error(error);
          }
          setTimeout(() => {
            document.getElementById('popup-container').style.display = 'none';
          }, 5000);
};


  return(
    <>
    <main className="hero-section">
  <section className="container">
    <div className="hero-content">
      <nav className="navbar">
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apt">View Appointments</a>
          <a href="/user-book-apt">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
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
  An error
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
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
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
                <MDBBtn onClick={() => toggleShow(user)}>VIEW PROFILE</MDBBtn>
                <MDBBtn onClick={() => handleBook(user)} href='#' style={{marginTop: "10px"}}>Book Meeting</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>

    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
  <MDBModalDialog>
    {cardData && (
      <MDBModalContent
        style={{
          width: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
          borderRadius: '20px',
          top: '50%',
          left: '50%',
          marginTop: '500px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
        }}
      >
        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
        <MDBModalBody>
          <MDBRow>
            <MDBCol lg='6'>
              <h2 className='fw-bold mb-3'>HCP Information</h2>
              <MDBCardImage
                src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp`}
                alt='avatar'
                className='rounded-circle'
                style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                fluid
              />
              <MDBCardBody className='pt-1'>
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className='text-muted'>{cardData.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText>Profession</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.type}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText>Specialty</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.reason}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.city}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
            <MDBCol lg='6'>
              <h2 className='fw-bold mb-3'>A Little Bit About Myself</h2>
              <MDBCardText className='text-muted text-center'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </MDBCardText>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      )}
    </MDBModalDialog>
  </MDBModal>

    </div>
    </section>
    </main>

    </>
  );
};
