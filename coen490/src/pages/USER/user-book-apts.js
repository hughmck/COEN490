import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../../style/user/user-book-apts.css';
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
  MDBCardText,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter

} from 'mdb-react-ui-kit';
import logo from '../../style/490LogoWhite.png';


export default function UserBookApt(){

  const [reason, setReason] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [localReset, setLocalReset] = useState([]);
  const [date, setDate] = useState(new Date());
  const [realDate, setRealDate] = useState("");
  const [isDateOpen, SetIsDateOpen] = useState(false);
  const [canBook, setCanBook] = useState(false);
  const [basicModal, setBasicModal] = useState(false);




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

    function onChangeDate(newDate) {
        setDate(newDate);
      }


    const handleSearch = async (event) => {
      event.preventDefault();

      const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-11
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}.${day}.${year}`;
      setRealDate(formattedDate);


      if(!reason || !date || !time){
        document.getElementById('popup-container').innerText = 'Please Input Your Preferences In The Search Bar.';
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
        setTimeout(() => {
          document.getElementById('popup-container').style.display = 'none';
        }, 5000);
      }
      else{
      setCanBook(true);

      let profession;

      switch (reason) {
        case "Prescription":
          profession = "Doctor";
          break;
        case "Seeking Help":
          profession = "Doctor";
          break;
        case "Counselling":
          profession = "Therapist";
          break;
        case "Need To Chat":
          profession = "Therapist";
          break;
        case "Disorders":
          profession = "Psychiatrist";
          break;
        default:
          profession = "unknown";
        }

      let databody = {
       "reason": profession,
       "time" : time,
       "date" : realDate
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
          }
      };

      const handleReset = async (event) => {
              event.preventDefault();
              setCanBook(false);
              setReason('');
              setTime('');
              setDate(new Date());
              setSearchResults(localReset);

        };

        const handleDate= async (event) => {
                event.preventDefault();
                SetIsDateOpen(true);

          };

      const toggleShow = (user) => {

        setCardData(user);
        console.log(cardData);
        setBasicModal(!basicModal)

      };



          const handleDateClick = (date) => {
          setDate(date);
          const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-11
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${month}.${day}.${year}`;
          setRealDate(formattedDate);
          SetIsDateOpen(false);
          };



        const handleBook = async (user) => {
        let HCPbooked = {
          "HCPemail": user.email,
          "HCPfirstname": user.firstname,
          "HCPlastname": user.lastname,
          "MeetingDate" : realDate,
          "MeetingTime" : time,
          "canBook" : canBook
        };

        console.log(HCPbooked)
        try {
          const response = await fetch('http://localhost:4444/user/booked', {
          method: 'POST',
          body: JSON.stringify(HCPbooked),
          headers: {
            'Content-Type': 'application/json'
      }
          });
            const data = await response.json();
            console.log("HERE",data)
            if (data == '1') {
              document.getElementById('popup-container').innerText = 'Your Meeting Has Been Booked For ' + date + ' ' + time + ' with ' + user.name + ' ' + user.lastname;
              document.getElementById('popup-container').style.display = 'block';
              document.getElementById('popup-container').style.backgroundColor = '#38f57d';

            }
            else if (data == '2') {
              document.getElementById('popup-container').innerText = 'You Need To Enter Your Preferences Before Booking!';
              document.getElementById('popup-container').style.display = 'block';
              document.getElementById('popup-container').style.backgroundColor = '#e34f4f';
            }
            } catch (error) {
              console.error(error);
          }
          setTimeout(() => {
            document.getElementById('popup-container').style.display = 'none';
          }, 5000);
};


  return(
    <>
    <main className="hero-section1">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <img className="nav-logo" src={logo}/>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apt">View Appointments</a>
          <a href="/user-book-apt">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
    <div id="popup-container" style={{
    display: "none",
    width: "900px",
    height: "65px",
    position: "fixed",
    top: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d5eef7",
    zIndex: 9999,
    textAlign: "center",
    borderRadius: "10px",
    opacity: 0.9,
    fontSize: "15px",
    fontFamily: "Montserrat",
    lineHeight: "70px"
  }}>
  An error
  </div>
    <form className="flex justify-center items-center">
      <MDBRow style = {{padding: '15px'}}>
        <div className="flex flex-wrap justify-center items-center m-2">
            <select
                className="block w-48 bg-blue-200 border border-blue-400 hover:border-blue-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            >
                <option value="">What Are You Looking For?</option>
                <option value="Prescription">Prescription</option>
                <option value="Counselling">Counselling</option>
                <option value="Need To Chat">Need To Chat</option>
                <option value="Seeking Help">Seeking Help</option>
                <option value="Disorders">Disorders</option>
            </select>
                <MDBBtn class='button-21' onClick={handleDate} style={{maxWidth: '150px', maxHeight: '40px'}} color="primary">{date.toDateString()}</MDBBtn>
                {isDateOpen && (
                    <div>
                        <Calendar style={{width:'100px', height: '200px'}} onChange={handleDateClick} value={date} />
                    </div>
                )}
                <select
                    className="block w-48 bg-blue-600 border border-blue-800 hover:border-blue-900 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-blue-900 ml-2"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option value="">Time</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                </select>
            <MDBBtn
                className="button-81"
                type="submit"
                onClick={handleSearch}
                style={{maxWidth: '75px', maxHeight: '40px'}}
            >
                Search
            </MDBBtn>
            <MDBBtn
                className="button-81"
                type="reset"
                onClick={handleReset}
                style={{maxWidth: '75px', maxHeight: '40px'}}
            >
                Reset
            </MDBBtn>
        </div>
        </MDBRow>
    </form>

  <MDBContainer>
      <MDBRow>
        {searchResults.map((user, index) => (
          <MDBCol size='3' key={index} style={{ margin: "40px" }}>
            <MDBCard class = 'bg'>
              <MDBCardBody>
                <MDBCardTitle style = {{color: 'white'}}>{user.firstname} {user.lastname}</MDBCardTitle>
                <MDBListGroup flush>
                  <MDBListGroupItem style = {{marginTop: '10px'}}>Profession: {user.profession}</MDBListGroupItem>
                  <MDBListGroupItem style = {{marginBottom: '10px'}}>Specialty: {user.specialty}</MDBListGroupItem>
                </MDBListGroup>
                <MDBRow>
                <MDBBtn style={{maxWidth: '300px', maxHeight: '40px'}} class='button-21' onClick={() => toggleShow(user)} >View Profile</MDBBtn>
                <MDBBtn style={{maxWidth: '300px', maxHeight: '40px', marginTop: '10px'}} class='button-21' onClick={() => handleBook(user)} href='#'>Book Meeting</MDBBtn>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>

    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
  <MDBModalDialog>
    {cardData && (
      <MDBModalContent
        style={{
          width: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
          borderRadius: '20px',
          top: '50%',
          left: '50%',
          marginTop: '500px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
        }}
      >
        <MDBModalBody>
          <MDBRow>
            <MDBCol lg='6'>
              <MDBCardImage
                src={cardData.avatar}
                alt='avatar'
                className='rounded-circle'
                class='imgClass'
                fluid

              />
              <MDBCardBody className='pt-1'>
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText style={{color: 'black'}}>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className='text-muted'>{cardData.firstname} {cardData.lastname}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText  style={{color: 'black'}}>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText  style={{color: 'black'}}>Profession</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.profession}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText  style={{color: 'black'}}>Specialty</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9' >
                    <MDBCardText className='text-muted'>{cardData.specialty}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm='3'>
                    <MDBCardText  style={{color: 'black'}}>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>{cardData.city}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
            <MDBCol lg='6'>
              <h2 className='fw-bold mb-3' style={{color: 'black'}}>A Little Bit About Myself</h2>
              <MDBCardText className='text-muted text-center'>
                  As a licensed therapist, I have devoted my career to helping individuals overcome personal challenges and achieve greater emotional well-being. My education and certifications are a testament to my dedication to 
                    providing compassionate and effective therapy services. I hold a Master of Science in Clinical Psychology from Concordia University, where I received extensive training in various therapeutic modalities and gained a deep understanding of human behavior and psychological principles. 
                    Additionally, I am licensed by Quebec and have met rigorous standards of education, training, and experience to become a licensed therapist.
                </MDBCardText>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      )}
    </MDBModalDialog>
  </MDBModal>

    </div>
    </main>

    </>
  );
};
