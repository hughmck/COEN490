import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import '../../style/user/user-dashboard.css';


const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function HCPDashboard() {
  const [dbDate, setDbDate] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    setDbDate([2023, 3, 18, 10, 30]);
    console.log("HERE", dbDate);
    setAppointments([
      {
        title: 'Appointment 1',
        date: new Date(dbDate[0], dbDate[1]-1, dbDate[2], dbDate[3], dbDate[4]),
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
  }, []);

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

  return (
     <main className="hero-section">
  <section className="container">
    <div className="hero-content">
      <nav className="navbar">
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/HCP-dashboard">Dashboard</a>
          <a href="/HCP-connect">Connect</a>
          <a href="/HCP-patient-list">View Appointments</a>
          <a href="/HCP-profile">Profile</a>
        </ul>
      </nav>
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
    </div>
    </section>
    </main>

  );
}
