import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';

const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function HCPDashboard({ user }) {
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

  return (
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
  );
}
