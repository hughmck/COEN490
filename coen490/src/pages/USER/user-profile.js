import { Container } from "react-bootstrap"
import  LogOut  from '../Authentification/logout';
import { UserProvider } from '../../contexts/user.context';
import React from 'react';
import {MDBCol, MDBInput, MDBButton, MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage,MDBBtn,MDBIcon,MDBListGroup,MDBListGroupItem} from 'mdb-react-ui-kit';
import '../../style/user/user-profile.css'
import axios from 'axios';
import '../../style/user/calendar.css'
import { useContext, useState, useEffect } from "react";

export default function HCPProfile() {

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [hcpCheck, setHcpCheck] = useState(true);
  const [dashCheck, setDashCheck] = useState(true);
  const [easyCheck, setEasyCheck] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4444/user/profile")
      .then(res => {
        setData(res.data)
        setHcpCheck(res.data.dataHCP)
        setDashCheck(res.data.dataDash)
        setEasyCheck(res.data.dataEasy)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
  const formData = new FormData();
  formData.append('file', file);
  axios.post('http://localhost:4444/user/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((res) => {
    setFilename(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
};



  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Get the new values from the input fields
    const fullNameInput = document.getElementById('full-name');
    const newName = fullNameInput ? fullNameInput.value : '';

    const emailInput = document.getElementById('email');
    const newEmail = emailInput ? emailInput.value : '';

    const phoneInput = document.getElementById('phone');
    const newPhone = phoneInput ? phoneInput.value : '';
    // Call the file upload function only if a file has been selected
    if (file) {
        handleFileUpload();
        console.log("file detected")
    }

  };

  async function handleLiveTrackingChange() {
    console.log("HERE")
  const hcpCheckValue = document.getElementById("hcpCheck").checked;
  const dashCheckValue = document.getElementById("dashCheck").checked;
  const easyCheckValue = document.getElementById("easyCheck").checked;

  setHcpCheck(hcpCheckValue);
  setDashCheck(dashCheckValue);
  setEasyCheck(easyCheckValue);
  const userResponse = await fetch('http://localhost:4444/user/profile/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hcpCheck),
  });
  const userInfo = await userResponse.json();
  console.log(userInfo)
};


  return (
    <>
    <main className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apts">View Appointments</a>
          <a href="/user-book-apts">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
    <section className = "w-200 h-100">
      <MDBContainer className="bg1">
        <MDBRow>
          <MDBCol lg="4" >
            <MDBCard style={{background: "transparent", border: '0px'}}>
              <MDBCardBody style={{background: "transparent"}}>
{isEditing ? (
  <>
  <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleFileChange} />
  </form>

  <MDBRow>
  <MDBCardBody style={{background: "transparent"}}>
      <MDBInput label="Full Name" labelPosition="top" value={data ? data.firstname + " " + data.lastname : ''} />
      <MDBInput label="Email" labelPosition="top" value={data ? data.email : ''} />
      <MDBInput label="Phone" labelPosition="top" value={data ? data.phone : ''}/>
      <MDBInput label="City" labelPosition="top" value={data ? data.city : ''} />
    <button type="button" className="btn btn-dark mt-3" onClick={handleSave}>Save</button>
  </MDBCardBody>
</MDBRow>

</>

) : (
  <>
  <MDBCardImage
    src="https://i.pravatar.cc/100"
    alt="avatar"
    className="rounded-circle"
    style={{ width: '150px' }}
    fluid />
    <MDBCardBody style={{background: "transparent", border: '0px'}}>
  <MDBRow >
    <MDBCol sm="3">
      <MDBCardText>Name</MDBCardText>
    </MDBCol>
    <MDBCol>
      <MDBCardText style = {{color: 'white'}}>{data ? data.firstname + " " + data.lastname : 'Loading...'}</MDBCardText>
    </MDBCol>
  </MDBRow>
  <hr />
  <MDBRow >
    <MDBCol sm="3">
      <MDBCardText>Email</MDBCardText>
    </MDBCol>
    <MDBCol sm="9">
      <MDBCardText style = {{color: 'white'}}>{data ? data.email : 'Loading...'}</MDBCardText>
    </MDBCol>
  </MDBRow>
  <hr />
  <MDBRow>
    <MDBCol sm="3">
      <MDBCardText>Phone</MDBCardText>
    </MDBCol>
    <MDBCol sm="9">
      <MDBCardText style = {{color: 'white'}}>{data ? data.phone : 'Loading...'}</MDBCardText>
    </MDBCol>
  </MDBRow>
  <hr />
  <MDBRow>
    <MDBCol sm="3">
      <MDBCardText>City</MDBCardText>
    </MDBCol>
    <MDBCol sm="9">
      <MDBCardText style = {{color: 'white'}}>{data ? data.city : 'Loading...'}</MDBCardText>
      <button type="button" className="button-81" onClick={handleEdit}>Edit</button>
    </MDBCol>
  </MDBRow>
</MDBCardBody>

  </>
)}
</MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard style={{background: "transparent", border: '0px'}}>
              <MDBCardBody>
                  <h5 className="mx-auto w-100 text-center">About You</h5>
                  <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet massa egestas, mattis justo in, tincidunt ligula. Praesent blandit pellentesque erat quis aliquam. Proin feugiat at metus a efficitur. Vivamus vitae ligula dapibus, pulvinar sem sit amet, auctor erat. Praesent vehicula auctor dolor, ac commodo ipsum euismod et. Suspendisse in convallis nisl. Vestibulum ante ipsum primis in faucibus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet massa egestas, mattis justo in, tincidunt ligula. Praesent blandit pellentesque erat quis aliquam. Proin feugiat at metus a efficitur. Vivamus vitae ligula dapibus, pulvinar sem sit amet, auctor erat. Praesent vehicula auctor dolor, ac commodo ipsum euismod et. Suspendisse in convallis nisl. Vestibulum ante ipsum primis in faucibu orci luctus et ultrices posuere cubilia curae.</MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0" style = {{background: "transparent", border: '0px'}}>
                  <MDBCardBody>
                      <h5 className="mx-auto w-100 text-center" >Your Past Meetings</h5>
                      <MDBRow>
                        <MDBCol sm ="3">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '50px' }}
                            fluid />
                        </MDBCol>
                        <MDBCol sm ="6">
                          <MDBCardText className="text-center align-bottom " >January 5th 2022</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol sm ="3">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '50px' }}
                            fluid />
                        </MDBCol>
                        <MDBCol sm ="6">
                          <MDBCardText className="text-center align-bottom" >January 5th 2022</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol sm ="3">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '50px' }}
                            fluid />
                        </MDBCol>
                        <MDBCol sm ="6">
                          <MDBCardText className="text-center align-bottom" >January 5th 2022</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className ='test'>
                        <MDBCol sm ="3">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '50px' }}
                            fluid />
                        </MDBCol>
                        <MDBCol sm ="6">
                          <MDBCardText className="text-center align-center" >January 5th 2022</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0" style = {{background: "transparent", border: '0px'}}>
                  <MDBCardBody className = "card-data">
                    <MDBRow>
                      <MDBCol>

                        <h5 className="livedata w-100 text-center" >Your Live Data</h5>
                      </MDBCol>
                      <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Allow Live Tracking and Analysis by EasySante</label>
                        <input
                          className="card-data-button form-check-input float-end align-middle"
                          type="checkbox"
                          role="switch"
                          id="easyCheck"
                          checked={easyCheck}
                          onChange={handleLiveTrackingChange}
                        />
                        </div>
                      <hr className="divider" />
                      <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Allow Your HCP to View And Analysis Your Data</label>
                        <input
                          className="card-data-button form-check-input float-end align-middle"
                          type="checkbox"
                          role="switch"
                          id="hcpCheck"
                          checked={hcpCheck}
                          onChange={handleLiveTrackingChange}
                        />
                        </div>
                      <hr className="divider" />
                      <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Allow Display Of Information On Your Dashboard</label>
                        <input
                          className="card-data-button form-check-input float-end align-middle"
                          type="checkbox"
                          role="switch"
                          id="dashCheck"
                          checked={dashCheck}
                          onChange={handleLiveTrackingChange}
                        />

                      </div>
                      <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-danger" >Terminate</button>
                      </div>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <UserProvider>
        <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "1vh" }}>
          <LogOut />
        </Container>
      </UserProvider>
    </section>
    </div>
    </main>
    </>
  );
}
