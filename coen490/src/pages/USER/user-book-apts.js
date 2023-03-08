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
  MDBCol
} from 'mdb-react-ui-kit';

export default function UserBookApt(){
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
    <form>
      <select value={reason} onChange={e => setReason(e.target.value)}>
        <option value="">Reason</option>
        <option value="Addictions">Addictions</option>
        <option value="ADHD">ADHD</option>
        <option value="Mental Issues">Mental Issues</option>
        <option value="PTSD">PTSD</option>
        <option value="Disorders">Disorders</option>
      </select>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="">Meeting</option>
        <option value="chat">chat</option>
        <option value="audiocall">Audio Call</option>
          <option value="videocall">Video Call</option>
      </select>
      <button type="submit" onClick={handleSearch}>Search</button>
      <button type="reset" onClick={handleReset}>Reset</button>
    </form>
  <MDBContainer>
      <MDBRow>
        {searchResults.map((user, index) => (
          <MDBCol size='3' key={index} style={{ margin: "40px" }}>
            <MDBCard>
              <MDBCardImage src='./Digital-Identity/logo-1.png' position='top' alt='user image' />
              <MDBCardBody>
                <MDBCardTitle>{user.name} {user.lastname}</MDBCardTitle>
                <MDBListGroup flush>
                  <MDBListGroupItem>Type: {user.type}</MDBListGroupItem>
                  <MDBListGroupItem>Certificate: {user.Certificate}</MDBListGroupItem>
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
