import { UserContext } from "../../contexts/user.context";
import { App, Credentials } from "realm-web";
import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import '../../style/user/user-dashboard.css';

export default function UserDashboard() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

  }, []);



  
  return (
    <>
      <h1>USER</h1>
    </>
  );
}
