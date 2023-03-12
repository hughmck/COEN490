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
  MDBCardHeader
} from 'mdb-react-ui-kit';

export default function HCPPatientList(){
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [localReset, setLocalReset] = useState([]);


  
   useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('http://localhost:4444/user/bookapt/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
    try {
      const data = await response.json();
      setSearchResults(data);
      setLocalReset(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

    const handleSearch = async (event) => {
      event.preventDefault();
      let databody = {
       "reason": reason,
       "type": type
      }

           const response = await fetch('http://localhost:4444/user/bookapt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(databody),
          });
          try {
              const data = await response.json();
              setSearchResults(data);
            } catch (error) {
              console.log(error);
            }

      };

      const handleReset = async (event) => {
              event.preventDefault();
              setSearchResults(localReset);

        };

        const handleBook = async (user) => {
          let HCPbooked = {
           "HCPemail": user.email,
           "HCPfirstname": user.name,
           "HCPlastname": user.lastname
          }
          fetch('http://localhost:4444/user/booked', {
               method: 'POST',
               body: JSON.stringify(HCPbooked),
               headers: {
                   'Content-Type': 'application/json'
               },
           })
           .then(res => res.json())
           .then(data => console.log("data sent to BackEnd"));
  }

  return (
    <>
  <MDBContainer>
  <MDBCardHeader style={{fontSize: "36px"}}>
    Here are your current patients:
  </MDBCardHeader>
      <MDBRow>
        {searchResults.map((user, index) => (
          <MDBCol size='3' key={index} style={{ margin: "40px" }}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{user.name} {user.lastname}</MDBCardTitle>
                <MDBListGroup flush>
                  <MDBListGroupItem>Patient's Issue: {user.type}</MDBListGroupItem>
                  <MDBListGroupItem>Preffered communication method: {user.type}</MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn onClick={() => handleBook(user)} href='#' style={{marginTop: "10px"}}>View Profile</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
    </>
  );
};
