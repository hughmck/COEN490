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
  MDBModalFooter
} from 'mdb-react-ui-kit';

export default function HCPPatientList(){
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalContent, setModalContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);


  const handleView = (user) => {
  setModalContent(true);
}


  return (
    <>
      <MDBContainer>
        <MDBRow>
          {data.map((subArray, index) => (
            <MDBCol size="3" key={index}>
              {subArray.map((user) => (
                <MDBCard key={user._id}>
                  <MDBCardBody>
                    <MDBCardTitle>
                      {user.firstname} {user.lastname}
                    </MDBCardTitle>
                    <MDBListGroup flush></MDBListGroup>
                    <MDBBtn onClick={() => handleView(user)} href="#" style={{ marginTop: "10px" }} > View Profile </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(false)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalContent.firstname} {modalContent.lastname}
            </h2>
            <p>Email: {modalContent.email}</p>
            <p>Phone: {modalContent.phone}</p>
            <button onClick={() => setModalContent(false)}>Close</button>
          </div>
        </div>
      )}

    </>
  );
};
