import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  MDBModalFooter,
  MDBIcon
} from 'mdb-react-ui-kit';

import '../../style/user/user-dashboard.css';

const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function UserViewApt(){
  const [dbDate, setDbDate] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [number, setNumber] = useState('...');
  const [basicModal, setBasicModal] = useState(false);
  const [cardData, setCardData] = useState([]);


  const toggleShow = (user) => {

        setCardData(user);
        setBasicModal(!basicModal);

      };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4444/user/viewapts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: null,
        });
        const data = await response.json();
        setDbDate(data)
        console.log(data)
        setNumber(data.length)


        const meetingDates = data.map(item => item.MeetingDate);
        const meetingTimes = data.map(item => item.MeetingTime);
        const userMeeting = data.map(item => item.HCP);

        const userResponse = await fetch('http://localhost:4444/user/viewapts/HCPinfo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userMeeting),
        });
        const userInfo = await userResponse.json();
        setData(userInfo);
        const appointments = meetingDates.map((date, index) => {
            const [month, day, year] = date.split('.').map((str) => parseInt(str));
            const [hour, minute] = meetingTimes[index].match(/\d+/g).map((str) => parseInt(str));
            const isPM = /pm/i.test(meetingTimes[index]);



            return {
              title: `Appointment with ${userInfo[index].firstname}`,
              date: new Date(year, month - 1, day, hour, 0),
              description: `Please View The Connect Page to Join Your Meeting Or To Converse With ${userInfo[index].firstname}.`,
              id: `${userInfo[index]}`,
            };
          })

        setAppointments(appointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    var currIndex = 0;
    const filteredAppointments = appointments.filter(
      (appointment) =>
        appointment.date.getFullYear() === date.getFullYear() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getDate() === date.getDate()
    );

    appointments.map((appointment, index) => {
      if (appointment.date.toDateString() === date.toDateString()) {
        currIndex = index;
      }
    });


    setSelectedAppointments(filteredAppointments.map((appointment, index) => ({
      ...appointment,
      data: data[currIndex],
      appointment: dbDate[index]
    })));
  };



  const handleCancelMeeting = async (canceldata) => {
    try {
      const response = await fetch('http://localhost:4444/user/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(canceldata),
      });

      if (response.status === 200) {
        document.getElementById('popup-container').innerText = 'Your Meeting With' + canceldata.firstname + canceldata.lastname + 'Has Been Deleted';
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#38f57d';
        setTimeout(() => {
          document.getElementById('popup-container').style.display = 'none';
          window.location.reload();
        }, 3000);
      } else {
        document.getElementById('popup-container').innerText = 'An Error Has Occured. Please Try Again Ulteriorly';
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#38f57d';
        setTimeout(() => {
          document.getElementById('popup-container').style.display = 'none';
          window.location.reload();
        }, 3000);
      }


    } catch (error) {
      console.error(error);
    }

    window.location.reload()

  }




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
    !
    </div>
    <MDBCard style={{ backgroundColor: "transparent", border: "0" }}>
      <MDBCardBody>
        <MDBCardTitle>
          Welcome back, Hugh! You have {number} upcoming appointments:{' '}
        </MDBCardTitle>
        <div style={{ display: 'flex', justifyContent: 'left'}}>
          <Calendar value={selectedDate} onChange={handleCalendarChange} onClickDay={() => toggleShow()} />
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <MDBModalDialog>
                 <MDBCard>
                  <MDBContainer>
                <MDBCardTitle style={{color: "black"}}>

              {selectedAppointments.length > 0 && (
                <>
                {selectedAppointments.map((appointment, index) => (
                    <div key={index}>
                    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                     <MDBModalDialog>
                       <MDBModalContent>
                         <MDBModalHeader>
                           <MDBModalTitle>{appointment.title} at {formatDate(appointment.date)}</MDBModalTitle>
                           <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                         </MDBModalHeader>
                         <MDBModalBody>
                         <MDBCardImage
                           src={selectedAppointments[index].data.avatar}
                           alt="avatar"
                           className="rounded-circle"
                           style={{ width: '150px' }}
                           fluid
                         />
                         <MDBCardBody className="pt-1">
                           <MDBRow>
                             <MDBCol sm="3">
                               <MDBCardText>Name</MDBCardText>
                             </MDBCol>
                             <MDBCol>
                               <MDBCardText className="text-muted">
                                 {selectedAppointments ? selectedAppointments[index].data.firstname + ' ' + selectedAppointments[index].data.lastname : 'Loading...'}
                               </MDBCardText>
                             </MDBCol>
                           </MDBRow>
                           <hr />
                           <MDBRow>
                             <MDBCol sm="3">
                               <MDBCardText>Email</MDBCardText>
                             </MDBCol>
                             <MDBCol sm="9">
                               <MDBCardText className="text-muted">
                                 {selectedAppointments ? selectedAppointments[index].data.email : 'Loading...'}
                               </MDBCardText>
                             </MDBCol>
                           </MDBRow>
                           <hr />
                           <MDBRow>
                             <MDBCol sm="3">
                               <MDBCardText>Profession</MDBCardText>
                             </MDBCol>
                             <MDBCol sm="9">
                               <MDBCardText className="text-muted">
                                 {selectedAppointments ? selectedAppointments[index].data.profession : 'Loading...'}
                               </MDBCardText>
                             </MDBCol>
                           </MDBRow>
                           <hr />
                           <MDBRow>
                             <MDBCol sm="3">
                               <MDBCardText>Specialty</MDBCardText>
                             </MDBCol>
                             <MDBCol sm="9">
                               <MDBCardText className="text-muted">
                                 {selectedAppointments ? selectedAppointments[index].data.specialty : 'Loading...'}
                               </MDBCardText>
                             </MDBCol>
                           </MDBRow>
                           <hr />
                           <MDBRow>
                             <MDBCol sm="3">
                               <MDBCardText>City</MDBCardText>
                             </MDBCol>
                             <MDBCol sm="9">
                               <MDBCardText className="text-muted">
                                 {selectedAppointments ? selectedAppointments[index].data.city : 'Loading...'}
                               </MDBCardText>
                             </MDBCol>
                           </MDBRow>
                           <hr />
                           <MDBRow>
                             <MDBCol sm="9">
                               <div className="col-md-12 text-center">
                               <MDBBtn color="danger" onClick={() => handleCancelMeeting(selectedAppointments[index].data)}>Cancel Meeting</MDBBtn>
                               </div>
                             </MDBCol>
                           </MDBRow>
                         </MDBCardBody>
                         </MDBModalBody>
                       </MDBModalContent>
                     </MDBModalDialog>
                   </MDBModal>

                  </div>
                ))}
                 </>
              )}
                  </MDBCardTitle>
                  </MDBContainer>
                  </MDBCard>
                </MDBModalDialog>
              </MDBModal>
            </div>
      </MDBCardBody>
    </MDBCard>
    </main>
    </>
  );
}
