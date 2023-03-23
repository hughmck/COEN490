import { Container } from "react-bootstrap"
import  LogOut  from '../Authentification/logout';
import { UserProvider } from '../../contexts/user.context';
import React from 'react';
import {MDBCol, MDBInput, MDBButton, MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage,MDBBtn,MDBIcon,MDBListGroup,MDBListGroupItem} from 'mdb-react-ui-kit';
import '../../style/user/user-profile.css'
import axios from 'axios';
import '../../style/user/calendar.css'
import { useContext, useState, useEffect } from "react";
import logo from '../../style/490LogoWhite.png';

export default function HCPProfile() {

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [hcpCheck, setHcpCheck] = useState(true);
  const [dashCheck, setDashCheck] = useState(true);
  const [easyCheck, setEasyCheck] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [past, setPast] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4444/user/profile")
      .then(res => {
        setUserProfile(res.data.avatar)
        setData(res.data)
        setHcpCheck(res.data.dataHCP)
        setDashCheck(res.data.dataDash)
        setEasyCheck(res.data.dataEasy)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4444/user/past")
      .then(res => {
        setPast(res.data)
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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    const userResponse = await fetch('http://localhost:4444/user/profile/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });


    if (file) {
        handleFileUpload();
        console.log("file detected")
    }
    window.location.reload()

  };

  async function handleLiveTrackingChange() {

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

const handleInputChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value,
  });
};



  return (
    <>
    <main className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <img className="nav-logo" src={logo}/>
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
                    <MDBInput label="Full Name" labelPosition="top" value={`${data.firstname} ${data.lastname}`} onChange={handleInputChange} name="fullname" />
                    <MDBInput label="Email" labelPosition="top" value={data.email} onChange={handleInputChange} name="email" />
                    <MDBInput label="Phone" labelPosition="top" value={data.phone} onChange={handleInputChange} name="phone"/>
                    <MDBInput label="City" labelPosition="top" value={data.city} onChange={handleInputChange} name="city" />
                  <button type="button" className="btn btn-dark mt-3" onClick={handleSave}>Save</button>
                </MDBCardBody>
              </MDBRow>

              </>

              ) : (
  <>
  <MDBCardImage
    src={userProfile}
    alt="avatar"
    className="rounded-circle"
    style={{ width: '150px', marginLeft: '90px' }}
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
      <button type="button" className="button-21" onClick={handleEdit}>Edit</button>
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
                  <MDBCardText style={{color: "white"}}>As a user currently experiencing depression and anxiety, I understand firsthand the challenges that come with struggling with mental health. Despite these difficulties, I am committed to seeking support and making positive changes in my life. 
                  Through therapy, self-care practices, and medication management, I am working towards managing my symptoms and improving my overall well-being. 
                  Although the journey can be challenging at times, I am dedicated to continuing my healing process and developing new coping skills to navigate life's ups and downs. 
                  I am seeking additional support and resources from HCPs, and I remain hopeful that with time and effort, I can find greater peace and happiness in my life.</MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
              <MDBRow style={{ width: '100%' }}>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0" style={{ background: "transparent", border: '0px' }}>
                  <MDBCardBody style={{ width: '400px' }}>
                      <h5 className="mx-auto w-100 text-center">Your Past Meetings</h5>
                      {past.map((item, index) => (
                        <MDBRow style={{ marginTop: '15px' }} key={past[index][0].firstname}>
                          <MDBCol sm="3">
                            <MDBCardImage
                              src={past[index][0].avatar}
                              alt="avatar"
                              className="rounded-circle"
                              style={{ width: '50px' }}
                              fluid />
                          </MDBCol>
                          <MDBCol sm="6">
                            <MDBCardText className="text-center align-bottom ">{past[index][0].firstname} {past[index][0].lastname}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      ))}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                </MDBRow>

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
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Allow Display Of Info On Your Dashboard</label>
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
