import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import '../../style/user/user-dashboard.css';


export default function UserViewApt(){

  const [data, setData] = useState([]);

  const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

  const [appointments, setAppointments] = useState([
    {
      title: 'Appointment 1',
      date: new Date(2023, 3, 18, 10, 0),
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Appointment 2',
      date: new Date(2023, 3, 18, 14, 0),
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Appointment 3',
      date: new Date(2023, 3, 19, 14, 0),
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    const filteredAppointments = appointments.filter(
      (appointment) =>
        appointment.date.getFullYear() === date.getFullYear() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getDate() === date.getDate()
    );
    setSelectedAppointments(filteredAppointments);
  };


  const handleCancel = (appointmentId) => {
  axios.post('http://localhost:4444/user/cancel', { id: appointmentId })
    .then(response => {
      console.log(response);
      const newData = data.filter(appointment => appointment._id !== appointmentId);
      setData(newData);
      window.location.reload(); // Reload the page
    })
    .catch(error => {
      console.log(error);
    });
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4444/user/viewapts');
        const data = response.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
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
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>
          Welcome back, Hugh! Here are your upcoming appointments:{' '}
        </MDBCardTitle>
        <div style={{ display: 'flex', justifyContent: 'left', height: '700px', width: '100%' }}>
          <Calendar value={selectedDate} onChange={handleCalendarChange} />
          <div style={{ marginLeft: '20px', width: '600px' }}>
            {selectedAppointments.length > 0 ? (
              <div>
                <h4>Appointments for {selectedDate.toDateString()}:</h4>
                {selectedAppointments.map((appointment, index) => (
                  <div key={index}>
                    <h5>{appointment.title}</h5>
                    <p>{appointment.description}</p>
                    <p>{formatDate(appointment.date)}</p>
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
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
    {data.map(appointment => (
    <div key={appointment._id}>
      <div className="appointment">
        <h2 className="hcp-name">{appointment.HCPfirstname} {appointment.HCPlastname}</h2>
        <div className="appointment-actions">
          <button className="btn btn-cancel" onClick={() => handleCancel(appointment._id)}>Cancel Appointment</button>
          <button className="btn btn-details">More Details</button>
        </div>
      </div>
      <hr className="divider" />
    </div>
    ))}
    </div>
    </section>
    </main>
    </>
  );
}
