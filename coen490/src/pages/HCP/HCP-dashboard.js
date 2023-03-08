import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function HCPDashboard({ user }) {
  var date;
  const [appointments, setAppointments] = useState([
    {
      title: 'Appointment 1',
      date: new Date(date),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Appointment 2',
      date: new Date(2023, 1, 18, 14, 0),
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      let databody = {
        name: 'Suor',
      };
      const response = await fetch('http://localhost:4444/HCP/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(databody),
      });

      try {
        const data = await response.json();
        date = data[0].date;
        console.log("here", date)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const welcomeMessage = `Welcome back, ${user}!`;

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date.getFullYear() === selectedDate.getFullYear() &&
      appointment.date.getMonth() === selectedDate.getMonth() &&
      appointment.date.getDate() === selectedDate.getDate()
  );

  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>
      <ul>
        {filteredAppointments.map((appointment, index) => (
          <li key={index}>
            <b>{appointment.title}:</b>{' '}
            {formatDate(new Date(appointment.date))} - {appointment.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

