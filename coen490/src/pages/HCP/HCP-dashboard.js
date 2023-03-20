import React, { useState, useEffect } from 'react';
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
  MDBModalFooter
} from 'mdb-react-ui-kit';

import '../../style/user/user-dashboard.css';

const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function HCPDashboard() {
  const [dbDate, setDbDate] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [number, setNumber] = useState('...');
  const [name, setName] = useState('...');
  const [basicModal, setBasicModal] = useState(false);
  const [cardData, setCardData] = useState([]);


  const toggleShow = (user) => {

        setCardData(user);
        console.log(cardData);
        setBasicModal(!basicModal)

      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4444/HCP/dashboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: null,
        });
        const data = await response.json();
        setDbDate(data);
        setNumber(data.length);
        setName(data[0].HCPlastname)

        const meetingDates = data.map(item => item.MeetingDate);
        const meetingTimes = data.map(item => item.MeetingTime);
        const userMeeting = data.map(item => item.user);

        const userResponse = await fetch('http://localhost:4444/user/profile/hcp', {
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

    console.log(selectedAppointments)
  };

  return (
     <main className="hero-section">
     <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/HCP-dashboard">Dashboard</a>
          <a href="/HCP-connect">Connect</a>
          <a href="/HCP-patient-list">View Appointments</a>
          <a href="/HCP-profile">Profile</a>
        </ul>
      </nav>
      <MDBCardBody style={{marginLeft: '40px', alignContent: 'center'}}>
        <MDBCardTitle>
            Welcome back, Dr {name}! You have {number} upcoming appointments:{' '}
        </MDBCardTitle>
        <div style={{ display: 'flex', justifyContent: 'left', height: '700px', width: '100%' }}>
          <Calendar value={selectedDate} onChange={handleCalendarChange} onClickDay={() => toggleShow()} />
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <MDBModalDialog>
                 <MDBCard>
                  <MDBContainer>
                <MDBCardTitle style={{color: "black"}}>
                    Dear Dr {name}, on {selectedDate.toDateString()}, you have {number} appointments. Here they are listed: {' '}
                  </MDBCardTitle>
                  </MDBContainer>
                  </MDBCard>
                </MDBModalDialog>
              </MDBModal>
          <div style={{ marginLeft: '20px', width: '600px' }}>
            {selectedAppointments.length > 0 ? (
              <div>
                <h4>Appointments for {selectedDate.toDateString()}:</h4>
                {selectedAppointments.map((appointment, index) => (
                  <div key={index}>
                    <h5>
                      {appointment.title} at {formatDate(appointment.date)}
                    </h5>
                    <p>{appointment.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              selectedDate.toDateString() === new Date().toDateString() ? (
                <p>No appointments today, book an appointment with a patient!</p>
              ) : (
                <p>No appointments on {selectedDate.toDateString()}</p>
              )
              )}

              {selectedAppointments.length > 0 && (
                <>
                {selectedAppointments.map((appointment, index) => (
                    <div key={index}>
                  <MDBCardImage
                    src={`../../Digital-Identity/logo-1.png`}
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
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {selectedAppointments ? selectedAppointments[index].data.phone : 'Loading...'}
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
                  </MDBCardBody>
                  </div>
                ))}
                </>
              )}
            </div>
        </div>
      </MDBCardBody>
    </div>
    </main>

  );
}
