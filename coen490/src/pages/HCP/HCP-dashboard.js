import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Create some dummy data for user appointments
const appointments = [
  {
    title: 'Appointment 1',
    date: new Date(2023, 1, 16, 10, 0),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Appointment 2',
    date: new Date(2023, 1, 18, 14, 0),
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const formatDate = (date) => {
  const options = { hour: 'numeric', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const HCPDashboard = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      <ul>
        {filteredAppointments.map((appointment, index) => (
          <li key={index}>
            <b>{appointment.title}:</b> {formatDate(appointment.date)} - {appointment.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HCPDashboard;
