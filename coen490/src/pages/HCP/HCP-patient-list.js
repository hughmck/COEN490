import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
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
  MDBCol,
  MDBCardHeader,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBSpinner
} from 'mdb-react-ui-kit';

const randomAvatar = "https://i.pravatar.cc/150?img=";

export default function HCPPatientList(){
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:4444/HCP/booked/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: null,
      });
      try {
        const data = await response.json();
        console.log(data);
        setData(data);
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);


  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

    return (
    <>
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
    {isLoading ? (
          <MDBSpinner grow color="primary" className="mt-5" />
        ) : (
      <MDBContainer className = "w-100">
        {data.map((subArray) => (
          <MDBRow key={subArray[0]._id}>
            {subArray.map((user) => (
              <MDBCol key={user._id}>
                <MDBCard>
                  <MDBCardBody className="d-flex">
                    <MDBCardImage
                      src="https://i.pravatar.cc/100"
                      alt="avatar"
                      className="me-3"
                      style={{ maxWidth: "50px" }}
                    />
                    <div>
                      <div>
                        {user.firstname} {user.lastname}
                      </div>
                      <div style={{ fontSize: "0.8rem" }}>
                        {user.meeting_time} | {user.location}
                      </div>
                    </div>
                    <div className="ms-auto">
                      <MDBBtn
                        onClick={() => handleView(user)}
                        href="#"
                        style={{ marginTop: "auto", marginBottom: "auto" }}
                      >
                        View Profile
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ))}
      </MDBContainer>
    )}

      <MDBModal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
        <MDBModalHeader>
          {selectedUser && `${selectedUser.firstname} ${selectedUser.lastname}`}
        </MDBModalHeader>
        <MDBModalBody>
          {selectedUser && (
            <>
              <div>
                <strong>First Name:</strong> {selectedUser.firstname}
              </div>
              <div>
                <strong>Last Name:</strong> {selectedUser.lastname}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedUser.phone}
              </div>
              {/* add more fields as needed */}
            </>
          )}
        </MDBModalBody>
      </MDBModal>
      </div>
      </section>
      </main>
    </>
  );


};
