import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';

export default function UserViewApt(){

  const [data, setData] = useState([]);

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

    </>
  );
}
